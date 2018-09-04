import React from "react";
import classNames from "classnames";
import { FiTag as TagIcon, FiPlusCircle as AddIcon } from "react-icons/fi";
import css from "./Sidebar.scss";

type SidebarProps = {
  tags: Tag[];
};

type SidebarState = {
  isOpen: boolean;
  openSection?: "tags" | "add";
};

export default class Sidebar extends React.Component<
  SidebarProps,
  SidebarState
> {
  state: SidebarState = {
    isOpen: false,
    openSection: undefined
  };

  toggle = (
    event: React.MouseEvent<HTMLDivElement>,
    openSection?: SidebarState["openSection"]
  ) => {
    event.preventDefault();
    this.setState({
      openSection,
      isOpen:
        (openSection && this.state.openSection !== openSection) ||
        !this.state.isOpen
    });
  };

  render() {
    const { isOpen, openSection } = this.state;
    return (
      <>
        <div
          className={classNames(css.Backdrop, { [css.open]: isOpen })}
          onClick={e => this.toggle(e)}
        />
        <div className={classNames(css.Sidebar, { [css.open]: isOpen })}>
          <div className={css.SidebarMenu}>
            <div
              onClick={e => this.toggle(e, "tags")}
              className={classNames(css.SidebarMenu_Item, {
                [css.active]: openSection === "tags" && isOpen
              })}
            >
              <TagIcon size={40} />
            </div>
            <div
              onClick={e => this.toggle(e, "add")}
              className={classNames(css.SidebarMenu_Item, {
                [css.active]: openSection === "add" && isOpen
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
          </div>
        </div>
      </>
    );
  }
}
