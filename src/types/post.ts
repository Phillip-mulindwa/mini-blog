// src/types/post.ts
//
// Central type for a blog post. Keeping this in its own file (rather than
// inline in a component) means PostList, Post, and any future component
// can all import the same shape and TypeScript will catch it if any of
// them drift out of sync.

export type PostCategory = "Tip" | "Insight" | "Update" | "War Story";

export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string; // ISO 8601 string
  category: PostCategory;
}