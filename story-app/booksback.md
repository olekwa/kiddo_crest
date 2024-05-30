import React, { useEffect, useState } from 'react';
import './Books.css';
import Cookies from 'js-cookie';

const Books = () => {
const [books, setBooks] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [filteredBooks, setFilteredBooks] = useState([]);

useEffect(() => {
const fetchBooks = async () => {
const token = Cookies.get('authToken');
try {
const response = await fetch('http://127.0.0.1:8000/api/v1/library', {
method: 'GET',
// headers: {
// Authorization: `Token ${token}`,
// },
});
const data = await response.json();
console.log('book data is:', data);
if (Array.isArray(data)) {
setBooks(data);
setFilteredBooks(data);
} else {
console.error('Api response is not an array');
}
} catch (error) {
console.error('Error fetching books:', error);
}
};
fetchBooks();
}, []);

useEffect(() => {
setFilteredBooks(
books.filter((book) =>
book.title.toLowerCase().includes(searchTerm.toLowerCase()),
),
);
}, [searchTerm, books]);

const handleBookmark = (bookId) => {
console.log(`Book ${bookId} added to bookmarks`);
};

return (

<div className='books-container'>
<input
type='text'
placeholder='Enter book search term..'
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className='search-bar'
/>
<div className='books-categories'>
<div className='category'>
<h3>All Books</h3>
<div className='books-list'>
{filteredBooks.map((book) => (
<div key={book.id} className='book-item'>
<img src={book.book_cover_image} alt={`${book.title} cover`} />
<h4>{book.title}</h4>
<p>
<strong>Author:</strong>
{book.author}
</p>
<p>
<strong>Category:</strong>
{book.category}
</p>
<p>{book.description}</p>
<button onClick={() => handleBookmark(book.id)}>
Add to Bookmarks
</button>
</div>
))}
</div>
</div>
{/_ <div className='category'>
<h3>Age Range 6-10</h3>
<div className='books-list'>
{filteredBooks
.filter((book) => book.age_range === '0-5')
.map((book) => (
<div key={book.id} className='book-item'>
<h4>{book.title}</h4>
<button onClick={() => handleBookmark(book.id)}>
Add to Bookmarks
</button>
</div>
))}
</div>
</div> _/}
</div>
</div>
);
};
export default Books;
