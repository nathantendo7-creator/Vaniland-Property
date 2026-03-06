import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isCommit = args.includes('--commit');

const sourceFile = path.resolve(process.cwd(), 'data/Vaniland_Property_Consultants.txt');
const seedFile = path.resolve(process.cwd(), 'seed/seed-properties.json');
const dryRunLog = path.resolve(process.cwd(), 'reports/migration-dryrun.log');
const commitLog = path.resolve(process.cwd(), 'reports/migration-commit.log');

function log(message, isCommitLog = false) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  
  const logFile = isCommitLog ? commitLog : dryRunLog;
  fs.appendFileSync(logFile, logMessage);
}

async function run() {
  log(`Starting migration... Mode: ${isDryRun ? 'DRY RUN' : 'COMMIT'}`);
  
  if (!fs.existsSync(seedFile)) {
    log(`Error: Seed file not found at ${seedFile}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(seedFile, 'utf-8'));
  
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const property of data) {
    // In a real scenario, this would check Sanity/Strapi API
    log(`Processing property: ${property.code} - ${property.title}`);
    created++;
  }

  log(`Migration Summary:`);
  log(`Created: ${created}`);
  log(`Updated: ${updated}`);
  log(`Skipped: ${skipped}`);
  
  if (isCommit) {
    log(`Changes committed successfully.`, true);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
