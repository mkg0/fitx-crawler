const pdfCrawler = require('./pdfCrawler')
const pdfDownloader = require('./pdfDownloader')

async function fitXCrawler({ username, password, baseDomain }) {
  return pdfDownloader({ username, password, baseDomain }).then(pdfCrawler)
}

module.exports = fitXCrawler
