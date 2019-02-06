import $ from 'jquery'
import popupS from 'popupS'
import Quagga from 'quagga'
import 'jquery-form'
import favicon from '../images/favicon.png'

$( window ).on( 'load', function() {
    $( 'head' ).append( `<link href="${favicon}" rel="shortcut icon" type="image/png" />` );
} );


// Use code splitting!!!! TODO
$( function() {
    // Create the QuaggaJS config object for the live stream
    var liveStreamConfig = {
        inputStream: {
            type: "LiveStream",
            constraints: {
                width: {
                    min: 640
                },
                height: {
                    min: 480
                },
                aspectRatio: {
                    min: 1,
                    max: 50
                },
                facingMode: "environment" // or "user" for the front camera
            }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: ( navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4 ),
        decoder: {
            "readers": [ {
                "format": "ean_reader",
                "config": {}
            } ]
        },
        locate: true
    };
    // The fallback to the file API requires a different inputStream option. 
    // The rest is the same 
    var fileConfig = $.extend( {},
        liveStreamConfig, {
            inputStream: {
                size: 800
            }
        }
    );
    // Start the live stream scanner when the modal opens
    $( '#livestream_scanner' ).on( 'shown.bs.modal', function( e ) {
        Quagga.init(
            liveStreamConfig,
            function( err ) {
                if ( err ) {
                    console.log( err )
                    $( '#livestream_scanner .modal-body .error' ).html( '<div class="alert alert-danger"><strong><i class="fa fa-exclamation-triangle"></i> ' + err.name + '</strong>: ' + err.message + '</div>' );
                    Quagga.stop();
                    return;
                }
                Quagga.start();
            }
        );
    } );

    // Make sure, QuaggaJS draws frames an lines around possible 
    // barcodes on the live stream
    Quagga.onProcessed( function( result ) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if ( result ) {
            if ( result.boxes ) {
                drawingCtx.clearRect( 0, 0, parseInt( drawingCanvas.getAttribute( "width" ) ), parseInt( drawingCanvas.getAttribute( "height" ) ) );
                result.boxes.filter( function( box ) {
                    return box !== result.box;
                } ).forEach( function( box ) {
                    Quagga.ImageDebug.drawPath( box, {
                        x: 0,
                        y: 1
                    }, drawingCtx, {
                        color: "green",
                        lineWidth: 2
                    } );
                } );
            }

            if ( result.box ) {
                Quagga.ImageDebug.drawPath( result.box, {
                    x: 0,
                    y: 1
                }, drawingCtx, {
                    color: "#00F",
                    lineWidth: 2
                } );
            }

            if ( result.codeResult && result.codeResult.code ) {
                Quagga.ImageDebug.drawPath( result.line, {
                    x: 'x',
                    y: 'y'
                }, drawingCtx, {
                    color: 'red',
                    lineWidth: 3
                } );
            }
        }
    } );

    // Once a barcode had been read successfully, stop quagga and 
    // close the modal after a second to let the user notice where 
    // the barcode had actually been found.
    Quagga.onDetected( function( result ) {
        if ( result.codeResult.code ) {
            $( '#barcode' ).val( result.codeResult.code );
            Quagga.stop();
            setTimeout( function() {
                $( '#livestream_scanner' ).modal( 'hide' );
            }, 1000 );
        }
    } );

    // Stop quagga in any case, when the modal is closed
    $( '#livestream_scanner' ).on( 'hide.bs.modal', function() {
        if ( Quagga ) {
            Quagga.stop();
        }
    } );

    // Call Quagga.decodeSingle() for every file selected in the 
    // file input
    $( "#livestream_scanner input:file" ).on( "change", function( e ) {
        if ( e.target.files && e.target.files.length ) {
            Quagga.decodeSingle( $.extend( {}, fileConfig, {
                src: URL.createObjectURL( e.target.files[ 0 ] )
            } ), function( result ) {
                alert( result.codeResult.code );
            } );
        }
    } );
} );


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
            content: `${itemName} has been created`,
            className: 'custom-popupS-class',
            additionalButtonOkClass: 'btn btn-primary'
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
        $.ajax( {
            method: 'POST',
            url: '/checkout'
        } ).done( function( msg ) {
            location.reload();
        } ).fail( function( msg ) {
            console.log( "Order failed!" );
            s
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