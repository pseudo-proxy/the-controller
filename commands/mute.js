const Discord = require("discord.js");
module.exports = {
  name: "mute",
  description: "A command that mutes people",
  execute(message, args) {
    const targetUser = message.mentions.users.first();
    const mutedRole = message.guild.roles.cache.find(
      (r) => r.id === "766778409342337084"
    );
    const member = message.guild.member(targetUser);
    const time = args[1];
    let reason = args.slice(2).join(` `);

    if (member.roles.cache.has(mutedRole)) {
      const alreadyMutedEmbed = new Discord.MessageEmbed();
      alreadyMutedEmbed.setDescription(
        `${disapprovedEmoji} That user is already muted!`
      );
      alreadyMutedEmbed.setColor(0x3366ff);
      return message.channel.send(alreadyMutedEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }
    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      const permissionEmbed = new Discord.MessageEmbed();
      permissionEmbed.setDescription(
        `${disapprovedEmoji} You do not have permission to mute members!`
      );
      permissionEmbed.setColor(0x3366ff);
      return message.channel.send(permissionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }
    if (targetUser) {
      if (member.roles.cache.has("749421428339638332")) {
        const isStaffEmbed = new Discord.MessageEmbed();
        isStaffEmbed.setDescription(
          `${disapprovedEmoji} You cannot mute a member of staff!`
        );
        isStaffEmbed.setColor(0x3366ff);
        return message.channel
          .send(isStaffEmbed)
          .then((msg) => msg.delete({ timeout: 3000 }));
      }

      if (!time) {
        const provideTimeEmbed = new Discord.MessageEmbed();
        provideTimeEmbed.setDescription(
          `${disapprovedEmoji} Please provide the duration of the user\'s mute!`
        );
        provideTimeEmbed.setColor(0x3366ff);
        return message.channel.send(provideTimeEmbed).then((msg) =>
          msg.delete({
            timeout: 3000,
          })
        );
      } else {
        if (!reason) {
          reason = "Unspecified";
        }
        const muteLogEmbed = new Discord.MessageEmbed();
        muteLogEmbed.setTitle(`Mute`);
        muteLogEmbed.addFields(
          {
            name: "Offending Member",
            value: `${targetUser.tag} (${member.id})`,
            inline: false,
          },
          {
            name: "Responsible Moderator",
            value: message.author.tag,
            inline: false,
          },
          {
            name: "Reason",
            value: reason,
            inline: false,
          },
          {
            name: "Duration",
            value: time,
            inline: false,
          }
        );
        muteLogEmbed.setColor(0xf5a020);
        muteLogEmbed.setTimestamp();
        let ms = require("ms");
        const muteSuccess = new Discord.MessageEmbed();
        muteSuccess.setDescription(
          `${approvedEmoji} Successfully muted ${targetUser} for ${ms(
            ms(time)
          )}`
        );
        muteSuccess.setColor(0x3366ff);
        member.roles
          .add(mutedRole)
          .then(() => {
            message.channel.send(muteSuccess).then((msg) =>
              msg.delete({
                timeout: 3000,
              })
            );
            setTimeout(function () {
              member.roles.remove(mutedRole);
            }, ms(time));
          })
          .then(() => {
            message.guild.channels.cache
              .find((c) => c.id === "769609262636335144")
              .send(muteLogEmbed);
          })
          .catch((err) => {
            message.channel.send(errEmbed).then((msg) =>
              msg.delete({
                timeout: 3000,
              })
            );
            console.error(err);
          });
      }
    } else {
      const noMentionEmbed = new Discord.MessageEmbed();
      noMentionEmbed.setDescription(
        `${disapprovedEmoji} Please mention a user to mute!`
      );
      noMentionEmbed.setColor(0x3366ff);
      message.channel.send(noMentionEmbed).then((msg) =>
        msg.delete({
          timeout: 3000,
        })
      );
    }
  },
};
