const Discord = require('discord.js');
const colors = require('../lib/colors.json');

module.exports = (client, oldMember, newMember) => {
  	let embed;
  	let settings = client.getSettings(oldMember.guild.id);
  
  	if (!settings.logMemberUpdates == true) return;
  	if (!settings.modLogChannel) return;
  	if (!oldMember.guild.channels.find(c => c.name == settings.modLogChannel)) return;
	let modLogChannel = oldMember.guild.channels.find(c => c.name == settings.modLogChannel);
	if (!modLogChannel.permissionsFor(oldMember.guild.me).has('VIEW_CHANNEL')) return;
	if (!modLogChannel.permissionsFor(oldMember.guild.me).has('SEND_MESSAGES')) return;
  
  	if (oldMember.nickname !== newMember.nickname) {
    	const embed = new Discord.RichEmbed()
    	.setAuthor("👤 Nickname changed")
    	.setColor(colors.teal)
    	.setDescription(`<@${newMember.id}> changed their nickname`)
		.addField(`Old nickname:`, `${oldMember.nickname !== undefined ? `${oldMember.nickname}` : oldMember.username}`, true)
		.addField(`New nickname:`, `${newMember.nickname !== undefined ? `${newMember.nickname}` : oldMember.username}`, true)
		.setThumbnail(`${oldMember.user.displayAvatarURL}`)
    	.setTimestamp();
    
    	modLogChannel.send(embed).catch();
  	}
  
  	if (oldMember.user.name !== newMember.user.name) {
		const embed = new Discord.RichEmbed()
    	.setAuthor("👤 Username changed")
    	.setColor(colors.teal)
    	.setDescription(`<@${newMember.id}> changed their username`)
		.addField(`Old username`, `${oldMember.username}`, true)
		.addField(`New username:`, `${newMember.username}`, true)
		.setThumbnail(`${oldMember.user.displayAvatarURL}`)
    	.setTimestamp();
    
    	modLogChannel.send(embed).catch();
  	}

  	if (oldMember.roles !== newMember.roles) {
    	let output = '';
    	let outputNew = '';
    
    	oldMember.roles.forEach(role => {
      	output += '\n' + role.name;
    	});
    
    	newMember.roles.forEach(role => {
      	outputNew += '\n' + role.name;
    	});
    
    	if (output == outputNew) return;
    
    	embed = new Discord.RichEmbed()
		.setAuthor("👤 Member roles updated")
    	.setColor(colors.teal)
    	.setDescription(`\Roles updated for <@${newMember.id}>`)
		.addField(`Old roles:`, `${output}`, true)
		.addField(`New roles:`, `឵${outputNew}`, true)
		.setThumbnail(`${oldMember.user.displayAvatarURL}`)
    	.setTimestamp();
    
    	modLogChannel.send(embed).catch();
  	}
};
