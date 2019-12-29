const pdfCrawler = require('./pdfCrawler')
const pdfDownloader = require('./pdfDownloader')

function fitXCrawler({username,password}){
  return pdfDownloader({username, password})
    .then(path => pdfCrawler({file: path}))
}

module.exports = fitXCrawler