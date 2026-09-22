// src/components/Header.tsx
//
// Styled like the tab bar of a code editor rather than a typical navbar —
// the whole app's visual idea is "a feed read the way developers already
// spend their day: inside an editor."

import "./Header.css";

function Header() {
  return (
    <header className="editor-titlebar">
      <div className="editor-titlebar__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="editor-titlebar__tabs">
        <span className="editor-tab editor-tab--active">
          index.tsx <em>Dev Insights</em>
        </span>
        <span className="editor-tab editor-tab--ghost">+ New Post</span>
      </div>
    </header>
  );
}

export default Header;