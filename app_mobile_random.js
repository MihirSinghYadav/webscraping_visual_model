//this code is for extracting screenshots with randomized mobile view for training data for negative class.

const { chromium } = require('playwright');
const fs = require('fs');

const outputFile = 'urls.txt'; // Name of the input text file containing URLs
const screenshotsFolder = 'screenshots_mobile_random'; // Folder to store the screenshots for mobile view

// Randomize CSS properties
function randomizeCSS() {
  // ... Same as before ...
  //const randomMargin = Math.floor(Math.random() * 50) + 0 ;
  const randomPadding = Math.floor(Math.random() * 50) + 3;
  const randomFontSize = Math.floor(Math.random() * 20) + 5;
  const randomFontStyle = Math.random() < 0.5 ? 'normal' : 'italic';
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

  return `
    
    padding: ${randomPadding}px;
    font-size: ${randomFontSize}px;
    font-style: ${randomFontStyle};
    color: ${randomColor};
  `;
  //margin: ${randomMargin}px;
}

// Read URLs from the text file
function readUrlsFromFile() {
  // ... Same as before ...
  const data = fs.readFileSync(outputFile, 'utf-8');
  return data.split('\n').filter((url) => url.trim() !== '');
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    // Emulate a mobile device
    viewport: { width: 375, height: 812 }, // Set the desired mobile viewport size
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1', // iPhone user agent string
  });
  const page = await context.newPage();

  try {
    // Create the screenshots folder if it doesn't exist
    if (!fs.existsSync(screenshotsFolder)) {
      fs.mkdirSync(screenshotsFolder);
    }

    const urls = readUrlsFromFile();

    for (const url of urls) {
      try {
        await page.goto(url);

        // Randomize CSS properties and apply to the body element
        const randomStyle = randomizeCSS();
        await page.addStyleTag({ content: `body { ${randomStyle} }` });

        // Take a screenshot
        const timestamp = new Date().getTime();
        const screenshotPath = `${screenshotsFolder}/screenshot_${timestamp}.png`;
        await page.screenshot({ path: screenshotPath });

        console.log(`Screenshot taken for ${url}`);
      } catch (error) {
        console.error(`Error capturing screenshot for ${url}: ${error.message}`);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await browser.close();
    console.log('Screenshot process completed.');
  }
})();
