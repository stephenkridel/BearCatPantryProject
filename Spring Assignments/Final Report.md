
# Bearcat Pantry Project

## Table of Contents 
1. [Project Description](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Fall%202018%20Assignments/Project%20Description%20.md)
2. [Test Plan & Results](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Overall%20Test%20Plan.pdf)
3. [User Manual](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/User%20Guide.md)
4. [Spring Final Powerpoint Presentation](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Senior%20Design.pptx)
5. [Final Expo Poster](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Expo%20Poster.pdf)
6. [Assessments]

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

## Final Expo Poster
![](https://i.ibb.co/KW5YVty/Poster.jpg)


## Assessments
### Inital Self-Assessments

#### Christian Davidson
##### Fall Assessment
##### Spring Assessment

#### Adam Kowalski
##### Fall Assessment
##### Spring Assessment

#### Andrew Kump
##### Fall Assessment
##### Spring Assessment

#### Will Severson
##### Fall Assessment
##### Spring Assessment
A. My contribution to my group’s senior design project was programming of various elements for the pantry website. Specifically, I am responsible for the pagination of the website, the search-bar, the admin menu, work with the university to attempt to get the website hosted, as well as working with other group members to resolve issues they were facing. Among the skills identified last semester, not many transferred to this project. My experience in the workforce has almost entirely been scripting and back-end development, whereas this project is mostly node.js web development, which are two things i had no experience in whatsoever. Among my contributions, the pagination proved to be by far the most difficult, as there was no documentation that I could find in regards to pagination with handlebars js, within node.js. To accomplish this task, i had a laundry list of issues to figure out, such as how to use mongodb, how to pass url parameters, how to pass variables to a handlebars html file, and every single possible use case that pagination would require to operate bug free. Additionally, I also worked on the searchbar and the admin menu, both of which took significantly less time than pagination. The search bar was a textfield that passed a url parameter to pagination which queried the mongodb database for the searchterm. The admin menu was a menu that housed all the admin pages. I volunteered to try to work with the university to 
Overall, i learned much about web development and javascript programming, as i had no experience from the start. Of the items assigned to me for development, i successfully completed them all without bugs for the final product. The obstacles i faced during the project were mostly my inexperience with the language, as well as the difference between coding backend for a .net program and a browser based website. Additionally, the largest obstacle i faced during the project was the lack of communication from the university about a project we were asked for. 

B. My group created an inventory management and ordering website for the university of cincinnati bearcat food pantry. One thing i learned about group work is that its very easy for the group to lose momentum, as everyone relies on each other for motivation and assistance; for example we accidentally took all of march off as a result of spring break anticipation, and post spring break desire to graduate. The benefits of teamwork in a programming environment is the ability to assign tasks or ask advice from members with experience in different areas, all four of us came from very different co-op and working backgrounds despite being friends for our entire college careers. The downside of this means that we were all friends and could very easily convince each other to stop working for the day. 
I believe that I might not have been able to contribute quite as much as my group members in terms of coding, but I feel that it was justified by the fact that i worked everyday of the semester, as well as not having experience with the language and web development in general. One of the largest pieces of time i put into the project never made it into the final project due to the fact that my attempts to work with the university were fruitless. After numerous attempts to contact the UCIT department about hosting the website on UC servers, I was able to get a single reply, which informed me of the system that UC uses to enable users to login to UC websites, namely, shibboleth. Much of my time for the project was spent attempting to setup a local version of shibboleth for use with the site. After no additional contact was received from the university asking for answers about shibboleth (which the documentation is horrible for) was never met, we abandoned the idea of using it. Therefore the first month and a half of my work was thrown out for the project. Starting my coding contribution to the project in late february, The main piece that i worked on (pagination) was probably the most backend-eque component of the website, and was worked on in different ways all the way from january to april. I would say that each of my group members deserve recognition for helping me get up to speed with the project, as well as doing their parts for the project. 

##### Fall Assessment


