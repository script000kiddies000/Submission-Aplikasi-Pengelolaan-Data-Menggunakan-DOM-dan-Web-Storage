function addTodo() {
    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookYear = document.getElementById("inputBookYear").value;
    const BookIsComplete = document.getElementById("inputBookIsComplete").checked;

    console.log("book title " + BookTitle);
    console.log("book author " + BookAuthor);
    console.log("book year " + BookYear);
    console.log("is complete " + BookIsComplete);

}