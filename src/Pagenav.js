import React from "react";

export const Pagenav = ({
  current_page,
  total_pages,
  onClickPrevPage,
  onClickNextPage,
}) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        disabled={current_page === 1}
        onClick={onClickPrevPage}
      >
        Prev
      </button>
      &nbsp; {current_page}/{total_pages} &nbsp;
      <button
        type="button"
        className="btn btn-secondary"
        disabled={current_page === total_pages}
        onClick={onClickNextPage}
      >
        Next
      </button>
    </div>
  );
};
