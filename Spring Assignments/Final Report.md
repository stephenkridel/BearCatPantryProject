
# Bearcat Pantry Project

## Table of Contents 
1. [Project Description](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Fall%202018%20Assignments/Project%20Description%20.md)
2. [Test Plan & Results](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Overall%20Test%20Plan.pdf)
3. [User Manual](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/User%20Guide.md)
4. [Spring Final Powerpoint Presentation](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Senior%20Design.pptx)
5. [Final Expo Poster](https://github.uc.edu/severswa/BearCatPantryProject/blob/master/Spring%20Assignments/Expo%20Poster.pdf)
6. [Assessments](##Assessments)
7. [Summary of Hours and Justification](##Summary)


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
### Slide 1
![](https://i.ibb.co/GvqXbc4/Slide1.jpg)
### Slide 2
![](https://i.ibb.co/vX8BMyp/Slide2.jpg)
### Slide 3
![](https://i.ibb.co/51br4f3/Slide3.jpg)
### Slide 4
![](https://i.ibb.co/25hQGz0/Slide4.jpg)
### Slide 5
![](https://i.ibb.co/jg9j0tX/Slide5.jpg)
### Slide 6
![](https://i.ibb.co/sHgyX9Z/Slide6.jpg)
### Slide 7
![](https://i.ibb.co/37Gb0cd/Slide7.jpg)
### Slide 8
![](https://i.ibb.co/8D6KXm0/Slide8.jpg)
### Slide 9
![](https://i.ibb.co/W0Dn0HG/Slide9.jpg)

## Final Expo Poster
![](https://i.ibb.co/KW5YVty/Poster.jpg)


## Assessments ##
### Inital Self-Assessments

#### Christian Davidson
##### Fall Assessment
To me, the Bearcat Pantry project is about two things: growth and community. From my standpoint as a student in the computer science program, there’s a ton of opportunity to learn new things about software development. One of the requested features is a website, which means interface and web design will be required skills. Another feature is an app, something else which will require a skill set to be developed so that the appropriate code can be implemented. But above all of that, one of the most exciting things about this project is its potential to aid the student community. As a student of the University of Cincinnati, not just of computer science, the idea that my work might actuallysee use from a group within the university trying to make life better for a group of underprivileged students is something exciting in its own right.As far as how the college curriculum will benefit my project, there’s several examples. One of these is the User Interface1 (CS 5167)class I took a few semesters ago. The work done in this class has provided me with a basic understanding of good interface design, something that will be incredibly important if actual students will be using the software we design someday. Another exampleis Software Engineering(EECE 3093). Software Engineering will help guide the processes we go through in order to design and implement our project, as well as the documentation we create, in order to make sure the project runs smoothly and efficiently. Lastly, Android Development (IT 1046) will supply me with a basic knowledge of Android app development should we wind up actually creating an app as part of the project.Moving on, my co-op experience will also benefit the project in multiple ways. Some of the ways these experiences will assist my work is in the area of soft skills. On all of my co-ops, both at Siemens PLM and Rockwell automation, I attended various meetings for project updates, demos, and progress reporting. This will all be necessary for our project which is being overseen in some part by a board constructed to guide the work we do. Of course, technical skills developed are also important. At Siemens PLM, during one semester I was tasked with creating a web interface and server to communicate with each other. Learning how to do this will give me a starting point for the web work required for our project.All in all, I’m really excited to start making headway with this project. As mentioned before, the idea of a project that is both beneficial to me as well as the school, on top of being a project that is expected to actually see use one day, is a huge motivation boost. Not only that, but being able to work on such a project with people I know and can trust will work as hard as I am, that is a one of a kind experience I am glad I will be a part of. Going even further, a well done senior design project is something that will look great to prospective employers. Though it may be a required project in the end, it’s one I’m looking towards with high hopes. As far as our preliminary approach, we know what’s expected of us and plan to go from there. An app and a website, whichcan be used by Bearcat Pantry for inventory or relevant students for checking out what goods are available, and a server tohouse an inventory database. As such, our expected results at this point are a website, an android app, and a server for the database and website. Our goals might shift somewhat as expectations/deadlines are decided, but those are what we are ultimately shooting for. As far as evaluating our contributions, we’ll know we’re done when we’re told our done for the most part. As long as we keep features realistic and don’t let our requirements balloon, the board overseeing the project should have a good idea onwhat is needed from us. As such, we’ll know we’ve done a good job if they decided to actually use our work to run their program, something I personally would love to see happen.
##### Spring Assessment

#### Adam Kowalski
##### Fall Assessment
The project involves automating the Bearcat food pantry process at the University of Cincinnati. Stephen Kridel is the project lead and I was told from him about a hundred students regularly use the bearcat food pantry because of food insecurities. Currently the bearcat pantry does not have any automated system for the pantry. The bearcat pantry service does not manage inventory and Stephen as well as the associated members of the board want to automate the process to better meet the needs of students. The goal of this assignment is to automate all aspects of the bearcat pantry process. This project will require creating a database that will store and monitor the bearcat pantry information. The project will need a desktop application or phone application that will allow employees at the pantry to scan barcodes and update inventory. Having a web application or phone application to allow students to check inventory and checkout items in the inventory. We want to automate the process similar to the Amazon store on Calhoun street. We want the process to require little human interaction and be easily maintainable.My college experience has provided me the necessary skills and background experience to succeed on this project. I have gained advance knowledge of coding languages and techniques. The foundation for my coding skills and techniques was built by the C++ courses such as CS 1021 C, CS 2028C, and EECE 4029. Through these courses I gained knowledge of data structures and object-oriented programming. I learned advance sorting algorithms and gained advance knowledge of operating systems through EECE 4029. Throughout this project, I will be utilizing skills taught through software engineering (EECE 3093 C) this involves project design, scrum, and agiledevelopment.I will be utilizing my database design course (CS 4092) to setup the database and create stored procedures. I will utilize android development course (IT 1046 C) when setting up the androidor IOSapplication in the project. I will also draw upon the knowledge gained this semester from data security. Data Security will be important to help keep the application and client information secure.My co-op experience has given the added benefit of giving me a diverse technical and soft skill experience. I have had five co-ops at two different companies. All my co-ops have involved work in the automation and controls area. My co-ops consisted working on project-based assignments for clients. I have been involved in project reviews meetings, and Ihave worked on a scrum team. The first co-op I had allowed me to work on a C# desktop application that used image recognition to read barcodes of car parts and update a database. This co-op helped me gain insight on image recognition and how to read barcodes using barcode scanners. On my last three co-op’s I worked on many projects that involved either object oriented visual basic code, databases, and advance scripting software. Working with database queries, stored procedures, and creating databases will give the team the foundation to hit the ground running on the project. I am used to working with clients and I understand that communication between contractors and clients is important for a project to succeed. I have the soft skills as well as the technical skills and I as well as the team are suited for the different road blocks that we will hit during the projectbecause of the different skills each memberof the team brings to the table.I am extremely excited to set the project in motion. This project is a way for me to make a difference to the University of Cincinnati. Project based assignments is something I am very passionate about. I look forward to seeing the end result and how the end product will benefit students at the University of Cincinnati. Getting to work a project with a group of students that I can rely on will help make a great product. I think this project is a great way to show my diverse knowledge coding in multiple languages. This project is not only going to improve mytechnical skills as a person but willbe an experiencethat will help me grow in my career. One other thing that motivates me is getting to work on multiple different aspects of a single projectis something that I will love to be apart of. For the preliminary approach, our end goal is to create a product that is simple, reliable, and easier for the end user. We want the product to be accessible to as many of the students as possible.Our preliminary approachis that we need a website built for the pantry. This website is going to allow students to checkout and access inventory. A server is going to be needed to manageand maintain the inventory. Wewill needa desktop or android application to allow bearcat pantry employees to update inventory in the database. So,we currently have three aspects of the project. We have a database that needs to be created, a desktop/androidapplication, and webapplication.The end goal is to have all these pieces of software completed and working together in unity. Ourcontributions will be evaluated by Stephen Kridel as well as the bearcat pantry clients. We will knowwhen we are done when the clients’featuresare all completed. We know that we have done a good job if the product is beingused after development is completed.If the features are kept realisticand our backlog doesn’tincrease exponentialwe should have no problem completing this project with all features required by the board and StephenKridel. 

##### Spring Assessment
I contributed to the task of barcode scanning, user interface design, login-system, unit testing, integration testing, form validation, pagination, and database development. In the initial fall semester, I wanted to build upon and showcase my experience of multiple software languages. I wanted to have a project that showcased my experience among web, server, front-end, and app development. I got to show case my experience on front-end and web server as well as learned new web development skills. 

My previous co-ops are not web development positions and I have not had previous experience in JavaScript. I showcased my experience to adapt and overcome programming in new languages. I first started out working on the barcode scanning portion of the project. I had to utilize different API’s to get barcode working as anticipated and learn the syntax for JavaScript. I than worked on form validation which is preventing bad inputs from the users. I wrote many JavaScript functions which would prevent inputs based on length and characters. After working on form validation, I helped with testing. I utilized the API puppeteer which I have not had any previous exposure to. I wrote all the test for our test plan as well as documented the results. On the project most of my task are successes. The only obstacle I had was incorporating UC’s authentication into our project. Based on time constraints we decided as a team to use google authentication instead. I incorporated google authentication over a couple of days as well as established security around our login system using cookies.
#### Andrew Kump
##### Fall Assessment
To me, the Bearcat Pantry senior design project is all about utilizing the knowledge I have gained here at UC, and togive back to the local communitythrough this project. From an academic perspective, I hope to further my technical knowledge through implementation, but also the project management side of the senior design project. The Bearcat Pantry will require a website, an app, and potentially there could even be further expansion.Also, working with the senior design team as well as the Bearcat Pantry board will be beneficial for project management and the non-coding side of the project.As this is a real world project that will likelysee future use after our time here, this is a fantastic opportunity for me to up my game,and write high quality production level code. I see the Bearcat Pantry as a fantasticopportunity as a Computer Science student and look forward to the months to come.At the University of Cincinnati, I have had the opportunity to learn both in the classroom, but also in the “real world”during co-op. A few of my classes here on campuswill be vital to my work on the Bearcat Pantry. The Software Engineering(EECE 3093)classwill help immensely. In this class, we learned about the overarching design and implementation of a software engineering project. We also learned about the different forms of software engineering. Splitting up the work, and understanding how the different parts of the software work will be essential for the Bearcat Pantry. Our advisor, Nan Niu, was also our professor for Software Engineering. This already established relationship will make communication and expectations better. The other class that will help the project is Tech/Sci Writing (Engl 4092). Communication is above all else in software design. Also, we will most likely be leaving this project behind toanotherindividual after the team graduates. 
They need to clearly understand the various aspects of the application. End users are also going to need to clearly understand the use of the application. This can be accomplished with our technical writing abilities.My knowledge gained on my five co-op rotations at Siemens PLM Software will also play a large role in the project. I have been a front-end web developer for all of my co-op rotations, and this project is essentiallymy job description. I hope to utilizethe technical skills such as Angular, JS, HTML, CSS, AWS, testing frameworks, and more for the Bearcat Pantry. At Siemens, we also utilized many of the concepts we learned in Software Engineering. Seeing this in practice, and understand how alot of the process works will greatly help our teamwork on the Bearcat Pantry. I hope to bring a lot to the table with the extensive knowledge I have gained in the classroom, and on co-op.I am extremely excited to work on this project. For starters, this project will greatly help out those within the University of Cincinnati community. Nothing feels better than helping out those in need. Now that I am a 5thyear student, it is my job to step up as a leader on campus and give back. While I was working at Siemens, it has been hard at times to stay motived as I am building “their”software. What I mean by that is, when I will be working on the Bearcat Pantry, it will be a lot more personal of a project as we are building it from the ground up. Also, I do not want to let the many students who use the pantry down.For our preliminaryapproach, we first need to clearly understand our requirements. We have heard this may be an app and a website, but nothing has been confirmed. So first things first, clear requirements need to be set with the board. If an app and a website are required, we will also require a database to store all the pantry’s information as well. Depending on implementation time and requirements, this may change. Evaluating contributions may be difficult. Hopefully, we are able to design the project in itsentirety and then split up the implementation based on our strengths. Then, the board, our advisor, and professor will able to evaluate the different aspects of the project.
##### Spring Assessment
For my senior design project, The Bearcat Pantry, I’d like to think I was the technical team lead. From day one and onward, the overall architecture and design of the project was my vision. I initially setup our Express backend, and got a barebones web app going. As the semester went on, I integrated MonogoDB, created a build system, setup a testing framework, and completely structured the website’s codebase. Once a new part of the website was added, I would do my best to educate the rest of the team on the framework. Next, I’d try to find small stories that they could do to easily ramp up on the new topic. Yes I definitely applied and built upon the skills from last fall. I was already somewhat familiar with web design, but not a new web app from scratch. So, being able to completely design and architect the code from scratch was great experience.Overall, I’m seriously really satisfied with how my senior design experience went. I truly did learn a lot. The first major thing I learned was how terrible I am at determining how long tasks will take. Many stories we had took a lot shorter than expected, so keeping everyone busy was difficult. Also, for example, getting the initial framework setup took a lot longer than expected. Once this was setup, all of our team could follow these predetermined best practices. However, figuring this out in the first place was difficult. My greatest success for the project would be setting up the initial backend and integrating it with the database. Previously, I had never done anything like this. I wasn’t sure if I would even enjoy it, but wow I was blown away. I really want to go back and refactor all of my initial code based on what I’ve learned throughout this semester. The main obstacles for this semester never really dealt with technical complexities, but with communication among the team, and outside of the team.
#### Will Severson
##### Fall Assessment
This semester didn't involve any work from the group towards our senior project. As it was mostly planning and scheduling tasks for the project, Anytime there was a deadline for an upcoming assignment, the group met together to complete it. On several occasions I ended up meeting with my group members online where we would get into a voice channel and collaborate using google docs to work on an assignment. As a result, my work contribution was very balanced along with my group members for this semester’s assignments. 
Next semester i envision being much different, as we begin the project. As such I’ll be working whenever my calendar allows me to, which will not aline with all of my group member’s calendars. The biggest reason for this is that I will be continuing to work at the company that I did my last co-op at, whereas none of my group members have worked there. 
##### Spring Assessment
My contribution to my group’s senior design project was programming of various elements for the pantry website. Specifically, I am responsible for the pagination of the website, the search-bar, the admin menu, work with the university to attempt to get the website hosted, as well as working with other group members to resolve issues they were facing. Among the skills identified last semester, not many transferred to this project. My experience in the workforce has almost entirely been scripting and back-end development, whereas this project is mostly node.js web development, which are two things i had no experience in whatsoever. Among my contributions, the pagination proved to be by far the most difficult, as there was no documentation that I could find in regards to pagination with handlebars js, within node.js. To accomplish this task, i had a laundry list of issues to figure out, such as how to use mongodb, how to pass url parameters, how to pass variables to a handlebars html file, and every single possible use case that pagination would require to operate bug free. Additionally, I also worked on the searchbar and the admin menu, both of which took significantly less time than pagination. The search bar was a textfield that passed a url parameter to pagination which queried the mongodb database for the searchterm. The admin menu was a menu that housed all the admin pages. I volunteered to try to work with the university to 
Overall, i learned much about web development and javascript programming, as i had no experience from the start. Of the items assigned to me for development, i successfully completed them all without bugs for the final product. The obstacles i faced during the project were mostly my inexperience with the language, as well as the difference between coding backend for a .net program and a browser based website. Additionally, the largest obstacle i faced during the project was the lack of communication from the university about a project we were asked for. 


##### Fall Assessment


## Summary ##
