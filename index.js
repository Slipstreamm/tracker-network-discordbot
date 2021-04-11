const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs')
const defaultprefix = 't!'

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.once('ready', () => {
    console.log('Bot is logged in. Date and time:', Date());
    bot.user.setActivity(defaultprefix, {
        type: "LISTENING"
    });
})


bot.on('message', message => {
    if (message.channel.type == "dm") return;

    const args = message.content.slice(defaultprefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(defaultprefix) || message.author.bot) return;

    if (command === 'apexstat') {
        bot.commands.get('apexstat').execute(message, args);
    }
})



bot.login('ODI0NzE3NDUyODIyMTgzOTM2.YFzb-w.lwqVmI0eNYAlSDfWKHCBjCUv-6Q')