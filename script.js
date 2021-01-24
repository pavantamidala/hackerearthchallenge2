let container = document.getElementById('container')
let cartButton = document.getElementById("cart")
let cartContainer = document.getElementById("cart-books")
let allBooks = []
let cartArray = []
let buyButton = document.getElementsByClassName("buy-btn")
let items = document.getElementById('items')
let allBooksShowBtn = document.getElementById('show-allbooks')
let clickedTimes = 0
let totalItems = 0
let searchField = document.getElementById('search')
let searchButton = document.getElementById('search-btn')
let searchContainer = document.getElementById('search-container')
window.addEventListener("load",function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            allBooks=JSON.parse(xhttp.responseText)
            for (let obj of allBooks) {
                
                let div = document.createElement('div')
                div.innerHTML = bookComponent(obj)
                container.appendChild(div)
            }
            addEventToBtn()
            
        }
    };
    xhttp.open("GET", "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json", true);
    xhttp.send();
    
})

function bookComponent(obj){
    return `<div class="box">
        <h2 class="titile"> ${obj.title} </h2>
        <span class="rating badge"> ${obj.average_rating}/5  </span> <span> by ${obj.ratings_count} users </span>
        <h3 class="author"> ${obj.authors} </h3>
        <h2 class="price"> ${obj.price} Rs </h2>
        <button type="button" class="buy-btn btn btn-secondary" data-bookid="${obj.bookID}">Add to cart</button>
    </div>
    <hr/>`
}

function addEventToBtn(){
    for (let button of buyButton) {
        button.addEventListener('click', function () {
            let id =button.dataset.bookid
            loopingAllBookArray(id)
            button.parentElement.remove()
        })
    }
}
function loopingAllBookArray(id){
    for (let obj of allBooks) {
        if (String(obj.bookID) === id) {
           
            cartArray.push(obj)
        }
    }
     totalItems = cartArray.length
    items.innerText = totalItems
}

cartButton.addEventListener('click',function(){
    container.style.display = 'none'
    searchContainer.style.display = 'none'
    allBooksShowBtn.style.display = "block"
    clickedTimes = clickedTimes +1
    container.style.display = 'none'
    cartContainer.style.display = "block"
    if(cartArray.length !== 0 ){
        for(let book of cartArray){
            let div = document.createElement('div')
            div.innerHTML = cartBookComponent(book)
            cartContainer.appendChild(div)
        }
    }else{
        cartContainer.innerHTML =  `<h1>your cart is empty</h1>`
    }
    cartButton.style.display = 'none'
})
function cartBookComponent(obj) {
    return `<div class="box">
        <h2 class="titile">${obj.title} </h2>
        <span class="rating badge">${obj.average_rating}/5  </span> <span > by ${obj.ratings_count} </span>
        <h3 class="author">${obj.authors} </h3>
        <h2 class="price"> ${obj.price} Rs </h2>
        <button type="button" class="btn btn-secondary" style="display:none;" data-bookid="${obj.bookID}"></button>
    </div>
    <hr/>`
}

allBooksShowBtn.addEventListener('click',function(){
    cartContainer.innerHTML = ""
    searchContainer.innerHTML = ""
    container.style.display = 'block'
    cartButton.style.display = 'block'
})

searchButton.addEventListener('click',function(e){
    container.style.display = "none"
    let val = searchField.value 
    let serarchResultArr = []
    for(let obj of allBooks){
        
        if(String((obj.title)).includes(val)){
            serarchResultArr.push(obj)
        }
    }
    console.log(serarchResultArr)
    searchContainer.style.display = "block"
    for(let obj of serarchResultArr){
        let div = document.createElement('div')
        div.innerHTML = bookComponent(obj)
        searchContainer.appendChild(div)
    }
    
    searchField.value = ''
})

