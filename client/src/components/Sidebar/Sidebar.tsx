import React from "react";
import classNames from "classnames";
import { FiTag as TagIcon, FiPlusCircle as AddIcon } from "react-icons/fi";
import Login from "../Login/Login";
import css from "./Sidebar.scss";
import { withAppContext } from "../../context/AppContext";

type SidebarProps = {
  tags: Tag[];
};

type SidebarState = {
  openSection?: "tags" | "add";
};

export class Sidebar extends React.Component<
  SidebarProps,
  SidebarState
> {
  state: SidebarState = {
    openSection: "add"
  };

  toggle = (
    event: React.MouseEvent<HTMLDivElement>,
    openSection?: SidebarState["openSection"]
  ) => {
    event.preventDefault();
    this.setState({
      openSection: openSection === this.state.openSection ? undefined : openSection
    });
  };

  render() {
    const { openSection } = this.state;
    return (
      <>
        <div
          className={classNames(css.Backdrop, { [css.open]: openSection })}
          onClick={e => this.toggle(e)}
        />
        <div className={classNames(css.Sidebar, { [css.open]: openSection })}>
          <div className={css.SidebarMenu}>
            <div
              onClick={e => this.toggle(e, "tags")}
              className={classNames(css.SidebarMenu_Item, {
                [css.active]: openSection === "tags"
              })}
            >
              <TagIcon size={40} />
            </div>
            <div
              onClick={e => this.toggle(e, "add")}
              className={classNames(css.SidebarMenu_Item, {
                [css.active]: openSection === "add"
              })}
            >
              <AddIcon size={40} />
            </div>
          </div>
          <div className={css.SidebarContent}>
            {openSection === "tags" && (
              <div className={css.Tags}>
                <ul>
                  {this.props.tags.map(tag => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            )}
            {openSection === "add" && (
              <Login />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default withAppContext(Sidebar);
