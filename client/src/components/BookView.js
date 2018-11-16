import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    getBook
} from './../redux/actions/actions'


const mapStateToProps = state => {
    return {
        book: state.books.book.book
    }
}
class BookView extends Component {

    componentWillMount() {
        this.props.getBook(this.props.match.params.id)
    }    

    render() {

        if (this.props.book) {
        const { author, genre,  title } = this.props.book
      
        let author_name, book_title, book_genre
        if (title) {
            author_name = author;
            book_title = title;
            book_genre = genre;
        }
   
        return ( 
            <div className="container m-5"> 
                <div className="row">
                    <div className="col-md-12"> 
                    
                    <div className="panel">
                        <div className="panel-body">
                            <div className="row">    
                                <div className="col-md-2 col-sm-3 text-center">
                                    no picture
                                </div>
                                <div className="col-md-10 col-sm-9">
                                <h3>{book_title}</h3>
                                <div className="row">
                                    <div className="col-xs-9">
                                    <h4>
                                    <span className="label label-default">{author_name}</span>
                                    </h4>
                                    <p>{book_genre}</p>
                                    </div>
                                    <div className="col-xs-3"></div>
                                </div>
                                    no description
                                </div>
                            </div>
                        </div>
                    </div>                                         
                    </div>
                </div>
           </div> 
        );
    }  else {
        return ( 
            <div>No details</div>
            )
    }    
  }
  
}

export default connect(mapStateToProps, { 
    getBook
})(BookView);