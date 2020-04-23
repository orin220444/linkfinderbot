const Telegraf = require('telegraf');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on('message', async (ctx) => {
  console.log(ctx.message)
  const message = ctx.message.message_id
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
        await ctx.reply(url, {reply_to_message_id: message});
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
        await ctx.reply(url, {reply_to_message_id: message});
        i++;
      }
    } else {
      ctx.reply('Здесь нет ссылок!'/* , {reply_to_message_id: message}*/);
    }
  }
});


bot.launch();
// TODO: caption entities
// TODO: delete user messages
