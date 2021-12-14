const notesContainer = document.querySelector("#app");
const addNoteBtn = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener("click", () => addNote());

function getNotes() {
  let data = JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

  return data;
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const container = document.createElement("div");
  const element = document.createElement("textarea");
  const deletebtn = document.createElement("button");

  container.classList.add("note-container");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";
  element.setAttribute("spellcheck", "false");

  deletebtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  container.appendChild(element);
  container.appendChild(deletebtn);

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  deletebtn.addEventListener("click", () => {
    const doDelete = confirm("Are you suree to delete this note?");
    if (doDelete) {
      deleteNote(id, container);
    }
  });

  return container;
}
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 10000 + 1),
    content: "",
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);
  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}
