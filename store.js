let cart = new Map();
let cartTotal = "0.00";
const mapTemplate = new Map([["name", ""], ["image", "img.png"], 
                    ["price", "$"], ["quantity", 0]]);

const cartBar = document.body.getElementsByClassName("cart-items")[0];


// cart.set("coffee_cup", new Map([["name", "Coffee Cup"], ["image", "Images/Cofee.png"], 
//                     ["price", "$6.99"], ["quantity", 0]]));
// ^^^ test / temporary ^^^


function dollarToNum(price) { return Number(price.split("$").pop()); }

function makeInnerHTML(id) 
{
    return `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src=` + cart.get(id).get("image") + ` width="100" height="100">
                <span class="cart-item-title">` + cart.get(id).get("name") + `</span>
            </div>
            <span class="cart-price cart-column">` + cart.get(id).get("price") + `</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" onchange="updateQuantity(this)" type="number" 
                value="` + cart.get(id).get("quantity") + `" min="1" max="100">
                <button class="btn btn-danger" onclick="removeFromCart('` + id + `')" type="button">REMOVE</button>
            </div>
        </div>`;
}

function calculateTotal() 
{
    let total = 0;
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let inputs = cartItems.getElementsByClassName("cart-quantity-input");
    let prices = cartItems.getElementsByClassName("cart-price");
    let totalElem = document.getElementsByClassName("cart-total-price")[0];

    for (let i = 0; i < inputs.length; i++)
    {
        total += parseFloat( ( inputs[i].valueAsNumber * dollarToNum( prices[i].innerText ) ).toFixed(2) );
    }

    totalElem.innerText = "$" + total.toFixed(2);
}

function updateQuantity(data) 
{
    let quantity = parseInt(data.valueAsNumber);
    if (quantity > 100)
        quantity = 100;
    else if (isNaN(quantity) || quantity < 1)
        quantity = 1;

    data.value = quantity;
    calculateTotal();
}

function removeFromCart(id) 
{
    document.getElementById(id).remove();
    cart.delete(id);
    calculateTotal();
}

function purchase() 
{
    document.getElementsByClassName("cart-items")[0].innerHTML = "";
    cart = new Map();
    calculateTotal();
}

function addCartDiv(id) 
{
    let item =  document.createElement("div");
    item.id = id;
    item.innerHTML = makeInnerHTML(id);
    cartBar.appendChild(item);
}

function updateCartDiv(id) 
{
    let div = document.getElementById(id);
    div.innerHTML = makeInnerHTML(id);
}

function cartAdd(id, data) 
{
    let shopItems = document.getElementsByClassName("shop-item");
    let shopItem = "";

    for (let index = 0; index < shopItems.length; index++)
    {
        if (shopItems[index].getElementsByTagName("button")[0] == data)
            shopItem = shopItems[index];
    }

    if (cart.has(id))
    {
        shopItem.getElementsByClassName("shop-item-button")[0].innerText = "ALREADY IN CART";
        setTimeout(() => { 
            shopItem.getElementsByClassName("shop-item-button")[0].innerText = "ADD TO CART"; 
                         }, 2000);
    }
    else
    {
        cart.set(id, mapTemplate);
        cart.get(id).set("name", shopItem.getElementsByClassName("shop-item-title")[0].innerText);
        cart.get(id).set("image", shopItem.getElementsByClassName("shop-item-image")[0].src);
        cart.get(id).set("price", shopItem.getElementsByClassName("shop-item-price")[0].innerText);
        cart.get(id).set("quantity", 1);
        addCartDiv(id);
        calculateTotal();
    }
} // test
