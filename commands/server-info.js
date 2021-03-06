const Discord = require("discord.js");
module.exports = {
  name: "server-info",
  description: "A command that provides a detailed description of the server",
  execute(message, args) {
    const serverEmbed = new Discord.MessageEmbed();
    serverEmbed.setTitle(message.guild.name);
    serverEmbed.addFields(
      {
        name: "Member count",
        value: message.guild.memberCount,
        inline: true,
      },
      {
        name: "Owner",
        value: message.guild.owner.user.username,
        inline: true,
      },
      {
        name: "Region",
        value: message.guild.region,
        inline: true,
      },
      {
        name: "Date Created",
        value: message.guild.createdAt,
        inline: true,
      },
      {
        name: "Verification Level",
        value: message.guild.verificationLevel,
        inline: true,
      },
      {
        name: "Channel count", 
        value: "unavailable",
        inline: true
      }
    );
    serverEmbed.setColor(0x3366ff);
    serverEmbed.setFooter(`Requested by ${message.author.username}`);
    serverEmbed.setTimestamp();
    serverEmbed.setThumbnail(
      message.guild.iconURL({
        dynamic: true,
      })
    );

    message.channel.send(serverEmbed);
  },
};
