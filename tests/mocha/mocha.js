var assert = require( 'assert' )
var puppeteer = require( 'puppeteer' )
var fs = require( 'fs-extra' )


// puppeteer options
const opts = {
    headless: false,
    timeout: 100000
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
        fs.ensureDir( out_dir );
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
        describe( 'Item Tests With Barcode', function() {
            it( 'Verify Adding New Item With Barcode', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );
    
                // Get the search box, type cookies, and then click search button
                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var barcodeNumber = await page.$('#barcode');
                await barcodeNumber.type( "80808080" );
                var addButton = await page.$('#addButton');
                await addButton.click();
                await page.waitForNavigation();
                var itemName = await page.$('#itemName');
                await itemName.type("Norman");
                var addButton = await page.$('#addButton');
                await addButton.click();
                await page.waitForNavigation();
                var quantity = await page.$('#quantity');
                await quantity.type("500");
                var weight = await page.$('#weight');
                await weight.type("4");
                var imageButton = await page.$('#image');
                const filePath=(process.cwd()+"/tests/mocha/"+"/testFile.jpg");
                await imageButton.uploadFile(filePath);
                var addButton = await page.$('#addButton');
                await addButton.click()
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var Test = await page.$x( "//*[contains(text(),'Norman')]" );
                if (Test) {
                    assert.ok( true, 'found Norman' );
                } else {
                    assert.fail( "Item not Created!" );
                }
            } );
        } );
        describe( 'Editing Existing Item', function() {
            it( 'Verify Editing Existing Item Works', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );

                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var EditTestTab = await page.$('#Norman');
                await EditTestTab.click();
                var DeleteButton = await page.$('#DeleteNorman');
                await DeleteButton.click()
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var Test = await page.$x( "//*[contains(text(),'Norman')]" );
                if (Test<1) {
                   assert.ok(true, 'Deleted Norman' );
                } else {
                    assert.fail( "Item Not Deleted!" );
                }
            } );
        } );
} );