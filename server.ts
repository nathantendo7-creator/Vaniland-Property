import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Logger middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const getProperties = () => {
    const propsPath = path.resolve(process.cwd(), "local-cms/properties.json");
    if (!fs.existsSync(path.dirname(propsPath))) {
      fs.mkdirSync(path.dirname(propsPath), { recursive: true });
    }
    if (!fs.existsSync(propsPath)) {
      const seedDataPath = path.resolve(process.cwd(), "seed/seed-properties.json");
      const seedData = fs.readFileSync(seedDataPath, "utf-8");
      fs.writeFileSync(propsPath, seedData);
    }
    return JSON.parse(fs.readFileSync(propsPath, "utf-8"));
  };

  const saveProperties = (properties: any[]) => {
    const propsPath = path.resolve(process.cwd(), "local-cms/properties.json");
    fs.writeFileSync(propsPath, JSON.stringify(properties, null, 2));
  };

  app.get("/api/search", (req, res) => {
    try {
      const properties = getProperties();
      let { status, type, district, priceMin, priceMax, beds, q, goal } = req.query;
      
      // Map goal to status if status is not provided
      if (!status && goal) {
        if (goal === 'buy') status = 'for-sale';
        if (goal === 'rent') status = 'for-rent';
      }

      let results = properties;
      // ... (rest of search logic)

      if (status) results = results.filter((p: any) => p.status === status);
      if (type) results = results.filter((p: any) => p.type === type);
      if (district) results = results.filter((p: any) => p.location.district.toLowerCase() === (district as string).toLowerCase());
      if (priceMin) results = results.filter((p: any) => p.price && p.price >= Number(priceMin));
      if (priceMax) results = results.filter((p: any) => p.price && p.price <= Number(priceMax));
      if (beds) results = results.filter((p: any) => p.bedrooms >= Number(beds));
      if (q) {
        const query = (q as string).toLowerCase();
        results = results.filter((p: any) => 
          p.title.toLowerCase().includes(query) || 
          p.location.neighborhood.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query)
        );
      }

      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/listing/:code", (req, res) => {
    try {
      const properties = getProperties();
      const listing = properties.find((p: any) => p.code === req.params.code);
      
      if (listing) {
        res.json(listing);
      } else {
        res.status(404).json({ error: "Listing not found" });
      }
    } catch (error) {
      console.error("Listing fetch error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/properties", (req, res) => {
    try {
      const properties = getProperties();
      const newProperty = req.body;
      
      if (!newProperty.code || !newProperty.title) {
        return res.status(400).json({ error: "Missing required fields: code, title" });
      }

      if (properties.some((p: any) => p.code === newProperty.code)) {
        return res.status(400).json({ error: "Property code already exists" });
      }

      properties.push(newProperty);
      saveProperties(properties);
      res.status(201).json(newProperty);
    } catch (error) {
      console.error("Add property error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/properties/:code", (req, res) => {
    try {
      const properties = getProperties();
      const code = req.params.code;
      const updatedData = req.body;
      
      const index = properties.findIndex((p: any) => p.code === code);
      if (index === -1) {
        return res.status(404).json({ error: "Property not found" });
      }

      properties[index] = { ...properties[index], ...updatedData };
      saveProperties(properties);
      res.status(200).json(properties[index]);
    } catch (error) {
      console.error("Update property error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/properties/:code", (req, res) => {
    try {
      const properties = getProperties();
      const code = req.params.code;
      const filteredProperties = properties.filter((p: any) => p.code !== code);
      
      if (filteredProperties.length === properties.length) {
        return res.status(404).json({ error: "Property not found" });
      }

      saveProperties(filteredProperties);
      res.status(200).json({ success: true, message: "Property removed" });
    } catch (error) {
      console.error("Delete property error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const getLeads = () => {
    const leadsPath = path.resolve(process.cwd(), "local-cms/leads.json");
    if (!fs.existsSync(path.dirname(leadsPath))) {
      fs.mkdirSync(path.dirname(leadsPath), { recursive: true });
    }
    if (!fs.existsSync(leadsPath)) {
      fs.writeFileSync(leadsPath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(leadsPath, "utf-8"));
  };

  const getFeedback = () => {
    const feedbackPath = path.resolve(process.cwd(), "local-cms/feedback.json");
    if (!fs.existsSync(path.dirname(feedbackPath))) {
      fs.mkdirSync(path.dirname(feedbackPath), { recursive: true });
    }
    if (!fs.existsSync(feedbackPath)) {
      fs.writeFileSync(feedbackPath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(feedbackPath, "utf-8"));
  };

  app.get("/api/leads", (req, res) => {
    try {
      const leads = getLeads();
      res.json(leads);
    } catch (error) {
      console.error("Fetch leads error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/leads/:id", (req, res) => {
    try {
      const leads = getLeads();
      const id = req.params.id;
      const filteredLeads = leads.filter((l: any) => l.id !== id);
      
      if (filteredLeads.length === leads.length) {
        return res.status(404).json({ error: "Lead not found" });
      }

      fs.writeFileSync(path.resolve(process.cwd(), "local-cms/leads.json"), JSON.stringify(filteredLeads, null, 2));
      res.status(200).json({ success: true, message: "Lead removed" });
    } catch (error) {
      console.error("Delete lead error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/leads", (req, res) => {
    const { name, email, phone, propertyCode, goal, budget } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const leads = getLeads();
      const newLead = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        name,
        email,
        phone,
        propertyCode,
        goal,
        budget
      };
      leads.push(newLead);
      fs.writeFileSync(path.resolve(process.cwd(), "local-cms/leads.json"), JSON.stringify(leads, null, 2));
      
      console.log("New Lead captured:", newLead);
      res.status(200).json({ success: true, message: "Lead captured successfully", lead: newLead });
    } catch (error) {
      console.error("Lead storage error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/feedback", (req, res) => {
    try {
      const feedback = getFeedback();
      res.json(feedback);
    } catch (error) {
      console.error("Fetch feedback error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/feedback", (req, res) => {
    const { name, email, rating, message } = req.body;
    
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const feedback = getFeedback();
      const newFeedback = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        name,
        email,
        rating,
        message
      };
      feedback.push(newFeedback);
      fs.writeFileSync(path.resolve(process.cwd(), "local-cms/feedback.json"), JSON.stringify(feedback, null, 2));
      
      res.status(200).json({ success: true, message: "Feedback received successfully", feedback: newFeedback });
    } catch (error) {
      console.error("Feedback storage error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/feedback/:id", (req, res) => {
    try {
      const feedback = getFeedback();
      const id = req.params.id;
      const filteredFeedback = feedback.filter((f: any) => f.id !== id);
      
      if (filteredFeedback.length === feedback.length) {
        return res.status(404).json({ error: "Feedback not found" });
      }

      fs.writeFileSync(path.resolve(process.cwd(), "local-cms/feedback.json"), JSON.stringify(filteredFeedback, null, 2));
      res.status(200).json({ success: true, message: "Feedback removed" });
    } catch (error) {
      console.error("Delete feedback error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
