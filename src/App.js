import React from "react";
// import { moviesData } from "./moviesData";
import "./App.css";
import { MovieItem } from "./MovieItem";
import { API_URL, API_KEY_3 } from "./utils/api";
import { MovieTabs } from "./MovieTabs";
import { Pagenav } from "./Pagenav";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      current_page: 1,
      total_pages: 1,
    };
  }

  deleteHandler = (movie) => {
    const updatesMovies = this.state.movies.filter(
      (item) => item.id !== movie.id
    );

    this.setState({
      movies: updatesMovies,
    });
  };

  toggleMovieToWillWatchHandler = (movie) => {
    let updatesWillWatchMovies;

    if (this.state.moviesWillWatch.includes(movie)) {
      updatesWillWatchMovies = this.state.moviesWillWatch.filter(
        (item) => item.id !== movie.id
      );
    } else {
      updatesWillWatchMovies = [...this.state.moviesWillWatch, movie];
    }

    this.setState({
      moviesWillWatch: updatesWillWatchMovies,
    });
  };

  handleClickTabs = (e) => {
    e.preventDefault();
    const hashLink = e.currentTarget.hash.split("#")[1];

    this.setState({
      sort_by: hashLink,
    });
  };

  handlePrevPage = () => {
    if (this.state.current_page === 1) return;

    this.setState((prevState) => ({
      current_page: prevState.current_page - 1,
    }));
  };

  handleNextPage = () => {
    if (this.state.current_page === this.state.total_pages) return;

    this.setState((prevState) => ({
      current_page: prevState.current_page + 1,
    }));
  };

  requestServer = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.current_page}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          total_pages: data.total_pages,
        });
      });
  };

  componentDidMount() {
    this.requestServer();
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.sort_by !== this.state.sort_by && this.requestServer();
    prevState.current_page !== this.state.current_page && this.requestServer();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              <div className="col-12 mb-4">
                <MovieTabs
                  onClickTabs={this.handleClickTabs}
                  sort_by={this.state.sort_by}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map((item) => (
                <div className="col-6 mb-4" key={item.id}>
                  <MovieItem
                    item={item}
                    onDelete={() => this.deleteHandler(item)}
                    onToggleMovieToWillWatch={() =>
                      this.toggleMovieToWillWatchHandler(item)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
            <Pagenav
              current_page={this.state.current_page}
              total_pages={this.state.total_pages}
              onClickPrevPage={this.handlePrevPage}
              onClickNextPage={this.handleNextPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
