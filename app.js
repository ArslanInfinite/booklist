// Book Constructor
function Book(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
  
  // UI Constructor - add or remove books from list, showing alerts on the user interface, etc
  function UI() {}
  
  // adding book to list on the DOM
  UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list')
    // creating the table row element 
    const row = document.createElement('tr')
    // creating columns on the table to continuously show new books added
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `
  
    list.appendChild(row)
  }
  
  // adding alert to the UI prototype in the form of creating new elements and appending them to the DOM
  UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div')
    // Add classes
    div.className = `alert ${className}`
    // Add text
    div.appendChild(document.createTextNode(message))
    // Get parent
    const container = document.querySelector('.container')
    // Get form
    const form = document.querySelector('#book-form')
    // Insert alert
    container.insertBefore(div, form)
  
    // Timeout after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }
  
  // clearing user input fields by setting the values to empty strings
  UI.prototype.clearFields = function() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }

  // deleting book 
  UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
  }
  
  // event listener for adding book item
  // event listeners will take in the event and the action that needs to be taken
  // both the event and action will be the event listener's arguments
  document.getElementById('book-form').addEventListener('submit', function(event){
    // getting form values
    // the .value is literally what the user input is
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
  
    // instantiating a new book
    const book = new Book(title, author, isbn);
    console.log(book)
    // instantiating the new ui onto the DOM
    const ui = new UI();
  
    // checking for validations
    if(title === '' || author === '' || isbn === '') {
      // showing alert 
      ui.showAlert('Please fill in all fields', 'error')
    } else {
      // adding book to the list
      ui.addBookToList(book);
  
      // success message
      ui.showAlert('Book Added!', 'success')
    
      // clearing input fields after successful addition
      ui.clearFields()
    }
    event.preventDefault()
  });

  // event listener for deleting book item
  document.getElementById('book-list').addEventListener('click', function(event){
    const ui = new UI()
    ui.deleteBook(event.target)
    
    // showing alert after delete
    ui.showAlert('Book removed!', 'success')
    event.preventDefault()
  })

