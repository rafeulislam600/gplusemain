
const fs = require('fs');
const path = require('path');

// Function to walk through directories recursively
function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    
    if (stats.isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else if (stats.isFile() && filepath.endsWith('.html')) {
      filelist.push(filepath);
    }
  });
  
  return filelist;
}

// Function to replace text in files
function replaceGameTitle(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text, keeping spaces intact
    const regex = /Unblocked G\+\s*/g;
    if (content.match(regex)) {
      const modifiedContent = content.replace(regex, 'Unblocked G+ Pro\n');
      
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`Updated text in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('Starting to replace "Unblocked G+" with "Unblocked G+ Pro"...');
const allFiles = walkSync('.');
console.log(`Found ${allFiles.length} HTML files to process`);

// Process each file
let modifiedCount = 0;
allFiles.forEach(filePath => {
  try {
    const wasModified = replaceGameTitle(filePath);
    if (wasModified) {
      modifiedCount++;
    }
  } catch (error) {
    console.error(`Failed to process ${filePath}: ${error.message}`);
  }
});

console.log(`Completed processing. Modified ${modifiedCount} files.`);
