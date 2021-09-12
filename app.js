// Book Constructor - for creating the book objects

function Book(title, author, isbn){
    this.title = title
    this.author = author
    this.isbn = isbn
}

// UI Constructor - for methods regarding adding books to list, deleting books, showing alerts, etc

function UI(){}

// Event listeners 

// grabbing book-form id and listening for a submit event
document.getElementById('book-form').addEventListener('submit', function(event){
// getting form values
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value
// instantiating new book
const book = new Book(title, author, isbn)
// instantiating UI display for book 
const ui = new UI()
ui.addBookToList(book)
event.preventDefault()
});