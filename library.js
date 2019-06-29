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
function saveBook(){
	var title  = document.getElementById("title").value;
	var author = document.getElementById("author").value;
	var nbPages= document.getElementById("nbPages").value;
	var read   = document.getElementById("checked").checked;

	var book1 = new Book(title, author,nbPages,read);
    myLibrary.push(book1);
    setMyLibrary()
}
function getMyLibrary(){
	let myLibrary_deserialized = JSON.parse(localStorage.getItem("myLibrary")).map((book) =>
      Object.assign(new Book(), book),
    );
	return myLibrary_deserialized

}
function setMyLibrary(){
	let myLibrary_serialized =JSON.stringify(myLibrary)
	localStorage.setItem("myLibrary",myLibrary_serialized);
}
function render(){
    let  objLibrary = getMyLibrary();

    if (objLibrary.length > 0){
      	myLibrary = objLibrary
      	var mytext = "";
      	for (var i = 0;i < myLibrary.length;i++){
    		  mytext += "<div class = 'card'><h3>Title : "+myLibrary[i].title+
    		"</h3><p>Author : "+myLibrary[i].author+"</p><p>Pages : "+myLibrary[i].pages+
    		"</p>";
    		if (myLibrary[i].read){
    			 mytext+= "<label>you read it ?</label><input type='checkbox' checked  class = 'status' id= 'i"+i.toString()+"'>"
    		}else{
    			mytext += "<label>you read it ?</label><input type='checkbox'  class = 'status' id = 'i"+i.toString()+"'>"
    		}
    		mytext += "<button class = 'delButton' onclick = 'deleteBook' id ="+i.toString()+" >Delete Book</button></div>";
    		info2.innerHTML = mytext;
        }
        info3 = document.getElementsByClassName("delButton");
        info4 = document.getElementsByClassName("status");
        for (i = 0;i<info3.length;i++){
    		info3[i].addEventListener("click",deleteBook);
    		info4[i].addEventListener("click",changeReadStatus);
		}
    }else{
    	info2.innerText = "Empty Library"
    }
    
}


function addBookToLibrary() {
  // do stuff here
    info1.style.display = "block";
    but1.addEventListener("click",saveBook);
}
