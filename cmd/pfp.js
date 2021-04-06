const Discord = require("discord.js");

module.exports = {
    name: 'pfp',
    description: 'Sends the URL to a specified user\'s profile picture.',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.pfp @member (OPTIONAL)`')
            .setDescription(this.description)
            
            if(args[0] == 'help') return message.channel.send(embed)

        const user = message.mentions.users.first() || message.author;
        message.channel.send(user.displayAvatarURL())
        message.channel.send("theres " + user.username + "'s profile picture")
    }
}