
import productPageData from "./productPageData.js"

const active = document.querySelector(".active")
const navItems = document.querySelectorAll("nav li")
const navItemContainer = document.querySelector(".nav-item-container")
const navAndIcon = document.querySelector(".nav-and-icon")
const secondNavListItem = document.querySelector(".second-nav-list-item")
const upArrow = document.querySelector(".up-arrow")
const downArrow = document.querySelector(".down-arrow")
const dropMenu = document.querySelector(".drop-menu")
const hero = document.querySelector(".hero")
const cart = document.querySelectorAll(".cart")
const cartContainer = document.querySelector(".cart-container")
const cartItemsDisplay = document.querySelector(".cart-items-display")
const addMoreItems = document.querySelector(".add-more-items")
const clearCart = document.querySelector(".clear-cart")
const ctaLink = document.querySelectorAll(".cta-link")
const orderButtons = document.querySelectorAll(".order-by-whatsapp")
const orderByWhatsapp = document.querySelector(".order-by-whatsapp")
const orderBySms = document.querySelector(".order-by-sms")


const products = document.querySelectorAll(".product")

let AllCartItems = Number(localStorage.getItem("AllCartItems")) || 0

/**
 * Active
 */
navItems.forEach((item) =>{
    item.addEventListener("click", () =>{
        navItems.forEach((navItem) =>{
            navItem.classList.remove("active")
        })

        item.classList.add("active")           
    })
})

/**
 * Drop menu
 */
navAndIcon.addEventListener("click", (event) =>{
    event.stopPropagation()

    if(getComputedStyle(dropMenu).display === "none"){  
        dropMenu.style.display = "block" 
        downArrow.style.display = "none" 
        upArrow.style.display = "block"         
    }
    else{
        upArrow.style.display = "none"
        downArrow.style.display = "block"
        dropMenu.style.display = "none"   
    }    
})


//Close drop menu when clicked elsewhere
window.addEventListener("click", () =>{
        dropMenu.style.display = "none" 
        downArrow.style.display = "block"
        upArrow.style.display = "none"
})

/**
 * Menu-icon display
 */

const menuIcon = document.querySelector(".menu-icon")
const leftAlignedNav = document.querySelector(".left-aligned-nav")

if(menuIcon && leftAlignedNav){

    function checkScreenWidth() {

        const width = document.documentElement.clientWidth

        if(width < 768){
            menuIcon.style.display = "block"
            leftAlignedNav.style.display = "none"
        }
        else{
            menuIcon.style.display = "none"  
            leftAlignedNav.style.display = ""      
        }
    }
    checkScreenWidth()

    window.addEventListener("resize", checkScreenWidth)

    // Open/close menu & nav
    menuIcon.addEventListener("click", (event) =>{

        event.stopPropagation()
        
        if(leftAlignedNav.style.display === "none"){
            leftAlignedNav.style.display = "block"
        }
        else{
            leftAlignedNav.style.display = "none"
        }    
    })
}
/**
 * CART
 */

let cartAddedItems = JSON.parse(localStorage.getItem("cartAddedItems")) || []

const cartIsEmpty = document.querySelector(".cart-is-empty") 
const cartOrderSection = document.querySelector(".cart-order-section") 
 
if(cartIsEmpty && clearCart){
    if(cartAddedItems.length === 0){
        cartIsEmpty.style.display = "block"
        clearCart.style.display = "none"
        cartOrderSection.style.display = "none"
    } 
    else{
        cartIsEmpty.style.display = "none"
        cartOrderSection.style.display = "block"
    }
}
    
cartContainer.addEventListener("click", () =>{
    window.open("cart.html")
})

