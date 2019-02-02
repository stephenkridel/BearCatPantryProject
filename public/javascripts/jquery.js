$( document ).ready( function() {
    $( '#image' ).change( function() {
        var i = $( this ).prev( 'label' ).clone();
        var file = $( '#image' )[ 0 ].files[ 0 ].name;
        $( this ).prev( 'label' ).text( file );
    } );
} );

$( document ).ready( function() {
    $( document ).click( function( event ) {
        var clickover = $( event.target );
        var _opened = $( ".navbar-collapse" ).hasClass( "show" );
        if ( _opened === true && !clickover.hasClass( "navbar-toggle" ) && !clickover.hasClass( "form-control" ) ) {
            $( "button.navbar-toggler" ).click();
        }
    } );
} );
$( document ).ready( function() {
    $( "#itemName" ).keypress( function( e ) {
        if ( String.fromCharCode( e.which ).match( /[^A-Za-z ]/ ) ) {
            e.preventDefault()
        }
    } );
} );
$( document ).ready( function() {
    $( '#itemName' ).each( function() {
        $( this ).on( 'keyup', function() {
            var value = $( "#itemName" ).val();
            if ( value.length >= 4 && value.length <= 15 ) {
                $( "#itemName" ).addClass( 'is-valid' );
                $( "#itemName" ).removeClass( 'is-invalid' );
                if ( ( $( "#badItemName" ).is( ':hidden' ) ) &&
                    ( $( "#badQuantityNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badWeightNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badBarcodeNumber" ).is( ':hidden' ) ) ) {
                    $( '#addButton' ).removeAttr( 'disabled' );
                }
                $( "#badItemName" ).hide();

            } else {
                $( "#itemName" ).removeClass( 'is-valid' );
                $( "#itemName" ).addClass( 'is-invalid' );
                $( "#badItemName" ).show();
                $( "#addButton" ).attr( 'disabled', 'disabled' );
            }
        } );
    } );
} );

$( document ).ready( function() {
    $( '#quantity' ).each( function() {
        $( this ).on( 'keyup', function() {
            var value = $( "#quantity" ).val();
            if ( value.length >= 1 && value.length <= 3 ) {
                $( "#quantity" ).addClass( 'is-valid' );
                $( "#quantity" ).removeClass( 'is-invalid' );
                $( "#badQuantityNumber" ).hide();
                if ( ( $( "#badItemName" ).is( ':hidden' ) ) &&
                    ( $( "#badQuantityNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badWeightNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badBarcodeNumber" ).is( ':hidden' ) ) ) {
                    $( '#addButton' ).removeAttr( 'disabled' );
                }
            } else {
                $( "#quantity" ).removeClass( 'is-valid' );
                $( "#quantity" ).addClass( 'is-invalid' );
                $( "#badQuantityNumber" ).show();
                $( "#addButton" ).attr( 'disabled', 'disabled' );
            }
        } );
    } );
} );

$( document ).ready( function() {
    $( '#weight' ).each( function() {
        $( this ).on( 'keyup', function() {
            var value = $( "#weight" ).val();
            if ( value.length >= 1 && value.length <= 3 ) {
                $( "#weight" ).addClass( 'is-valid' );
                $( "#weight" ).removeClass( 'is-invalid' );
                $( "#badWeightNumber" ).hide();
                if ( ( $( "#badItemName" ).is( ':hidden' ) ) &&
                    ( $( "#badQuantityNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badWeightNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badBarcodeNumber" ).is( ':hidden' ) ) ) {
                    $( '#addButton' ).removeAttr( 'disabled' );
                }
            } else {
                $( "#weight" ).removeClass( 'is-valid' );
                $( "#weight" ).addClass( 'is-invalid' );
                $( "#badWeightNumber" ).show();
                $( "#addButton" ).attr( 'disabled', 'disabled' );
            }
        } );
    } );
} );
$( document ).ready( function() {
    $( '#barcode' ).each( function() {
        $( this ).on( 'keyup', function() {
            var value = $( "#barcode" ).val();
            if ( value.length >= 8 && value.length <= 12 ) {
                $( "#barcode" ).addClass( 'is-valid' );
                $( "#barcode" ).removeClass( 'is-invalid' );
                $( "#badBarcodeNumber" ).hide();
                if ( ( $( "#badItemName" ).is( ':hidden' ) ) &&
                    ( $( "#badQuantityNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badWeightNumber" ).is( ':hidden' ) ) &&
                    ( $( "#badBarcodeNumber" ).is( ':hidden' ) ) ) {
                    $( '#addButton' ).removeAttr( 'disabled' );
                }
            } else {
                $( "#barcode" ).removeClass( 'is-valid' );
                $( "#barcode" ).addClass( 'is-invalid' );
                $( "#badBarcodeNumber" ).show();
                $( "#addButton" ).attr( 'disabled', 'disabled' );
            }
        } );
    } );
} );


$( document ).ready( function() {
    $( '#createItem' ).submit( function( e ) {
        e.preventDefault();
        var itemName = $( `#itemName` ).value;

        popupS.window( {
            mode: 'alert',
            content: "New item created"
        } );
        $( this ).ajaxSubmit( {
            data: {
                itemName: itemName,
                barcode: $( `#barcode` ).value,
                quantity: $( `#quantity` ).value,
                weight: $( `#weight` ).value
            },
            contentType: 'application/json'
        } );

        return false;

    } );
} );

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
                    content: "Added item to cart",
                    labelOk: 'View Cart',
                    labelCancel: 'Close',
                    onSubmit: function() {
                        window.location.href = "/cart";
                    },
                } );
                updateShoppingCartTotal();
            } )
            .fail( function() {
                console.log( "Add to cart failed" );
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
    $( '.remove-from-cart' ).change( function() {
        var itemName = $( this ).closest( "tr" ).find( 'th' ).html();
        $.ajax( {
            method: 'POST',
            url: '/removeItemFromCart',
            data: {
                itemName: itemName,
            }
        } ).done( function( msg ) {
            updateShoppingCartTotal();
        } ).fail( function( msg ) {
            console.log( "Could not delete item" )
        } );
    } );
} );