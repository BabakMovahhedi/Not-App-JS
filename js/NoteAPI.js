const notes = [
  {
    id: 1,
    title: "first note",
    body: "some dummy text first",
    updated: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "second2 note",
    body: "some dummy text second",
    updated: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "third note",
    body: "this is third note",
    updated: "2021-11-01T10:47:26.889Z",
  },
];

export default class NoteAPI {
  static getAllNote() {
    const savedNote = notes || [];
    return savedNote.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveAllnote(NotToSave) {
    const note = NoteAPI.getAllNote();
    const existedNotes = note.find((n) => n.id == NotToSave.id);

    if (existedNotes) {
      existedNotes.title = NotToSave.title;
      existedNotes.body = NotToSave.body;
      existedNotes.updated = new Date().toISOString();
    } else {
      NotToSave.id = new Date().getTime();
      NotToSave.updated = new Date().toISOString();
      note.push(NotToSave);
    }
    localStorage.setItem("notes-App", JSON.stringify("note"));
  }

  static Deletenote(id) {
    const notes = NoteAPI.getAllNote();
    const filterNote = notes.filter((note) => note.id !== id);
    console.log(filterNote);
    localStorage.setItem("notes-App", JSON.stringify(filterNote));
  }
}

