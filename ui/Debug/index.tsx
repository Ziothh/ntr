import { contextFactory, useKeypress, useToggle } from "../hooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/ui/dialog"
import { withWrapper } from "../utils/components";
import { useState } from "react";
import { cn } from "../shadcn/utils";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import DebugPageList from "./DebugPageList";
import { NextRoute } from "../../generated/types";

interface Props {
  routes: NextRoute[]
}

// <DebugModal>
//     <h1 className="text-2xl mb-4">Devtools modal</h1>
//     <div className="flex flex-col gap-6">
//         
//         <DebugTheme />
//         {/* <DebugPageList appDir={pages} /> */}
//     </div>
// </DebugModal>

const [useDebugCtx, DebugCtx] = contextFactory(() => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return {
    modal: {
      isOpen: isModalOpen,
      setOpen: setIsModalOpen,
    },
  }
})

export { useDebugCtx };

const Debug = withWrapper(DebugCtx, ({ routes }: Props) => {
  const ctx = useDebugCtx();


  useKeypress({
    meta: {
      "K": () => ctx.modal.setOpen(prev => !prev)
    }
  });

  return (
    <>
      <Dialog open={ctx.modal.isOpen} onOpenChange={ctx.modal.setOpen}>
        <DialogTrigger asChild>
          <button className={cn(
            `fixed bottom-2 left-2 z-999
            w-8 h-8 p-1 
            rounded-md
            bg-black text-white opacity-25
            transition-all duration-150
            hover:opacity-100`,
            ctx.modal.isOpen && "opacity-5"
          )}
            title="Devtools [cmd + K]"
            onClick={() => ctx.modal.setOpen(true)}
          >
            <CodeBracketSquareIcon className="" />
          </button>
        </DialogTrigger>

        <DialogContent className="dark">
          <DialogHeader>
            <DialogTitle>Next Route Analyser</DialogTitle>
            <DialogDescription>
              These are the routes found:
            </DialogDescription>
            <DebugPageList routes={routes} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* <DebugReactQueryDevtoolsPanel /> */}
    </>
  )
})


export default Debug