//Total cart amount
function updateTotalAmount(){

    const totalAmount = document.querySelector(".total-amount")

    if(totalAmount){
        const overallTotalAmount = cartAddedItems.reduce((total, product) =>{
                return total + (Number(product.price) * product.quantity)
            }, 0)

            totalAmount.textContent = `Total amount = Ksh. ${overallTotalAmount}`
    }
}
if(document.querySelector(".cart-table-content")){

    const cartTableContent = document.querySelector(".cart-table-content")
    
    cartAddedItems.forEach((product, index) =>{

        const row = document.createElement("tr")
         

        row.innerHTML = `
            <td>
               ${index + 1}
            </td>

            <td>
                <img src="${product.image}">
            </td>

            <td>
                ${product.name}
            </td>

            <td class="product-quantity">
               <span class = "minus">-</span> <span class="quantity">${product.quantity}</span><span class = "plus">+</span>
            </td>

            <td>
                Ksh. <span class="product-total">${product.price * product.quantity}</span>
            </td>
            <td>
                <img 
                    src="assets/icon/recycle-bin.png" 
                    style = "width:30px"
                    class = "recycle-bin">
            </td>
        `
        updateTotalAmount()

        //Whatsapp order
        
        if(orderByWhatsapp){
            orderByWhatsapp.addEventListener("click", () =>{
                const orderItems = cartAddedItems.map((product) =>{

                    return ` ${product.name}
                            Quantity: ${product.quantity}
                            Price for Each:  ${product.price}
                            Total for the product: KSH. ${product.price * product.quantity}
                    `
                }).join("\n\n")

                const overallTotalAmount = cartAddedItems.reduce((total, product) =>{
                    return total + (Number(product.price) * product.quantity)
                }, 0)

                const message = `Hello, Sylvan Logistics! I'm ordering the following:  
                
                ${orderItems}
                
                Total cost: KSH: ${overallTotalAmount}


                Kindly deliver to:`

                const whatsappNumber = "254701973009"

                const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

                window.open(whatsappLink, "_blank")

            })
        }

        if(orderBySms){
            orderBySms.addEventListener("click", () =>{

                const orderItems = cartAddedItems.map((product) =>{

                    return ` ${product.name}
                            Quantity: ${product.quantity}
                            Price for Each:  ${product.price}
                            Total for the product: KSH. ${product.price * product.quantity}
                    `
                }).join("\n\n")

                const overallTotalAmount = cartAddedItems.reduce((total, product) =>{
                    return total + (Number(product.price) * product.quantity)
                }, 0)

                const message = `Hello, Sylvan Logistics! I'm ordering the following:  
                
                ${orderItems}
                
                Total cost: KSH: ${overallTotalAmount}


                Kindly deliver to:`

                const smsLink = `sms:+254792929806?body=${encodeURIComponent(message)}`

                window.location.href = smsLink

            })
        }
        
        cartTableContent.appendChild(row)
        
        const quantityDisplay = row.querySelector(".quantity")
        const productTotal = row.querySelector(".product-total")

        const minus = row.querySelector(".minus")
            minus.addEventListener("click", () =>{
                if(product.quantity > 1){

                    product.quantity--
                    AllCartItems--

                    updateTotalAmount()

                    quantityDisplay.textContent =  product.quantity
                    cartItemsDisplay.textContent = AllCartItems
                    productTotal.textContent = product.price * product.quantity

                    localStorage.setItem("AllCartItems", AllCartItems)
                    localStorage.setItem("cartAddedItems", JSON.stringify(cartAddedItems))
                }                                
            })
        
            const plus = row.querySelector(".plus")
            plus.addEventListener("click", () =>{
               
                product.quantity++
                AllCartItems++

                updateTotalAmount()

                quantityDisplay.textContent =  product.quantity
                cartItemsDisplay.textContent = AllCartItems
                productTotal.textContent = product.price * product.quantity

                localStorage.setItem("AllCartItems", AllCartItems)
                localStorage.setItem("cartAddedItems", JSON.stringify(cartAddedItems))
                            
            })
             
            const recycleBin = row.querySelector(".recycle-bin")
            
            recycleBin.addEventListener("click", () =>{
                
                //remove row from visibility
                row.remove()
                
                // remove from array
                const productIndex = cartAddedItems.indexOf(product)
                cartAddedItems.splice(productIndex, 1)

                //update total cart items
                AllCartItems -= product.quantity

                updateTotalAmount()

                // prevent -ve values
                if(AllCartItems < 0){
                    AllCartItems = 0
                }

                //save updated infor
                localStorage.setItem("AllCartItems", AllCartItems)
                localStorage.setItem("cartAddedItems", JSON.stringify(cartAddedItems))
                
                //update cart numberOfProducts
                if(AllCartItems > 0){
                    cartItemsDisplay.textContent = AllCartItems
                    cartItemsDisplay.style.display = "block"
                }
                else{
                cartItemsDisplay.style.display = "none"
                clearCart.style.display = "none"
                }

                if(cartAddedItems.length === 0){
                    cartIsEmpty.style.display = "block"
                } 
            })

            if(!row){
                cartIsEmpty.style.display = "block"
            }
        })
 
    
    cartItemsDisplay.textContent = AllCartItems
    cartItemsDisplay.style.display = "block"
    
}

