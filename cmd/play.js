const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js');

module.exports = {
    name: 'play',
    description: 'music play',
    async execute(message, args) {
       const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You aren't in a voice channel.");
        if(!message.member.hasPermission('CONNECT')) return message.channel.send('tbh i just wanna know why you dont have perms to join a voice channel. seems pretty stupid.');
        if(!message.member.hasPermission('SPEAK')) return message.channel.send('you dont have perms to speak in a voice channel. imagine not having the ability to speak 😂');
        if (!args.length) return message.channel.send('I need something to play, you dense cabbage.');

        const connection = await voiceChannel.join();

        const videoFinder = async(query) => {
            const videoResult = await ytSearch(query);
            return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }
        
        const video = await videoFinder(args.join(' '));

        if(video) {
            const stream = ytdl(video.url, {filter: 'audioonly'})
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('music has ended, i left vc nerd')
            }); 
            
            await message.channel.send(`Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No videos found.')
        }

    }
}
