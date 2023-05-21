import Link from "next/link";
import { type FunctionComponent } from "react";
import { getPatchNotesMetadata } from "./utils";

export const revalidate = 60;

const PatchNotesPage: FunctionComponent = () => {
  const patchNotesMetaData = getPatchNotesMetadata();
  return (
    <main className="">
      <ol className='text-xl mx-auto max-w-xl mt-8'>
        {patchNotesMetaData.reverse().map((post) => {
          return (
            <li key={post.date}>
              <Link
                href={`/patch-notes/${post.slug}`}
                className="text-[rgba(255,255,255,0.75)] hover:text-white bg-[rgba(255,255,255,0.075)] hover:bg-[rgba(255,255,255,0.125)] transition-colors px-3 py-2 rounded-md flex justify-between max-w-xl w-full mb-2"
              >
                <p>
                  Version <strong>{post.version}</strong>
                </p>
                <time dateTime={post.date}>{post.date}</time>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
};

export default PatchNotesPage;
