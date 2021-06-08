const STORAGE_KEY = "BOOKS_APPS";

let books = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(search="") {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null){
        if(search){
            books = data.filter((a) => a.title === search);

            console.log(search)
        }else{
            books = data;
        }
    }
        

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeTodoObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findTodo(todoId) {
    for (todo of books) {
        if (todo.id === todoId)
            return todo;
    }
    return null;
}


function findTodoIndex(todoId) {
    let index = 0
    for (todo of books) {
        if (todo.id === todoId)
            return index;

        index++;
    }

    return -1;
}


function refreshDataFromTodos() {
    let listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    listUncompleted.innerHTML = "";
    listCompleted.innerHTML = "";


    for (book of books) {
        const newBook = makeTodo(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;


        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}
