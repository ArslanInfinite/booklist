// Book Constructor - for creating the book objects

function Book(title, author, isbn){
    this.title = title
    this.author = author
    this.isbn = isbn
}

// UI Constructor - for methods regarding adding books to list, deleting books, showing alerts, etc

function UI(){}

// adding method to UI function to add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list')
// creating table row element to put new books onto in the UI
    const row = document.createElement('tr')
// inserting columns into the table
row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class=delete>X<a></td>
`
list.appendChild(row)
}

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
// clearing fields after submit
UI.prototype.clearFields = function(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}
event.preventDefault()
});