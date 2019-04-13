import $ from 'jquery'
import favicon from '../images/favicon.png'

/*
Services defines various UI tweaks using jquery
*/

$( document ).ready( function() {
    $( '#image' ).change( function() {
        var i = $( this ).prev( 'label' ).clone();
        var file = $( '#image' )[ 0 ].files[ 0 ].name;
        $( this ).prev( 'label' ).text( file );
    } );

    $( document ).click( function( event ) {
        var clickover = $( event.target );
        var _opened = $( ".navbar-collapse" ).hasClass( "show" );
        if ( _opened === true && !clickover.hasClass( "navbar-toggle" ) && !clickover.hasClass( "form-control" ) ) {
            $( "button.navbar-toggler" ).click();
        }
    } );


} );

// Hide management if youre not an admin. Currently bugged to flash. WIP
/*
$( '#managementNavLink' ).ready( function() {
    $( '#managementNavLink' ).removeClass( 'hidden' );
    if ( Cookies.get( 'isAdmin' ) ) {
        $( '#managementNavLink' ).removeClass( 'hidden' );
    }
} )
*/