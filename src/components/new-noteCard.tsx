import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreate: (content: string) => void;
}

export function NewNote({ onNoteCreate }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContenClick(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    if (e.target.value === "") {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();
    console.log({ content });
    onNoteCreate(content);

    setContent("");
    setShouldShowOnBoarding(true);
    toast.success("Nota criada com Sucesso");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 rounded-md text-left flex flex-col bg-slate-700 gap-3 overflow-hidden outline-none relative focus-visible:ring-lime-400 focus:ring-2 focus:ring-lime-400">
        <div className="rounded-md flex flex-col bg-lsate-700 text-left bg-slate-700 p-5 gap-3">
          <span className="text-sm font-medium text-slate-200">
            Adicionar Nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60" />
        <Dialog.Content className="fixed overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] max-w-[640px] w-full rounded-md bg-slate-700 outline-none flex flex-col justify-between">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form
            onSubmit={handleSaveNote}
            className="flex-1 flex flex-col justify-between"
          >
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-small font-medium  text-slate-300">
                Adicionar Nota
              </span>

              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button className="font-medium text-lime-400 hover:underline">
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                  >
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none outline-none"
                  onChange={handleContenClick}
                  value={content}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-slate-950 hover:bg-lime-500 font-medium outline-none"
            >
              Salvar Nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
