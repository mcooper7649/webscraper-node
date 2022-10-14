const PORT = 8000;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();

const url = 'https://boards.4chan.org/pol';

const thread = {
  title: '',
  description: '',
  img: '',
  userId: '',
  userName: '',
  flag: '',
};

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);

  const item = $('div.thread');

  thread.title = $(item).find('span.subject').first().text();
  thread.userId = $(item).find('span.hand').first().text();
  thread.img = $(item)
    .find('div.file a.fileThumb')
    .children('img')
    .eq(0)
    .attr('src');
  thread.description = $(item)
    .find('div.post blockquote.postMessage')
    .first()
    .text();
  thread.userName = $(item).find('span.nameBlock span.name').first().text();
  thread.flag = $(item).find('span.nameBlock span.flag').attr('class');
  console.log(thread);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
