const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: '[ 🤖 ] Ver latência do bot.',
    type: 'CHAT_INPUT', // slash command

    run: async(client, interaction) => {
        let latencia = client.ws.ping;

        let embed = new MessageEmbed()
        .setAuthor({ name: interaction.user.tag + " | Latencia do bot", iconURL: interaction.user.avatarURL() })
        .setDescription(`> Latencia do bot: \`${latencia}ms\` `)
        .setColor('RANDOM')

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}