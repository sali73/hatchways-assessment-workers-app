import React from 'react';
import axios from 'axios';

export default class WorkerList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Workers:[],
            List :[],
            key_word:'',
            on:false,
        }
    }
  componentDidMount() {
    axios.get(`https://www.hatchways.io/api/assessment/work_orders`)
      .then(res => {
        const Workers = res.data.orders;
        this.setState({ Workers });
      })
       axios.get(`https://www.hatchways.io/api/assessment/workers/1`)
      .then(res=> {
        const List = res.data.worker;
        console.log(List)
        this.setState({ List });
      })
  }

searchHandler = (e) => {
    this.setState({key_word:e.target.value}) ;
}

searchStudents = (keyWord) => {
    return x=>{
        return x.name.toLowerCase().includes(keyWord.toLowerCase())|| !keyWord;
    }
}

render(){
        return(
            <div className="container-fluid">
                <form>
                    <h2>Worker List! </h2>
                    <input className="form-control form-control-lg" type="text"  onChange={this.searchHandler} placeholder="Search by name..."
                           value={this.state.key_word}/>
                </form>

                {/*<div className='cards'>*/}
                {/*    {this.state.List && this.state.List.length > 0 ? this.state.List.map(items =>{*/}
                {/*        return <div className='card_inner' key={items.id}>*/}
                {/*            <ul className='worker-list'>*/}
                {/*                <li><h3>Name: {items.image}</h3></li>*/}
                {/*            </ul>*/}
                {/*            </div>;*/}
                {/*     }): "Loading..."}*/}
                {/*    }*/}
                {/*</div>*/}


                <div className="card">
                    {this.state.Workers.filter(this.searchStudents(this.state.key_word)).map(worker=>{
                        return (
                            <div className="workers-list">
                                <ul className="card-body">
                                   <li><h5>Name : <small>{worker.name}</small></h5></li>
                                    <li><h5>Description : <small>{worker.description}</small></h5></li>
                                    <li><h5>Deadline : <small>{worker.deadline}</small></h5></li>
                                    <li><h5>WorkerId : <small>{worker.workerId}</small></h5></li>
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