let myLibrary = [];

const getBookForm_Info = document.getElementById("getBookForm");
const displayBooks_Info = document.getElementById("displayBooks");
const addBut   = document.getElementById("addButton");

class Book {
  constructor(title, author, pages,read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  toggleStatus() {
    this.read = !(this.read)
  }

  

}

const saveBook = () => {
	const title  = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const nbPages= document.getElementById("nbPages").value;
	const read   = document.getElementById("checked").checked;

	const book1 = new Book(title, author,nbPages,read);
    myLibrary.push(book1);
    setMyLibrary()
}

const setMyLibrary = () => {
  let myLibrary_serialized =JSON.stringify(myLibrary)
  localStorage.setItem("myLibrary",myLibrary_serialized);
}

const getMyLibrary = () => {
  let myLibrary_deserialized
  if (localStorage.getItem("myLibrary")) {
    myLibrary_deserialized = JSON.parse(localStorage.getItem("myLibrary")).map((book) =>
      Object.assign(new Book(), book),
    );
  }
	return myLibrary_deserialized
}

const render = () => {
    let  objLibrary = getMyLibrary();

    if (objLibrary && objLibrary.length){
      	myLibrary = objLibrary
      	let mytext = "";
      	for (let i = 0;i < myLibrary.length;i++){
    		  mytext += "<div class = 'card'><h3>Title : "+myLibrary[i].title+
    		"</h3><p>Author : "+myLibrary[i].author+"</p><p>Pages : "+myLibrary[i].pages+
    		"</p>";
    		if (myLibrary[i].read){
    			 mytext+= "<label>You read it?</label><input type='checkbox' checked  class = 'status' id= 'i"+i.toString()+"'>"
    		}else{
    			mytext += "<label>You read it ?</label><input type='checkbox'  class = 'status' id = 'i"+i.toString()+"'>"
    		}
    		mytext += "<button class = 'delButton bad-button' onclick = 'deleteBook' id ="+i.toString()+" >Delete Book</button></div>";
    		displayBooks_Info.innerHTML = mytext;
        }
        info3 = document.getElementsByClassName("delButton");
        info4 = document.getElementsByClassName("status");
        for (i = 0;i<info3.length;i++){
    		info3[i].addEventListener("click",deleteBook);
    		info4[i].addEventListener("click", changeReadStatus);
		}
    } else {
    	displayBooks_Info.innerText = "Empty Library"
    }
    
}

const deleteBook = () => {
   let conf = confirm("Are you sure?");
   if (conf){
   	myLibrary.splice(this.id,1);
  	localStorage.clear();
  	setMyLibrary();
   	render();
   }  
}

function changeReadStatus ()  {
    let myInput = Number(this.id[1]);
    myLibrary[myInput].toggleStatus();
    localStorage.clear();
    setMyLibrary();
  }

const addBookToLibrary = () => {
    getBookForm_Info.style.display = "block";
    addBut.addEventListener("click",saveBook);
}

const cancleBookForm = () => {
  getBookForm_Info.style.display = 'none';
}

const removeAllBook = () => {
  let conf = confirm("Are you sure you want to clear your library?");
  if (conf) {
    localStorage.clear();
    myLibrary = [];
    displayBooks_Info.innerHTML = "<div id = 'displayBooks'>Empty Library</div>"
  }
}