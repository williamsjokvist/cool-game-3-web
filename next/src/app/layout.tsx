import "../style/globals.sass";
import "../style/utility.sass";
import "../style/fonts.sass";
import "../style/register-btn.sass";
import "../style/components.sass"
import Image from "next/image";
import Link from "next/link";
import { Providers } from "@/redux/provider";

import { Inter } from "next/font/google";
import Notice from "@/components/common/notice";
import Nav from "@/components/common/nav";
import CharacterPopup from "@/components/common/character-popup";
const inter = Inter({ subsets: ["latin"] });

/* https://nextjs.org/docs/app/api-reference/file-conventions/metadata */
export const metadata = {
  title: "Cool Game 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className + `min-h-screen`}>
          <header>
            <Notice />
            <div className='mb-12 relative flex place-items-center justify-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-2xl before:content-[""] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[""] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px]'>
              <Link href="">
                <Image
                  className="logo relative drop-shadow-[0_0_0.3rem_#ffffff70]"
                  src="/logo.png"
                  alt="Cool Game 3 Logo"
                  width={400}
                  height={80}
                  priority
                />
              </Link>
            </div>
          </header>
          <Nav />
          {children}

          <footer className="font-arial text-xs bottom-0 w-full py-8 text-[#5b7798] text-center ">
            <span className="block">For all the Cool Game 3 enjoyers ❤️</span>
            <small>May or may not have the approval of David Hasslehoff</small>
          </footer>
          <CharacterPopup mdLeftOffset={150} />
        </body>
      </Providers>
    </html>
  );
}
