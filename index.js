const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs')
const defaultprefix = 'stats '

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`);
    console.log('---------------------------------------------------------------')
    bot.user.setActivity(defaultprefix + 'help', {
        type: "LISTENING"
    });
})


bot.on('message', message => {
    if (message.channel.type == "dm") return;

    const args = message.content.slice(defaultprefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(defaultprefix) || message.author.bot) return;

    if (command === 'apex') {
        bot.commands.get('apex').execute(message, args);
    }
})



bot.login('')