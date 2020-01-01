window.addEventListener('load',function (){
    updateCartTotal()    /*要加這行 不然F5  購物車金額會變成0 */
    // cartAmount();
    if(localStorage.getItem('cart-count') && localStorage.getItem('cart-count') === 'true') {
        cartAmount();
    }
})
  

/*傳統的for迴圈*/

// for (var i = 0; i < cartItemRemoveBtn.length; i++) {
//     var btn = cartItemRemoveBtn[i];
//     btn.addEventListener('click', function (event) {
//         event.parentElement.remove();
//     })
// }
/*獲取所有的-號 */
const minus = document.querySelectorAll('.box-info-bottom-no-add');
for (const min of minus) {
    min.addEventListener('click', quanityMinus);
}

/*獲取所有的+號 */
const adds = document.querySelectorAll('.box-info-bottom-add');
for (const add of adds) {
    add.addEventListener('click', quanityAdd);
}

/*獲取check out按鈕*/
const checkOutBtn = document.querySelector('.check-out');
checkOutBtn.addEventListener('click', checkOutBtnClicked);
/*remove cart toggle 要放這才會正常執行 */
// checkOutBtn.addEventListener('click', removeCartClass);
checkOutBtn.addEventListener('click', cartAmount); 

/*獲取 購物車按鈕 cart-btn */
const cartTopBtn = document.querySelector('.cart-btn');
cartTopBtn.addEventListener('click', cartShowClicked); 
cartTopBtn.addEventListener('click', updateCartTotal);    

/*獲取modal與sidebar*/
const sideBar = document.querySelector('.cart-sidebar');
const modal = document.querySelector('.modal-back');
modal.addEventListener('click', cartShowClicked, false);
/*點空白處讓modal不見 以及 讓購物車縮回去原來的位置 */
/*原理是點modal才會不見 */
function cartShowClicked() {
    modal.classList.toggle('block');
    sideBar.classList.toggle('sidebar-show');
}
/*點其他按鈕 購物車也會不見  */
function removeCartShowClicked() {
    modal.classList.remove('block');
    sideBar.classList.remove('sidebar-show');
}
/*獲取所有的購物車數量按鈕*/
const cartInputs = document.querySelectorAll('.box-info-bottom-input');
for (let cartInput of cartInputs) {
    cartInput.addEventListener('change', quanityChanged);
}
/*獲取購物車按鈕的數量提示 */
const cartItems = document.querySelector('.cartItem-container');

function cartAmount() {
    // let nodecount = cartItems.childNodes.length ;
    // console.log(`這是node${nodecount}`)
    // const childrenCount = cartItems.childNodes.length ;

    /*下面這一行 這種不能在function外面宣告 */
    let childrenCount = cartItems.children.length ; 
     /*下面這一行 這種可以在function外面宣告 */
    let cartItemAmount = document.querySelector('.cart-count');

    /*如果沒商品 就別顯示 0 在購物車按鈕上 */
    if(childrenCount > 0){
        cartItemAmount.innerText =  childrenCount ;
        cartItemAmount.classList.add('show-cart-count');
    }else{
        cartItemAmount.innerText = '';
        cartItemAmount.classList.remove('show-cart-count');
    }
    console.log(`這是購物車裡面的商品數量${childrenCount}`)
}


/*store cart toggle */
/*獲取 購物車是否為空的提示 以及 總金額 以及 結帳按鈕 */
const yourCartIsEmpty = document.getElementById('empty');
const yourTotalAndCheckOut = document.getElementById('ag');

/*本來應該放在下面 只是會用到購物車按鈕 就放這裡了 */
function removeCartClass() {
    yourCartIsEmpty.classList.remove('ng-hide');
    yourTotalAndCheckOut.classList.remove('block');
}
function addCartClass() {
    yourCartIsEmpty.classList.add('ng-hide');
    yourTotalAndCheckOut.classList.add('block');
}
/*重新整理後判斷google控制台是否有這筆資料 並且value的值是 true 才會加上class*/
if (localStorage.getItem('switch-state') && localStorage.getItem('switch-state') === "true") {
    addCartClass();
}

/*獲取所有的加入購物車按鈕*/
let addToCarts = document.querySelectorAll('.box-info-bottom-addtocart');

