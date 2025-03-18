import { cn } from "@/lib/utils";

export default function Node({
  onClick,
  state,
}: {
  onClick: () => void;
  state?: "white" | "black";
}) {
  return (
    <div
      onClick={onClick}
      className="bg-black dark:bg-white w-20 h-20 grid grid-cols-2 grid-rows-2 gap-2 relative"
    >
      <div
        className={cn(
          "absolute w-16 h-16 rounded-full inset-2 z-10 border-3 border-transparent",
          state === "black" && "bg-black border-gray-800",
          state === "white" && "bg-white border-gray-100",
        )}
      />
      <div className="bg-white dark:bg-background"></div>
      <div className="bg-white dark:bg-background"></div>
      <div className="bg-white dark:bg-background"></div>
      <div className="bg-white dark:bg-background"></div>
    </div>
  );
}
