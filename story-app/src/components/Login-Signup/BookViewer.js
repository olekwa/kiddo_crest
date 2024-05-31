import React from 'react';
// import './BookViewer.css'

const BookViewer = ({ book, onClose }) => {
  if (!book) return null;
  return (
    <div className='book-viewer-overlay'>
      <div className='book-viewer'>
        <button className='close-button' onClick={onClose}>
          Close
        </button>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
        {book.content && (
          <iframe
            src={book.content}
            title={book.title}
            className='book-content'
            width='100%'
            height='500px'
          />
        )}
        {book.audio && (
          <audio controls>
            <soource src={book.audio} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};
export default BookViewer;
