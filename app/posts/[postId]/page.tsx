import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import CommentSection from "@/app/components/CommentSection";

export const revalidate = 300; //86400

type Props = {
    params: {
        postId: string;
    };
};

export async function generateStaticParams() {
    const posts = await getPostsMeta(); // deduped!

    if (!posts) return [];

    return posts.map((post) => ({
        postId: post.id,
    }));
}

export async function generateMetadata({ params: { postId } }: Props) {
    const post = await getPostByName(`${postId}.mdx`); // deduped!

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.meta.title,
    };
}

export default async function Post({ params: { postId } }: Props) {
    const post = await getPostByName(`${postId}.mdx`); // deduped!

    if (!post) notFound();

    const { meta, content } = post;

    const pubDate = getFormattedDate(meta.date);

    // Add a check for meta.tags to prevent the TypeError
    const tags = Array.isArray(meta.tags)
        ? meta.tags.map((tag, i) => (
              <a key={i} href={`/tags/${tag}`}>
                  {tag}
              </a>
          ))
        : null;

    return (
        <>
            <div className="flex flex-wrap justify-between my-8">
                <div>
                    <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
                    <p className="mt-0 text-sm">{pubDate}</p>
                </div>
                <p>
                    <Link className="mx-4" href="/">
                        ← Back to home
                    </Link>
                </p>
            </div>
            {/* Content */}
            <article className="prose-light dark:prose-dark">{content}</article>

            {/* Tags */}
            <section>
                <h3>Related:</h3>
                <div className="mb-5 flex flex-row gap-4 items-center flex-wrap">
                    {tags}
                </div>
            </section>

            {/* Comments */}
            <section>
                <h3>Comments:</h3>
                <div className="mb-5">
                    <p>Comments are not yet available.</p>
                </div>
                <CommentSection postId={postId} />
            </section>
        </>
    );
}
