import { type FunctionComponent } from "react";
import { getPatchNotesMetadata, getPost } from "../utils";
import Markdown from 'markdown-to-jsx';
export const revalidate = 60;

export const generateStaticParams = async () => {
  const posts = getPatchNotesMetadata();
  return posts.map((post) => ({ slug: post.slug }));
};

type PatchNotePageProps = {
  params: {
    slug: string;
  };
};
const PatchNotePage: FunctionComponent<PatchNotePageProps> = (props) => {
  const slug = props.params.slug;
  const post = getPost(slug);
  return (
    <main>
      <article className="px-5 patch-note prose lg:prose-lg !text-white mx-auto">
        <header className='flex justify-between'>
          <span>Patch Note Version: <strong>{post.data.version}</strong></span>
          <time dateTime={post.data.date}>{post.data.date}</time>
        </header>
        <Markdown>{post.content}</Markdown>
      </article>
    </main>
  );
};

export default PatchNotePage;
