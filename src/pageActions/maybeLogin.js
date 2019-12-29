async function maybeLogin(page, {username, password}){
  return page.waitFor('input[value="Einloggen"]', {timeout: 500}).then( async ()=>{
    await page.type('input[name=username]', username)
    await page.type('input[name=password]', password)
    await page.click('input[value="Einloggen"]')
    await page.waitForNavigation();
  }).catch(()=>{});
}

module.exports = maybeLogin