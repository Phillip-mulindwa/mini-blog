// src/App.tsx

import Header from "./components/Header";
import PostList from "./components/PostList";
import { withLogger } from "./hocs/withLogger";
import "./App.css";

const LoggedPostList = withLogger(PostList, "PostList");

function App() {
  return (
    <div className="editor-frame">
      <Header />
      <main className="editor-frame__body">
        <LoggedPostList />
      </main>
    </div>
  );
}

export default App;