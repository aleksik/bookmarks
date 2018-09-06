import React from "react";
import { getBookmarks, getTags, checkAuth } from "../api/api";

type AppState = {
  bookmarks: Bookmark[];
  tags: Tag[];
  isAuthenticated: boolean;
};

export const AppContext = React.createContext({});

export class AppContextProvider extends React.Component {
  state: AppState = {
    bookmarks: [],
    tags: [],
    isAuthenticated: false
  };

  componentDidMount() {
    getBookmarks()
      .then(bookmarks => this.setState({ bookmarks }))
      .catch();

    getTags()
      .then(tags => this.setState({ tags }))
      .catch();

    checkAuth()
      .then(isAuthenticated => this.setState({ isAuthenticated }))
      .catch(() => this.setState({ isAuthenticated: false }));
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withAppContext = (Component: React.ComponentClass) => (
  (props: any) => (
    <AppContext.Consumer>
      {context => <Component {...props} {...context} />}
    </AppContext.Consumer>
  )
);