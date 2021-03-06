class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
  
  class UI {
    addBookToList(book) {
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
      `;
    
      list.appendChild(row);
    }
  
    showAlert(message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.container');
      // Get form
      const form = document.querySelector('#book-form');
      // Insert alert
      container.insertBefore(div, form);
  
      // Timeout after 3 sec
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteBook(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
    }
  }
 
  // local storage class - to add or remove an instantiating item to or from the local storage
  
  class Store {
    // getBooks() responsible for fetching books from local storage
    // if books === null, then books will be an empty array since it doesn't exist yet
    // if there are any books then the books will be parsed as a JSON object 
    static getBooks(){
      let books
      if(localStorage.getItem('books') === null){
        books = []
      } else {
        books = JSON.parse(localStorage.getItem('books'))
      }
      return books
    }

    static displayBooks(){
      // get books from the static Store getbooks method
      const books = Store.getBooks()
      // loop through each book and display it on the UI
      books.forEach(function(book){
        // instantiate a new UI object to put the books onto
        const ui = new UI()
        // add book to UI
        ui.addBookToList(book)
      })
    }

    static addBook(book){
      const books = Store.getBooks()
      books.push(book)
      localStorage.setItem('books', JSON.stringify('books'))
    }

    static removeBook(){}
  }

  // on DOM load event
  document.addEventListener('DOMContentLoaded', Store.displayBooks)

  // Event Listener for add book
  document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
  
    // Instantiate book
    const book = new Book(title, author, isbn);
  
    // Instantiate UI
    const ui = new UI();
  
    console.log(ui);
  
    // Validate
    if(title === '' || author === '' || isbn === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add book to list
      ui.addBookToList(book);

      // add to local storage, as static methods

      Store.addBook(book)
  
      // Show success
      ui.showAlert('Book Added!', 'success');
    
      // Clear fields
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  // Event Listener for delete
  document.getElementById('book-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteBook(e.target);
  
    // Show message
    ui.showAlert('Book Removed!', 'success');
  
    e.preventDefault();
  });