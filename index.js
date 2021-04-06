const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs')
const defaultprefix = '.'

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmd/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./cmd/${file}`);

    bot.commands.set(command.name, command);
}

bot.once('ready', () => {
    console.log('Bot is logged in. Date and time:', Date());
    bot.user.setActivity(defaultprefix, {type: "LISTENING"});
})


bot.on('message', message => {
    if(message.channel.type == 'dm') return;
    let prefixes = JSON.parse(fs.readFileSync('./data/prefixes.json', "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: defaultprefix
        }
    }
    
    let prefix = prefixes[message.guild.id].prefixes;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type == 'dm') return;

    if (command === 'ping') {
        bot.commands.get('ping').execute(message, args);
    } else if (command === 'ban') {
        bot.commands.get('ban').execute(message, args);
    } else if (command === 'kick') {
        bot.commands.get('kick').execute(message, args);
    } else if (command === 'coin') {
        bot.commands.get('coin').execute(message, args)
    } else if (command === 'dice') {
        bot.commands.get('dice').execute(message, args)
    } else if (command === 'pfp') {
        bot.commands.get('pfp').execute(message, args)
    } else if (command === 'mute') {
        bot.commands.get('mute').execute(message, args)
    } else if (command === 'unmute') {
        bot.commands.get('unmute').execute(message, args)
    } else if (command === 'prefix') {
        bot.commands.get('prefix').execute(message, args)
    } else if (command === 'warn') {
        bot.commands.get('warn').execute(message, args)
    }  else if (command === 'tban') {
        bot.commands.get('tban').execute(message, args)
    }  else if (command === 'tmute') {
        bot.commands.get('tmute').execute(message, args)
    }  else if (command === 'math') {
        bot.commands.get('math').execute(message, args)
    }   
})



bot.login('ODI0NzE3NDUyODIyMTgzOTM2.YFzb-w.lwqVmI0eNYAlSDfWKHCBjCUv-6Q')