const request = require('request');
const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'apexstat',
    description: 'Shows stats for Apex Legends',
    execute(message, args) {
        const options = {
            url: 'https://public-api.tracker.gg/v2/apex/standard/profile/psn/' + args,
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
            const parsedData = JSON.parse(body)
            const stats = parsedData.data.segments.stats
            if (parsedData.hasOwnProperty('errors')) return message.reply('An error occured. You most likely provided an invalid platform or user. Valid platforms are: `origin, psn, xbl`')
            const statembed = new MessageEmbed()
                .setTitle(parsedData.data.platformInfo.platformUserHandle + "'s Apex Legends Stats")
                .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL())
                .setColor('#FF0000')
                .setThumbnail(parsedData.data.platformInfo.avatarUrl)
                .setURL('https://apex.tracker.gg/apex/profile/psn/' + args + '/overview')
                .setFooter('Powered by Tracker Network. https://tracker.gg')
                .addField('Lifetime ', 'undefined')
            console.log(typeof body)
        });
    }
}