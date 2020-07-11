const PDFParser = require('pdf2json')
const { isSameDay } = require('date-fns')

const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})( |\%20)(?<hours>\d{2})-(?<minutes>\d{2})-(?<seconds>\d{2})/

function fitXCrawler(file) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser()
    const entries = []
    pdfParser.on('pdfParser_dataError', (errData) => reject(new Error(errData.parserError)))
    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      const texts = [].concat(...pdfData.formImage.Pages.map((page) => page.Texts)).map((text) => text.R[0].T)
      texts.forEach((text = '', index) => {
        const results = Array.from(text.matchAll(reg))[0]
        if (!results) return
        const { year, month, day, hours, minutes, seconds } = results.groups
        const date = new Date(year, month - 1, day, hours, minutes, seconds)
        const nextText = texts[index + 1].replace('%20', ' ')
        const nextTextResult = Array.from(nextText.matchAll(reg))[0]
        const studioName = !nextTextResult ? nextText : null
        const item = entries.find((entry) => entry.studioName === studioName && isSameDay(entry.date, date))
        if (!item) {
          entries.push({ date, studioName, count: 1 })
        } else {
          item.count++
        }
      })
      resolve({ entries })
    })
    // pdfParser.loadPDF(file)
    pdfParser.parseBuffer(file)
  })
}

module.exports = fitXCrawler
