const { Player } = require('discord-player');
const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require('fs');

//ι³ζ₯½πΆ
let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
const player = client.player

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loaded commands...`);
readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.name.toLowerCase()} Load Command!`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});

const { MessageEmbed } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`εηγͺγΉγγ«ει‘γηΊηγγΎγγ => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new MessageEmbed();
    embed.setColor('RANDOM');
    embed.setDescription(`**${track.title}**γ__**${queue.connection.channel.name}**__γ§εηγγΎγπ§`);
    queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
const embed = new MessageEmbed();
    embed.setColor('GREEN');
    embed.setDescription(`**${track.title}** γγ¬γ€γͺγΉγγ«θΏ½ε γγΎγγ β`);
    queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('θͺ°γγ«γγ€γΉγγ£γ³γγ«γγθΏ½γεΊγγγγγγγγ¬γ€γͺγΉγγγγΉγ¦ζΆε»γγγΎγγ β');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('θͺ°γε±γͺγγͺγ£γγγγγ€γΉγγ£γ³γγ«γγζγγΎγγ β')
});

player.on('queueEnd', (queue)=> {
    queue.metadata.send('γγΉγ¦γ?γγ¬γ€γͺγΉγγεηγγΎγγ β');
});

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);

if(process.env.TOKEN){
client.login(process.env.TOKEN).catch(e => {
console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!")
})
} else {
console.log("Please Write Your Bot Token Opposite The Token In The .env File In Your Project!")
}


client.login(process.env.TOKEN);
