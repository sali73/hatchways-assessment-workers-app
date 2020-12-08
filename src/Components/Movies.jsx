import React from 'react';
import axios from 'axios';

export default class MoviesList extends React.Component{
    constructor(props){
        super(props);
        this.state={
             Movies:[],
            List :[],
            key_word:'',
            on:false,
        }
    }
  componentDidMount() {
    axios.get(`https://lit-meadow-84546.herokuapp.com/movies`)
      .then(res => {
        const Movies = res.data.results;
        console.log(Movies)
        this.setState({  Movies :  Movies});

      })
       axios.get(`https://lit-meadow-84546.herokuapp.com/movies/1`)
      .then(res=> {
        const List = res.data.results;
        console.log(List)
        this.setState({ List });
      })
  }

searchHandler = (e) => {
    this.setState({key_word:e.target.value}) ;
}

searchMovies = (keyWord) => {
    return x=>{
        return x.title.toLowerCase().includes(keyWord.toLowerCase())|| !keyWord;
    }
}

render(){
        return(
            <div className="container-fluid">
                <form>
                    <h2>movies List! </h2>
                    <input className="form-control form-control-lg" type="text"  onChange={this.searchHandler} placeholder="Search by title..."
                           value={this.state.key_word}/>
                </form>

                <div className="card">
                    {this.state.Movies.filter(this.searchMovies(this.state.key_word)).map(Movie=>{
                        return (
                            <div className="Movies-list">
                                <ul className="card-body">
                                   <li><h5>title : <small>{Movie.title}</small></h5></li>
                                   <li><h5>photo: <small>{Movie.photo}</small></h5></li>
                                   <li><h5>year : <small>{Movie.year}</small></h5></li>
                                   <li><h5>vedio : <small>{Movie.vedio}</small></h5></li>
                                   <li><h5>director : <small>{Movie.director}</small></h5></li>
                                   <li><h5>rate : <small>{Movie.rate}</small></h5></li>

                                </ul>
                            </div>
                        )
                    })
                    }
                    </div>
            </div>
        )
    }
}
