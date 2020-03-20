const Telegraf = require('telegraf')
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.on('message', async(ctx) => {
    const message = ctx.message.message_id
    if(ctx.message.entities) {
    const entities = ctx.message.entities
    console.log(entities)
    let likentity = entities.filter(item => item.type == 'text_link')
    const multiplylinks = Array.isArray(likentity)
    if(multiplylinks){
        let i = 0
        let url = ' '
        //console.log(url)
        while (i < likentity.length) {
            //console.log(url)
            url = likentity[i].url + "\n"
            //console.log(url)
            i++
            console.log(url)
            await ctx.reply(url)
        }
        console.log(url)

        //await ctx.telegram.deleteMessage(message)

    }
    else if (likentity == undefined) {
        ctx.reply('Здесь нет ссылок!'/*, {reply_to_message_id: message}*/)
    }
    else {
        url = likentity.url
        await ctx.reply(url)
   //await ctx.telegram.deleteMessage(message)
    }
}
})
bot.launch();
