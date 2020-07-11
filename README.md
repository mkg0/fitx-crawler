## FitX Check-in Crawler

### Install

```sh
npm install fitx-crawler
```

### Usage

```js
const data = await fitXCrawler({
  username: '{USER_NAME}',
  password: '{PASSWORD}',
})

/* Sample result
  {
    entries: [
      {
        date: 2019-03-10T14:31:54.000Z,
        studioName: 'FitX berlin-east-side-mall',
        count: 1
      }
    ]
  }
*/
```