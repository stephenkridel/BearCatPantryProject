import popupS from 'popupS'
import $ from 'jquery'
import 'jquery-form'

/*
Service defines all jquery ajax requests
*/

$( document ).ready( function() {
    $( '.add-to-cart-button' ).on( 'click', function( e ) {
        e.preventDefault();
        var itemName = $( this ).closest( '.item-container' ).find( '.card-header' ).find(".item-title")[ 0 ].innerHTML.replace(/ /g,"_");// dbValue
        $.ajax( {
                method: 'POST',
                url: '/addToCart',
                data: {
                    itemName: itemName
                }
            } )
            .done( function() {
                itemName = itemName.replace(/_/g, " "); // uiValue
                popupS.window( {
                    mode: 'confirm',
                    content: `Added ${itemName} to cart`,
                    className: 'custom-popupS-class',
                    additionalButtonOkClass: 'btn btn-primary',
                    additionalButtonCancelClass: 'btn btn-info',
                    labelOk: 'View Cart',
                    labelCancel: 'Close',
                    onSubmit: function() {
                        window.location.href = "/cart";
                    },
                } );
                updateShoppingCartTotal();
            } )
            .fail( function() {
                popupS.window( {
                    mode: 'alert',
                    content: `${itemName} was not added.`,
                    className: 'custom-popupS-class',
                    additionalButtonOkClass: 'btn btn-primary',
                } );
            } );
    } );
} );


$( document ).ready( function() {
    $( '#sendTestEmail' ).on( 'click', function( e ) {
        e.preventDefault();
        $.ajax( {
                method: 'POST',
                url: '/sendMail'
            } )
            .done( function( msg ) {
                console.log( "email sent" );
            } )
            .fail( function( msg ) {
                console.log( "email failed" );
            } );
    } );
} );

$( function() {
    updateShoppingCartTotal();
} );

var updateShoppingCartTotal = function() {
    $.get( "/totalCartItems" ).done( function( data ) {
        $( '#shoppingCartTotal' ).html( data.totalQuantity );
        $( '#shoppingCartTotal' ).removeClass( "hidden" );
    } );
};

$( document ).ready( function() {
    $( '.navbar-toggler' ).on( 'click', function() {
        updateShoppingCartTotal();
    } );
} );

$( document ).ready( function() {
    $( '.quantity-left-minus' ).on( 'click', function() {
        var cartItemInput = $( this ).closest( '.input-group' ).find( "#quantity" );
        var cartItemInputValue = cartItemInput.val();

        if ( cartItemInputValue - 1 > 0 ) {
            cartItemInput.val( parseInt( cartItemInputValue ) - 1 );
            cartItemInput.change();
        }
    } );
} );

$( document ).ready( function() {
    $( '.quantity-right-plus' ).on( 'click', function() {
        var cartItemInput = $( this ).closest( '.input-group' ).find( "#quantity" );
        var cartItemInputValue = cartItemInput.val();
        cartItemInput.val( parseInt( cartItemInputValue ) + 1 );
        cartItemInput.change();
    } );
} );


var knownItemQuantities = [];
$( document ).ready( function() {
    $( '.cart-quantity-input' ).change( function() {
        let itemName = $( this ).closest( "tr" ).find( 'th' ).html().replace(/ /g,"_");;
        let inputQuantity = parseInt( $( this ).val() );
        var _this = this;
        var amtInPantry;

        // If we know the quantity already, dont query DB for it again
        if ( knownItemQuantities.filter( e => e.itemName === itemName ).length === 1 ) {
            amtInPantry = knownItemQuantities.filter( e => e.itemName === itemName )[ 0 ].quantity
            validateAndUpdateCartRow( _this, itemName, amtInPantry, inputQuantity );
        }
        // Else, get the amount in the pantry from the DB and save it 
        else {
            $.ajax( {
                    method: 'GET',
                    url: '/getItem',
                    data: {
                        itemName: itemName,
                    }
                } )
                .done( function( ret ) {
                    knownItemQuantities.push( ret.item[ 0 ] );
                    amtInPantry = ret.item[ 0 ].quantity;
                    validateAndUpdateCartRow( _this, itemName, amtInPantry, inputQuantity );
                } )
                .fail( function() {
                    console.log( "Failed to get item" )
                } );
        }
    } );
} );

