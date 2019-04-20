
# Bearcat Pantry Project

## Table of Contents 
1. [Project Description](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Fall%202018%20Assignments/Project%20Description%20.md)
2. [Test Plan & Results](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Overall%20Test%20Plan.pdf)
3. [User Manual](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/User%20Guide.md)
4. [Overall Test Plan](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Overall%20Test%20Plan.pdf)
5. [Spring Final Powerpoint Presentation](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Senior%20Design.pptx)
6. [Final Expo Poster](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Expo%20Poster.pdf)

## Project Description


   In this project we created a web application to function as a 'virtual pantry' for University of Cincinnati. This allows students that are unable to afford food to get the necessary food they will need through the website. This website gives students the ability to add food items to their shopping cart and checkout these items. Once a checkout is completed an email will be sent to the student as well as the pantry notifying them of their order. The pantry has admin tools that they can use upon logging into the website. 

   Originally, the Bearcat Pantry manually kept track of Students and Inventory. As a result, Students using this service must call in to learn about the inventory of the food pantry. With the new website it allows to effortlessly track student orders and pantry items. Each pantry item can be scanned in using a barcode or item name. This will can greater sense of anonymity and reach more students at the University. 
   
## Test Plan
<object data="https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Overall%20Test%20Plan.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Overall%20Test%20Plan.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view the groups test plan: <a href="https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Overall%20Test%20Plan.pdf">Download PDF</a>.</p>
    </embed>
</object>

### Results
#### Test 1-14
I am going to summarize the testing plan and the results. The group used puppeteer as the API for testing. Puppeteer allowed the group to simulate basic functionality as if a user went through and manually ran each test. Each of the test past on final execution of the program without any issues. We tested the program through unit testing and preventing edge cases. Are testing plan is detailed above in the attachment attached to our report.

