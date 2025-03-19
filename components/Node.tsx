import { cn } from "@/lib/utils";

export default function Node({ onClick, state, turn, title }: { onClick: () => void; state: "w" | "b" | null; turn: "w" | "b" | "end"; title: string }) {
  return (
    <div onClick={onClick} className="bg-black dark:bg-white w-20 h-20 grid grid-cols-2 grid-rows-2 gap-2 relative" title={title}>
      <div
        className={cn(
          "absolute w-16 h-16 rounded-full inset-2 z-10 border-4 border-transparent ",
          state === "b" && "bg-black border-gray-800",
          state === "w" && "bg-white border-gray-200",
          turn === "w" && !state && "hover:opacity-70 hover:border-gray-200 hover:bg-white transition-all",
          turn === "b" && !state && "hover:opacity-70 hover:bg-gray-800 transition-all",
        )}
      />
      <div className="bg-background"></div>
      <div className="bg-background"></div>
      <div className="bg-background"></div>
      <div className="bg-background"></div>
    </div>
  );
}
