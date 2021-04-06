const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Pong.',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.ping`')
            .setDescription(this.description)
            
            if(args[0] == 'help') return message.channel.send(embed)

        message.channel.send(`Pong! Latency is ${Date.now() - message.createdTimestamp}.`)
    }
}
