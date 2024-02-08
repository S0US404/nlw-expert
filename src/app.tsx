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

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
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

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px] ">
        <NewNote onNoteCreate={onNoteCreate} />
        {note.map((item: any) => (
          <NoteCard key={item.id} note={item} />
        ))}
      </div>
    </div>
  );
}
