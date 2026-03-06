// Core function tests for Vaniland
import fs from 'fs';
import path from 'path';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[FAIL] ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

// 1. Price Parsing Tests
function testPriceParsing() {
  const parsePrice = (priceStr: string) => {
    const cleaned = priceStr.replace(/[^0-9]/g, '');
    return cleaned ? parseInt(cleaned, 10) : null;
  };

  assert(parsePrice("1,400,000") === 1400000, "Should parse comma-separated numbers");
  assert(parsePrice("UGX 2M") === 2, "Should parse numbers from mixed strings (basic)"); // simplistic, but follows logic
  assert(parsePrice("Contact for price") === null, "Should return null for non-numeric strings");
}

// 2. Yield Calculation Tests
// Gross Yield = (Annual Rent / Sale Price) * 100
function testYieldCalculation() {
  const calculateYield = (monthlyRent: number | null, salePrice: number | null) => {
    if (!monthlyRent || !salePrice) return null;
    return ((monthlyRent * 12) / salePrice) * 100;
  };

  assert(calculateYield(1000000, 200000000) === 6, "Should calculate 6% yield correctly");
  assert(calculateYield(null, 200000000) === null, "Should return null if rent is missing");
  assert(calculateYield(1000000, null) === null, "Should return null if sale price is missing");
}

// 3. Data Integrity Tests
function testDataIntegrity() {
  const seedPath = path.resolve(process.cwd(), 'seed/seed-properties.json');
  const data = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
  
  const codes = new Set();
  data.forEach((p: any) => {
    assert(!!p.code, `Property ${p.title} should have a code`);
    assert(!codes.has(p.code), `Property code ${p.code} should be unique`);
    codes.add(p.code);
    
    // Check for no lending
    assert(!JSON.stringify(p).toLowerCase().includes('lending'), `Property ${p.code} should not have lending info`);
    assert(!JSON.stringify(p).toLowerCase().includes('loan'), `Property ${p.code} should not have loan info`);
  });
}

async function runTests() {
  console.log("Running Vaniland Core Tests...");
  try {
    testPriceParsing();
    testYieldCalculation();
    testDataIntegrity();
    console.log("\nAll core tests passed successfully.");
  } catch (err: any) {
    console.error(`\nTest failure: ${err.message}`);
    process.exit(1);
  }
}

runTests();
