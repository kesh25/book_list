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

    showAlert(msg, className) {
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

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI;

            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }


}

// DOM load 
document.addEventListener('DOMContentLoaded', function () {
    Store.displayBooks();
})

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
        // add to local storage 
        Store.addBook(book);
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
    // remove from local storage 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book removed!', 'success');


    e.preventDefault();
})


// new additiona
const btn = document.querySelector('button');

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

btn.onclick = function () {
    const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = rndCol;
}

// OOPJS
function Person(first, last, age, gender, interests) {
    this.name = {
        first: first,
        last: last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    this.bio = function () {
        let pronoun;
        if (this.gender === 'male') {
            pronoun = 'He';
        } else if (this.gender === 'female') {
            pronoun = 'She';
        } else {
            pronoun = 'They';
        }

        let interests = this.interests;
        const lastItem = interests.pop()
        let interestsString = interests.join(', ') + ', and ' + lastItem;

        alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. ' + pronoun + ' likes ' + interestsString + '.');
    };
    this.greeting = function () {
        alert('Hi! I\'m ' + this.name.first + '.');
    };
}

let person1 = new Person('Bob', 'Smith', 32, 'female', ['music', 'cooking', 'traveling', 'skiing', 'driving']);
Person.prototype.farewell = function () {
    alert(this.name.first + ' has left the building. Bye for now!');
};