//This code is for extracting website URLs from a website.
const { chromium } = require('playwright');
const fs = require('fs');

const websiteUrl = 'https://www.bajajfinserv.in'; // Replace with the website URL you want to extract URLs from
const outputFile = 'urls.txt'; // Name of the output text file

async function extractUrls() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(websiteUrl);
    const urls = await page.$$eval('a', (anchors) =>
      anchors.map((anchor) => anchor.href)
    );

    // Save the URLs into a text file
    fs.writeFileSync(outputFile, urls.join('\n'), 'utf-8');

    console.log(`URLs extracted and saved to "${outputFile}".`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

extractUrls();
