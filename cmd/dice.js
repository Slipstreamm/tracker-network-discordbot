const Discord = require("discord.js");

module.exports = {
    name: 'dice',
    description: 'Roll a 6 sided die.',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.dice`')
            .setDescription(this.description)

            if(args[0] == 'help') return message.channel.send(embed)

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));

        }
        var randomNumber = getRandomInt(7)
        if (randomNumber == '0') {
            message.channel.send('You got a 1!')
        } else if (randomNumber == '1') {
            message.channel.send('You got a 2!')
        } else if (randomNumber == '2') {
            message.channel.send('You got a 3!')
        } else if (randomNumber == '3') {
            message.channel.send('You got a 4!')
        } else if (randomNumber == '4') {
            message.channel.send('You got a 5!')
        } else if (randomNumber == '5') {
            message.channel.send('You got a 6!')
        }
    }
}
