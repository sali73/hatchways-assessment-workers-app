import React from 'react';
import axios from 'axios';

export default class WorkerList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Workers:[],
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
            <div>
                <form>
                    <input type="text"  onChange={this.searchHandler} placeholder="Search by name..."
                           value={this.state.key_word}/>
                </form>

                {/*{this.state.students.map(person=>{*/}
                {/*    return(*/}
                {/*        person.name*/}
                {/*    )*/}
                {/*})}*/}

                {this.state.Workers.filter(this.searchStudents(this.state.key_word)).map(worker=>{
                    return (
                        <ul>
                           <li>name : {worker.name}</li>
                            <li>description : {worker.description}</li>
                            <li>deadline : {worker.deadline}</li>
                            <li>workerId : {worker.workerId}</li>
                        </ul>
                    )
                })
                }
            </div>
        )
        }
}