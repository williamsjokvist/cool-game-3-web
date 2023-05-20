import matter from "gray-matter";
import path from "path";
import fs from 'fs'
type PatchNoteMetadata = {
  date: string;
  version: string;
  slug: string;
}

export const getPatchNotesMetadata = (): PatchNoteMetadata[] => {
  const files = fs
    .readdirSync(path.resolve("content", "patch-notes"))
    .filter((file) => file.endsWith(".md"));


  const metadata = files.map(file => {
    const content = fs.readFileSync(
      path.resolve("content", "patch-notes", file),
      "utf-8"
    );

    const frontMatter = matter(content)

    return {
      ...frontMatter.data,
      slug: file.replace('.md', '')
    }
  })
  return metadata as PatchNoteMetadata[];
};

export const getPost = (slug: string): {
  data: PatchNoteMetadata,
  content: string
} => {
  const fileContent = fs.readFileSync(
    path.resolve("content", "patch-notes", `${slug}.md`),
    "utf-8"
  );

  const post = matter(fileContent)
  return post as any;
};