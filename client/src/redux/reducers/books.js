// src/redux/reducers/articles.js
const initialState = {
    books: [],
    book: []
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_BOOKS' :
        return {
            ...state,
            books: action.books
        }
        case 'VIEW_BOOK':
        return {
            ...state,
            book: action.book
        }
        default:
            return state
    }
}