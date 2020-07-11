const fetch = require('node-fetch').default

const DOMAIN = 'https://membersarea.fitx.de/'

async function pdfDownloader({ username, password, baseDomain = DOMAIN }) {
  const result = await fetch(baseDomain + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((resp) => resp.json())

  const cookies = [
    'refresh_token=' + result.message.refresh_token,
    'customer_number=' + result.message.customerNumber,
  ].join('; ')

  return fetch(baseDomain + 'download/receipt/checkin/file.pdf', {
    method: 'GET',
    headers: {
      Cookie: cookies,
    },
  }).then((resp) => resp.arrayBuffer())
}

module.exports = pdfDownloader
