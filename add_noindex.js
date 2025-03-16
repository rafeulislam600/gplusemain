
const fs = require('fs');
const path = require('path');

// Function to walk through game directory
function processGameFiles() {
  const gameDir = './game';
  const files = fs.readdirSync(gameDir);
  let modifiedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(gameDir, file);
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if noindex tag already exists
        if (!content.includes('name="robots" content="noindex')) {
          // Find the head tag
          const headIndex = content.indexOf('<head>');
          if (headIndex !== -1) {
            // Insert noindex tag after head tag
            const insertPoint = headIndex + 6;
            const noindexTag = '\n<meta name="robots" content="noindex, follow">';
            
            content = content.slice(0, insertPoint) + noindexTag + content.slice(insertPoint);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Added noindex tag to ${file}`);
            modifiedCount++;
          }
        }
      } catch (error) {
        console.error(`Error processing ${file}: ${error.message}`);
      }
    }
  });
  
  console.log(`Added noindex tags to ${modifiedCount} game files`);
}

processGameFiles();
