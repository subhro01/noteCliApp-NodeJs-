const fs = require('fs');

const fetchNotes = () => {
    // Taking the previous notes so that they doesn't get overwritten by the new notes. TRY_CATCH used because if file doesn't exist then it won't crash
    try {
        const prevNote = fs.readFileSync('notes-data.json');
        notes = JSON.parse(prevNote);
        return notes;
        
    } catch (e) {
        return [];
    }
}

const saveNote = (notes) => {
 // Sending the note array to the JSON file, for that it has to be converted to JSON
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const addNote = (title, body) => {
    let notes = []      // To store all the notes
    let note = {        // Each note
        title,
        body
    }
    
    notes = fetchNotes();

    const duplicate = notes.filter((note) => note.title === title);

    if(duplicate.length === 0) {
        notes.push(note);       //Pushing new Note to the note array
        saveNote(notes);
        return note;
    }
}

const getAll = () => {
    console.log('Getting all the lists');
    
    const notes = fetchNotes();
    if(notes.length === 0) {
        console.log("NOTE IS EMPTY >>>> ADD A NEW NOTE");
    } else {
        notes.forEach(note => {
            console.log('-----------------------');
            console.log(`Title: ${note.title}`);
            console.log(`Body: ${note.body}`);
            console.log('-----------------------');
        })
    }
}

const readNote = (title) => {
    console.log('Reading Note ', title);
    const notes = fetchNotes();
    const filteredNote = notes.filter(note => note.title === title);
    return filteredNote[0];
}

const removeNote = (title) => {
    
    const notes = fetchNotes()
    const afterDeleteNotes = notes.filter(note => note.title !== title);
    saveNote(afterDeleteNotes);
    return notes.length !== afterDeleteNotes.length;
}

module.exports = {
    addNote,
    getAll,
    readNote, 
    removeNote
}