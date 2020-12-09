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
            <>
              <div class="header" data-scroll>
                  <h1>Movies App!</h1>
              </div>

              <main class="main">
                <p>
                  <span class="input">
                    <input className="form-control form-control-lg" type="text"  onChange={this.searchHandler} placeholder="Search by title..."
                               value={this.state.key_word}/>
                    <span></span>
                 </span>
                </p>
              </main>
              <article className="card">
                    {this.state.Movies.filter(this.searchMovies(this.state.key_word)).map(Movie=>{
                  return (
                      <div className="Movies-list">
                          <ul className="card-body">
                            <div>
                                <li><h5 class='title'>Title : <small>{Movie.title}</small></h5></li>
                                <li><h5>Year : <small>{Movie.year}</small></h5></li>
                                <li><h5>Director : <small>{Movie.director}</small></h5></li>
                                <li><h5>Rate : <small>{Movie.rate}</small></h5></li>
                                <li><h5>Actors : <small>{Movie.actors}</small></h5></li>
                            </div>
                            <div>
                                <li><h5><img src={Movie.photo} /></h5></li>
                            </div>
                            <div class="vid-wrap">
                                <iframe src={Movie.vedio} frameborder="0" allowfullscreen></iframe>
                            </div>
                          </ul>
                      </div>
                        )
                      })
                    }
                </article>
                <div class="footer">
                  <h1> @2020 by <a href="https://salimohamed.me/">Sali Mohamed </a></h1>
                </div>



  </>
        )
    }
}
