export default class NoteView {
  constructor(root, handlers) {
    const { onNoteAdd, onNotEdite, onNoteSelect, onNoteDelete } = handlers;
    this.root = root;
    this.onNoteAdd = onNoteAdd;
    this.onNotEdite = onNotEdite;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `    
    <div class="notes__sidebar">
      <div class="notes__logo">note App</div>
      <div class="notes__list"></div>
      <button class="notes__add">note Add</button>
    </div> 
    <div class="notes__perview">
      <input type="text" class="notes__title" placeholder="no title ..." />
      <textarea class="notes__body">take Note ... </textarea>
    </div>   
  </div>`;

    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    addNoteBtn.addEventListener("click", () => {
      this.onNoteAdd();
    });
    [inputTitle, inputBody].forEach((eachInput) => {
      eachInput.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        this.onNotEdite(newTitle, newBody);
      });
    });

    this.updateNotePreviewVisibility(true);
  }

  _creatListItemHTML(id, title, body, updated) {
    // console.log(updated);
    const Max_BODY_LENGTH = 50;
    return ` 
    <div class="notes__list-items" id='${id}' >   
    <div class='notes__item-header' >
    <div class="notes__small-title">${title} </div>
    <span class='notes__list-trash' id='${id}' >
    <lord-icon
    src="https://cdn.lordicon.com/dovoajyj.json"
    trigger="loop"
    style="width:200px;height:200px">
    </lord-icon>
    </span>
    </div>
    <div class="notes__small-body">
    ${body.substring(0, Max_BODY_LENGTH)}
    ${body.length > Max_BODY_LENGTH ? "..." : ""}
    </div>
    <div class="notes__small-updated">
    ${new Date().toLocaleString(updated)}</div>
     </div>
    `;
  }

  updatedNoteList(notes) {
    const noteContainer = this.root.querySelector(".notes__list");

    // Empty container

    noteContainer.innerHTML = "";
    let noteslist = "";
    for (const note of notes) {
      const { id, title, body, update } = note;
      const html = this._creatListItemHTML(id, title, body, update);

      noteslist += html;
      noteContainer.innerHTML = noteslist;

      //
      noteContainer
        .querySelectorAll(".notes__list-items")
        .forEach((noteItem) => {
          noteItem.addEventListener("click", () =>
            this.onNoteSelect(noteItem.id)
          );
        });
      noteContainer
        .querySelectorAll(".notes__list-trash")
        .forEach((noteItem) => {
          noteItem.addEventListener("click", (e) => {
            e.stopPropagation(), this.onNoteDelete(noteItem.id);
          });
        });
    }
  }

  selectedNoteList(notes) {
    this.root.querySelector(".notes__title").value = notes.title;
    this.root.querySelector(".notes__body").value = notes.body;
    this.root.querySelectorAll(".notes__list-items").forEach((item) => {
      item.classList.remove("notes__list-item--selected");
    });
    this.root
      .querySelector(`.notes__list-items[id='${notes.id}'] `)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__perview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
