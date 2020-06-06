import React from 'react'
import * as BooksAPI from './util/BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount(){
    this.fetchBooks()
  }

  /* componentDidUpdate(prevProps, prevState){
    if(JSON.stringify(prevState.books) !== JSON.stringify(this.state.books)){
      this.fetchBooks()
    }
  } */

  fetchBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books:books })
      })
  }

  toggleSearchPage = () =>{
    const newValue = !this.state.showSearchPage
    this.setState({ showSearchPage: newValue })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks onHideSearchPage={this.toggleSearchPage}/>
        ) : (
          <ListBooks books={books} onShowSearchPage={this.toggleSearchPage} />
        )}
      </div>
    )
  }
}

export default BooksApp
