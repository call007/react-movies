import React from "react";
import classNames from "classnames";

export const MovieTabs = (props) => {
  const getClassNameLink = (value) =>
    classNames("nav-link", { active: props.sort_by === value });

  return (
    <ul className="tabs nav nav-pills">
      <li className="nav-item">
        <a
          href="#popularity.desc"
          className={getClassNameLink("popularity.desc")}
          onClick={(e) => props.onClickTabs(e)}
        >
          Popularity desc
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#revenue.desc"
          className={getClassNameLink("revenue.desc")}
          onClick={(e) => props.onClickTabs(e)}
        >
          Revenue desc
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#vote_average.desc"
          className={getClassNameLink("vote_average.desc")}
          onClick={(e) => props.onClickTabs(e)}
        >
          Vote average
        </a>
      </li>
    </ul>
  );
};
