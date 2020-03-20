const Telegraf = require('telegraf')
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.on('message',(ctx) => {
    if(ctx.message.entities) {
    const entities = ctx.message.entities
    console.log(entities)
    let likentity = entities.find(item => item.type == 'text_link')
    console.log(likentity)
    if (likentity == undefined) {
        ctx.reply('Здесь нет ссылок!', {reply_to_message_id: ctx.message.message_id})
    }
    else {url = likentity.url
    ctx.reply(url)
   ctx.telegram.deleteMessage(ctx.message.message_id)
    }}
})
bot.launch();
