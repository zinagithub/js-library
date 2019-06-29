let myLibrary = [];

var info1 = document.getElementById("getBookForm");
var info2 = document.getElementById("displayBooks");
var but1   = document.getElementById("addButton");
var but2   = document.getElementById("addBook");


function Book(title, author, pages,read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}
Book.prototype.toggleStatus = function() {
  this.read = !(this.read)
}