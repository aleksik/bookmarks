import React from "react";
import css from "./Login.scss";
import { login } from "../../api/api";

type State = {
  username: string;
  password: string;
};

export default class Login extends React.Component {

  state: State = {
    username: "",
    password: ""
  };

  onInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;
    this.setState({[name]: value});
  }

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const {username, password} = this.state;
    login(username, password).then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <form className={css.Login} onSubmit={this.onSubmit}>
        <p>
          <label htmlFor="usernameInput">Username</label>
          <input
            type="text"
            name="username"
            id="usernameInput"
            defaultValue={this.state.username}
            onKeyUp={this.onInputChange}
          />
        </p>
        <p>
          <label htmlFor="passwordInput">Password</label>
          <input
            type="text"
            name="password"
            id="passwordInput"
            defaultValue={this.state.password}
            onKeyUp={this.onInputChange}
          />
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
    );
  }
}
