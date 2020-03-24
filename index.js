const Telegraf = require('telegraf');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on('message', async (ctx) => {
  if (ctx.message.entities) {
    const entities = ctx.message.entities;
    const likentity = entities.filter((item) => item.type == 'text_link');
    const urlentity = entities.filter((item) => item.type == 'url');
    if (likentity) {
      let i = 0;
      let url = ' ';
      while (i < likentity.length) {
        url = likentity[i].url;
        i++;
        await ctx.reply(url);
      }
    }
    // await ctx.telegram.deleteMessage(message)
    if (urlentity) {
      let i = 0;
      let url = ' ';
      const text = ctx.message.text;
      while (i < urlentity.length) {
        start = urlentity[i].offset;
        end = urlentity[i].offset + urlentity[i].length;
        url = text.substring(start, end);
        await ctx.reply(url);
        i++;
      }
      axios.post('https://getpocket.com/v3/add', {
        url: url,
        consumer_key: process.env.CONSUMER_KEY,
        
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      ctx.reply('Здесь нет ссылок!'/* , {reply_to_message_id: message}*/);
    }
  }
});


bot.launch();
// TODO: caption entities
// TODO: delete user messages
