import NoteAPI from "./NoteAPI.js";
import NoteView from "./NoteView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NoteView(root, this._handlers());
    this._refreshNote();
  }

  _refreshNote() {
    const notes = NoteAPI.getAllNote();

    this.notes = notes;
    this.view.updatedNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);

    this.activeNote = notes[0];
    this.view.selectedNoteList(notes[0]);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "new title",
          body: "new note body",
        };
        NoteAPI.saveAllnote(newNote);
        this._refreshNote();
      },
      onNotEdite: (newTitle, newBody) => {
        const Editnote = {
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        };
        NoteAPI.saveAllnote(Editnote);
        this._refreshNote();
      },
      onNoteSelect: (id) => {
        const selectedNote = this.notes.find((note) => note.id == id);
        this.activeNote = selectedNote;
        this.view.selectedNoteList(selectedNote);
      },
      onNoteDelete: (id) => {
        NoteAPI.Deletenote(id);
        this._refreshNote();
      },
    };
  }
}
