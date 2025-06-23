const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!play') || message.author.bot) return;
  const args = message.content.split(' ');
  const url = args[1];
  if (!url || !ytdl.validateURL(url)) {
    return message.reply('Vui lòng nhập link YouTube hợp lệ!');
  }
  if (message.member.voice.channel) {
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => connection.destroy());
    message.reply('Đang phát nhạc!');
  } else {
    message.reply('Bạn phải vào voice channel trước!');
  }
});

client.login(process.env.TOKEN);