$(function () {
    let cartItems = [];

    // Make store items draggable
    $(".item").draggable({
        helper: "clone",
        revert: "invalid",
        cursor: "grabbing",
        opacity: 0.7,
        zIndex: 1000
    });

    // Make cart droppable
    $("#cart-drop").droppable({
        accept: ".item",
        drop: function (event, ui) {
            const name = ui.draggable.data("name");
            const price = parseInt(ui.draggable.data("price"));
            const icon = ui.draggable.data("icon");

            cartItems.push({ name, price, icon });
            renderCart();
        }
    });

    // Render cart items
    function renderCart() {
        const cartDrop = $("#cart-drop");
        cartDrop.empty();

        if (cartItems.length === 0) {
            cartDrop.html('<div class="placeholder"><i class="fa-solid fa-bag-shopping"></i> Drag items here to add</div>');
            $("#clear-cart").hide();
        } else {
            cartItems.forEach(function (item, index) {
                const $el = $('<div class="cart-item">' +
                    '<div class="info"><i class="fa-solid ' + item.icon + '"></i> <span>' + item.name + '</span> — <span>₹' + item.price + '</span></div>' +
                    '<button class="remove-btn" data-index="' + index + '">✕</button>' +
                    '</div>');
                cartDrop.append($el);
            });
            $("#clear-cart").show();
        }

        // Update total
        const total = cartItems.reduce(function (sum, item) {
            return sum + item.price;
        }, 0);
        $("#total").text("₹" + total);
    }

    // Remove single item
    $(document).on("click", ".remove-btn", function () {
        const index = $(this).data("index");
        cartItems.splice(index, 1);
        renderCart();
    });

    // Clear all
    $("#clear-cart").on("click", function () {
        cartItems = [];
        renderCart();
    });
});