/**
 * CHECKOUT Page
 */
//Checkout page display

if(document.querySelector(".productPage")){
            
    // const clickToPay = document.querySelector(".click-to-pay")
    // const pay = document.querySelector(".pay")

    //Checkout page display
    const productPageImage = document.querySelector(".productPage-image")
    const productPageProductName = document.querySelector(".productPage-product-name")
    const productPagePrice = document.querySelector(".productPage-price")
    const productPageProductDescription = document.querySelector(".productPage-product-description")

    //Retriving stored info'
    const productImage = localStorage.getItem("productImage") 
    const productName = localStorage.getItem("productName") 
    const productPrice = localStorage.getItem("productPrice") 
    
   // Assigning stored info to respective page elements    
    productPageImage.innerHTML = `<img src="${productImage}">`
    productPageProductName.textContent = productName
    productPagePrice.innerHTML = `Ksh. ${productPrice}`

            //productPageDescription
            for(let i = 0; i < productPageData.length; i++){

                if (productName === productPageData[i].itemName){
                    productPageProductDescription.innerHTML = productPageData[i].productDescription
                }
            }

    // Cart order
        const cartBtn = document.querySelector(".cart-btn")   

        cartBtn.addEventListener("click", () =>{
            
            const existingProduct = cartAddedItems.find((product) =>{
                return product.name === productName
            })

            if(existingProduct){
                existingProduct.quantity++
            }
            else{
                cartAddedItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
                })
            }
            
            AllCartItems++

            localStorage.setItem("AllCartItems", AllCartItems)
            localStorage.setItem("cartAddedItems", JSON.stringify(cartAddedItems))
            
            const currentProduct = cartAddedItems.find((product) =>{
                return product.name === productName
            })
            //Display of cart items
            cartBtn.innerHTML =` <img src="assets/icon/shopping-cart png.png" alt="cart icon" class="cart-icon">
                    ${currentProduct.quantity} Added to Cart`            
            cartItemsDisplay.style.display = "block"
            cartItemsDisplay.textContent = AllCartItems

                                         
            // //Making payment
            // clickToPay.addEventListener("click", ()=>{

            //     const totalPrice = Number(productPrice) * productCartItems

            //     pay.style.display = "block"
            //     pay.innerHTML = 
            //             `Product: <b> ${productName} </b>
            //             <br> Quantity: <b> ${productCartItems} </b>
            //             <br> Total Amount:<b> ${totalPrice}</b> 
            //              <br>
            //             <br> Pay through:
            //             <br> Paybill Number: <b> 247247 </b>
            //             <br> Account Number: <b> 0701973009 </b>`
            //     clickToPay.style.display = "none"
            // })
        
        }) 
      
        
    //Whatsapp order at productPage
    
    orderByWhatsapp.addEventListener("click", () =>{

        const message = `Hello, Sylvan Logistics! I'm ordering ${productName}. 
            Quantity: 
            Price: ${productPrice}
            What are the delivery details?`

        const whatsappNumber = "254701973009"
        
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappLink, "_blank");
    })
       
}
    //Display on Cart
    let allCartItems = Number(localStorage.getItem("AllCartItems")) || 0
    
        if(allCartItems > 0){
            cartItemsDisplay.style.display = "block"
            cartItemsDisplay.textContent = allCartItems
        }


