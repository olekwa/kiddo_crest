import React, { useEffect, useState } from 'react';
import './Books.css';
// import Cookies from 'js-cookie';
import BookViewer from './BookViewer';
import AudioPlayer from './AudioPlayer';
// import { AuthContext } from '../../components'

const Books = ({ searchTerm, isAuthenticated, onPromptLogin }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [selectedBook, setSelectedBook] = useState(null);
  const [audioPlayerData, setAudioPlayerData] = useState({
    visible: false,
    audioUrl: '',
    title: '',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      // const token = Cookies.get('authToken');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/library', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //   Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();
        // console.log('book data is:', data);
        setBooks(data);
        setFilteredBooks(data);
        const uniqueCategories = [
          'All',
          ...new Set(data.map((book) => book.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All') {
      setFilteredBooks(
        books.filter((book) => book.category === selectedCategory),
      );
    } else {
      setFilteredBooks(books);
    }
    setCurrentPage(1);
  }, [selectedCategory, books]);

  useEffect(() => {
    if (typeof searchTerm === 'string') {
      setFilteredBooks(
        books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setCurrentPage(1);
    }
  }, [searchTerm, books]);

  // const handleBookmark = (bookId) => {
  //   console.log(`Book ${bookId} added to bookmarks`);
  // };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleBookClick = (book) => {
    if (!isAuthenticated) {
      onPromptLogin();
      return;
    }
    if (book.content) {
      window.open(book.content, '_blank');
    } else {
      alert('No content available for this book');
    }
  };
  const handleAudioPlay = (book) => {
    if (!isAuthenticated) {
      onPromptLogin();
      return;
    }
    if (book.audio) {
      setAudioPlayerData({
        visible: true,
        audioUrl: book.audio,
        title: book.title,
      });
    } else {
      alert('No audio available for this book');
    }
  };
  const closeAudioPlayer = () => {
    setAudioPlayerData({ visible: false, audioUrl: '', title: '' });
  };

  const renderBooks = (booksToRender) => {
    return booksToRender.map((book) => (
      <div key={book.id} className='book-card'>
        <img
          src={book.book_cover_image}
          alt={book.title}
          className='book-cover'
          onClick={() => handleBookClick(book)}
        />
        <div className='book-info'>
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Description:</strong>
            {book.description}
          </p>
          {book.audio && (
            <button onClick={() => handleAudioPlay(book)}>Play Audio</button>
          )}
          {/* <button onClick={() => handleBookmark(book.id)}>Bookmark</button> */}
        </div>
      </div>
    ));
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className='books-container'>
      <div className='categories-column'>
        <h3>Categories</h3>
        <ul className='categories-list'>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className='books-column'>
        <div className='books-list'>{renderBooks(currentBooks)}</div>
        <div className='pagination'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {selectedBook && (
        <BookViewer book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
      {audioPlayerData.visible && (
        <AudioPlayer
          audioUrl={audioPlayerData.audioUrl}
          title={audioPlayerData.title}
          onClose={closeAudioPlayer}
        />
      )}
    </div>
  );
};
export default Books;
