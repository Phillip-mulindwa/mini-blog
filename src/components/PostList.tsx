// src/components/PostList.tsx

import type { Post as PostType } from "../types/post";
import Post from "./Post";
import "./PostList.css";

const FEATURED_AUTHOR = "Amara Chen";

const POSTS: PostType[] = [
  {
    id: 1,
    title: "Stop re-rendering the whole sidebar",
    author: "Amara Chen",
    category: "Tip",
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago → "+new"
    content:
      "Wrapped the sidebar's nav items in React.memo and passed a stable callback with useCallback. Sidebar re-renders dropped from every keystroke in the search box to only when the route actually changes.",
  },
  {
    id: 2,
    title: "vite.config.ts alias saved us an afternoon",
    author: "Diego Osei",
    category: "Insight",
    date: new Date("2026-09-10T09:00:00Z").toISOString(),
    content:
      "Relative imports like ../../../components/Button were breaking every time we moved a folder. Added a resolve.alias entry for @/ pointing at src/, updated tsconfig paths to match, and the refactor churn basically disappeared.",
  },
  {
    id: 3,
    title: "Our staging deploy silently used the wrong env file",
    author: "Priya Nair",
    category: "War Story",
    date: new Date("2026-09-05T14:30:00Z").toISOString(),
    content:
      "Vite only loads .env files that start with VITE_ into import.meta.env. We'd named a key API_BASE_URL instead of VITE_API_BASE_URL, it silently resolved to undefined, and staging quietly hit localhost for two days before anyone noticed.",
  },
];

function PostList() {
  return (
    <section className="feed" aria-label="Recent posts">
      {POSTS.map((post, index) => (
        <div className="feed__row" key={post.id}>
          <span className="feed__gutter" aria-hidden="true">
            {String(index + 1).padStart(3, "0")}
          </span>
          <Post post={post} isFeaturedAuthor={post.author === FEATURED_AUTHOR} />
        </div>
      ))}
    </section>
  );
}

export default PostList;