# Dev Insights — Mini Blog

Dev Insights is a small internal blog application built for developers to share quick tips, insights, and development experiences.

The interface is designed to look like a code editor, with a tab bar at the top and line numbers on the side. Monospace fonts are used for system-style elements such as the tabs, gutter, and author information, while serif fonts are used for blog titles and previews to make the written content easy to read.

## Features

- Displays a list of developer blog posts
- Shows each post's title, author, preview, category, and date
- Highlights posts written by the featured author
- Shows a `+new` badge for posts published within the last 24 hours
- Uses reusable React components
- Logs component mount and unmount events using a Higher-Order Component
- Uses React optimization with `React.memo`

## Technologies Used

- React
- TypeScript
- Vite
- CSS

No extra external libraries were used. The project uses the packages included in the Vite React TypeScript starter setup.

## Project Structure

```text
src/
├── components/
│   ├── Header.tsx
│   ├── Header.css
│   ├── Post.tsx
│   ├── Post.css
│   ├── PostList.tsx
│   └── PostList.css
├── hocs/
│   └── withLogger.tsx
├── App.tsx
├── App.css
└── main.tsx
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd mini-blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Vite will start the application and print a local URL in the terminal, usually:

```text
http://localhost:5173
```

Open that URL in your browser to view the project.

### 4. Build for production

```bash
npm run build
```

This command checks the TypeScript code and creates an optimized production build.

## Components

### Header

The `Header` component displays the **Dev Insights** logo and a **New Post** navigation link.

### PostList

The `PostList` component stores and maps through the sample blog posts. It sends the data for each post to the reusable `Post` component.

It also defines the featured author, `Amara Chen`. Posts written by this author receive special styling.

### Post

The `Post` component displays one blog post, including its title, author, preview, category, and date.

`Post` is a functional component because it does not need `this.state` or class lifecycle methods. It receives props and uses `useMemo` to calculate values such as whether the post is new. Hooks such as `useMemo` are designed for functional components, making this approach simpler and easier to maintain.

A class component would be more suitable for older React projects that depend on lifecycle methods, or for an error boundary using `componentDidCatch`. This project does not need those features.

### App

The `App` component is the root component. It renders the `Header` and `PostList` components, and applies the logging HOC to `PostList`.

## Styling

This project uses two styling methods:

1. **External CSS files**  
   Each component has its own CSS file for layout, typography, spacing, colours, and responsive design.

2. **Inline styles**  
   Inline styles are used in `Post.tsx` for styles that depend on individual post data. For example, each category can have its own accent colour, and posts by the featured author can receive a tinted background.

## Conditional Styling

The application includes conditional styling in two ways:

- A `+new` badge appears when a post was published within the last 24 hours.
- Posts written by the featured author, **Amara Chen**, have a highlighted byline and tinted background.

You can change the `FEATURED_AUTHOR` value in `PostList.tsx` to see the highlight move to another author's post.

## Optimization

The project uses the following optimization practices:

- `React.memo` wraps the `Post` component. This helps prevent unnecessary re-renders when the post props have not changed.
- Each rendered post has a stable unique key using `key={post.id}`. This helps React correctly identify and update items in the list.
- `useMemo` is used in the `Post` component to avoid recalculating derived values unnecessarily.

## Higher-Order Component

The project includes a Higher-Order Component called `withLogger`.

`withLogger` wraps a component and logs messages to the browser console when the component mounts and unmounts. It is applied to `PostList` in `App.tsx`.

To see the messages, open your browser Developer Tools and check the Console tab.

## Reflection

Building this project helped me understand how React components work together in a real application. I found it especially useful to separate the page into small components such as `Header`, `PostList`, and `Post`. This made the code easier to read and reuse. I also learned that TypeScript helps reduce mistakes because it clearly defines the shape of the post data before it is passed between components.

The most interesting part was conditional styling. When I changed the `FEATURED_AUTHOR` value in `PostList.tsx`, I could immediately see the highlight move to a different post. That made it easier to understand how props and conditions can control what the user sees. Next, I would like to explore React state, forms, and storing posts dynamically instead of using hardcoded data.