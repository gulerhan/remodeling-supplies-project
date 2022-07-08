
let userCategories = [];
let selectedCategory = '';
let recommendedProducts = [];
var  $owl = $('.owl-carousel');
fetch("src/product-list.json").then(
    response => response.json()
).then(response => {
    const params = response.responses[0][0].params;
    userCategories = params.userCategories;
    selectedCategory = userCategories[0];
    recommendedProducts = params.recommendedProducts;

    userCategories.forEach((cat,index) => {
        let button =  $(document.createElement('button')).prop({
            type: 'button',
            innerHTML: cat,
            class: `${index == 0 ? 'tablinks selected' : 'tablinks'}`
        });
        $('#userCategories').append(button);
    });
    $(".tablinks").on( "click", function() {
        $(".tablinks").removeClass('selected');
        $(this).addClass('selected');
        createProductList( $(this).text());
      });
      createProductList(selectedCategory);
});


function createProductList(category){
   $("#products").empty();
   $owl.trigger('destroy.owl.carousel');
   $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    recommendedProducts[category].forEach(product => {
        $("#products").append(`
        <div class="recommended-product">
        <div class="item"><img src="${product.image}" alt=""></div>
            <p class="productContent">${product.name}</p>
            <p class="productPrice">${product.priceText}</p>
            ${product.params.shippingFee === "FREE" ? `<div class="shipping">
            <i class="fa-solid fa-truck"></i>
            <p class="shippingFee">Ücretsiz Kargo</p>
            </div>` : ''}
              <div class="basket">
                <button class="add-basket" id="addBasket">Sepete Ekle</button>
              </div>
        </div>`);
    });
    initCarousel();

    
    $(".add-basket").on( "click", function() {
        console.log('addBasket')
        showBasketAlert();
      });
}

function initCarousel(){
    $owl.owlCarousel({
        autoWidth:true,
        responsiveClass: true,
        dots: false,
        lazyload: true,
        loop: false,
        responsive: {
            0: {
                items: 2,
            },
            480: {
                items: 2,
            },
            768: {
                items: 4,
                loop: false
            }
        }
    })
}


function showBasketAlert(){
    $("body").append(`
    <div class="m-4">
    <div class="alert alert-warning alert-dismissible fade show text-light bg-dark" id="addedBasket">
    <i class="fa-solid fa-circle-check fa-xl pr-2"></i>
         <div>
         Ürün sepete eklendi. <br> <a href="#" class="alert-link text-info text-decoration-none">Sepete git</a>
         <button class="btn btn-secondary btn-md close-button bg-dark" data-bs-dismiss="alert"><i class="fa-solid fa-circle-xmark"></i></button>
         </div>
    </div>
    </div>
    `);
}
