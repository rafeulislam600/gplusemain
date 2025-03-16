const fs = require('fs');
const path = require('path');

// Read the update_game_info.ps1 file to extract game descriptions
const psScript = fs.readFileSync('update_game_info.ps1', 'utf8');

// Parse the PowerShell script to extract game info
function extractGameInfo() {
  const gameInfo = {};
  
  // Regular expression to match game entries in the PowerShell script
  const gameRegex = /"(.+?)"\s*=\s*@{\s*"title"\s*=\s*"(.+?)"\s*"description"\s*=\s*"(.+?)"\s*}/gs;
  
  let match;
  while ((match = gameRegex.exec(psScript)) !== null) {
    const gameSlug = match[1];
    const gameTitle = match[2];
    const gameDescription = match[3];
    
    gameInfo[gameSlug] = {
      title: gameTitle,
      description: gameDescription
    };
  }
  
  return gameInfo;
}

// Function to add descriptions to game HTML files
function addDescriptionsToGames(gameInfo) {
  const gameDir = './game';
  const files = fs.readdirSync(gameDir);
  
  let modifiedCount = 0;
  
  for (const file of files) {
    if (file.endsWith('.html')) {
      const gameSlug = file.replace('.html', '');
      const filePath = path.join(gameDir, file);
      
      if (gameInfo[gameSlug]) {
        try {
          let content = fs.readFileSync(filePath, 'utf8');
          
          // Check if the file has a div with class "article-header"
          if (content.includes('<div class="article-header">')) {
            // Look for a place after the article header to insert the description
            const insertIndex = content.indexOf('</div>', content.indexOf('<div class="article-header">')) + 6;
            
            if (insertIndex !== -1) {
              const description = `<div class="game-description"><p>${gameInfo[gameSlug].description}</p></div>`;
              
              // Check if description is already added
              if (!content.includes('<div class="game-description">')) {
                const newContent = content.slice(0, insertIndex) + description + content.slice(insertIndex);
                fs.writeFileSync(filePath, newContent, 'utf8');
                modifiedCount++;
                console.log(`Added description to ${file}`);
              } else {
                console.log(`Description already exists in ${file}`);
              }
            }
          } else {
            console.log(`No article header found in ${file}`);
          }
        } catch (error) {
          console.error(`Error processing ${file}: ${error.message}`);
        }
      } else {
        console.log(`No game info found for ${gameSlug}`);
      }
    }
  }
  
  return modifiedCount;
}

// Main execution
console.log('Starting to add game descriptions...');
const gameInfo = extractGameInfo();
console.log(`Extracted information for ${Object.keys(gameInfo).length} games`);

const modifiedCount = addDescriptionsToGames(gameInfo);
console.log(`Added descriptions to ${modifiedCount} game files`);