///to store grocery items

const groceryItems = [];

///inputs and button id's
const itemInput = document.getElementById("itemInput");
const priceInput = document.getElementById("priceInput");
const addButton = document.getElementById("addButton");
const totalButton = document.getElementById("totalButton");
const groceryList = document.getElementById("groceryList");
const totalPart = document.getElementById("totalPart");
const totalAmount = document.getElementById("totalAmount");


///all grocery to the html
function renderList() {
    groceryList.innerHTML = ""; 
    if(groceryItems.length === 0) return; 

    //display each item
    groceryItems.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-item";
        listItem.innerHTML = `
        <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-price$">${item.price.toFixed(2)}</div>
        </div>
        <button class="delete-button" onclick="deleteItem(${index})">Delete</button>
        `;
        groceryList.appendChild(listItem);
    });
}

//new item
function addItem() {
    const itemName = itemInput.value.trim();
    const itemPrice = parseFloat(priceInput.value);

    //to make sure user input something
    if(itemName === "") {
        alert("please enter a grocery item e.g beans");
        itemInput.focus();
        return;
    }

    if(isNaN(itemPrice) || itemPrice < 0) {
        alert("Please enter a valid price");
        priceInput.focus();
        return;
    }

    //push to add new item
    groceryItems.push({
        name: itemName,
        price: itemPrice
    });

    //show list after user add an item
    groceryList.style.display = "block";
    renderList();

    //re-render the list
    renderList();

    //clear input fields
    itemInput.value = "";
    priceInput.value ="";
    itemInput.focus();

    //hide total part after deletion
    totalPart.style.display = "none";


}

//delete or remove item from array
function deleteItem(index) {
    const itemName = groceryItems[index].name;
    if(confirm(`Are you sure you want to remove "${itemName}"?`)) {
        groceryItems.splice(index, 1);

        renderList();
        if (groceryItems.length === 0){
            groceryList.style.display = "none";
        }

        //hide totalpart after deletion
        totalPart.style.display = "none";
    }
}

//calculate total amount
function calculateTotal() {
    if (groceryItems.length === 0) {
        alert("your list is empty");
        return;
    }
    //reduce to add all prices
    const total = groceryItems.reduce((sum, item) => sum + item.price, 0);

    //display totalpart
    totalAmount.textContent = `${total.toFixed(2)}`;
    totalPart.style.display = "block";
}

//to add item when button is click
addButton.addEventListener("click", addItem);

//add  item when enter key is press
itemInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        addItem();
    }
});

priceInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        addItem();
    }
});

//calculate and display total sum when button is click
totalButton.addEventListener("click", calculateTotal);

   // Call render function when page loads
        //window.addEventListener('DOMContentLoaded', renderList);


