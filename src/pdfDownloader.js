require('isomorphic-fetch')
const puppeteer = require('puppeteer')
const {maybeAcceptCookies, maybeLogin, downloadCheckins} = require('./pageActions')

const preparePageForTests = async (page) => {
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);
}

async function pdfDownloader({username,password}) {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: "../.cache/user_data",
  });
  const page = await browser.newPage();
  page.setViewport({width: 1598, height: 800})
  await preparePageForTests(page);
  await page.goto('https://membersarea.fitx.de/');
  await maybeAcceptCookies(page)
  await maybeLogin(page, {username,password})
  return downloadCheckins(page)
  .then(path => {
    browser.close()
    return path
  })
}

module.exports = pdfDownloader