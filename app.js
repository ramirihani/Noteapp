var fs = require("fs");

function List() {
  let lists = fs.readFileSync("note.json").toString();
  let notes = JSON.parse(lists);
  console.log("printing", notes.length, "note (s)");

  for (let note of notes) {
    console.log("title:", note.title, "body:", note.body);
  }
}
const Help = () => {
  console.log("help , list , add");
};

const Read = title => {
  let note = [...JSON.parse(fs.readFileSync("note.json"))];
  let read = note.filter(note => note.title === title);
  console.log(read);
};

const Add = (title, body) => {
  let note = {
    title: title,
    body: body
  };
  let newNote = [...JSON.parse(fs.readFileSync("note.json")), note];
  console.log(newNote);
  fs.writeFileSync("note.json", JSON.stringify(newNote));
};

const Remove = title => {
  let note = [...JSON.parse(fs.readFileSync("note.json"))];
  let filterNote = note.filter(note => note.title !== title);
  console.log(filterNote);
  fs.writeFileSync("note.json", JSON.stringify(filterNote));
};

switch (process.argv[2]) {
  case "--List":
    List();
    break;
  case "--Read":
    Read(process.argv[4]);
    break;
  case "--Add":
    Add(process.argv[4], process.argv[6]);
    break;
  case "--Remove":
    Remove(process.argv[4]);
    break;

  default:
    Help();
    break;
}