for (let addToCart of addToCarts) {
   
    addToCart.addEventListener('click', cartShowClicked);
    /*點加入購物車的按鈕後，先將金額及按鈕以及提示加上class */
    /*再用local storage 把值儲存起來 value為yourCartIsEmpty.classList.contains('ng-hide')*/
    /* 意思是 yourCartIsEmpty是否包含class 名稱為ng-hide 因為才剛加上class 所以為true*/
    addToCart.addEventListener('click', () => {
        addCartClass();
        localStorage.setItem('switch-state', yourCartIsEmpty.classList.contains('ng-hide'));
    });
    
    addToCart.addEventListener('click', (e) => {

        let cartItem = e.target.parentElement.parentElement.parentElement;
        let addToCartTitle = cartItem.querySelector('.box-info-top-right-title').innerText;
        let addToCartImage = cartItem.querySelector('.box-info-top-left-image').src;
        let addToCartPrice = cartItem.querySelector('.box-info-top-right-price').innerText;
        let addToCartInput = cartItem.querySelector('.box-info-bottom-input').value;
        let selectSize = cartItem.querySelector(".box-info-bottom-select-size").value;
        let addToCartSize = selectSize;

        let selectColor = cartItem.querySelector(".box-info-bottom-select-color").value;
        let addToCartColor = selectColor;

        let item = {
            'title': addToCartTitle,
            'image': addToCartImage,
            'price': addToCartPrice,
            'input': addToCartInput,
            'size': addToCartSize,
            'color': addToCartColor,

        }
        //add new item to the list
        appendItem(addToCartTitle, addToCartImage, addToCartPrice, addToCartInput, addToCartSize, addToCartColor)
        //add new item to the list
        arrayCart.push(item)
        //add the item to localStorage
        updateLocalStorage()
        /*update price */
        updateCartTotal();
    });
    addToCart.addEventListener('click', () => {
        cartAmount();
        localStorage.setItem('cart-count', true);
        // cartItems.children.length 
    });
    addToCart.addEventListener('click', removePopUp);
}

const arrayCart = JSON.parse(localStorage.getItem('cart')) || [];

function creatItem() {
    arrayCart.forEach(cart => appendItem(cart.title, cart.image, cart.price, cart.input, cart.size, cart.color));
}

