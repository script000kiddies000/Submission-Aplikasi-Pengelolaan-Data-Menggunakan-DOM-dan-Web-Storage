const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";

function addTodo() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );


    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;
    const BookIsComplete = document.getElementById("inputBookIsComplete").checked;

    console.log("book title " + BookTitle);
    console.log("book author " + BookAuthor);
    console.log("book year " + BookYear);
    console.log("is complete " + BookIsComplete);

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
 
    const container = document.createElement("div");
    container.classList.add("book_item")
    container.append(textTitle, textAuthor, textYear);
 
    return container;
}