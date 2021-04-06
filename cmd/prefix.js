const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'prefix',
    description: 'Changes the prefix used in your server.',
    execute(message, args) {
        const helpembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
        .setColor('#7289DA')
        .setTitle(this.name)
        .addField('Usage', '`.prefix (desired prefix)`')
        .setDescription(this.description)

        if(args[0] == 'help') return message.channel.send(helpembed)
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have the required permissions! (Manage Server)");
        if(!args[0]) return message.reply('I need something to actually set it to.')
        let prefixes = JSON.parse(fs.readFileSync('./data/prefixes.json', "utf8"));

        if(!args[0] == '!' || '?' || '$' || '&' || '.' || '-' ) return message.reply('You may only set the prefix to \`!, ?, $, &, ., or -\`.')

        prefixes[message.guild.id] = {
            prefixes: args[0]
        };

        fs.writeFileSync("./data/prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err)
        });

        let embed = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle('Prefix Set')
        .addField('Server', message.guild.name)
        .addField('Set to', args[0])
        .setAuthor('Set by ' + message.author.username + '#' + message.author.discriminator)
        
        message.channel.send(embed)
    }
}