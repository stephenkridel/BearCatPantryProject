$( document ).ready( function() {
    $( '#image' ).change( function() {
        var i = $( this ).prev( 'label' ).clone();
        var file = $( '#image' )[ 0 ].files[ 0 ].name;
        $( this ).prev( 'label' ).text( file );
    } );
} );



$(document).ready(function() {
    $('#itemName').each(function() {
        $(this).on('keyup', function() {
            var value = $( "#itemName" ).val();
            if ( value.length >= 4 && value.length<=15) {
                $( "#itemName" ).addClass( 'is-valid' );
                $( "#itemName" ).removeClass( 'is-invalid' );
                $( "#badItemName" ).hide();
            } else {
                $( "#itemName" ).removeClass( 'is-valid' );
                $( "#itemName" ).addClass( 'is-invalid' );
                $( "#badItemName" ).show();
            }
        });
    });
});
$(document).ready(function() {
    $('#quantity').each(function() {
        $(this).on('keyup', function() {
            var value = $( "#quantity" ).val();
            if ( value.length >= 1 && value.length<=3) {
                $( "#quantity" ).addClass( 'is-valid' );
                $( "#quantity" ).removeClass( 'is-invalid' );
                $( "#badQuantityNumber" ).hide();
            } else {
                $( "#quantity" ).removeClass( 'is-valid' );
                $( "#quantity" ).addClass( 'is-invalid' );
                $( "#badQuantityNumber" ).show();
            }
        });
    });
});

$(document).ready(function() {
    $('#weight').each(function() {
        $(this).on('keyup', function() {
            var value = $( "#weight" ).val();
            if ( value.length >= 1 && value.length<=3) {
                $( "#weight" ).addClass( 'is-valid' );
                $( "#weight" ).removeClass( 'is-invalid' );
                $( "#badWeightNumber" ).hide();
            } else {
                $( "#weight" ).removeClass( 'is-valid' );
                $( "#weight" ).addClass( 'is-invalid' );
                $( "#badWeightNumber" ).show();
            }
        });
    });
});
$(document).ready(function() {
    $('#barcode').each(function() {
        $(this).on('keyup', function() {
            var value = $( "#barcode" ).val();
            if ( value.length >= 8 && value.length<=12) {
                $( "#barcode" ).addClass( 'is-valid' );
                $( "#barcode" ).removeClass( 'is-invalid' );
                $( "#badBarcodeNumber" ).hide();
            } else {
                $( "#barcode" ).removeClass( 'is-valid' );
                $( "#barcode" ).addClass( 'is-invalid' );
                $( "#badBarcodeNumber" ).show();
            }
        });
    });
});



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
    $( '#addItem' ).submit( function( e ) {
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
    $( '.add-to-cart-button' ).submit( function( e ) {
        e.preventDefault();
        var itemName = $( `#itemName` ).value;
        popupS.window( {
            mode: 'alert',
            content: "Added item to cart"
        } );
        $( this ).ajaxSubmit( {
            data: {
                itemName: itemName,
                success: function() {
                    updateShoppingCartTotal();
                }
            }
        } );
        return false;
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
                console.log( "email sent" )
            } )
            .fail( function( msg ) {
                console.log( "email failed" )
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