import React from "react";
import { FiCalendar as CalendarIcon } from "react-icons/fi";
import formatDate from "date-fns/format";
import css from "./BookmarkList.scss";
import { SCREENSHOT_BASE_URL } from "../../util/constants";
import { withAppContext } from "../../context/AppContext";

type BookmarkListProps = {
  bookmarks: Bookmark[];
};

export class BookmarkList extends React.Component<BookmarkListProps> {
  render() {
    return (
      <div className={css.BookmarkList}>
        {this.props.bookmarks.map(bookmark => (
          <BookmarkListItem key={bookmark._id} {...bookmark} />
        ))}
      </div>
    );
  }
}

export default withAppContext(BookmarkList);

type BookmarkListItemProps = Bookmark & {

};
export const BookmarkListItem = (props: BookmarkListItemProps) => (
  <div className={css.BookmarkListItem}>
    <div className={css.BookmarkListItem_Image}>
      <img
        alt={props.title}
        src={`${SCREENSHOT_BASE_URL}/${props.screenshot}`}
      />
    </div>
    <div className={css.BookmarkListItem_Details}>
      <div className={css.BookmarkListItem_Details_Tags}>
        {props.tags.map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <div className={css.BookmarkListItem_Details_Title}>
        {props.title}
      </div>
      <div className={css.BookmarkListItem_Details_Url}>
        {props.url}
      </div>
      <div className={css.BookmarkListItem_Details_Timestamp}>
        <CalendarIcon />
        <time>{formatDate(props.createdAt, "YYYY-MM-DD HH:mm")}</time>
      </div>
    </div>
  </div>
);
