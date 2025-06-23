client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // Lệnh !joinMusicBot: chỉ vào voice channel
  if (message.content.startsWith('!joinMusicBot')) {
    if (message.member.voice.channel) {
      joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      message.reply('Đã vào voice channel!');
    } else {
      message.reply('Bạn phải vào voice channel trước!');
    }
    return;
  }

  // Lệnh !playMusicBot: phát nhạc
  if (!message.content.startsWith('!playMusicBot')) return;
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