var assert = require( 'assert' )
var puppeteer = require( 'puppeteer' )
var fs = require( 'fs-extra' )


// puppeteer options
const opts = {
    headless: false,
    timeout: 10000
}

var desktop = {
    width: 1920,
    height: 1080
}



describe( 'All Bearcat Pantry Tests', async function() {
    // Setup global page/browser
    let page;
    let browser;
    
    // Setup output directory
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dateString = `${hours}:${minutes}:${seconds}/`;
    var out_dir = 'tests/out/' + dateString;

    before( async function() {
        fs.ensureDir( out_dir )
            .then( () => {
                console.log( 'success!' )
            } )
        browser = await puppeteer.launch( opts );
    } );

    beforeEach( async function() {
        page = await browser.newPage();
        await page.goto( 'http://localhost:3000/home' );
        await page.setViewport( desktop );
    } );

    after( async function() {
        await browser.close();
    } );

    afterEach( async function() {
        await page.close();
    } );

    describe( 'Search Tests', function() {
        it( 'Verify searching for cookies returns cookies', async function() {
            // Wait for the page to load
            const BODY_SELECTOR = '.main-container';
            await page.waitFor( BODY_SELECTOR );

            // Get the search box, type cookies, and then click search button
            var searchBar = await page.$( '#globalSearchBar' );
            await searchBar.type( "cookies" );
            var seachButton = await page.$( '.nav-bar-search .btn' );
            await seachButton.click();

            // Page navigate on search, so wait
            await page.waitForNavigation();

            // Verify search worked
            var cookies = await page.$x( "//*[contains(text(),'Cookies')]" );
            if ( cookies ) {
                assert.ok( true, 'found cookies' );
                await page.screenshot( {
                    path: out_dir + 'foundCookies.png'
                } );
            } else {
                await page.screenshot( {
                    path: out_dir + 'example.png'
                } );
                assert.fail( "Cookies not found!" );
            }
        } );
    } );
} );