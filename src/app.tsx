import { ChangeEvent, useState } from "react";
import logo from "./assets/logo.svg";
import { NewNote } from "./components/new-noteCard";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [note, setNote] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    } else {
      return [];
    }
    return [notesOnStorage, ...[]];
  });

  function onNoteCreate(content: string) {
    const NewNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [NewNote, ...note];
    setNote(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    setSearch(query);
  }

  function handleDelete(id: string) {
    const notesArray = note.filter((item) => {
      return item.id !== id;
    });

    setNote(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  const filteredNotes =
    search.toLocaleLowerCase() !== ""
      ? note.filter((note) => note.content.toLocaleLowerCase().includes(search))
      : note;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 ">
      <img src={logo} alt="NLW" />

      <form className="w-full mt-6">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder:text-slate-500 "
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] ">
        <NewNote onNoteCreate={onNoteCreate} />
        {filteredNotes.map((item: any) => (
          <NoteCard key={item.id} note={item} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
