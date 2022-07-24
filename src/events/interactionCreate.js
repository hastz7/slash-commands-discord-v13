const client  = require('../../index.js');

client.on('interactionCreate', async(interaction) => {
    if(!interaction.guild) return;
    if(interaction.isCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if(!cmd) return;
        
        const args = [];

        for(const option of interaction.options.data) {
            if(option.type === "SUB_COMMAND"){
                if(option.name) args.push(option.name);
                    option.options?.forEach(async(c) => {
                        if(c.value) args.push(c.value);
                    });
            } else if(option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if(interaction.isContextMenu()){
        await interaction.deferReply({ ephemeral: false });
        const cmd = client.commands.get(interaction.commandName);

        if(cmd) cmd.run(client, interaction, args);
    }
})