/**
 * Main Page
 */

//All products display
const sumOfAllProducts = document.querySelector(".sum-of-all-products")
const numberOfProducts = products.length
              
// sumOfAllProducts.textContent = ` (${numberOfProducts})`

//individual cart order 

products.forEach((product) =>{
              
        const productName = product.querySelector("h3").textContent
        const cartBtn = product.querySelector(".cart-btn")

        //check if product already in cart
        const existingProduct = cartAddedItems.find((product) =>{
            return product.name === productName
        })

        //display current quantity
        if(existingProduct){
            cartBtn.textContent = existingProduct.quantity
        }

        cartBtn.addEventListener("click", (event) =>{
            event.stopPropagation()

            const productImage = product.dataset.image
            const productPrice = product.dataset.price

            //check if product already in cart
            const existingProduct = cartAddedItems.find((product) =>{
                return product.name === productName
            })

            //display current quantity
            if(existingProduct){
                existingProduct.quantity++
            }
            else{
                cartAddedItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
                })
            }
            
            AllCartItems++

            localStorage.setItem("AllCartItems", AllCartItems)
            localStorage.setItem("cartAddedItems", JSON.stringify(cartAddedItems))
            
            const currentProduct = cartAddedItems.find((product) =>{
                return product.name === productName
            })
           
           cartBtn.innerHTML =` <img src="assets/icon/shopping-cart png.png" alt="cart icon" class="cart-icon">
                    ${currentProduct.quantity}`
            cartItemsDisplay.style.display = "block"
            cartItemsDisplay.textContent = AllCartItems
            })             
        })    
// clear cart

    if(clearCart){
        clearCart.addEventListener("click", () =>{    

            localStorage.removeItem("cartAddedItems")
            localStorage.removeItem("AllCartItems")

            cartAddedItems = []
            AllCartItems = 0

            updateTotalAmount()

            cartItemsDisplay.style.display = "none"
            cartIsEmpty.style.display = "block"

            const cartRows = document.querySelectorAll(".cart-table-content tr:not(:first-child)")

            cartRows.forEach((row) =>{
                row.remove()
                clearCart.style.display = "none"
            })
        })
    }


//Whatsapp order from Main page
orderButtons.forEach((button) =>{
    button.addEventListener("click", () =>{

        const product = button.closest(".product")
        const productName = product.querySelector("h3").textContent
        const price = product.querySelector(".price").textContent
        
        const message = `Hello, Sylvan Logistics! I'm ordering ${productName}. 
        Quantity: 
        Price: ${price}
        What are the delivery details?`
    
        const whatsappNumber = "254701973009"
        
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappLink, "_blank");
    })
})

//Main page redirect to Checkout
products.forEach((product) =>{
    product.addEventListener("click", () =>{
        const productImage = product.dataset.image
        const productName = product.dataset.name
        const productPrice = product.dataset.price
        
        localStorage.setItem("productImage", productImage)
        localStorage.setItem("productName", productName)
        localStorage.setItem("productPrice", productPrice)
        
        window.open("product.html")
    })
})

/**
 * Animations
 */

//Paragraph Animations
const paragraphs = document.querySelectorAll(".animated-paragraph")

paragraphs.forEach((paragraph) =>{

    paragraph.innerHTML = paragraph.textContent
    .split(" ") //into array to apply the map method
    .map(word => `<span class="word">${word}</span>`) //Attach a span with class "word"
    .join(" ") //into string

const words = document.querySelectorAll(".word")

words.forEach((word, index) =>{
    word.style.animationDelay = `${index * 0.05}s`
    })
})

/**
 * Scroll-up-arrow
 */
const scrollUpArrow = document.querySelector(".scroll-up-arrow")

if(scrollUpArrow ){
    scrollUpArrow.addEventListener("click", () =>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
        })
    })
}


/**
 * Footer
 */
function updateFooter (){

// Copyright year
document.getElementById("copyright-year").textContent = " " + new Date().getFullYear()
 
}
updateFooter ()
