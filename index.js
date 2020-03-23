const Telegraf = require('telegraf');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on('message', async (ctx) => {
  console.log(ctx.message);
  if (ctx.message.entities) {
    const entities = ctx.message.entities;
    const likentity = entities.filter((item) => item.type == 'text_link');
    if (likentity) {
      const multiplylinks = Array.isArray(likentity);
      if (multiplylinks) {
        let i = 0;
        let url = ' ';
        while (i < likentity.length) {
          url = likentity[i].url;
          i++;
          await ctx.reply(url);
        }
        // await ctx.telegram.deleteMessage(message)
      } else if (likentity == undefined) {
        ctx.reply('Здесь нет ссылок!'/* , {reply_to_message_id: message}*/);
      } else {
        url = likentity.url;
        await ctx.reply(url);
        // await ctx.telegram.deleteMessage(message)
      }
    }
  }
});
bot.launch();
// TODO: caption entities
// TODO: just links
