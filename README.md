
# Bearcat Pantry Project

## Table of Contents 
1. [Team Members](https://github.uc.edu/severswa/BearCatPantryProject#team-members)
2. [Project Description](https://github.uc.edu/severswa/BearCatPantryProject#project-description)
3. [User Stories and Design Diagrams](https://github.uc.edu/severswa/BearCatPantryProject#user-stories)
4. [Project Tasks and Timeline](https://github.uc.edu/severswa/BearCatPantryProject#bearcat-pantry-tasks)
    * [Task List](https://github.uc.edu/severswa/BearCatPantryProject#bearcat-pantry-tasks)
    * [Timeline](https://github.uc.edu/severswa/BearCatPantryProject#timeline)
    * [Effort Matrix](https://github.uc.edu/severswa/BearCatPantryProject#effort-matrix)
5. [ABET Concerns Essay](https://github.uc.edu/severswa/BearCatPantryProject#abet)
6. [Slideshow](https://github.uc.edu/severswa/BearCatPantryProject#presenatation)
7. [Self-Assessment Essays](https://github.uc.edu/severswa/BearCatPantryProject#self-assesment-essays)
8. [Professional Biographies](https://github.uc.edu/severswa/BearCatPantryProject#professional-biography-adam-kowalski)
9. [Budget](https://github.uc.edu/severswa/BearCatPantryProject#budget)
10. [Appendix](https://github.uc.edu/severswa/BearCatPantryProject#appendix-for-the-team)


## Team Members
Christian Davidson: davidsc8@mail.uc.edu

Adam Kowalski: Kowalsaj@mai.uc.edu

Andrew Kump: Kumpaw@mail.uc.edu

Will Severson: Severswa@mail.uc.edu

**Faculty Advisor**
Nan Niu: niunn@ucmail.uc.edu

## Project Description

The Bearcat Pantry is looking to create a web application to function as a 'virtual pantry' for University of Cincinnati Students that are unable to afford food.


Currently, the Bearcat Pantry manually keeps track of Students and Inventory. As a result, Students using this service must call in to learn about the inventory of the food pantry. There is a need for a system that catalogs and updates inventory of the food pantry, which can also display the inventory on a website.

The pantry currently does not track inventory in any aspect. The current system has an advisor unlock the pantry in French Hall, and the Student takes whatever they want. This is a bad system because it is not anonymous, and can be abused because inventory is not tracked.



**Background skills/interests applicable to problem**
Web Development, Database Design, Android Development, Algorithm Development, Networking, Scripting, User Interface/User Experience.



## User Stories
* As a student, I want to use a digital shopping cart to select food for pickup, to make it easy for me to choose from what’s available.

* As an administrator, I want to be able to set limits on how much a student can ‘check out’ with a shopping cart, this way the pantry can equally distribute food to more students. 

* As a student, I want to be able to login to the bearcat pantry website with my 6+2, to make it easy to login to the website. 

* As a student I want to be able to use my phone or computer to access the website, to make it easy to access the site from any device. 

* As a volunteer, I want to be able to add to the inventory on any device, to make it easy to add items to the database and make it more accessible volunteers. 

### Design Diagram: Level 0
![](https://i.imgur.com/mGXDEHY.png)

This is design diagram level 0 which is the highest level overview of our design diagram. This shows three seprate workflows scanning items, shopping cart, and log-in.
### Design Diagram: Level 1
![](https://i.imgur.com/MvZCRrA.png)

This is the design diagram for level 1 which shows an elaboration of the previous diagram. This diagram shows the login system which will allow users to be authenticated and login to the shopping cart system. Users will be able to checkout items in the shopping cart and will recieve a notification upon the completion of a checkout. 
### Design Diagram: Level 2
![](https://i.imgur.com/Z38FCvh.png)

This is the design diagram for level 2 which shows a further elboration to the previous diagram. The login system will verify the user using UC's authentication system which is there 6+2. The shopping cart system will stored the data on the server and the front end will display the information to the user. The database will be updated upon the completio of a checkout. 


## Milestones:

1. Build the website skeleton but it should not yet interface with database.
2. Create the database and test data inputs for development.
3. The website should communicate with the database and display the test data from the database.
4. Create the scanning system functionality.
5. The database should recognize if there is a unseen barcode. If there is not create a UI to prompt the user to complete the task. 
6. The Login system is functional. Users are able to login to the website. This will depend on whether we are able to use UC’s authentication system. 
7. The Website shopping cart system is functional. Users are able to select items from the database to ‘checkout’.
8. Checking out items removes the correct number of each item in the shopping cart from the database.
9. Checking out items sends a receipt to the user’s email account.
10. The Shopping cart reserves items for a limited time to prevent two users from checking out the last of a specific item from the pantry. (ex: one bag of crackers in pantry two users check out the crackers near the same time, so that the second user saw the crackers as a valid item at the time of check out).
11. When a user checks out emails a receipt with the recipient's M number or 6+2.
12. Employee tools are functional. Users are able to select an open order and cancel it. Then the order will be marked as ‘ready for pickup’ or marked as incomplete. Order details should be similar to sending a receipt.
13. The admin tools are functional. The pantry administration are able to limit the number of items based on value assigned to each item at time of first scan or number of items. Admin tools also sends survey to each user after a specified number of checkouts.
14. Statistics working correctly. Administration can see how many users have ‘checked out’ in different timeframes, average number of items per checkout, and how many unique visitors have visited the pantry page. Administration should also be able to blacklist users, should a user be found abusing the system.
15. Mobile version of website is functional, works on Android platforms, and Apple mobile platforms.
16. Mobile version of scanning system is functional, using the camera on a mobile device (utilizing a barcode scanning api)
17. Bug fixing / tech debt
18. Minimum viable product 

# Bearcat Pantry Tasks
1.	Develop a login system for administrators and students. – Adam Kowalski
2.	Look into using the University of Cincinnati’s authentication system within the website. -Will Severso
3.	Design website interface to meet the University standards. - Andrew Kump 
4.	Develop shopping cart system to allow the students to choose and checkout inventory from the website. 
    * A team member needs to look into using cookies to maintain a shopping cart session. - Christian Davidson
5.	Investigate site and database security. - Adam Kowalski
6.	Design a notification system to alert bearcat pantry workers when a student has checked out items.  - Will Severson
7.	Develop a way to send a receipt and survey message to student upon completion of checkout. - Will Severson
8.	Design basic administrator tools to limit the number of items a student can check out among other things. - Christian Davidson
9.	Develop system to collect and manage pantry checkout data. - Andrew Kump
10.	Consider anonymity of the system. – Group activity
11.	Consider the viability of developing an “amazon locker system” for item retrieval. - Adam Kowalski
12.	Consider Database API to enhance readability of code and simplify future use. Andrew/Christian
13.	Implement system to email student when their order is ready: once a student worker has prepared the order, they can click a button to email the student. - Will everson
14.	Develop form for student worker to use barcode scanner with to scan items into the database. If a barcode has not been seen before, prompt the worker to enter basic information about the scanned item. - Adam Kowalski
15.	Testing of the entire system will need to be done by a team-member. – Andrew Kump


## Timeline:

| Task | Start | Finish |
| -------- | -------- | -------- |
| 1    | 1/7/19     | 2/3/19     |
| 2    | 1/7/19     | 2/3/19     |
| 3    | 1/7/19     | 2/3/19     |
| 4    | 1/7/19     | 2/3/19     |
| 5    | 1/7/19     | 3/3/19     |
| 6    | 2/3/19     | 2/17/19     |
| 7    | 2/3/19     | 2/24/19     |
| 8    | 2/3/19     | 2/24/19     |
| 9    | 2/3/19     | 2/24/19     |
| 10    | 2/3/19     | 2/24/19     |
| 11    | 2/25/19     | 3/31/19     |
| 12    | 2/25/19     | 3/17/19     |
| 13    | 2/25/19     | 3/17/19     |
| 14    | 2/25/19     | 3/31/19     |
| 15    | 2/25/19     | 4/14/19     |

## Effort Matrix:

![](https://i.imgur.com/n1MQy0L.png)





## ABET
The economic impact of the Bearcat Pantry project can be measured by the quantity of low income students that make use of the pantry. Because the pantry’s primary target audience is low income students, the pantry is attempting the help financially insecure students who may not be able to afford food. By making use of the pantry, low income students will be able to supplement their food expenses with food received from the pantry. At the moment, it is estimated that over 4,000 students qualify as low income students, meaning that they are eligible for the Bearcat Pantry program. The goal of this project is to facilitate a smooth, online user experience for students making use of the pantry, to increase visibility of the pantry, increase program participation, increase volunteering with the pantry, and increase donations to the pantry. To accomplish the computerization of the Bearcat Pantry, the main financial blocker that must be overcome is the server. It will most likely either be supported by UCIT on campus or a cloud service account funded by the university (such as AWS). As a result, the Bearcat Pantry will provide an economic benefit to the most financially insecure section of the student body, with minimal funding requirements. 


Low income students will be able to go to the pantry to receive food and clothing items based on need. As mentioned previously, there are over 4,000 students eligible to use the food pantry. However, less than 200 students currently use the pantry.  The goal is to make this project anonymous to students who might otherwise be embarrassed by their need to use the pantry. This project will be used by students among all cultures and races at the university. Our project will have to meet the needs of students from different cultures so this project will need to be able to supply the foods that meets their need. 


The Bearcat Pantry is a non-profit organization will have a high social impact on the University of Cincinnati discourse community. Hopefully, many students will be able to benefit from the project. It will be extremely beneficial to these low income students in need. The pantry can help these students worry about one less thing – being a full-time student is already stressful enough. The new system we are creating for the pantry will make the actual pantry more accessible, and reach a wider target audience.


The project will require consideration of security, both on the side of the users and the pantry. By integrating our project with UC’s existing login system, we aim to ensure that our system is as secure as any official UC system. Eavesdropping on our system could compromise the identities of students who use the pantry and would otherwise like to remain anonymous. An attack like this could damage the reputation of the pantry itself, potentially causing students to distrust the system and push away those that might otherwise see the pantry as a necessity. Should the database being used to catalog the pantry’s resources not be thoroughly secured, there is also a potential for privacy leaks as well as other data integrity issues. Currently, there is a desire to store some statistics involving pantry usage, such as what items are most frequently taken by students, that could include some amount of identifying information. Not only this, but if the information is tampered with then the pantry will be unable to trust these statistics as well as stock numbers, collected survey results, purchase details, etc. Since our system will be expected to handle the login credentials of real students, it is incredibly important that the entire system be as secure as possible.

## Presenatation

![](https://i.imgur.com/GxGbFcj.jpg)

![](https://i.imgur.com/IlPzWRU.jpg)

![](https://i.imgur.com/202h3Kx.jpg)

![](https://i.imgur.com/s77PeV4.jpg)

![](https://i.imgur.com/DyOTueF.jpg)

![](https://i.imgur.com/kIyjqnS.jpg)

![](https://i.imgur.com/mkH4wsE.jpg)

![](https://i.imgur.com/46Bfv4H.jpg)

![](https://i.imgur.com/E20hjag.jpg)

![](https://i.imgur.com/u50nmkU.jpg)

![](https://i.imgur.com/ae6uRNF.jpg)

## Self Assesment Essays

### Andrew Kump
To me, the Bearcat Pantry senior design project is all about utilizing the knowledge I have gained here at UC, and to give back to the local community through this project. From an academic perspective, I hope to further my technical knowledge through implementation, but also the project management side of the senior design project. The Bearcat Pantry will require a website, an app, and potentially there could even be further expansion. Also, working with the senior design team as well as the Bearcat Pantry board will be beneficial for project management and the non-coding side of the project. As this is a real world project that will likely see future use after our time here, this is a fantastic opportunity for me to up my game, and write high quality production level code. I see the Bearcat Pantry as a fantastic opportunity as a Computer Science student and look forward to the months to come.

At the University of Cincinnati, I have had the opportunity to learn both in the classroom, but also in the “real world” during co-op. A few of my classes here on campus will be vital to my work on the Bearcat Pantry. The Software Engineering (EECE 3093) class will help immensely. In this class, we learned about the overarching design and implementation of a software engineering project. We also learned about the different forms of software engineering. Splitting up the work, and understanding how the different parts of the software work will be essential for the Bearcat Pantry. Our advisor, Nan Niu, was also our professor for Software Engineering. This already established relationship will make
communication and expectations better. The other class that will help the project is Tech/Sci Writing (Engl 4092). Communication is above all else in software design. Also, we will most likely be leaving this project behind to another individual after the team graduates. They need to clearly understand the various aspects of the application. End users are also going to need to clearly understand the use of the application. This can be accomplished with our technical writing abilities.

My knowledge gained on my five co-op rotations at Siemens PLM Software will also play a large role in the project. I have been a front-end web developer for all of my co-op rotations, and this project is essentially my job description. I hope to utilize the technical skills such as Angular, JS, HTML, CSS, AWS, testing frameworks, and more for the Bearcat Pantry. At Siemens, we also utilized many of the concepts we learned in Software Engineering. Seeing this in practice, and understand how a lot of the process works will greatly help our teamwork on the Bearcat Pantry. I hope to bring a lot to the tablewith the extensive knowledge I have gained in the classroom, and on co-op.


I am extremely excited to work on this project. For starters, this project will greatly help out those within the University of Cincinnati community. Nothing feels better than helping out those in need. Now that I am a 5th year student, it is my job to step up as a leader on campus and give back. While I was working at Siemens, it has been hard at times to stay motived as I am building “their” software. What I mean by that is, when I will be working on the Bearcat Pantry, it will be a lot more personal of a project as we are building it from the ground up. Also, I do not want to let the many students who use the pantry down.



For our preliminary approach, we first need to clearly understand our requirements. We have heard this may be an app and a website, but nothing has been confirmed. So first things first, clear requirements need to be set with the board. If an app and a website are required, we will also require a database to store all the pantry’s information as well. Depending on implementation time and requirements, this may change. Evaluating contributions may be difficult. Hopefully, we are able to design the project in its entirety and then split up the implementation based on our strengths. Then, the board, our advisor, and professor will able to evaluate the different aspects of the project. 

### Will Severson
The project involves automating the Bearcat food pantry process at the University of Cincinnati. Steven Kridel, our Project Manager, said that about a hundred students regularly use the bearcat food pantry because of food insecurities. Currently the bearcat pantry does not have a way of monitoring inventory and a student can take whatever they want from the Bearcat pantry, meaning that there is no accountability with the existing system. The goal of this assignment is to automate all aspects of the bearcat pantry process. This means creating a database that will store and monitor the bearcat pantry information. Having a desktop application or android application that will allow employees at the pantry to scan barcodes of the food and update inventory. Having a website and phone application to allow students to check inventory and checkout items in the inventory.

My College experience has already provided me the skills necessary to accomplish this project with my team. For the development of the Employee application, I will draw upon skills learned during Data structures, Database Design and Android development. These classes will also be providing the knowledge necessary to complete the app, website, and database. My current semester also has classes that could prove useful, Data Security will be helpful for making sure that the system is anonymous for the students that require this service. Finally, the last college class that stands out as useful for the project is: Software engineering, as this class taught me a lot about project management with ideas like SCRUM or AGILE for managing the development of the project.

Throughout the entire project, I will be using skills learned during co-op. For example, at Cincinnati Bell, I did a lot of scripting, which could be helpful for the website and android app. From KLH engineers, I have been programming in VB.NET the entire term, teaching me good coding practises, and it is a language supported by windows for desktop applications. Additionally, KLH engineers has taught me a great deal about the usage of the development method AGILE. With Agile, my team-members and I will be able to narrow down components of the project into many small tasks that ideally take no more than 4 hours. This will allow us to make sure the team is using it’s time effectively, and we will be able to see if anyone needs help based on hours completed. 

Motivation is very important for a large software project such as this Bearcat Pantry Project. The fact that I’ll be working on this project with 3 of my best friends greatly helps team motivation. We’ve been planning on developing our senior project together since sophomore year. By working on this project as a group of friends, we already know each-other’s strengths, and can prioritize tasks to match those strengths, greatly improving team morale, motivation, and productivity. With very little thought, the project will be structured so: Adam Kowalski - Database, Andrew Kump - Website, Christian Davidson - Application, WIll Severson - App. While there may be some changes from this initial structuring, Motivation and morale will not be a problem for our team. 

The initial approach for the project will be structured as mentioned, with Adam kowalski on the database, Andrew Kump on the Website, Christian Davidson on the application, and Will Severson on the mobile app. Some parts of the project can reach stages of completion much faster than in other parts of the project e.g: The Website will take much less time than the application. As a result, people will begin working on the largest task of their specialization. Our expected results are: Functioning Application on mobile or desktop for employees to add food to the pantry/database, functioning database that talks with the website and application to keep track of inventory, and finally a functioning mobile application and website that allows students to select food for pickup. These results will be evaluated by the board for the Pantry, once we reach the end of the developmental cycle, which is how we know that we’re done, and have done a good job on the project. The end of the developmental cycle is determined by the completion of all development tasks, and each component is free of bugs. Overall, I am looking forward to the beginning of this project. 


### Adam Kowalski

The project involves automating the Bearcat food pantry process at the University of Cincinnati. Stephen Kridel is the project lead and I was told from him about a hundred students regularly use the bearcat food pantry because of food insecurities. Currently the bearcat pantry does not have any automated system for the pantry. The bearcat pantry service does not manage inventory and Stephen as well as the associated members of the board want to automate the process to better meet the needs of students. The goal of this assignment is to automate all aspects of the bearcat pantry process. This project will require creating a database that will store and monitor the bearcat pantry information. The project will need a desktop application or phone application that will allow employees at the pantry to scan barcodes and update inventory. Having a web application or phone application to allow students to check inventory and checkout items in the inventory. We want to automate the process similar to the Amazon store on Calhoun street. We want the process to require little human interaction and be easily maintainable. 

My college experience has provided me the necessary skills and background experience to succeed on this project. I have gained advance knowledge of coding languages and techniques.The foundation for my coding skills and techniques was built by the C++ courses such as CS 1021 C, CS 2028C, and EECE 4029. Through these courses I gained knowledge of data structures and object-oriented programming. I learned advance sorting algorithms and gained advance knowledge of operating systems through EECE 4029. Throughout this project, I will be utilizing skills taught through software engineering (EECE 3093 C) this involves project design, scrum, and agile development. I will be utilizing my database design course (CS 4092) to setup the database and create stored procedures. I will utilize android development course (IT 1046 C) when setting up the android or IOS application in the project. I will also draw upon the knowledge gained this semester from data security. Data Security will be important to help keep the application and client information secure.

My co-op experience has given the added benefit of giving me a diverse technical and soft skill experience. I have had five co-ops at two different companies. All my co-ops have involved work in the automation and controls area. My co-ops consisted working on project based assignments for clients. I have been involved in project reviews meetings, and I have worked on a scrum team. The first co-op I had allowed me to work on a C# desktop application
that used image recognition to read barcodes of car parts and update a database. This co-op helped me gain insight on image recognition and how to read barcodes using barcode scanners. On my last three co-op’s I worked on many projects that involved either object oriented visual basic code, databases, and advance scripting software. Working with database queries, stored procedures, and creating databases will give the team the foundation to hit the ground running on the project. I am used to working with clients and I understand that communication between contractors and clients is important for a project to succeed. I have the soft skills as well as the
technical skills and I as well as the team are suited for the different road blocks that we will hit during the project because of the different skills each member of the team brings to the table.

I am extremely excited to set the project in motion. This project is a way for me to make a difference to the University of Cincinnati. Project based assignments is something I am very passionate about. I look forward to seeing the end result and how the end product will benefit students at the University of Cincinnati. Getting to work a project with a group of students that I can rely on will help make a great product. I think this project is a great way to show my diverse knowledge coding in multiple languages. This project is not only going to improve my technical skills as a person but will be an experience that will help me grow in my career. One other thing
that motivates me is getting to work on multiple different aspects of a single project is something that I will love to be a part of. 

For the preliminary approach, our end goal is to create a product that is simple, reliable, and easier for the end user. We want the product to be accessible to as many of the students as possible. Our preliminary approach is that we need a website built for the pantry. This website is going to allow students to checkout and access inventory. A server is going to be needed to manage and maintain the inventory. We will need a desktop or android application to allow bearcat pantry employees to update inventory in the database. So, we currently have three aspects of the project. We have a database that needs to be created, a desktop/android application, and web application. The end goal is to have all these pieces of software completed
and working together in unity. Our contributions will be evaluated by Stephen Kridel as well as the bearcat pantry clients. We will know when we are done when the clients’ features are all completed. We know that we have done a good job if the product is being used after development is completed. If the features are kept realistic and our backlog doesn’t increase exponential we should have no problem completing this project with all features required by the board and Stephen Kridel. 

### Christian Davidson

To me, the Bearcat Pantry project is about two things: growth and community. From my standpoint as a student in the computer science program, there’s a ton of opportunity to learn new things about software development. One of the requested features is a website, which means interface and web design will be required skills. Another feature is an app, something else which will require a skill set to be developed so that the appropriate code can be implemented. But above all of that, one of the most exciting things about this project is its potential to aid the student community. As a student of the University of Cincinnati, not just of computer science, the idea that my work might actually see use from a group within the university trying to make life better for a group of underprivileged students is something
exciting in its own right. 

As far as how the college curriculum will benefit my project, there’s several examples. One of these is the User Interface 1 (CS 5167) class I took a few semesters ago. The work done in this class has provided me with a basic understanding of good interface design, something that will be incredibly important if actual students will be using the software we design someday. Another example is Software Engineering (EECE 3093). Software Engineering will help guide the processes we go through in order to design and implement our project, as well as the documentation we create, in order to make sure the project runs smoothly and efficiently.
Lastly, Android Development (IT 1046) will supply me with a basic knowledge of Android app development should we wind up actually creating an app as part of the project.

Moving on, my co-op experience will also benefit the project in multiple ways. Some of the ways these experiences will assist my work is in the area of soft skills. On all of my co-ops, both at Siemens PLM and Rockwell automation, I attended various meetings for project updates, demos, and progress reporting. This will all be necessary for our project which is being overseen in some part by a board constructed to guide the work we do. Of course, technical skills developed are also important. At Siemens PLM, during one semester I was tasked with creating a web interface and server to communicate with each other. Learning how to do this will give me a starting point for the web work required for our project.

All in all, I’m really excited to start making headway with this project. As mentioned before, the idea of a project that is both beneficial to me as well as the school, on top of being a project that is expected to actually see use one day, is a huge motivation boost. Not only that,
but being able to work on such a project with people I know and can trust will work as hard as I am, that is a one of a kind experience I am glad I will be a part of. Going even further, a well done senior design project is something that will look great to prospective employers. Though it may be a required project in the end, it’s one I’m looking towards with high hopes.

As far as our preliminary approach, we know what’s expected of us and plan to go from there. An app and a website, which can be used by Bearcat Pantry for inventory or relevant students for checking out what goods are available, and a server to house an inventory database. As such, our expected results at this point are a website, an android app, and a server
for the database and website. Our goals might shift somewhat as expectations/deadlines are decided, but those are what we are ultimately shooting for. As far as evaluating our contributions, we’ll know we’re done when we’re told our done for the most part. As long as we keep features realistic and don’t let our requirements balloon, the board overseeing the project should have a good idea on what is needed from us. As such, we’ll know we’ve done a good job if they decided to actually use our work to run their program, something I personally would love to see happen.










# Professional Biography: Adam Kowalski
## Contact Information  
Email Address: kowalsaj@mail.uc.edu
Phone Number: 567-298-0459
### Co-op Work Experience
**Interstates Control Systems**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **West Chester, Ohio**
**Control System Developer Co-op**&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  **Janurary-August 2018**
* Developed HMI changes to global objects, graphic animation, and high level visual basic code on system integration projects.
* Troubleshooted PLC based issues and wrote reverse logic to test newly developed PLC and HMI code. 
* Wrote SQL dabatabases queries to identifiy errors occuring within controls equipement.  
* Wrote technical flow charts to track the flow of SQL databases, HMI's, and PLC data through customer facilities.
* Consulted with customers and clients to determine user needs and design requirements. 
* Designed and implemented a Python GUI with tkinter to control customer robots. 

**Interstates Control Systems**&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;             **West Chester, Ohio**
**Programming Intern**&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; **May-August 2017**
* Worked effictively in a team-based environment to maintain, modify, and redesign existing control systems. 
* Worked on multiple small projects throughout the semester to complete HMI development and testing.
* Developed visual basic solutions to customer interfaces. 
* Updated customer technical documentation such as instruction manuals, and software design basis.


**Premier System Integrator**&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;**Middletown, Ohio**
**Engineering Co-op**&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; **Janurary-May and August-December 2016**
* Coding over 30 HMI screens across mutliple projects and working over 60 hour per week
* Troubleshooting errors in the PLC and HMI to correct system design flaws
* Performing factory and site accpetance tests as well as preparing simulations, test scenarios, and test documentation
* Partcipating in weekly design review meetings with supervisors and clients
* Wrote SQL queries utalizing join statements to create new tables to manage client information.
* Debugged and edited custom PC software application created in C#.

#### Qualifications
Programming Languages: C++, C#, SQL, Python, HTML, Matlab, Julia, Control Logix, Magelis/VIJEO, Wonderware (InTouch, AppServer, TagServer), Factory Talk, PIC's. 
Operating Systems: Linux, Windows, Mac, and Unix.
Applications: Visual Studio, Eclipse, Code Blocks, Android Studio, RSLogix 5000, Wonderware, Factory Talk Studio, VMware Player, Microsoft Office Package.

##### Project Sought
I am seeking a capstone project that will showcase my experience in the automation industury. The bulk of my co-ops have involved being a controls developer and that's where my passion is. I have been exposed to multiple different programming softwares and languages. I would like a capstone project to display my depth of knowledge in .NET languages. I have discussed with my team-members and we will seek the Bearcat Pantry project. My team and I know this will showcase our wide variety of experience among web, server, front-end, and app development. I know this project is a common problem in the automation industury and I would like to solve that problem with my team. 

# Professional Biography for Christian Davidson

## Contact Information
Email: davidsc8@mail.uc.edu  
Phone: (513)560-8501

## Co-op Experience
**Rockwell Automation**  
*Software Engineer Co-op*  
January-August 2018
* Technical Skills
  * Used Jenkins and Powershell to enhance existing test environment to perform test setup/running and results gathering/displaying.
  * Converted C# database control software from ClearCase to Git based source control.
  * Used C++ to fix defects within Logix Designer.
  * Created a Python based API for a checker playing demo box used to demonstrate RockwellÕs technology at hackathons.
* Soft Skills
  * Contributed to the design documentation of a new feature within Logix Designer.
  * Performed demos to product managers to demonstrate work performed
  * Updated tutorial documentation to be used by future co-ops while learning Logix Designer's codebase
  
**Siemens PLM Software - CTO Division**  
*Software Development Co-op*  
May-August 2017
* Technical Skills
  * Used Python and Electron to create a new client for SiemensÕ existing screen-sharing technology.
  * Created a Node.js/Javascript based server and web interface to extend the clientÕs functionality with synchronous and asynchronous video sharing capabilities.
  * Created and utilized Docker containers to implement easy distribution of software to Raspberry Pis for use in meetings.
  * Implemented basic head tracking functionality as an NX addon as part of a corporate hackathon.
* Soft Skills
  * Attended daily status meetings to communicate, and sometimes demo, progress of projects within my team.
  * Provided weekly email updates to communicate progress as well as blockers to supervisor and other parties relevant to the projects worked on.
  
**Siemens PLM Software - LCS Division**  
*Software Development Co-op*  
January-May and August-December 2017
* Technical Skills
  * Used Google Web Toolkit, Java, and Javascript to fix defects and implement new functionality on a web-based platform.
  * Created and performed unit and integration tests in Selenium, C++, and JavaScript. 
* Soft Skills
  * Worked with individuals in multiple countries via instant message, voice, and video chat.
  * Worked on a team utilizing the scrum style agile development process to efficiently implement user stories, discuss requirements with project managers, and track defects.

## Project Sought
I'm seeking a project that will allow me to explore modern applications of various technologies and languages. An example of this could be a project with a website element, requiring the usage of modern javascript libraries and web platforms to create. It could also be a project while requires cutting edge technologies like machine learning or image recognition or augmented reality. The gist of it, I want to work on a project that'll challenge what I know and require me to expand my knowledge to new places.

# Professional Biography for Andrew Kump
## Contact Information
Email: kumpaw@mail.uc.edu
Phone: 513-490-9067
Address: 215 Lyon St. Cincinnati, Ohio 45219

## Co-op Work Experience
### Software Engineer Co-op @ Siemens PLM Software(3rd/4th/5th Co-ops)
•	Team member of Active Workspace Framework development team.
•	Worked on web-based application developed in AngularJS, Java, HTML, and CSS.
•	Utilized agile and scrum development methodologies as well as test-driven development.
•	Created framework elements for all Siemens web application to utilize.
•	Assisted in conversion of entire code base from GWT to AngularJS/JavaScript.
•	Assisted in redesign of application’s user experience refresh including design and implementation.
•	Implemented Puppeteer testing to modernize Active Workspace’s integration tests.
### Software Engineer Co-op @ Siemens PLM Software(1st/2nd Co-ops)
•	Created Selenium step definitions in Java to automate web application for testing.
•	Wrote automated tests using Cucumber framework to increase overall application’s testing.
•	Fixed defects efficiently and added new functionality relating to search.


## Project Sought
As most of my co-op experience has been related to Front End web development, I am seeking a project related to web dev or app development. I'd like to work on all aspects of the project as well, not just the front end. 


# Professional Biography for Will Severson
## Contact Information
Email: severswa@mail.uc.edu
Phone: 740-405-5504
Address: 2727 Clifton ave Cincinnati, Ohio 45220

### Co-op experience
1. CPE Co-op: Cincinnati Bell (May-December 2016)
    * Involved in the development of Cincinnati Bell&#39;s Next generation of Set-top boxes and Residential gateways, by conducting thorough testing on each device to determine the capabilities of each next-gen solution.
	* Completed project to develop a raspberry pi into a compact recording console for residential gateways, replacing the existing bulky solution with a secure small form factor solution, and is currently used in the field.
	* Assisted with development of firmware for Cincinnati Bell&#39;s current generation of residential gateways, by conducting testing on the current-gen devices to identify security flaws and performance issues.
2. Internal Support Co-op: PCMS (May-August 2017)
	* Managed US Branch Servers for Active Directory, WSUS, and Enterprise VMware
	* Assisted Users from both UK and US Branches
	* Participated in implementation of system-wide infrastructure server upgrades.
3. Co-op:  ICR inc (January-April 2018)
	* Developed method solo for automatic internal merge testing on Gitlab, which was implemented onto the company’s main repository server.
	* Utilized Python and bash scripting for Automatic merge testing project, to develop a secure implementation of the project, via the use of user token on API calls and required webhook authorization.
4. Programmer Co-op: KLH Engineers (May-August 2018, Part time: August-? 2018)
	* Utilized VBA and Autodesk Revit (versions 2016, 2017, 2018, 2019) to develop internal tools designed to assist engineers with their jobs. This includes a standards transfer tool for new projects, and an Autorouting tool to automatically route duct and pipe from specified fixtures (such as a sink) to a designated pipe main. 

Looking for a project that would allow me to build on the skills I've learned during my time on coop.







## Budget
As of December 10th 2018, the group has not spent any money related to the project.

No items have been received from donations as of December 10th 2018.

## Github Repoistory 

https://github.uc.edu/severswa/BearCatPantryProject


## Appendix for the Team

| Date | Time Spent     | Activity |
| -------- | -------- | -------- |
|  8/27/2018   | 2     | Brainstormed ideas for senior design project     |
|  9/3/2018   | 3     | Worked on professional biography and came together as a group to discuss final project idea's    |
| 9/10/2018    | 3    | Met with bearcat pantry and collaborators for the first time    |
| 9/17/2018    | 3    | Worked on bearcat pantry project description and visited pantry location      |
| 9/24/2018    | 3    | Capstone Self Assessment Essay  |
| 10/1/2018    | 3     | Worked on User Stories and Design Diagrams. Met with bearcat pantry to brainstorm idea's and expectations.    |
| 10/8/2018    | 3    | Worked on Tasks List and researched security for the bearcat pantry website. |
| 10/15/2018    | 3    | Worked on Tasks List and researched technology for project.   |
| 10/29/2018    | 3    | Milestones, Timeline, and Effort Matrix Assignment    |
| 11/5/2018    | 3    | Worked on Presentation and met with end users for the project to gain feedback  |
| 11/12/2018    | 7    |Worked on presentation and recording    |
| 11/19/2018    | 2    | Worked on ABET Essay    |
| 11/26/2018    | 3   | Worked on ABET Essay and met with bearcat pantry members to discuss timeline over winter break as well as goals for the spring semester.|
| 12/3/2018    | 4    | Worked on Final Report     |

## Meeting Notes
There are no applicable meeting notes.

