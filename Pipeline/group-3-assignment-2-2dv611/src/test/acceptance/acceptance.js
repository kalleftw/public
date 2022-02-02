const puppeteer = require('puppeteer');
require('../helpers.js');

describe('Acceptance tests', function () {
  const homeURL = 'http://' + process.env.npm_config_homeurl;
  let browser;
  let page;

  before(async function () {
    this.timeout(10000);
    browser = browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
      dumpio: false,
    });
    page = await browser.newPage();
    await page.goto(homeURL);
  });

  after(async function () {
    await page.close();
    await browser.close();
  });

  describe('/ (Home Page)', function () {
    it('should have the correct page title', async function () {
      expect(await page.title()).to.eql('Pocket Calculator');
    });

    it('should display number when clicked', async function () {
      await page.click('#one');
      // Scrape result from the calculator display.
      let displayedResult = await page.evaluate(
        () => document.querySelector('.resultchar').innerHTML
      );
      expect(displayedResult).to.eql('1');
    });

    it('should display decimal number', async function () {
      await page.click('#two');
      await page.click('#decimal');
      await page.click('#seven');

      // Scrape result from the calculator display.
      let displayedResult = await page.evaluate(
        () =>
          document.querySelector('.digit2').innerHTML +
          document.querySelector('.decimal').innerHTML +
          document.querySelector('.digit7').innerHTML
      );
      expect(displayedResult).to.eql('2.7');
    });

    it('should clear the display when C is clicked', async function () {
      await page.click('#clear');

      let displayedResult = await page.evaluate(
        () => document.querySelector('.resultchar').innerHTML
      );
      expect(displayedResult).to.eql('0');
    });

    it('should display result of adding two numbers', async function () {
      await page.click('#two');
      await page.click('#add');
      await page.click('#three');
      await page.click('#equal');

      // Allow some time for the display to update (0 fails)
      await page.waitForTimeout(500);

      let displayedResult = await page.evaluate(
        () => document.querySelector('.resultchar').innerHTML
      );
      expect(displayedResult).to.eql('5');
    });

    it('should display result of subtracting two numbers', async function () {
      await page.click('#eight');
      await page.click('#subtract');
      await page.click('#four');
      await page.click('#equal');

      // Allow some time for the display to update (0 fails)
      await page.waitForTimeout(500);

      let displayedResult = await page.evaluate(
        () => document.querySelector('.resultchar').innerHTML
      );
      expect(displayedResult).to.eql('4');
    });

    it('should display result of dividing two numbers', async function () {
      await page.click('#six');
      await page.click('#divide');
      await page.click('#three');
      await page.click('#equal');

      await page.waitForTimeout(500);

      let displayedResult = await page.evaluate(
        () => document.querySelector('.resultchar').innerHTML
      );
      expect(displayedResult).to.eql('2');
    });

    it('should display result of multiplying two numbers', async function () {
      await page.click('#two');
      await page.click('#multiply');
      await page.click('#four');
      await page.click('#equal');

      // Allow some time for the display to update (0 fails)
      await page.waitForTimeout(500);

      let displayedResult = await page.evaluate(
        () => document.querySelector('.resultchar').innerHTML
      );
      expect(displayedResult).to.eql('8');
    });

    it('calculator history should display last calculation', async function () {
      let displayedResult = await page.evaluate(
        () => document.querySelector('.history-container').lastChild.innerHTML
      );
      expect(displayedResult).to.eql('2 * 4 = 8');
    });

    it('calculator history should display last calculation (after reloading page)', async function () {
      await page.reload();
      await page.waitForTimeout(2000); // ensure that page reload completes
      let displayedResult = await page.evaluate(
        () => document.querySelector('.history-container').lastChild.innerHTML
      );
      expect(displayedResult).to.eql('2 * 4 = 8');
    });
  });
});
