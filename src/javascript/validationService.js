import $ from 'jquery'

/*
Service defines all functionality related to validating user input
whether that be text boxes, files, or disabliing of buttons
*/

$( document ).ready( function() {
    $( '#itemName' ).each( function() {
        $( this ).on( 'keyup', function() {
            var _this = this;
            var value = $( "#itemName" ).val();
            if ( value.length >= 4 && value.length <= 15 ) {
                $( "#itemName" ).addClass( 'is-valid' );
                $( "#itemName" ).removeClass( 'is-invalid' );
                $( "#badItemName" ).hide();
                validateAddItemButton( _this );

            } else {
                $( "#itemName" ).removeClass( 'is-valid' );
                $( "#itemName" ).addClass( 'is-invalid' );
                $( "#badItemName" ).show();
                validateAddItemButton( _this );

            }
        } );
    } );

    $( '#quantity' ).each( function() {
        $( this ).on( 'keyup', function() {
            var _this = this;
            var value = $( "#quantity" ).val();
            if ( /^\d+$/.test( value ) && value.length >= 1 && value.length <= 3 ) {
                $( "#quantity" ).addClass( 'is-valid' );
                $( "#quantity" ).removeClass( 'is-invalid' );
                $( "#badQuantityNumber" ).hide();
                validateAddItemButton( _this );
            } else {
                $( "#quantity" ).removeClass( 'is-valid' );
                $( "#quantity" ).addClass( 'is-invalid' );
                $( "#badQuantityNumber" ).show();
                validateAddItemButton( _this );
            }
        } );
    } );
    
    var validateAddItemButton = function( _this ) {
        var foundError = false
        $( ".invalid-feedback" ).each( function() {
            if ( $( this ).is( ':visible' ) ) {
                foundError = true;
            }
        } );
        var form = $( _this ).closest( "form" );
        form.find( "#addButton" ).attr( "disabled", foundError );
    }

    $( '#barcode' ).each( function() {
        $( this ).on( 'keyup', function() {
            var _this = this;
            var value = $( "#barcode" ).val();
            if ( /^\d+$/.test( value ) && value.length >= 8 && value.length <= 14 ) {
                $( "#barcode" ).addClass( 'is-valid' );
                $( "#barcode" ).removeClass( 'is-invalid' );
                $( "#badBarcodeNumber" ).hide();
                validateAddItemButton( _this );


            } else {
                $( "#barcode" ).removeClass( 'is-valid' );
                $( "#barcode" ).addClass( 'is-invalid' );
                $( "#badBarcodeNumber" ).show();
                validateAddItemButton( _this );
            }
        } );
    } );


} );