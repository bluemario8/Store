let cart = new Map();
const mapTemplate = new Map([["name", ""], ["image", "img.png"], 
                    ["price", "$"], ["quantity", 0]]);

const cartBar = document.body.getElementsByClassName("cart-items")[0];


cart.set("coffee_cup", new Map([["name", "Coffee Cup"], ["image", "Images/Cofee.png"], 
                    ["price", "$6.99"], ["quantity", 0]]));
// ^^^ test / temporary ^^^


function makeInnerHTML(id) {
    return `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src=` + cart.get(id).get("image") + ` width="100" height="100">
                <span class="cart-item-title">` + cart.get(id).get("name") + `</span>
            </div>
            <span class="cart-price cart-column">` + cart.get(id).get("price") + `</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="` + cart.get(id).get("quantity") + `">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`;
}

function addCartDisplayItem(id) {
    let item =  document.createElement("div");
    item.id = id;
    item.innerHTML = makeInnerHTML(id);
    cartBar.appendChild(item);
}

function updateCartDisplay() {

}

function cartAdd(id) 
{
    if (cart.has(id))
    {

    }
}

renderItem("coffee_cup");