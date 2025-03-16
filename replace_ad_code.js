
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
    } else if (stats.isFile() && (filepath.endsWith('.html') || filepath.endsWith('.js'))) {
      filelist.push(filepath);
    }
  });
  
  return filelist;
}

// Function to replace ad code in files
function replaceAdCode(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the content contains the text to be replaced
    if (content.includes('googletag.cmd.push(function() { googletag.display(\'div-gpt-ad-1722250890750-0\'); });')) {
      // Replace the entire script tag and surrounding whitespace with the new content
      const regex = /<script>\s*googletag\.cmd\.push\(function\(\) { googletag\.display\('div-gpt-ad-1722250890750-0'\); }\);\s*<\/script>[\s\n]*/g;
      const newText = '<p>Ads</p>\n';
      
      // Replace all occurrences
      const modifiedContent = content.replace(regex, newText);
      
      // Save the file with the replaced text
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`Updated ad code in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('Starting to replace Google ad code with "Ads" paragraph...');
const allFiles = walkSync('.');
console.log(`Found ${allFiles.length} files to process`);

// Process each file
let modifiedCount = 0;
allFiles.forEach(filePath => {
  try {
    const wasModified = replaceAdCode(filePath);
    if (wasModified) {
      modifiedCount++;
    }
  } catch (error) {
    console.error(`Failed to process ${filePath}: ${error.message}`);
  }
});

console.log(`Completed processing. Modified ${modifiedCount} files.`);
