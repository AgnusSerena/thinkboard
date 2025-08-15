import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes in getAllNotes:", error);
    res.status(500).json({ message: "Error fetching notes", error });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note in getNoteById:", error);
    res.status(500).json({ message: "Error fetching note", error });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json({ message: "Note created successfully", note: note });
  } catch (error) {
    console.error("Error creating note in createNote:", error);
    res.status(500).json({ message: "Error creating note", error });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note in updateNote:", error);
    res.status(500).json({ message: "Error updating note", error });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ message: "Mote deleted successfully", note: deletedNote });
  } catch (error) {
    console.error("Error deleting note in deleteNote:", error);
    res.status(500).json({ message: "Error deleting note", error });
  }
}
