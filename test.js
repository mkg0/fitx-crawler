require('dotenv').config()
const fitXCrawler = require('./src/index')

async function main(){
  console.log(await fitXCrawler({username: process.env.FITX_EMAIL,password: process.env.FITX_PASS}))
}

main()