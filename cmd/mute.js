const Discord = require('discord.js');

module.exports = {
    name: "mute",
    description: "Mutes a member in the server.",

    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
            .setColor('#7289DA')
            .setTitle(this.name)
            .addField('Usage', '`.mute @member (reason)`')
            .setDescription(this.description)
            
            if(args[0] == 'help') return message.channel.send(embed)

        const norolembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
        .setTitle('Mute Failed')
        .addField('Problem:', `<:boterror:827709074501664829> There isn't a role named "Muted" in this server. To run this command, you need to add a Muted role.`)


        var cypher = message.guild.members.cache.get('452666956353503252')
        var cmdchannel = message.guild.channels.cache.get('825232193164148747');
        var role = message.guild.roles.cache.find(role => role.name === "Muted");
        if (!role) return message.channel.send(norolembed)
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have the permissions to use that! (Manage Roles)")
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have the Manage Roles permission.")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('Who are you muting?');

        if (!member) return message.channel.send('Unfortunately, that is not a member.');
        if (!member.bannable) return message.channel.send("Sorry, I can't mute this person.");
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Sorry, I won\'t mute this member. Their highest role in the hierarchy is higher than or equal to your\'s.')

        let reason = args.slice(1).join(" ");

        if (!reason) reason = 'Unspecified';

        member.roles.add(role).catch(err => {
            message.channel.send('Something went wrong!')
            console.log(err)
        })

        const banembed = new Discord.MessageEmbed()
            .setTitle('Member Muted')
            .addField('User Muted', member)
            .addField('Muted by', message.author)
            .addField('Reason', reason)
            .setTimestamp()

        message.channel.send(banembed);

    }
}