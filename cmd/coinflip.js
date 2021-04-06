const Discord = require('discord.js')

module.exports = {
    name: 'coin',
    description: 'Literally flips a coin.',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
        .setColor('#7289DA')
        .setTitle(this.name)
        .addField('Usage', '`.coin`')
        .setDescription(this.description)

        if(args[0] == 'help') return message.channel.send(embed)
        function getRandomInt(max) {
            var number = Math.floor(Math.random() * Math.floor(max));
            if(number == 0) return 'You got heads!'
            if(number == 1) return 'You got tails!'
        }
        
        message.channel.send('Flipping a coin...' + getRandomInt(2));
    }
}