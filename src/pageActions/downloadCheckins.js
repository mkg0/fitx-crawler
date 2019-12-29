const fs = require('fs')

const PATH = './.cache/pdfs'

async function waitForFile(page){
  const files = fs.readdirSync(PATH)
  if(!files.length) {
    await page.waitFor(500)
    return waitForFile(page)
  }
  return files[0]
}

async function downloadCheckins(page){
  await page.goto('https://membersarea.fitx.de/receipts')
  fs.readdirSync(PATH).forEach(file => fs.unlinkSync(PATH + "/" + file))
  await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: PATH });
  await page.waitFor('.item .button a', {timeout: 10000})
  await page.click('.item .button a')
  const file = await waitForFile(page)
  const newPath = PATH + "/" + 'data.pdf'
  try{
    fs.renameSync(PATH + "/" + file, newPath)
    return newPath
  }catch(err) {
    throw new Error(err)
  }
}

module.exports = downloadCheckins