var assert = require( 'assert' )
var puppeteer = require( 'puppeteer' )
var fs = require( 'fs-extra' )

  
// puppeteer options
const opts = {
    headless: false,
    timeout: 10000000
    
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
        slowMo:250
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

    
       describe( 'Item test with Barcode and Item Name that does not exist', function() {
            it( 'Verify adding new item with barcode and item name works', async function() {
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
                    assert.ok( true, 'Found Norman' );
                } else {
                    assert.fail( "Item with barcode and item name not created!" );
                }
            } );
        } );
        /*describe( 'Item test with barcode that does not exist but item name does', function() {
            it( 'Verify Adding New Item With Barcode', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );
    
                // Get the search box, type cookies, and then click search button
                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#ItemWithoutBarcodeTab');
                await EditItemTab.click()
                await delay(500)
                var itemName = await page.$('#itemName');
                await itemName.type( "Bangrang" );
                var addButton = await page.$('#addNoBarcodeButton');
                await addButton.click();
                await page.waitForNavigation();
                var quantity = await page.$('#quantity');
                await quantity.type("700");
                var weight = await page.$('#weight');
                await weight.type("50");
                var imageButton = await page.$('#image');
                const filePath=(process.cwd()+"/tests/mocha/"+"/testFile.jpg");
                await imageButton.uploadFile(filePath);
                var addButton = await page.$('#addButton');
                await addButton.click()
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var Test = await page.$x( "//*[contains(text(),'Banrang')]" );
                if (Test) {
                    assert.ok( true, 'Found Bangrang' );
                } else {
                    assert.fail( "Item without barcode not created!" );
                }
            } );
        } );
        describe( 'Delete Existing Item', function() {
            it( 'Verify Deleting Existing Item Works', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );

                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var EditTestTab = await page.$('#Norman');
                await delay(500)
                await EditTestTab.click();
                await delay(500)
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
        describe( 'Delete Existing Item', function() {
            it( 'Verify Deleting Existing Item Works', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );

                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var EditTestTab = await page.$('#Bangrang');
                await delay(500)
                await EditTestTab.click();
                await delay(500)
                var DeleteButton = await page.$('#DeleteBangrang');
                await DeleteButton.click()
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var Test = await page.$x( "//*[contains(text(),'Bangrang')]" );
                if (Test<1) {
                   assert.ok(true, 'Deleted Bangrang' );
                } else {
                    assert.fail( "Item Not Deleted!" );
                }
            } );
        } );
        describe( 'Item test with barcode that does exist and item name exist', function() {
            it( 'Verify adding existing item with barcode', async function() {
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
                await quantity.type("200");
                var weight = await page.$('#weight');
                await weight.type("4");
                var imageButton = await page.$('#image');
                const filePath=(process.cwd()+"/tests/mocha/"+"/testFile.jpg");
                await imageButton.uploadFile(filePath);
                var addButton = await page.$('#addButton');
                await addButton.click()
                await page.waitForNavigation();
                var barcodeNumber = await page.$('#barcode');
                await barcodeNumber.type( "80808080" );
                var addButton = await page.$('#addButton');
                await addButton.click();
                await page.waitForNavigation();
                var quantity = await page.$('#quantity');
                await quantity.type("200");
                var addButton = await page.$('#addButton');
                await addButton.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var EditItemTab = await page.$('#Norman');
                await delay(500)
                await EditItemTab.click()
                await delay(500)
                var Test = await page.$x( "//*[contains(text(),'1000')]" );
                if (Test) {
                    assert.ok( true, 'Found 400' );
                } else {
                    assert.fail( "Item Number was incremented!" );
                }
            } );
        } );
        describe( 'Delete Existing Item', function() {
            it( 'Verify Deleting Existing Item Works', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );

                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var EditTestTab = await page.$('#Norman');
                await delay(500)
                await EditTestTab.click();
                await delay(500)
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
        describe( 'Item test with barcode that does not exist and item name exist', function() {
            it( 'Verify incrementing existing item works', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );
    
                // Get the search box, type cookies, and then click search button
                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#ItemWithoutBarcodeTab');
                await EditItemTab.click()
                await delay(500)
                var itemName = await page.$('#itemName');
                await itemName.type( "Bangrang" );
                var addButton = await page.$('#addNoBarcodeButton');
                await addButton.click();
                await page.waitForNavigation();
                var quantity = await page.$('#quantity');
                await quantity.type("300");
                var weight = await page.$('#weight');
                await weight.type("50");
                var imageButton = await page.$('#image');
                const filePath=(process.cwd()+"/tests/mocha/"+"/testFile.jpg");
                await imageButton.uploadFile(filePath);
                var addButton = await page.$('#addButton');
                await addButton.click()
                await page.waitForNavigation();
                var EditItemTab = await page.$('#ItemWithoutBarcodeTab');
                await EditItemTab.click()
                await delay(500)
                var itemName = await page.$('#itemName');
                await itemName.type( "Bangrang" );
                var addButton = await page.$('#addNoBarcodeButton');
                await addButton.click();
                await page.waitForNavigation();
                await delay(500)
                var quantity = await page.$('#quantity');
                await quantity.type("300");
                var addButton = await page.$('#addButton');
                await addButton.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var EditItemTab = await page.$('#Bangrang');
                await delay(500)
                await EditItemTab.click()
                await delay(500)
                var Test = await page.$x( "//*[contains(text(),'1000')]" );
                if (Test) {
                    assert.ok( true, 'Found 600' );
                } else {
                    assert.fail( "Item Number was incremented!" );
                }
              
            } );
        } );
        describe( 'Delete Existing Item', function() {
            it( 'Verify Deleting Existing Item Works', async function() {
                // Wait for the page to load
                const BODY_SELECTOR = '.main-container';
                await page.waitFor( BODY_SELECTOR );

                var itemPage = await page.$('#ManageItemsPage');
                await itemPage.click();
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var EditTestTab = await page.$('#Bangrang');
                await delay(500)
                await EditTestTab.click();
                await delay(500)
                var DeleteButton = await page.$('#DeleteBangrang');
                await DeleteButton.click()
                await page.waitForNavigation();
                var EditItemTab = await page.$('#Tab');
                await EditItemTab.click()
                var Test = await page.$x( "//*[contains(text(),'Bangrang')]" );
                if (Test<1) {
                   assert.ok(true, 'Deleted Norman' );
                } else {
                    assert.fail( "Item Not Deleted!" );
                }
            } );
        } );
        
       describe( 'Search Tests', function() {
        it( 'Verify searching for cookies returns cookies', async function() {
            // Wait for the page to load
            const BODY_SELECTOR = '.main-container';
            await page.waitFor( BODY_SELECTOR );

            // Get the search box, type cookies, and then click search button
            var itemPage = await page.$('#ManageItemsPage');
            await itemPage.click();
            await page.waitForNavigation();
            var barcodeNumber = await page.$('#barcode');
            await barcodeNumber.type( "50505050" );
            var addButton = await page.$('#addButton');
            await addButton.click();
            await page.waitForNavigation();
            var itemName = await page.$('#itemName');
            await itemName.type("Cookies");
            var addButton = await page.$('#addButton');
            await addButton.click();
            await page.waitForNavigation();
            var quantity = await page.$('#quantity');
            await quantity.type("600");
            var weight = await page.$('#weight');
            await weight.type("1");
            var imageButton = await page.$('#image');
            const filePath=(process.cwd()+"/tests/mocha/"+"/testFile.jpg");
            await imageButton.uploadFile(filePath);
            var addButton = await page.$('#addButton');
            await addButton.click()
            await page.waitForNavigation();
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
                /*await page.screenshot( {
                    path: out_dir + 'foundCookies.png'
                } );
            } else {
                assert.fail( "Cookies not found!" );
            }
        } );
    } );
    describe( 'Delete Existing Item', function() {
        it( 'Verify Deleting Existing Item Works', async function() {
            // Wait for the page to load
            const BODY_SELECTOR = '.main-container';
            await page.waitFor( BODY_SELECTOR );

            var itemPage = await page.$('#ManageItemsPage');
            await itemPage.click();
            await page.waitForNavigation();
            var EditItemTab = await page.$('#Tab');
            await EditItemTab.click()
            var EditTestTab = await page.$('#Cookies');
            await delay(500)
            await EditTestTab.click();
            await delay(500)
            var DeleteButton = await page.$('#DeleteCookies');
            await DeleteButton.click()
            await page.waitForNavigation();
            var EditItemTab = await page.$('#Tab');
            await EditItemTab.click()
            var Test = await page.$x( "//*[contains(text(),'Cookies')]" );
            if (Test<1) {
               assert.ok(true, 'Deleted Cookies' );
            } else {
                assert.fail( "Item Not Deleted!" );
            }
        } );
    } );*/
} );
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 };