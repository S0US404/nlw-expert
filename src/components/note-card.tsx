import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  handleDelete: (id: string) => void;
}

export function NoteCard({ note, handleDelete }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 focus:ring-2 focus:ring-lime-400">
        <span className="text-small font-medium text-slate-300">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-black/0 pointer-events-none" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className=" fixed inset-0 md:inset-auto overflow-hidden md:top-1/2  md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:max-w-[640px] w-full md:rounded-md bg-slate-700 outline-none flex flex-col justify-between">
          <div className="flex flex-col gap-3 p-5">
            <span className="text-small font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400 break-words">
              {note.content}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(note.id)}
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 group font-medium outline-none"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar esta Nota?
            </span>
          </button>
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
