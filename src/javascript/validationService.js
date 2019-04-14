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
            if ( value.length >= 4 && value.length <= 20 ) {
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
    $( '.newItemNameBox' ).each( function() {
        $( this ).on( 'keyup', function() {
            var value = $( this ).val();
            var badItemTemp = this.parentElement.querySelector( ".badItemNameBox" );
            if ( value.length >= 4 && value.length <= 20 ) {
                $( this ).addClass( 'is-valid' );
                $( this ).removeClass( 'is-invalid' );
                $( badItemTemp ).hide();
                validateAddItemButton( this );

            } else {
                $( this ).removeClass( 'is-valid' );
                $( this ).addClass( 'is-invalid' );
                $( badItemTemp ).show();
                validateAddItemButton( this );

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


        $( _this ).closest( "form" ).children( '.form-group' ).each( function() {
            var input = $( this ).find( 'input' )[ 0 ];
            var valid = input.classList.contains( "is-valid" );
            if ( !valid || input.classList.contains( "is-invalid" ) ) {
                foundError = true;
            }
        } );
        var form = $( _this ).closest( "form" );
        form.find( "#addButton" ).attr( "disabled", foundError );
    };
    $( '.barcodeEditBox' ).on( 'keyup', function() {
        var value = $( this ).val();
        var barcodeList = value.split( "," );
        var badBarcodeText = this.parentElement.querySelector( ".badBarcodeNumber" );
        var barcodeIsValid = true;
        for ( var i = 0; i < barcodeList.length; i = i + 1 ) {
            var barcode = barcodeList[ i ].trim();
            if ( !( /^\d+$/.test( barcode ) && barcode.length >= 8 && barcode.length <= 14 ) ) {
                barcodeIsValid = false
            }
        }
        if ( barcodeIsValid ) {
            $( this ).addClass( 'is-valid' );
            $( this ).removeClass( 'is-invalid' );
            $( badBarcodeText ).hide();
            validateAddItemButton( this );


        } else {
            $( this ).removeClass( 'is-valid' );
            $( this ).addClass( 'is-invalid' );
            $( badBarcodeText ).show();
            validateAddItemButton( this );
        }
    } );
    $( '#barcode' ).each( function() {
        $( this ).on( 'input', function() {
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
    $( '.quantityEditBox' ).on( 'keyup', function() {
        var value = $( this ).val();
        var badQuantityTemp = this.parentElement.querySelector( ".badQuantityNumberBox" );
        if ( /^\d+$/.test( value ) && value.length >= 1 && value.length <= 3 ) {
            $( this ).addClass( 'is-valid' );
            $( this ).removeClass( 'is-invalid' );
            $( badQuantityTemp ).hide();
            validateAddItemButton( this );
        } else {
            $( this ).removeClass( 'is-valid' );
            $( this ).addClass( 'is-invalid' );
            $( badQuantityTemp ).show();
            validateAddItemButton( this );
        }
    } );

    $( '.weightEditBox' ).each( function() {
        $( this ).on( 'keyup', function() {
            var value = $( this ).val();
            var badWeightTemp = this.parentElement.querySelector( ".badWeightNumberBox" );
            if ( /^\d+$/.test( value ) && value.length >= 1 && value.length <= 3 ) {
                $( this ).addClass( 'is-valid' );
                $( this ).removeClass( 'is-invalid' );
                $( badWeightTemp ).hide();
                validateAddItemButton( this );


            } else {
                $( this ).removeClass( 'is-valid' );
                $( this ).addClass( 'is-invalid' );
                $( badWeightTemp ).show();
                validateAddItemButton( this );
            }
        } );
    } );
    $( document ).ready( function() {
        $( '#weight' ).each( function() {
            $( this ).on( 'keyup', function() {
                var _this = this;
                var value = $( "#weight" ).val();
                if ( /^\d+$/.test( value ) && value.length >= 1 && value.length <= 3 ) {
                    $( "#weight" ).addClass( 'is-valid' );
                    $( "#weight" ).removeClass( 'is-invalid' );
                    $( "#badWeightNumber" ).hide();
                    validateAddItemButton( _this );


                } else {
                    $( "#weight" ).removeClass( 'is-valid' );
                    $( "#weight" ).addClass( 'is-invalid' );
                    $( "#badWeightNumber" ).show();
                    validateAddItemButton( _this );
                }
            } );
        } );
    } );

    $( "input:file" ).change( function() {
        var fileName = $( this ).val();
        var _this = this;

        if ( fileName ) {
            $( "#image" ).addClass( 'is-valid' );
            $( "#image" ).removeClass( 'is-invalid' );
        }
        validateAddItemButton( _this );

    } );


} );