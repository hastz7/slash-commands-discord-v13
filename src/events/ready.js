const client  = require('../../index.js');
const c = require('colors');


client.on('ready', () => {
    console.log(`[LOGS] ${client.user.tag} Está online!\n[LOGS] Servidores: ${client.guilds.cache.size}\n[LOGS] Users: ${client.users.cache.size}`.blue);

    // creating bot status
    let types = [
        `LISTENING`,
        `COMPETING`,
        `STREAMING`
    ]

    let names = [
        `Put your status here!`,
        `Hope you like it :D` // if you want to put more than 1 add , the end;
    ]

    let time = 0;

    setInterval(() => {
        client.user.setActivity(`${names[time++ % names.length]}`, {
            type: `${types[time++ % types.length]}`
        }, 10000) // put seconds in milliseconds

        // url miliseconds = https://convertlive.com/pt/u/converter/segundos/em/milissegundos
    })
})