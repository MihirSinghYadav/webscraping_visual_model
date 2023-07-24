# Web-scraping with Playwright: Capture Screenshots of Websites
This project is a part of https://github.com/ghelanikirtan/HackRx-4.0-Code_Blasters , which is an ai trained model that can 
test UI design and rate it on the scale of 10. 
We used Bajaj Finserv's websites screenshots as a dataset by web scrapping using playwright. 
Using this, we collected 1500+ Screenshots from 750+ websites associated with Bajaj Finserv. 
The Screenshots are both of positive class and negative class.

Requirements:
1. Node
2. Playwright 

Instructions:
1. Setup the files after cloning and open terminal for running the files using commands.
1. Run command "npm install" in terminal to install all the modules.
2. Run command "npm install playwright" in terminal to install playwright.
3. Open urlExtractor.js and change the website for screenshot extraction.
4. Run command "node urlExtractor.js" in terminal to extract all the website urls present in a particular website.
5. File urls.txt well get updated with the urls.
6. Run command "node <file>.js" where <file> is the name of the file which can be "app_desktop" or "app_mobile" for extrating screenshots in specific folder.
7. All the screenshots will be saved in the screenshot folders which are mentioned in their respective code.