var validateAndUpdateCartRow = function( _this, itemName, amtInPantry, inputQuantity ) {
    if ( inputQuantity > 0 && inputQuantity <= amtInPantry ) {
        $( _this ).removeClass( 'is-invalid' )
        $( _this ).addClass( 'is-valid' )
        $.ajax( {
                method: 'POST',
                url: '/updateCartItemQuantities',
                data: {
                    itemName: itemName,
                    quantity: inputQuantity
                }
            } )
            .done( function() {
                updateShoppingCartTotal();
                validateCheckoutButton();
            } )
            .fail( function( msg ) {
                console.log( "Cart update failed" )
            } );
    } else {
        $( _this ).removeClass( 'is-valid' );
        $( _this ).addClass( 'is-invalid' );
        var invalidFeedback = $( _this ).closest( '.input-group' ).find( ".invalid-feedback" )
        invalidFeedback.show();
        invalidFeedback.html( `Item quantity must be greater than 0, and less than the amount in the pantry(${amtInPantry})` );
        validateCheckoutButton();
    }
}

var validateCheckoutButton = function() {
    var foundError = false
    $( ".invalid-feedback" ).each( function() {
        if ( $( this ).is( ':visible' ) ) {
            foundError = true;
        }
    } );
    if ( foundError ) {
        $( "#checkout" ).attr( "disabled", true );

    } else {
        $( "#checkout" ).attr( "disabled", false );

    }
}

$( function() {
    validateCheckoutButton();
} );

$( document ).ready( function() {
    $( '.remove-from-cart' ).on( "click", function() {
        var itemRow = $( this ).closest( "tr" );
        var itemName = itemRow.find( 'th' ).html().replace(/ /g,"_");;
        $.ajax( {
            method: 'POST',
            url: '/removeItemFromCart',
            data: {
                itemName: itemName,
            }
        } ).done( function( msg ) {
            updateShoppingCartTotal();
            itemRow.remove();
            validateCheckoutButton()
            updateShoppingCartTotal();
            var itemRowsRemain = $('.item-set').length;
            if(itemRowsRemain === 0){
                $('.main-container').hide();
                $('.no-items').removeAttr("hidden");
            }
        } ).fail( function( msg ) {
            console.log( "Could not delete item" )
        } );
    } );
} );

$( document ).ready( function() {
    $( '#checkout' ).on( 'click', function() {
        // Validate if this cart actually has the items
        // Create the Order Model/Sends the Email
        // Substracts the items checkedout from the DB
        // Clears out the user's cart to create new order
        $.ajax( {
            method: 'GET',
            url: '/validateOrder'
        } ).done( function() {
            popupS.window( {
                mode: 'alert',
                content: {
                    html: `<p>Generating order</p><div class="loader"></div>`
                },
                className: 'custom-popupS-class',
                additionalButtonOkClass: 'btn btn-primary',
            } );
            $.ajax( {
                method: 'POST',
                url: '/createNewOrder'
            } ).done( function() {
                $.ajax( {
                    method: 'POST',
                    url: '/decrementItemQuantity'
                } ).done( function() {
                    $.ajax( {
                        method: 'POST',
                        url: '/clearCart'
                    } ).done( function() {
                        window.location.href = "/postCheckout";
                    } ).fail( function() {
                        console.log( "Order failed!" );
                    } );
                } ).fail( function( msg ) {
                    console.log( "Order failed!" );
                } );
            } ).fail( function( msg ) {
                console.log( "Order failed!" );
            } );
        } ).fail( function( xhr, textStatus, errorThrown ) {
            var errorMsg = 'There are existing errors in your cart: <br/>';
            for ( var i = 0; i < xhr.responseJSON.length; i++ ) {
                errorMsg += `${xhr.responseJSON[i]}<br/>`
            }

            popupS.window( {
                mode: 'alert',
                content: {
                    html: `<p>${errorMsg}</p>`
                },
                className: 'custom-popupS-class',
            } );
        } );



    } );
} );

$( document ).ready( function() {
    $( '#cancelOrder' ).on( 'click', function() {
        $.ajax( {
            method: 'POST',
            url: '/cancelOrder'
        } ).done( function( msg ) {
            location.reload();
            console.log( "Order canceled!" )
        } ).fail( function( msg ) {
            console.log( "Order cancel failed!" );
            s
        } );
    } );
} );
