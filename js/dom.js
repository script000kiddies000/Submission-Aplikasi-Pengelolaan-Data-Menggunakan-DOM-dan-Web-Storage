const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 

function addTodo() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );


    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;
    const BookIsComplete = document.getElementById("inputBookIsComplete").checked;

    // console.log("book title " + BookTitle);
    // console.log("book author " + BookAuthor);
    // console.log("book year " + BookYear);
    // console.log("is complete " + BookIsComplete);

    const book = makeTodo(BookTitle, BookAuthor, BookYear);
    uncompletedBOOKList.append(book);


}

function makeTodo(title, author, year) {
     
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
    containerAction.append(createCheckButton());

    //masukkan container action ke container book_item
    container.append(containerAction);

    return container;
}

function createCheckButton() {
    return createButton("Selesai dibaca","green", function(event){
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}


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
    const BookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const BookAuthor = bookElement.querySelectorAll(".book_item > p")[0].innerText;
    const BookYear = bookElement.querySelectorAll(".book_item > p")[1].innerText;
    const BookIsComplete = true;

 
    const newBook = makeTodo(BookTitle, BookAuthor, BookYear);

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    listCompleted.append(newBook);
    bookElement.remove();
} 