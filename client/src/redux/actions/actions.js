import axios from 'axios'


const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/"
export function loadBooks () {
    return (dispatch) => {
        axios.get(`${url}books`)
        .then((res) => {
            let books = res.data
             console.log(books);
            dispatch({type:'LOAD_BOOKS', books})
        }).catch((err) => {
            console.log(err)
        })
    }
}

export function getBook (book_id) {
    return (dispatch) => {
        axios.get(`${url}books/${book_id}`)
        .then((res) => {
            let book = res.data
            dispatch({type: 'VIEW_BOOK', book})
        }).catch((err) => console.log(err))
    }
}