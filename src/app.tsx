import logo from "./assets/logo.svg";
import { NewNote } from "./components/new-noteCard";
import { NoteCard } from "./components/note-card";

const note = {
  date: new Date(),
  content: " NNNnnnn",
};

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW" />

      <form className="w-full mt-6">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder:text-slate-500 "
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px] ">
        <NewNote />
        <NoteCard note={note} />
      </div>
    </div>
  );
}
