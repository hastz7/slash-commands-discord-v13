const { glob } = require('glob');
const { promisify } = require('util');

const client = require('../../index.js')
const globPromise = promisify(glob);

module.exports = async(client) => {
    const cmd = await globPromise(
        `${process.cwd()}/src/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];

    cmd.map(async(value) => {
        const file = require(value);
        if(!file?.name) return;
        client.commands.set(file.name, file);

        if(["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });

    client.on('ready', async() => {
        await client.application.commands.set(arrayOfSlashCommands);
    });

    // creating commands files
    const cmdFile = await globPromise(`${process.cwd()}/src/commands/**/*.js`);
        cmdFile.map(async(value) => {
            const file = require(value);
            const s = value.split("/");
            const d = s[s.length - 2];

            if(file.name){
                const p = { d, ...file };
                client.commands.set(file.name, p);
            }
    });
    
    // creating event files
    const eventFile = await globPromise(`${process.cwd()}/src/events/*.js`);
        eventFile.map(async(value) => {
            require(value);
    });
}