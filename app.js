// book constructor 
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    // create tr 
    const row = document.createElement('tr');
    // insert cols 
    row.innerHTML = `
        <td>${book.title}</td> 
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}


// UI show alert
UI.prototype.showAlert = function (msg, className) {
    // create div 
    const div = document.createElement('div');
    // add class
    div.className = `alert ${className}`;
    // aadd test 
    div.appendChild(document.createTextNode(msg));
    // get parent 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 1500)
}
// Delete Book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

// event listeners 
document.getElementById('book-form').addEventListener('submit', function (e) {
    // get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    // instantiate book 
    const book = new Book(title, author, isbn);
    // instantiate UI 
    const ui = new UI();
    // validate 
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please enter all fields!!', 'error')
    } else {
        // add book to list 
        ui.showAlert('Book added!!', 'success')
        ui.addBookToList(book);
        // clear fields 
        ui.clearFields();
    }


    e.preventDefault();
});

// event listenter /delegation 
document.getElementById('book-list').addEventListener('click', function (e) {
    // instantiate 
    const ui = new UI();

    ui.deleteBook(e.target);
    ui.showAlert('Book removed!', 'success');


    e.preventDefault();
})