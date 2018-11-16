import React, { Component } from 'react';
import axios from 'axios'


class AddBook extends Component {  
  constructor(props) {
    super(props);
    
    this.state = {
        title: '',
        genre: '',
        author: '',
        response: ''
      };
    
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {

     const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/admin/"
    
     axios.post(`${_url}addBooksSubmit`, {
      title: this.title.value,
      genre: this.genre.value,
      author: this.author.value
    })
     .then((res) => {
       this.setState({
        response: ' You successfully added the book! ',

       })
     }).catch((err)=>{console.log(err); this.setState({submitted: false})})

      e.preventDefault();
  }

  render() {

    return (
        <div className="container m-5">
          <div className="row">
               { this.state.submitted }
            
            <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                            onChange={this.onHandleChange}
                            ref={(title) => this.title = title} 
                            type="text"  
                            className = "form-control"
                            placeholder="Book title"
                            />
                    </div>
                    
                    <div className="form-group">
                            <label htmlFor="genre">Genre</label>
                            <input type="text"   className = "form-control" ref={(genre) => this.genre = genre}/>
                    </div>
                    
                    <div className="form-group">
                            <label htmlFor="genre">Author</label>
                            <input type="text"   className = "form-control" ref={(author) => this.author = author}/>
                    </div>
                    <p>{ this.state.response }</p>
                    <input type="submit" value="Add book" className = "btn" />
            </form>
          </div>
        </div>
    );
  }
}

export default AddBook;
