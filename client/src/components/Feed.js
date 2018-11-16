import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    loadBooks
} from './../redux/actions/actions'

const mapStateToProps = state => {
    //console.log(state);
    return {
        books: state.books.books.post
    }
}
class Feed extends Component {
    componentWillReceiveProps(nextProps) {
        
    }
        
    componentWillMount() {
        this.props.loadBooks()
    }
    

    render() {

        if (this.props.books) {
            var books = this.props.books.map(function (book) {            
                return (
                    
                    <div className="row m-5" key={book._id}>
                      <div className="col-md-12"> 
                          <div className="panel">
                          <div className="panel-body">
                                  <div className="row">    
                                  <div className="col-md-1 col-sm-2 text-center">
                                  </div>
                                  <div className="col-md-11 col-sm-10">
                                      <h3>{book.title} </h3>
                                      <div className="row">
                                      <div className="col-xs-9">
                                          <h4><span className="label label-default">{book.author}</span></h4>
                                              <small className="text-muted">
                                              <a href={`/bookview/${book._id}`} >Read More </a>
                                              </small>
                                          </div>
                                      <div className="col-xs-3"></div>
                                       </div>
                                        </div>
                                       </div>
                                   </div>
                              </div>                                               
                          </div>
                        </div>
                );
            });
          } 


            return ( 
                <div className="container"> {books}</div>
            ) 
        }
    }

export default connect(mapStateToProps, { loadBooks })(Feed);