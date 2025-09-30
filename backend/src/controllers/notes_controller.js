import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
    try {

        const notes = await Note.find().sort(
            { updatedAt: -1 }); // Newest or most recently updated on top

        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in get all notes: ", error);
        res.status(500).json({ message: 'Internal server failure!' });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: "Note not found!" });

        res.status(200).json(note);
    } catch (error) {
        console.log("Error in get note by ID: ", error);
        res.status(500).json({ message: 'Internal server failure!' });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        const note = new Note({ title: title, content: content });

        const savedNote = await note.save();
        res.status(201).json(savedNote);

    } catch (error) {
        console.error("Error in create new notes: ", error);
        res.status(500).json({ message: 'Internal server failure!' });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title: title, content: content }, { new: true });

        if (!updatedNote) return res.status(404).json({ message: "Note not found!" });

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updating new notes: ", error);
        res.status(500).json({ message: 'Internal server failure!' });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) return res.status(404).json({ message: "Note not found!" });
        res.status(200).json({ message: "Note deleted sucessfully!" });
    } catch (error) {
        console.error("Error in deleting new notes: ", error);
        res.status(500).json({ message: 'Internal server failure!' });
    }
}