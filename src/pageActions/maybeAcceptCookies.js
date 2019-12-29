const ACCEPT_ALL = '.cookie_overlay__button--all'

async function maybeAcceptCookies(page){
  await page.waitForSelector(ACCEPT_ALL, { timeout: 100, delay: Math.floor(120 + Math.random() * 200) })
  .then(()=> page.click(ACCEPT_ALL))
  .catch(()=>{})
}

module.exports = maybeAcceptCookies