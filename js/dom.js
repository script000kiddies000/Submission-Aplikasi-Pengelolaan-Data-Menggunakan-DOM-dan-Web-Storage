const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "itemId";

const checkbox = document.getElementById("inputBookIsComplete");
checkbox.addEventListener("click", function(){
    button = document.querySelector("#bookSubmit span");
    if(checkbox.checked){
        button.innerText = "selesai dibaca";
    }else{
        button.innerText = "Belum selesai dibaca";
    }
    
});

function addTodo() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;
    const BookIsComplete = document.getElementById("inputBookIsComplete").checked;

    // console.log("book title " + BookTitle);
    // console.log("book author " + BookAuthor);
    // console.log("book year " + BookYear);
    // console.log("is complete " + BookIsComplete);

    var book = makeTodo(BookTitle, BookAuthor, BookYear, BookIsComplete);
    var bookObject = composeTodoObject(BookTitle, BookAuthor, BookYear, BookIsComplete);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(BookIsComplete){
        listCompleted.append(book);
    }else{
        uncompletedBOOKList.append(book);
    }

    updateDataToStorage();

}

function makeTodo(title, author, year, isComplete) {
     
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;
 
    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.innerText = year;
 
    const container = document.createElement("article");
    container.classList.add("book_item")
    container.append(textTitle, textAuthor, textYear);
 

    //buat bikin div class action
    const containerAction = document.createElement('div');
    containerAction.classList.add('action');

    //bikin tombol selesai dan masukkan ke container action
    if(isComplete){
        containerAction.append(createUndoButton(), createTrashButton());
    }else{
        containerAction.append(createCheckButton(), createTrashButton());
    }

    //masukkan container action ke container book_item
    container.append(containerAction);

    return container;
}

//list create button
function createCheckButton() {
    return createButton("Selesai dibaca","green", function(event){
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

function createTrashButton() {
    return createButton("Hapus buku","red", function(event){
        removeBookFromUncompleted(event.target.parentElement.parentElement);
    });
}

function createUndoButton() {
    return createButton("Belum selesai di Baca","green", function(event){
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}
//endlist create button


// universal function
function createButton(buttonText, buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(bookElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const BookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const BookAuthor = bookElement.querySelectorAll(".book_item > p")[0].innerText;
    const BookYear = bookElement.querySelectorAll(".book_item > p")[1].innerText;
    const BookIsComplete = true;

 
    const newBook = makeTodo(BookTitle, BookAuthor, BookYear, BookIsComplete);
    const book = findTodo(bookElement[BOOK_ITEMID]);

    todo.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
} 


function removeBookFromUncompleted(bookElement) {
    const bookPosition = findTodoIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(bookElement){
    const BookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const BookAuthor = bookElement.querySelectorAll(".book_item > p")[0].innerText;
    const BookYear = bookElement.querySelectorAll(".book_item > p")[1].innerText;
    const BookIsComplete = false;
 
    const newBook = makeTodo(BookTitle, BookAuthor, BookYear, BookIsComplete);
    const book = findTodo(bookElement[BOOK_ITEMID]);

    todo.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
 
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}