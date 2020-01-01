
if (document.state == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    

    /*傳統的for迴圈*/

    // for (var i = 0; i < cartItemRemoveBtn.length; i++) {
    //     var btn = cartItemRemoveBtn[i];
    //     btn.addEventListener('click', function (event) {
    //         event.parentElement.remove();
    //     })
    // }

    /*ForEach不能中斷*/

    // cartItemRemoveBtn.forEach(btn => { 
    //     btn.addEventListener('click', function() {
    //         console.log(this);
    //         this.parentElement.remove();
    //     })
    // });

    /*獲取所有的購物車數量按鈕*/
    let cartInputs = document.querySelectorAll('.product-input');
    for (let cartInput of cartInputs) {
        cartInput.addEventListener('change', quanityChanged);
    }

    /*獲取所有的加入購物車按鈕*/
    let addToCarts = document.querySelectorAll('.addtocart');
    for (let addToCart of addToCarts) {
        addToCart.addEventListener('click', addItemToCartClicked);
        addToCart.addEventListener('click', cartShowClicked);
        addToCart.addEventListener('click', cartHaveItems);   

    }


    /*獲取所有的-號 */
    const minus = document.querySelectorAll('.no-add');
    minus.forEach(min => {

        min.addEventListener('click', quanityMinus);
    })
    // for(const min of minus){
    //     min.addEventListener('click', quanityMinus);
    // }

    /*獲取所有的+號 */
    const adds = document.querySelectorAll('.add');
    for (const add of adds) {
        add.addEventListener('click', quanityAdd);
    }

    /*獲取check out按鈕*/
    let checkOutBtn = document.querySelector('.check-out');
    checkOutBtn.addEventListener('click', checkOutBtnClicked);
    checkOutBtn.addEventListener('click', cartHaveItems);
    checkOutBtn.addEventListener('click', clearLocalStorage);
    /*獲取 購物車按鈕 cart-btn */
    const cartTopBtn = document.querySelector('.cart-btn');
    cartTopBtn.addEventListener('click', cartShowClicked);
    
   
    /*獲取搜尋按鈕 */
    let btn = document.querySelector('.btn');
    btn.addEventListener('click', fiterNames)
   
   
}

    function fiterNames() {
        let inputvalue = document.querySelector('.main-input').value.toUpperCase();

        let li = document.querySelectorAll('.product-card');
        for (let item of li) {
            let title = item.querySelector('.product-title').innerText;
            if (title.toUpperCase().indexOf(inputvalue) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        }
    }
    /*有三個方法可以判斷當前節點是否有子節點 */
    /*  node.firstChild !== null
        node.childNodes.length > 0
        node.hasChildNodes()
    */


    function quanityMinus() {
        alert(this)
        let input = this.parentElement.querySelector('.product-input');
        if (input.value > 1) input.value = parseFloat(input.value) - 1;

    }
    function quanityAdd() {
        let inputs = this.parentElement.querySelector('.product-input');
        if (inputs.value < 20) {
            inputs.value = parseFloat(inputs.value) + 1;
        }
    }
    function checkOutBtnClicked() {
        let cartItems = document.querySelector('.cartItem-container');
        const con = confirm('要前往結帳頁面嗎?');
        if (con == true) {
            /*如果有子節點，刪除所有的子節點 */
            while (cartItems.firstChild) {
                cartItems.removeChild(cartItems.firstChild);
            }
            updateCartTotal();
        }
    }
    /* 如果購物車不是空的 那就show出 訂單結帳跟 total  以及把 您的購物車是空的 用不見*/
    function cartHaveItems() {
        const carts = document.querySelector('.cartItem-container');
        const empty = document.querySelector('.cart-empty');
        const total = document.querySelector('.cart-total');
        const check = document.querySelector('.check-out-btn');

        if (carts.firstChild) {
            empty.style.display = 'none';
            total.style.display = "flex";
            check.style.display = 'block';
        } else {
            empty.style.display = 'block';
            total.style.display = "none";
            check.style.display = 'none';
        }

    }

    function cartShowClicked() {
        let sideBar = document.querySelector('.cart-sidebar');
        let modal = document.querySelector('.modal-back');
        modal.style.display = 'block';
        sideBar.classList.add('sidebar-show');
        /*點空白處讓 pop up 不見  */
        modal.addEventListener('click', function () {
            modal.style.display = 'none';
            sideBar.classList.remove('sidebar-show');
        }, false)
    }



    
/*清除LocalStorage裡面的資料 */
function clearLocalStorage() {
    localStorage.clear();
    
}

function removeItem() {
    this.parentElement.remove();
    //刪除某item之後要更新total的資料
    updateCartTotal();
    const carts = document.querySelector('.cartItem-container');
    const empty = document.querySelector('.cart-empty');
    const total = document.querySelector('.cart-total');
    const check = document.querySelector('.check-out-btn');

    console.log(carts.childNodes.length);

    if (carts.childNodes.length <= 1) {
        empty.style.display = 'block';
        total.style.display = "none";
        check.style.display = 'none';
        clearLocalStorage()
    }
    
}

function quanityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        alert('該數量不適用，請填入有效的數量。');
        input.value = 1;
    } else if (input.value > 20) {
        alert('您所填寫的商品數量超過庫存。');
        input.value = 1;
    }
}

