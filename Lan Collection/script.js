document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.getElementById('cart');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');
    const loadMoreButton = document.getElementById('load-more');
    const hideProductsButton = document.getElementById('hide-products');

    let cart = [];
    let numVisibleProducts = 6; 

    const products = document.querySelectorAll('.product');
    const productContainer = document.querySelector('.product-container');
    products.forEach((product, index) => {
        if (index < numVisibleProducts) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    const centerProducts = () => {
        const visibleProducts = document.querySelectorAll('.product[style="display: block;"]');
        const emptySpace = (productContainer.offsetWidth - (visibleProducts.length * 300)) / (visibleProducts.length - 1);
        visibleProducts.forEach((product, index) => {
            product.style.marginRight = index < visibleProducts.length - 1 ? emptySpace + 'px' : '0';
        });
    };
    centerProducts();

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentElement.querySelector('h2').textContent;
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const productImage = button.parentElement.querySelector('img').src;
            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };
            cart.push(product);
            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        const itemCount = cart.length <= numVisibleProducts ? cart.length : numVisibleProducts;
        document.getElementById('cart-count').textContent = itemCount;

        cartItemsList.innerHTML = '';
        let total = 0;

        for (let i = 0; i < cart.length; i++) {
            if (i < numVisibleProducts) {
                const listItem = document.createElement('li');
                const productImage = document.createElement('img');
                productImage.src = cart[i].image;
                productImage.alt = cart[i].name;
                listItem.appendChild(productImage);
                listItem.innerHTML += cart[i].name + ': $' + cart[i].price.toFixed(2);
                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';
                removeButton.addEventListener('click', () => {
                    cart.splice(i, 1);
                    updateCartDisplay();
                });
                listItem.appendChild(removeButton);
                cartItemsList.appendChild(listItem);
                total += cart[i].price;
            }
        }

        cartTotal.textContent = total.toFixed(2);
    }

    checkoutButton.addEventListener('click', () => {
        alert('Procesando pago por $' + cartTotal.textContent);
        cart = [];
        updateCartDisplay();
        cartModal.style.display = 'none';
    });

    loadMoreButton.addEventListener('click', () => {
        numVisibleProducts += 12;
        products.forEach((product, index) => {
            if (index < numVisibleProducts) {
                product.style.display = 'block';
            }
        });

        hideProductsButton.style.display = 'block';

        if (numVisibleProducts >= products.length) {
            loadMoreButton.style.display = 'none';
        }

        centerProducts();
    });

    hideProductsButton.addEventListener('click', () => {
        numVisibleProducts = 6;
        products.forEach((product, index) => {
            if (index >= numVisibleProducts) {
                product.style.display = 'none';
            }
        });

        hideProductsButton.style.display = 'none';

        loadMoreButton.style.display = 'block';

        centerProducts();
    });
});
