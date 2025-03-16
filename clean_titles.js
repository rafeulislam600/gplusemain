
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

// Function to clean titles in HTML files
function cleanTitles(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Look for title tags and clean them
    const titleRegex = /<title>(.*?)<\/title>/g;
    let match;
    let modified = false;
    
    // Find all title tags and process them
    while ((match = titleRegex.exec(content)) !== null) {
      const fullTitle = match[1];
      // Check if title contains a dash with text after it
      if (fullTitle.includes(' - ')) {
        const cleanTitle = fullTitle.split(' - ')[0];
        const newTitleTag = `<title>${cleanTitle}</title>`;
        content = content.replace(match[0], newTitleTag);
        modified = true;
      }
    }
    
    // Save the file if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated title in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

// Main execution
console.log('Starting title cleanup process...');
const htmlFiles = walkSync('.');
console.log(`Found ${htmlFiles.length} HTML files to process`);

// Process each HTML file
let modifiedCount = 0;
htmlFiles.forEach(filePath => {
  try {
    cleanTitles(filePath);
    modifiedCount++;
  } catch (error) {
    console.error(`Failed to process ${filePath}: ${error.message}`);
  }
});

console.log(`Completed processing. Modified ${modifiedCount} files.`);
