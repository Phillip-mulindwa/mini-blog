// src/components/Post.tsx
//
// FUNCTIONAL vs CLASS: this is functional because it has no state and no
// lifecycle needs — it takes props and derives everything else with
// useMemo, which only exists on function components. A class would add
// a constructor and this-binding for zero benefit here.
//
// OPTIMIZATION: wrapped in React.memo below so it only re-renders when
// its own props change, not whenever PostList re-renders for some other
// reason.

import { memo, useMemo } from "react";
import type { Post as PostType } from "../types/post";
import "./Post.css";

interface PostProps {
  post: PostType;
  isFeaturedAuthor: boolean;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function PostComponent({ post, isFeaturedAuthor }: PostProps) {
  const preview = useMemo(() => {
    const words = post.content.trim().split(/\s+/);
    return words.length > 18 ? words.slice(0, 18).join(" ") + "…" : post.content;
  }, [post.content]);

  const isNew = useMemo(
    () => Date.now() - new Date(post.date).getTime() < ONE_DAY_MS,
    [post.date]
  );

  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  // STYLING METHOD #2: inline style, used for per-instance data (which
  // color this post's category gets, and whether to tint the background
  // for a featured author) — not something a fixed CSS class should hold.
  const hunkStyle: React.CSSProperties = {
    borderLeftColor: categoryColor(post.category),
    backgroundColor: isFeaturedAuthor ? "rgba(196, 148, 61, 0.10)" : undefined,
  };

  return (
    <article className="hunk" style={hunkStyle}>
      <div className="hunk__meta">
        <h3 className="hunk__title">{post.title}</h3>
        {isNew && <span className="hunk__badge">+new</span>}
      </div>

      <p className="hunk__byline">
        <span className={isFeaturedAuthor ? "hunk__author hunk__author--featured" : "hunk__author"}>
          {post.author}
        </span>
        <span className="hunk__dot">·</span>
        <span className="hunk__date">{formattedDate}</span>
        <span className="hunk__category">{post.category}</span>
      </p>

      <p className="hunk__preview">{preview}</p>
    </article>
  );
}

function categoryColor(category: PostType["category"]): string {
  switch (category) {
    case "Tip":
      return "var(--accent-add)";
    case "Insight":
      return "var(--accent-link)";
    case "Update":
      return "var(--muted)";
    case "War Story":
      return "var(--accent-flag)";
  }
}

const Post = memo(PostComponent);
export default Post;