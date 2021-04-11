const request = require('request');
const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'apex',
    description: 'Shows stats for Apex Legends',
    async execute(message, args) {
        if(!args[0]) return message.reply('This might sound crazy, but you actually need to add arguments for me to get stats...')
        if(!args[1]) return message.reply('Unfortunately, I can\'t get the stats for every user on a platform.')
        var botmsg = await message.reply('Retrieving data. Please wait...')
        const options = {
            url: 'https://public-api.tracker.gg/v2/apex/standard/profile/' + args[0] + '/' + args[1],
            method: 'GET',
            headers: {
                "TRN-Api-Key": ""
            }
        };

        request(options, (err, res, body) => {
            if (err) {
                console.log(err);
                message.reply('An error occured!')
            }
            try {
                const parsedData = JSON.parse(body)
                const lifetimeStats = parsedData.data.segments[0].stats
                if (parsedData.hasOwnProperty('errors')) return message.reply('An error occured. You most likely provided an invalid platform or user. Valid platforms are: `origin, psn, xbl`')
                const statembed = new MessageEmbed()
                    .setTitle(parsedData.data.platformInfo.platformUserHandle + "'s Apex Legends Stats")
                    .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
                    .setColor('#FF0000')
                    .setThumbnail(parsedData.data.platformInfo.avatarUrl)
                    .setURL('https://apex.tracker.gg/apex/profile/' + args[0] + '/' + args[1] +'/overview')
                    .setFooter('Powered by Tracker Network. https://tracker.gg')
                    .addField('Level', lifetimeStats.level.displayValue)
                    .addField('Lifetime Kills', lifetimeStats.kills.displayValue)
                console.log('The "apex" command was ran.')
                console.log('----------------------------------')
                botmsg.edit(statembed)
                botmsg.edit('')
            } catch (err) {
                console.log(err)
                console.log('-----------------------------------------------------------------------------------------------------')
                botmsg.edit('<@' + message.author.id + '>, Something went wrong! You most likely provided an invalid platform/user. Valid platforms are: `origin, psn, xbl`')
            }
        });
    }
}