# User Manual
## Table of Contents for User Manual
* [Bearcat Pantry Users](#bearcat-pantry-users)
    * [Browsing items](#browsing-items)
    * [Checking out items](#checking-out-items)
* [Bearcat Pantry Volunteers](#adding-items)
    * [Adding items](#adding-items) 
        * [Adding by item name](#adding-by-item-name)
        * [Adding by barcode](#adding-by-barcode)
        * [Creating new items](#creating-new-items)
    * [Editing Existing Items](#editing-existing-items)

## Bearcat Pantry Users
### Browsing items
![](https://i.imgur.com/jQeZl4s.png)
<br><br>

Item browsing can be done in one of two simple ways marked above:
1. By selecting the browse button in the toolbar located at the top of every page to view a list of all items available in the pantry.
2. By typing text into the search bar located at the top of every page to view only items which contain that text.

Each relevant item will be displayed with an image as well as the current quantity of that item within the pantry.

### Checking out items
To check an item out of the pantry, the "Add to cart" button can be selected below that item on the browse page.
<br><br>

![](https://i.imgur.com/DEOSUdV.png)
<br><br>

After clicking this button, the item will be added to a user's cart. From here, the user will be presented with a popup. The user can then choose to go directly to their shopping cart or close the popup to continue browsing and selecting items to add to their cart.
<br><br>

![](https://i.imgur.com/rVOYQeO.png)
<br><br>

The user can find their shopping cart through either method shown above:
1. By selecting the "View Cart" button on the popup appearing after a user has added an item to their cart.
2. By selecting the Shopping Cart button in the toolbar at the top of every page (displaying an indicator containing the quantity of items currently in a users cart) after selecting items to add to their cart.
<br><br>

![](https://i.imgur.com/hVifrNc.png)
<br><br>

After reaching their shopping cart, a user can edit the contents of their cart by adjusting item quantities, either by using the +/- buttons or typing in a specific quantity. They can also remove items from their cart by selecting the "Remove" button located to the right of every item.

Once a user is happy with the contents of their shopping cart, they can finishg creating their order by selecting the "Checkout" button located at the bottom of their cart. At this point, both the user and the pantry will receive an email regarding the order and its contents. Pantry volunteers will then prepare the order, which can later be picked up by the students. 

## Bearcat Pantry Volunteers/Administrators
### Adding items
![](https://i.imgur.com/ucW40l4.png)
<br><br>

To add items to the pantry, pantry volunteers can navigate to the "Manage Pantry Items" page located within the toolbar at the top of every page.

#### Adding by item name
![](https://i.imgur.com/oq1ZoEL.png)
<br><br>

Items without barcodes can be added within the "Add Item Without Barcode" tab on the "Manage Pantry Items" page. After typing in an item name (case insensitive) and clicking the "Add Item" button, the application will search for an existing item with the specified item name. 
<br><br>

![](https://i.imgur.com/zmVevQK.png)
<br><br>

If the item is found, the pantry volunteer will be prompted for a quantity of the item to be added to the database. If not, they will be prompted to [create the item](#creating-new-items)

#### Adding by barcode
![](https://i.imgur.com/jOpEZTK.png)
<br><br>

Items with barcodes can be added within the "Add Item With Barcode" tab on the "Manage Pantry Items" page. Volunteers can press the "Open Scanner" button in order to scan a barcode using their device's camera. They can also manually type in barcode numbers, should they choose to.

Similarly to adding items by name, the application will search for existing items with the specified barcode. If the barcode is found, the user will be prompted to enter an item quantity to add to the pantry. 
<br><br>

![](https://i.imgur.com/aMfXuGQ.png)
<br><br>

If the item is not found, the user will then be prompted for the name of the item. If an item exists with this item name, the barcode will be added to the list of possible barcodes which represent that item. The user will then be prompted to enter an item quantity to add to the pantry, as usual.

If neither the barcode nor the item name can be found within the pantry, the user will be prompted to [create the item](#creating-new-items)

#### Creating new items
![](https://i.imgur.com/qc6lPEm.png)
<br><br>

If an existing item cannot be identified while adding an item to the pantry, the user will be asked to create a new item listing for that item. They will be asked to enter the item's name (which will be prefilled with whatever item name they entered in the Add Item process), quantity, weight/cost (name subject to change), and image. If the item was added with a barcode, the given barcode will be shown in an uneditable text box beneath the other item properties. 

After selecting the "Add Item" button, a new listing will be added to the pantry for this item.

### Editing existing items
![](https://i.imgur.com/cUJ7paO.png)
<br><br>

Items can be edited within the "Edit Existing Items" tab on the "Manage Pantry Items" page. Here, items will be shown similarly to the "Browse" page. Each item will be shown with their image, quantity total, relevant barcodes, and weight/cost (name subject to change). 
<br><br>

![](https://i.imgur.com/lvGBTfG.png)
<br><br>

Upon clicking the "Edit" button located at the top of an item, a popup will appear prompting volunteers to edit the item's name, list of barcodes (comma separated), the total item quantity in the pantry, and the item's weight/cost. Changes can be saved by selecting the "Save" button at the bottom of the popup. Note: If manually adding barcodes, be careful not to add the same barcode to multiple items. 

Volunteers also have the option of deleting the item by clicking the "Delete" button at the bottom of the popup.



## Final Expo Poster
![](https://i.ibb.co/KW5YVty/Poster.jpg)





## Spring Presenatation
![](https://i.ibb.co/GvqXbc4/Slide1.jpg)
![](https://i.ibb.co/vX8BMyp/Slide2.jpg)
![](https://i.ibb.co/51br4f3/Slide3.jpg)
![](https://i.ibb.co/25hQGz0/Slide4.jpg)
![](https://i.ibb.co/jg9j0tX/Slide5.jpg)
![](https://i.ibb.co/sHgyX9Z/Slide6.jpg)
![](https://i.ibb.co/37Gb0cd/Slide7.jpg)
![](https://i.ibb.co/8D6KXm0/Slide8.jpg)
![](https://i.ibb.co/W0Dn0HG/Slide9.jpg)



