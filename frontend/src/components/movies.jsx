import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import _, { get } from 'lodash'

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc'}
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: "", name: "All Genres" }, ...data];
        const { data: movies } = await getMovies()
        this.setState({ movies, genres })
    }

    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({movies});
        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error('This movie has already been deleted.')
            }
            this.setState({movies: originalMovies})
        }
        
    }

    handleLike = movie => {	
      const movies = [...this.state.movies];	
      const index = movies.indexOf(movie);	
      movies[index] = { ...movies[index] };	
      movies[index].liked = !movies[index].liked;	
      this.setState({ movies });	
    };

    handlePageChange = page => {
        this.setState({currentPage: page})
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1})
    }
    
    handleSearch = query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1})
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPageData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, movies: allMovies } = this.state
        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)
        return {totalCount: filtered.length, data: movies}
    }

    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery } = this.state
        const { user } = this.props;

        if (count === 0) return <p>No movies</p>;
        const { totalCount, data: movies} = this.getPageData()
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                        items={this.state.genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    {user && <Link to="/movies/new" className="btn btn-primary" style={{marginBottom: 20}}>New Movies</Link>}
                    <p>Showing {totalCount} movies in database</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable 
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination 
                        itemCount={totalCount}
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                        onPageChange={this.handlePageChange}
                    />
                </div>
                
            </div>
       
        )
    }
}
 
export default Movies;