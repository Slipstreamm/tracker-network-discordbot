const Discord = require('discord.js');

module.exports = {
    name: "unmute",
    description: "Unmutes a member.",

    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.unmute @member (reason)`')
            .setDescription(this.description)
            
            if(args[0] == 'help') return message.channel.send(embed)

        var cypher = message.guild.members.cache.get('452666956353503252')
        var cmdchannel = message.guild.channels.cache.get('825232193164148747');
        var role = message.guild.roles.cache.find(role => role.name === "Muted");

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have the permissions to use that! (Manage Roles)")
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have the Manage Roles permission.")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Who are you unmuting?');

        if(!member) return message.channel.send('Unfortunately, that is not a member.');
        if(!member.bannable) return message.channel.send("Sorry, I can't unmute this person.");
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Sorry, I won\'t unmute this member. Their highest role in the hierarchy is higher than or equal to your\'s.')

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        member.roles.remove(role).catch(err => { 
          message.channel.send('An error occured!!')
            console.log(err)
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Member Unmuted')
        .addField('User Unmuted', member)
        .addField('Unmuted by', message.author)
        .addField('Reason', reason)
        .setTimestamp()

        message.channel.send(banembed);


    }
}