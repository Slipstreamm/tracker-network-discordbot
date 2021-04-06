const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
    name: "ban",
    description: "Permanently bans a member from the server.",

    execute(message, args) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.ban @member (reason)`')
            .setDescription(this.description)
    
            if(args[0] == 'help') return message.channel.send(embed)

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have the permissions to do that! (Ban Members)")
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I can't do that! I don't have the Ban Members permission.")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('who are you banning 😐');

        if (!member) return message.channel.send('thats not an actual member lol');
        if (!member.bannable) return message.channel.send('i cant ban this person');

        if (member.id === message.author.id) return message.channel.send('just leave the server');

        let reason = args.slice(1).join(" ");

        if (!reason) reason = 'Unspecified';

        member.ban({
            reason: reason
        }).catch(err => {
            message.channel.send('something broke try again')
            console.log(err)
        })

        const banembed = new Discord.MessageEmbed()
            .setTitle('Member Banned')
            .addField('User Banned', member)
            .addField('Banned by', message.author)
            .addField('Reason', reason)
            .setTimestamp()

        message.channel.send(banembed);


    }
}