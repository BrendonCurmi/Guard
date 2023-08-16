const NoteTemplate = require("./notes.model");
const Profile = require("../profile");

class NoteController extends Profile {
    constructor() {
        super(NoteTemplate, "notes", "note");
    }
}

module.exports = NoteController;