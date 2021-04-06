const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
    name: "warn",
    description: "Warns a specified member.",

    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.warn @member (reason)`')
            .setDescription(this.description)
            
            if(args[0] == 'help') return message.channel.send(embed)

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have the permissions to do that! (Kick Members)")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.reply('You need to tag someone to warn. Or paste their user ID.');

        if (!member) return message.reply('That is unfortunately not a member.');
        if (!member.bannable) return message.channel.send('Sorry, I can not warn this person! My highest role is too low in the hierarchy.');
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Sorry, I won\'t warn this member. Their highest role in the hierarchy is higher than or equal to your\'s.')

        let reason = args.slice(1).join(" ");

        if (!reason) reason = 'Unspecified';

        let warneduser = JSON.parse(fs.readFileSync('./data/warnlist.json', "utf8"));

        warneduser[member.id] = {
            warnedfor: reason
        };

        fs.writeFileSync('./data/warnlist.json', JSON.stringify(warneduser), (err) => {
            if (err) console.log(err)
            message.channel.send('Something went wrong!')
            return;
        })

        const banembed = new Discord.MessageEmbed()
            .setTitle('Member Warned')
            .addField('User Warned', member)
            .addField('Warned by', message.author)
            .addField('Reason', reason)
            .addField('\u200b', `Use the "warnlist" command to view a user's warnings.`)
            .setTimestamp()

        message.channel.send(banembed);


    }
}