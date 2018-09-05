import React from "react";
import css from "./App.scss";
import { getBookmarks, getTags, checkAuth } from "./api/api";
import BookmarkList from "./components/BookmarkList/BookmarkList";
import Sidebar from "./components/Sidebar/Sidebar";

type State = {
  bookmarks: Bookmark[];
  tags: Tag[];
};

class App extends React.Component {

  state: State = {
    bookmarks: [],
    tags: []
  };

  componentDidMount() {
    getBookmarks().then(bookmarks => {
      this.setState({ bookmarks });
    }).catch();

    getTags().then(tags => {
      this.setState({ tags });
    }).catch();

    checkAuth().then(() => {
      alert("IS AUTHENTICATED!");
    }).catch();
  }

  render() {
    return (
      <div className={css.App}>
        <BookmarkList bookmarks={this.state.bookmarks} />
        <Sidebar tags={this.state.tags} />
      </div>
    );
  }
}

export default App;