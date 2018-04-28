console.log('Starting app');

const _ = require('lodash');
const fs = require('fs');
const notes = require('./notes');
const yargs = require('yargs');

const title = {
    describe: 'Title of note',
    alias: 't',
    demand: true
}

const body = {
    describe: 'Body of the note',
    alias: 'b',
    demand: true
}

const argv = yargs
    .command('add', 'add files to notes', {
        title,
        body
    })
    .command('list', 'list all the notes')
    .command('read', 'read note with passed title', {
        title
    })
    .command('remove', 'remove note with passed title', {
        title
    })
    .help()
    .argv;

if(argv._[0] === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log("Note added successfuly");
    } else {
        console.log('The Title is already Taken');
    }

} else if(argv._[0] === 'list') {
    notes.getAll();
} else if(argv._[0] === 'read'){
    const note = notes.readNote(argv.title);
    if(note) {
        console.log('-----------------------');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
        console.log('-----------------------');
    } else {
        console.log(`No note exists with the title ${argv.title}`);
    }
} else if(argv._[0] === 'remove') {
    const value = notes.removeNote(argv.title);
    if(value) {
        console.log('Notes are removed');
    } else {
        console.log('No note got removed');
    }

} else {
    console.log("Command Not found");
}