const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'tban',
    description: 'Bans a member from the server for a specified amount of time.',
   async execute(message, args) {
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
    .setColor('#7289DA')
    .setTitle(this.name)
    .addField('Usage', '`.tban @member ?d (reason)`')
    .setDescription(this.description)
    
    if(args[0] == 'help') return message.channel.send(embed)

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You don't have the permissions to do that! (Ban Members)")
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I can't do that! I don't have the Ban Members permission.")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(2).join(" ");
        let time = args[1];
        
        if(!args[0]) return message.reply('You must state a user to ban. Example: `tban @' + message.author.username + '#' + message.author.discriminator + '`' + ' (User ID or Mention)')
        if(!member) return message.reply('You must state an actual member in this server to ban. Example: `tban @' + message.author.username + '#' + message.author.discriminator + '`' + ' (User ID or Mention)')
        if(!member.bannable) return message.reply('Sorry, I can\'t ban this member. My highest role is too low in the hierarchy. Or they\'re the owner of the server.')
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Sorry, I won\'t ban this member. Their highest role in the hierarchy is higher than or equal to your\'s.')
        if(!reason) reason = 'None was given.'
        if(!time) return message.reply('You must specify a time to ban this user. Example: `tban ' + message.author.username + '#' + message.author.discriminator + ' 5d reason`' + ' (User ID or Mention)')
        
        const banembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
        .setTitle('Member Tempbanned')
        .addField('Who Was Banned', member)
        .addField('Banned by', message.author)
        .addField('Reason', reason)
        .addField('Duration', time)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        
        await member.send(banembed).catch(err => console.log(err));
        await message.channel.send(banembed)
        await member.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err));

        setTimeout(async function () {
            await message.guild.fetchBans().then(async bans => {
                if(bans.size == 0) return message.reply('This server does not have any banned members.')
                let bannedUser = bans.find(b => b.user.id == member.id)
                if(!bannedUser) return message.reply('The member tempbanned has already been unbanned.').catch(err => console.log(err))
                await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err))
                await message.reply('Tempbanned user ' + member.id + ' was unbanned.')
            })
        }, ms(time))
    }       
}