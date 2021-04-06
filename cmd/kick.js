const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kicks a member from the server.",

    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.kick @member (reason)`')
            .setDescription(this.description)
            
            if(args[0] == 'help') return message.channel.send(embed)

        var cmdchannel = message.guild.channels.cache.get('825232193164148747');

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You don\'t have the required permissions! (Kick Members)')
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I can\'t do that! I don\'t have the Kick Members Permission!')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('You must state a member to kick!');

        if (!member) return message.channel.send('You must state an actual member to kick!');
        if (!member.bannable) return message.channel.send('Sorry, I can\'t kick this person!');
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Sorry, I won\'t kick this member. Their highest role in the hierarchy is higher than or equal to your\'s.')
        
        let reason = args.slice(1).join(" ");

        if (!reason) reason = 'Unspecified';

        member.kick({
            reason: reason
        }).catch(err => {
            message.channel.send('something fucking broke try again')
            console.log(err)
        })

        const banembed = new Discord.MessageEmbed()
            .setTitle('Member Kicked')
            .addField('User Kicked', member)
            .addField('Kicked by', message.author)
            .addField('Reason', reason + message.author)
            .setTimestamp()

        message.channel.send(banembed);


    }
}