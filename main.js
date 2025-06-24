function loadList(){
    document.getElementById("todoList").innerHTML = "";
    todos = JSON.parse(localStorage.getItem("todoItems")) || []
    todos.forEach((element, index) => {
        document.getElementById("todoList").innerHTML += `<div class=\"todoItem\">  ${element} <button onclick=deleteItem(${index})>Delete</button></div>`;
    });
}

function deleteItem(index){
    todos = JSON.parse(localStorage.getItem("todoItems")) || []
    todos.splice(index, 1)
    localStorage.setItem("todoItems", JSON.stringify(todos))
    loadList()
}

function getQuote() {
    return fetch("https://api.breakingbadquotes.xyz/v1/quotes")
        .then(response => response.json())
        .then(data => document
        .getElementById("quoteBox")
        .innerHTML = data[0].quote + "<br><i>-" + data[0].author + "</i>");
}

function validateAndStoreForm(){
    x = document.forms["todoForm"]["Description"].value
    if(x == ""){
        alert("No Description");
    }
    else{
        const todos = JSON.parse(localStorage.getItem("todoItems")) || [];
        console.log(todos)
        todos.push(x);
        localStorage.setItem("todoItems", JSON.stringify(todos))
        document.forms["todoForm"].reset()
        loadList()
    }
    return false
}