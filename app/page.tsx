// import Image from "next/image";

import { ModeToggle } from "@/components/ModeToggle";
import Node from "@/components/Node";

export default function Home() {
  const board = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board.push(<Node key={`${i}-${j}`} />);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-9 grid-rows-9">{board}</div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
        <ModeToggle />
      </footer>
    </div>
  );
}
