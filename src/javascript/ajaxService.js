import popupS from 'popupS'
import $ from 'jquery'
import 'jquery-form'

/*
Service defines all jquery ajax requests
*/

// $( document ).ready( function() {
//     // $( '#createItem' ).submit( function( e ) {
//     //     // e.preventDefault();
//     //     var itemName = $( '#itemName' )[ 0 ].value;

//     //     $( this ).ajaxSubmit( {
//     //         data: {
//     //             itemName: $( `#itemName` ).value,
//     //             barcode: $( `#barcode` ).value,
//     //             quantity: $( `#quantity` ).value,
//     //             weight: $( `#weight` ).value
//     //         },
//     //         contentType: 'application/json',
//     //         // success: function( res ) {
//     //         //     popupS.window( {
//     //         //         mode: 'alert',
//     //         //         content: `${itemName} has been created`,
//     //         //         className: 'custom-popupS-class',
//     //         //         additionalButtonOkClass: 'btn btn-primary',
//     //         //         // onSubmit: function() {
//     //         //         //     location.reload();
//     //         //         // }
//     //         //     } );
//     //         // }
//     //     } );
//     //     return false;
//     // } );
// } );

$( document ).ready( function() {
    $( '.add-to-cart-button' ).on( 'click', function( e ) {
        e.preventDefault();
        var itemName = $( this ).closest( '.item-container' ).find( '.card-header' )[ 0 ].innerHTML;

        $.ajax( {
                method: 'POST',
                url: '/addToCart',
                data: {
                    itemName: itemName
                }
            } )
            .done( function() {
                popupS.window( {
                    mode: 'confirm',
                    content: `Added ${itemName} to cart`,
                    className: 'custom-popupS-class',
                    additionalButtonOkClass: 'btn btn-primary',
                    additionalButtonCancelClass: 'btn btn-primary',
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
                    content: 'You already have an active order. Please complete the existing order before creating a new one.',
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

$( document ).ready( function() {
    $( '.cart-quantity-input' ).change( function() {
        var itemName = $( this ).closest( "tr" ).find( 'th' ).html();
        if ( parseInt( $( this ).val() ) > 0 ) {
            $( this ).removeClass( 'is-invalid' )
            $( this ).addClass( 'is-valid' )
            $.ajax( {
                    method: 'POST',
                    url: '/updateCartItemQuantities',
                    data: {
                        itemName: itemName,
                        quantity: $( this ).val()
                    }
                } )
                .done( function( msg ) {
                    updateShoppingCartTotal();
                } )
                .fail( function( msg ) {
                    console.log( "Cart update failed" )
                } );
        } else {
            $( this ).removeClass( 'is-valid' );
            $( this ).addClass( 'is-invalid' );
            $( this ).closest( '.input-group' ).find( ".invalid-feedback" ).show();
        }
    } );
} );

$( document ).ready( function() {
    $( '.remove-from-cart' ).on( "click", function() {
        var itemRow = $( this ).closest( "tr" );
        var itemName = itemRow.find( 'th' ).html();
        $.ajax( {
            method: 'POST',
            url: '/removeItemFromCart',
            data: {
                itemName: itemName,
            }
        } ).done( function( msg ) {
            updateShoppingCartTotal();
            itemRow.remove();
            updateShoppingCartTotal();
        } ).fail( function( msg ) {
            console.log( "Could not delete item" )
        } );
    } );
} );

$( document ).ready( function() {
    $( '#checkout' ).on( 'click', function() {
        popupS.window( {
            mode: 'alert',
            content: {
                html: `<p>Generating order</p><div class="loader"></div>`
            },
            className: 'custom-popupS-class',
            additionalButtonOkClass: 'btn btn-primary',
        } );

        // Create the Order Model/Sends the Email
        // Substracts the items checkedout from the DB
        // Clears out the user's cart to create new order
        $.ajax( {
            method: 'POST',
            url: '/createNewOrder'
        } ).done( function() {
            // $.ajax( {
            //     method: 'POST',
            //     url: '/subtractItemQuantities'
            // } ).done( function() {
            $.ajax( {
                method: 'POST',
                url: '/clearCart'
            } ).done( function() {
                window.location.href = "/postCheckout";
            } ).fail( function() {
                console.log( "Order failed!" );
            } );
            // } ).fail( function( msg ) {
            //     console.log( "Order failed!" );
            // } );
        } ).fail( function() {
            console.log( "Order failed!" );
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