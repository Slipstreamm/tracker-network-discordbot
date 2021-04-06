module.exports = {
    name: 'leave',
    description: 'Leaves the voice channel, if it\'s in one.',
    async execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.leave`')
            .setDescription(this.description)
            
            if(args[0] == 'help') return message.channel.send(embed)

        const voiceChannel = message.guild.me.voice.channel;
        const voiceChannel2 = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('im not in a voice channel 😐');
        if (!voiceChannel2) return message.channel.send('youre not in a voice channel');

        await voiceChannel.leave();
        await message.channel.send('ok i left')

    }
}