function appendItem(addToCartTitle, addToCartImage, addToCartPrice, addToCartInput, addToCartSize, addToCartColor) {

    let addItemToCartRow = document.createElement('div');
    addItemToCartRow.classList.add('cartItem');
    const container = document.querySelector('.cartItem-container');
    const newItems = container.querySelectorAll('.cartItem');

    for (const newItem of newItems) {
        const newTitle = newItem.querySelector('.cartItem-title').innerText;
        const newInput = newItem.querySelector('.cartItem-input').innerText;
        const newSize = newItem.querySelector('.cartItem-size').innerText;
        const newColor = newItem.querySelector('.cartItem-color').innerText;

        if (newTitle == addToCartTitle && newSize == addToCartSize && newColor == addToCartColor) {
            newItem.querySelector('.cartItem-input').innerText = parseFloat(newInput) + parseFloat(addToCartInput);
            /*要 return 不然雖然數字會增加 但還會再增加一個同樣的商品 */
            return;
        }
    }

    addItem = `
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
    addItemToCartRow.innerHTML = addItem;
    container.append(addItemToCartRow);
    addItemToCartRow.querySelector('.cartItem-remove').addEventListener('click', removeItem)
}

function updateLocalStorage() {
    //store the list back to localStorage
    localStorage.setItem('cart', JSON.stringify(arrayCart));
}

//display all the item on the list from localStorage
// creatItem()
document.addEventListener('DOMContentLoaded', creatItem);

// /*獲取搜尋按鈕 */
// let searchBtn = document.querySelector('.search-btn')
// searchBtn.addEventListener('click', fiterNames)
// /*搜尋 */
// function fiterNames() {
//     let inputvalue = document.querySelector('.main-input').value.toUpperCase();

//     let li = document.querySelectorAll('.product-card');
   
    
//     for (let item of li) {
//         let title = item.querySelector('.product-title').innerText;
//         if (title.toUpperCase().indexOf(inputvalue) > -1) {
//             item.style.display = '';
//         } else {
//             item.style.display = 'none';
//         }
//     }
    
// }

/*有三個方法可以判斷當前節點是否有子節點 */
/*  node.firstChild !== null
    node.childNodes.length > 0
    node.hasChildNodes()
*/

/*按了數量鍵 - 號 ， 當框框內的數值大於1 才會 - 1 */
function quanityMinus() {
    let input = this.parentElement.querySelector('.box-info-bottom-input');
    if (input.value > 1) input.value = parseFloat(input.value) - 1;

}
/*按了數量鍵 + 號 ，當框框內的數值小於20 才會 +1 */
function quanityAdd() {
    let inputs = this.parentElement.querySelector('.box-info-bottom-input');
    if (inputs.value < 20) {
        inputs.value = parseFloat(inputs.value) + 1;
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
/*點了結帳按鈕跳出confirm 如果是 刪除所有的cartitem 在清空local storage 最後更新金額 */
function checkOutBtnClicked() {
    let cartItems = document.querySelector('.cartItem-container');
    const con = confirm('要前往結帳頁面嗎?');
    if (con == true) {
        /*如果有子節點，刪除所有的子節點 */
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild);
        }
        removeCartClass();
        /*不可以用localstorage.clear() 會有bug 要把陣列裡面所有東西都刪光光 */
        arrayCart.splice(0, arrayCart.length);
        /*如果只用上面那一行 乍看之下好像可以 可是按結帳之後 按F5 再加入一個商品去購物車 這樣上一個商品還會存在購物車裡 */
        clearLocalStorage();
        updateCartTotal();
    }
}
/* 如果購物車不是空的 那就show出 訂單結帳跟 total  以及把 您的購物車是空的 用不見*/


/*清除LocalStorage裡面的資料 */
function clearLocalStorage() {
    localStorage.clear();
}

function removeItem(e) {
    let eTarget = e.target.parentElement;
    eTarget.remove();

    const cart = document.querySelector('.cartItem-container')
    let newtitle = eTarget.querySelector('.cartItem-title').innerText;
    let newsize = eTarget.querySelector('.cartItem-size').innerText;
    let newcolor = eTarget.querySelector('.cartItem-color').innerText;

    //刪除某item之後要更新total的資料
    updateCartTotal();
    /* 先用findIndex找出 刪除的那筆資料位於local storage的index */
    const newIndex = arrayCart.findIndex(item => item.title === newtitle && item.size === newsize && item.color === newcolor)
    // console.log(newIndex);

    /*再用filter找出符合條件的資料在local storage裡面的長度 也就是有幾筆相同的資料 */
    const newLength = arrayCart.filter(len => len.title === newtitle && len.size === newsize && len.color === newcolor)
    // console.log(newLength);
    // console.log(newLength.length);
    /*最後再用splice 刪除對應的資料  splice(起始位置,長度)*/
    arrayCart.splice(newIndex, newLength.length);

    /*刪除哪一筆資料 local那邊就會少哪一筆資料 並且把結果儲存 */
    /*如果不加這行 就不會刪除local storage的資料*/
    updateLocalStorage()
    cartAmount();
    /*當購物車的所有物件都刪除之後 也把local storage的所有東西clear */
    // console.log(arrayCart.length)
    // console.log(cart.children.length)
    console.log(`這是刪除後的購物車數量${cart.children.length}`)

    if (cart.children.length < 1) {
        arrayCart.splice(0, arrayCart.length);
        clearLocalStorage()
        // localStorage.removeItem('cart')
        /*然後再把金額以及結帳按鈕用不見 把'您的購物車為空的' 用出來 */
        removeCartClass();
    }
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
        let ntPrice = cartPrice.innerText.replace('NT$', '');
        let newPrice = parseFloat(ntPrice.replace(',', ''));
        // let price = cartPrice.innerText.slice(1).trim();
        let quanity = cartQuantity.innerText;
        cartTotalPrice = cartTotalPrice + (newPrice * quanity);
        /* 第一次 cartTotalPrice = 0 + 300 = 300 */
        /* 第二次 cartTotalPrice = 300 + 300 = 600*/
    }
    let final = cartTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.querySelector('.cart-total-price').innerText = 'NT$' + final;
}

/*摸到圖片秀出 加入購物車 */
const productItem = document.querySelectorAll('.product-img');
for(const item of productItem){
    item.addEventListener('mouseenter',(e)=>{
       const target = e.target.parentElement.parentElement;
       target.querySelector('.img-btn-addtocart').style.display = 'flex';
    })
    item.addEventListener('mouseleave',(e)=>{
        const target = e.target.parentElement;
        target.querySelector('.img-btn-addtocart').style.display = 'none';
     })
}
/*加入購物車 popup and overlay */
const mouseEnterAddToCarts = document.querySelectorAll('.img-btn-addtocart');
const mobileAddToCarts = document.querySelectorAll('.mobile-addtocart');
const popuUp = document.querySelector('.box-info-pop-up');
const overLay = document.querySelector('.box-info-overlay');
const closePopUp = document.querySelector('.close-pop-up-btn');
function addPopUp(){
    popuUp.classList.add('active');
    overLay.classList.add('overlay-active');
}
function removePopUp(){
    popuUp.classList.remove('active');
    overLay.classList.remove('overlay-active');
}

overLay.addEventListener('click',removePopUp);
closePopUp.addEventListener('click',removePopUp);
/*電腦版本 */
for(const mouseEnterAddToCart of mouseEnterAddToCarts){
    mouseEnterAddToCart.addEventListener('click',addPopUp);
    mouseEnterAddToCart.addEventListener('click',(e)=>{
        /*點到的商品的圖片等於popup的圖片 */
        const target = e.target.parentElement.parentElement;
        let targetImage = target.querySelector('.product-image');
        const popUpImage = popuUp.querySelector('.box-info-top-left-image');
        popUpImage.src = targetImage.src;
        /*點到的商品的title等於popup的title */
        const targetTitle = target.querySelector('.product-title').innerText;
        const popUpTitle = popuUp.querySelector('.box-info-top-right-title');
        popUpTitle.innerText = targetTitle;
        /*點到的商品的價錢等於popup的價錢 */
        const targetPrice = target.querySelector('.product-price').innerText;
        const popUpPrice = popuUp.querySelector('.box-info-top-right-price');
        popUpPrice.innerText = targetPrice;
    });
}
/*手機版本 */
for(const mobileAddToCart of mobileAddToCarts){
    mobileAddToCart.addEventListener('click',addPopUp)
    mobileAddToCart.addEventListener('click',(e)=>{
         /*點到的商品的圖片等於popup的圖片 */
        /*點到 購物車的圖案會有bug 解決辦法1.購物車圖案css z-index:-1  2.用this */
         const targetMobile = e.target.parentElement;
         const targetMobileImage = targetMobile.querySelector('.product-image').src;
         const popUpImage = popuUp.querySelector('.box-info-top-left-image');
         popUpImage.src = targetMobileImage;
         /*點到的商品的title等於popup的title */
         const targetMobileTitle = targetMobile.querySelector('.product-title').innerText;
         const popUpTitle = popuUp.querySelector('.box-info-top-right-title');
         popUpTitle.innerText = targetMobileTitle;
         /*點到的商品的價錢等於popup的價錢 */
         const targetMobilePrice = targetMobile.querySelector('.product-price').innerText;
         const popUpPrice = popuUp.querySelector('.box-info-top-right-price');
         popUpPrice.innerText = targetMobilePrice;
    });
         
}
/*點navbar的搜尋按鈕 跑出input 點別的nav按鈕 要消失input*/
const navSearchBtn = document.querySelector('.search-btn');
const mobileSearchInput = document.querySelector('.mobile-search');
const mobileSearchOverlay = document.querySelector('.mobile-search-overlay');
/*menu dom */
const mobileMenuBtn = document.querySelector('.mobile-btn');
const mobileMenuSideBar = document.querySelector('.menu-sidebar');
const mobileMenuOverlay = document.querySelector('.menu-sidebar-overlay');


const mobileUserBtn = document.querySelector('.user-btn');

function addMobileSearchShow (){
    mobileSearchInput.classList.toggle('mobile-search-click');
    mobileSearchOverlay.classList.toggle('overlay-show');
}
function removeMobileSearchShow(){
    mobileSearchInput.classList.remove('mobile-search-click');
    mobileSearchOverlay.classList.remove('overlay-show');
}
navSearchBtn.addEventListener('click',addMobileSearchShow);

mobileSearchOverlay.addEventListener('click', addMobileSearchShow); 
function addMobileMenu(){
    mobileMenuSideBar.classList.toggle('menu-sidebar-show');
    mobileMenuOverlay.classList.toggle('menu-sidebar-overlay-show');
}
function removeMobileMenu(){
    mobileMenuSideBar.classList.remove('menu-sidebar-show');
    mobileMenuOverlay.classList.remove('menu-sidebar-overlay-show');
}
mobileMenuBtn.addEventListener('click',addMobileMenu);
mobileMenuOverlay.addEventListener('click',addMobileMenu);

/*點Menu按鈕 移除其他按鈕的事件 增加使用者體驗 */
mobileMenuBtn.addEventListener('click', removeCartShowClicked);
mobileMenuBtn.addEventListener('click', removeMobileSearchShow);
mobileMenuBtn.addEventListener('click',removePopUp);
mobileMenuBtn.addEventListener('click',removeMessageToggle);
/*點搜尋按鈕 移除其他按鈕的事件 增加使用者體驗 */
navSearchBtn.addEventListener('click',removeMobileMenu);
navSearchBtn.addEventListener('click',removeCartShowClicked);
navSearchBtn.addEventListener('click',removePopUp);
navSearchBtn.addEventListener('click',removeMessageToggle);
/*點購物車按鈕 移除其他按鈕的事件 增加使用者體驗 */
cartTopBtn.addEventListener('click',removeMobileMenu);
cartTopBtn.addEventListener('click',removeMobileSearchShow);
cartTopBtn.addEventListener('click',removePopUp);
cartTopBtn.addEventListener('click',removeMessageToggle);
/*點會員按鈕 移除其他按鈕的事件 增加使用者體驗 */
mobileUserBtn.addEventListener('click', removeCartShowClicked);
mobileUserBtn.addEventListener('click', removeMobileMenu);
mobileUserBtn.addEventListener('click', removeMobileSearchShow);
mobileUserBtn.addEventListener('click', removePopUp);
mobileUserBtn.addEventListener('click', removeMessageToggle);

/*手機版本 search toggle class */
const pcSearchForm = document.querySelector('.search-form');
const pcSearchFormInput = pcSearchForm.querySelector('.pc-search-input')
function togglePcSearch(){
    pcSearchFormInput.classList.add('active');
}
function removeTogglePcSearch(){
    pcSearchFormInput.classList.remove('active');
}
pcSearchForm.addEventListener('mouseenter',togglePcSearch)
pcSearchForm.addEventListener('mouseleave',removeTogglePcSearch)

/*手機版本 點擊與enter 搜尋功能 以及menu*/

const  MobileSearchButton = document.querySelector('#m-search');
MobileSearchButton.addEventListener('click',MsFilterCard);
MobileSearchButton.addEventListener('click',removeMobileSearchShow);
const  mobileInput = document.querySelector('.mobile-search-input');
   
mobileInput.addEventListener('keydown',function(e){
    if(e.keyCode == 13){
        MsFilterCard();
        removeMobileSearchShow();
    }
})
function MsFilterCard(){
    const  productCards = document.querySelectorAll('.product-card');
    const  MobileSearchInputValue = document.querySelector('.mobile-search-input').value.toUpperCase();
    const  input = document.querySelector('.mobile-search-input');
    for(const item of productCards){
        const title = item.querySelector('.product-title').innerText;
        if(title.toUpperCase().indexOf(MobileSearchInputValue) > -1){
            item.style.display= "";
        }else{
            item.style.display= "none";
        }
    }
    input.value = '';
}
/*mobilesiderbar menu */
const sidebarbtns = document.querySelectorAll('.cagetories-box-item');
for(const btn of sidebarbtns ){
    btn.addEventListener('click',function(){
        // console.log(this.getAttribute("data-target"))
        removeMobileMenu();
        const  productCardDataIds = document.querySelectorAll('.product-card');
            for(const data of productCardDataIds){
                const productDataId = data.getAttribute("data-id");
                const productDataTarget = this.getAttribute("data-target");
                if(productDataId === productDataTarget){
                    data.style.display= "";
                }else{
                    data.style.display= "none";
                }
            }
    })
}
/*點ig與fb 事件*/
const fbBtn = document.querySelector('#fb-btn');
const IGBtn = document.querySelector('#ig-btn');
fbBtn.addEventListener('click',()=>{
    removeMobileMenu();
    alert('您好，我們目前還沒有Facebook，感謝您的支持。')
});
IGBtn.addEventListener('click',()=>{
    removeMobileMenu();
    alert('您好，我們目前還沒有Instagram，感謝您的支持。')
});



/*PC版本 點擊與enter 搜尋功能 以及header*/
const  pcSearchButton = document.querySelector('#pc-search');
pcSearchButton.addEventListener('click',pcsFilterCard);

const  pcInput = document.querySelector('.pc-search-input');
   
pcInput.addEventListener('keydown',function(e){
    if(e.keyCode == 13){
        pcsFilterCard();
    }
})
function pcsFilterCard(){
    const  productCards = document.querySelectorAll('.product-card');
    const  pcSearchInputValue = document.querySelector('.pc-search-input').value.toUpperCase();
    const  pcInput = document.querySelector('.pc-search-input');
    for(const item of productCards){
        const title = item.querySelector('.product-title').innerText;
        if(title.toUpperCase().indexOf(pcSearchInputValue) > -1){
            item.style.display= "";
        }else{
            item.style.display= "none";
        }
        if(title !== pcSearchInputValue){
            alert('抱歉')
            pcInput.value = '';
            return
        }
    }
 
    pcInput.value = '';
}
/*header */
const headerItem = document.querySelectorAll('.header-item');

for(const item of headerItem){
    item.addEventListener('click',headerFilter)
}
function headerFilter(){
    const cards = document.querySelectorAll('.product-card');
    for(const data of cards){
       const targetId = data.getAttribute('data-id');
       if(targetId === this.getAttribute('data-target')){
            data.style.display= "";
       }else{
            data.style.display= "none";
       }
    }
}
/*聯絡我們 */
const messageOverlay = document.querySelector('.message-overlay');
const messageBox = document.querySelector('.message-box');
messageOverlay.addEventListener('click',removeMessageToggle)

const PCmessageBox = document.querySelector('#pc-message-btn');
PCmessageBox.addEventListener('click',messageToggle)

const messageBtn = document.querySelector('.message-btn');
messageBtn.addEventListener('click',messageToggle)

function messageToggle(){
    messageBox.classList.toggle('message-block');
    messageOverlay.classList.toggle('active');
    removeMobileMenu();
}
function removeMessageToggle(){
    messageBox.classList.remove('message-block');
    messageOverlay.classList.remove('active');
}

/*sign in */

const signIn = document.querySelector('.sign-in');
const signUp = document.querySelector('.sign-up');
const loginTab = document.querySelector('.login');
const signupTab = document.querySelector('.bottom');
signUp.addEventListener('click',function(){
    loginTab.style.display='none';
    signupTab.style.display='block';
    signUp.style.backgroundColor = "#fff";
    signUp.style.borderBottom = "0";        
    signIn.style.backgroundColor = '#e7e3e3';
    signIn.style.borderBottom = '1px solid #000';   
});
signIn.addEventListener('click',function(){
    signupTab.style.display='none';
    loginTab.style.display='block';
    signIn.style.backgroundColor = "#fff";
    signIn.style.borderBottom = "0";        
    signUp.style.backgroundColor = '#e7e3e3';
    signUp.style.borderBottom = '1px solid #000';   
});
const userBtn = document.querySelector('.user-btn');
const wrapper = document.querySelector('.container');
const signWrapper = document.querySelector('.sign-container');
const mobileUserButton = document.querySelector('.u-btn '); 
function showSginIn(){
    wrapper.style.display='none';
    signWrapper.style.display='block';
}
userBtn.addEventListener('click',showSginIn)
mobileUserButton.addEventListener('click',function(){
    removeMobileMenu();
    showSginIn();
});