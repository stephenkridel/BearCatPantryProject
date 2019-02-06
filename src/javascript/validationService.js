import $ from 'jquery'

/*
Service defines all functionality related to validating user input
whether that be text boxes, files, or disabliing of buttons
*/

$( document ).ready( function() {
    $( "#itemName" ).keypress( function( e ) {
        if ( String.fromCharCode( e.which ).match( /[^A-Za-z ]/ ) ) {
            e.preventDefault()
        }
    } );

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