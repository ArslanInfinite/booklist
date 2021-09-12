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
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value
    event.preventDefault()
});