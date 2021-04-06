const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'tmute',
    description: 'Mutes a member for a specified duration.',
   async execute(message, args) {
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
        .setColor('#7289DA')
        .setTitle(this.name)
        .addField('Usage', '`.tmute @member ?m reason`')
        .setDescription(this.description)

        if(args[0] == 'help') return message.channel.send(embed)

    var role = message.guild.roles.cache.find(role => role.name === "Muted");
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have the permissions to do that! (Manage Roles)")
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I can't do that! I don't have the Manage Roles permission.")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(2).join(" ");
        let time = args[1];
        
        if(!args[0]) return message.reply('You must state a user to mute. Example: `tmute @' + message.author.username + '#' + message.author.discriminator + '`' + ' (Mentions Only)')
        if(!member) return message.reply('You must state an actual member in this server to mute. Example: `tmute @' + message.author.username + '#' + message.author.discriminator + '`' + ' (Mentions Only)')
        if(!member.bannable) return message.reply('Sorry, I can\'t mute this member. My highest role is too low in the hierarchy. Or they\'re the owner of the server.')
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Sorry, I won\'t mute this member. Their highest role in the hierarchy is higher than or equal to your\'s.')
        if(!reason) reason = 'None was given.'
        if(!time) return message.reply('You must specify a time to mute this user. Example: `tmute ' + message.author.username + '#' + message.author.discriminator + ' 5d reason`' + ' (Mentions Only)')
        
        const banembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
        .setTitle('Member Tempmuted')
        .addField('Who Was Muted', member)
        .addField('Muted by', message.author)
        .addField('Reason', reason)
        .addField('Duration', time)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()

        if(ms(time) == undefined) return message.reply('You must enter a valid time format! Examples: \`1s (1 second), 2m (2 minutes), 3h (3 hours).\` If no unit is given, it defaults to milliseconds.')

        await message.channel.send(banembed)
        await member.roles.add(role).catch(err => console.log(err));

        setTimeout(async function () {
            await message.guild.members.fetch(member).then(async muteduser => {
                if(!muteduser) return message.reply('The member tempmuted has been removed.').catch(err => console.log(err))
                await muteduser.roles.remove(role)
                await message.reply('Tempmuted user <@' + member.id + '> was unmuted')            })
        }, ms(time))

        }
    }
