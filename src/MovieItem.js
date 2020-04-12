import React, { useState } from "react";

export function MovieItem({ item, onDelete, onToggleMovieToWillWatch }) {
  const [isWillWatch, setIsWillWatch] = useState(false);

  return (
    <div className="card">
      <img
        className="card-img-top"
        src={"http://image.tmdb.org/t/p/w500" + item.backdrop_path}
        alt=""
      />
      <div className="card-body">
        <h6 className="card-title">{item.title}</h6>
        <div className="d-flex justify-content-between align-item-center">
          <p className="mb-0">Rating {item.vote_average}</p>
          <button
            type="button"
            onClick={() => {
              onToggleMovieToWillWatch();
              setIsWillWatch(!isWillWatch);
            }}
            className={`btn ${isWillWatch ? "btn-success" : "btn-secondary"}`}
          >
            {isWillWatch ? "Remove Will Watch" : "Add Will Watch"}
          </button>
          <button type="button" onClick={onDelete} className="btn btn-primary">
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