function addItemToCartClicked(event) {
    /*這些是上方 商品區的資料*/
    event.preventDefault();

    let cartItem = event.target.parentElement;
    let addToCartTitle = cartItem.querySelector('.product-title').innerText;
    let addToCartImage = cartItem.querySelector('.product-image').src;
    let addToCartPrice = cartItem.querySelector('.product-price').innerText;
    let addToCartInput = cartItem.querySelector('.product-input').value;

    let selectSize = cartItem.querySelector(".select-size").value;
    let addToCartSize = selectSize;

    let selectColor = cartItem.querySelector(".select-color").value;
    let addToCartColor = selectColor;



    addItemToCart(addToCartTitle, addToCartImage, addToCartPrice, addToCartInput, addToCartSize, addToCartColor)

    updateCartTotal();

}


function addItemToCart(addToCartTitle, addToCartImage, addToCartPrice, addToCartInput, addToCartSize, addToCartColor) {
    
    let addItemToCartRow = document.createElement('div');
    let container = document.querySelector('.cartItem-container');

    addItemToCartRow.classList.add('cartItem');

    let newCartItems = container.querySelectorAll('.cartItem');
  

    /*如果購物車已經有相同的物品 還想加入購物車的話 就會兩個數值相加 */

    for (let newCartItem of newCartItems) {
        let cartItemName = newCartItem.querySelector('.cartItem-title');
        const cartItemColor = newCartItem.querySelector('.cartItem-color');
        const cartItemSize = newCartItem.querySelector('.cartItem-size');

        if (cartItemName.innerText == addToCartTitle && cartItemColor.innerText == addToCartColor && cartItemSize.innerText == addToCartSize) {
            let aaa =  newCartItem.querySelector('.cartItem-input').innerText;
            newCartItem.querySelector('.cartItem-input').innerText =  parseFloat(addToCartInput) + parseFloat(aaa);

            return; /*不return的話 會一直增加相同商品在下面*/

        }
    }
    
        // if (cartItemName.innerText == addToCartTitle) {
        //     if(cartItemColor.innerText == addToCartColor){
        //         if(cartItemSize.innerText == addToCartSize){
        //             newCartItem.querySelector('.cartItem-input').innerText = parseFloat(newCartItem.querySelector('.cartItem-input').innerText) + parseFloat(addToCartInput);
        //             return; /*不return的話 會一直增加相同商品在下面*/
        //         }
        //     }
        // }

    

    


    let addItemToCartRowContent = `
            <div>
                <img class="cartItem-img" src=${addToCartImage} alt="">
            </div> 
            <div class="cartItem-detail">
                <div class="cartItem-title">${addToCartTitle}</div>
                <div class="cartItem-size">${addToCartSize}</div>
                <div class="cartItem-color">${addToCartColor}</div>
                <span class="cartItem-input">${addToCartInput}</span>
                <span> x </span>
                <span class="cartItem-price">${addToCartPrice}</span>
            </div>
            <button class="cartItem-remove">刪除</button>`
    //  <input class="cartItem-input"type="number" value=${addToCartInput}>



    addItemToCartRow.innerHTML = addItemToCartRowContent;


    container.append(addItemToCartRow);





    addItemToCartRow.querySelector('.cartItem-remove').addEventListener('click', removeItem);


}


function updateCartTotal() {
    let cartItemContainer = document.querySelector('.cartItem-container');
    let cartRows = cartItemContainer.querySelectorAll('.cartItem');

    let cartTotalPrice = 0;

    for (let cartRow of cartRows) {

        let cartPrice = cartRow.querySelector('.cartItem-price');
        let cartQuantity = cartRow.querySelector('.cartItem-input');


        /*replace會返回一個新字串，原來的字串不會被修改 */
        /*parseFloat會把字串轉浮點數 */
        let price = parseFloat(cartPrice.innerText.replace('NT$', ''));

        // let price = cartPrice.innerText.slice(1).trim();
        let quanity = cartQuantity.innerText;


        cartTotalPrice = cartTotalPrice + (price * quanity);

        /* 第一次 cartTotalPrice = 0 + 300 = 300 */
        /* 第二次 cartTotalPrice = 300 + 300 = 600*/

    }
    document.querySelector('.cart-total-price').innerText = 'NT$' + cartTotalPrice;
}
