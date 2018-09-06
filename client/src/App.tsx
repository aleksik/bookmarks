import React from "react";
import css from "./App.scss";
import BookmarkList from "./components/BookmarkList/BookmarkList";
import Sidebar from "./components/Sidebar/Sidebar";
import { AppContextProvider } from "./context/AppContext";

type State = {
  bookmarks: Bookmark[];
  tags: Tag[];
};

class App extends React.Component {
  render() {
    return (
      <AppContextProvider>
        <div className={css.App}>
          <BookmarkList />
          <Sidebar />
        </div>
      </AppContextProvider>
    );
  }
}

export default App;