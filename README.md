# Setup

Download this:

- https://code.visualstudio.com/
- https://nodejs.org/en/
- https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Open command prompt and head to your documents using `cd` ie. "C:\Users\Andrew\Documents"

`mkdir git`

`cd git`

`git clone https://github.uc.edu/severswa/BearCatPantryProject.git`

`cd BearCatPantryProject`

`code .`

This will open Visual Studio Code. I then save the project in /BearCatPantryProject as bearcat.code-workspace. In the future you can run `code bearcat.code-workspace` to pick up right where you left off.

Next, install all of the recommended extensions. Select the extension button the left-side wall and install everything.

Open the terminal in VSC using ctrl+alt+T and run

`npm install` - If this fails, restart your computer

First, you must build up the webpack bundles with `npm run build`

To get to the website run use `npm start`
and go to `http://localhost:3000`

In dev mode, simply changing any static file should re-build webpack automatically. Only a page refresh is required to see your changes.

### Environment variable

Create a file called '.env' at the root with the following text, and ask Andrew for the password:

DB_PW=

EMAIL_PW=

# Testing

[Probably want to set up a framework like this](https://medium.com/@ankit_m/ui-testing-with-puppeteer-and-mocha-part-1-getting-started-b141b2f9e21)

### Run the puppeteer tests:

`npm run puppeteer`

Puppeteer API: https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md

### Run the unit tests:

`npm test`

How to use mocha: https://mochajs.org/#getting-started

# Useful links

- https://www.npmjs.com/ - find cool 3rd party packages we can borrow
- https://expressjs.com/
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
- https://cloud.mongodb.com/v2/5c30423dd5ec131335d8eaab#clusters?fastPoll=true
  - Admin login:
  - Username: bearcatAdmin
  - PW: secret
- https://bootswatch.com/flatly/ - May want to find an agreed upon stylesheet
- https://github.com/barc/express-hbs
- https://www.w3schools.com/ - Literally everything you need for front end
- https://www.npmjs.com/package/pronto-email-service - email services exist
- https://serratus.github.io/quaggaJS/ JS Barcode Scanner
- https://github.com/LazarSoft/jsqrcode Barcode Scanner

# Production environment links/concerns

When running in production use the following instead:

`npm run prod-build`
`npm run prod-start` - Look into pm2 more

- [PM2 Production Environment Process Manager](https://github.com/Unitech/pm2)
- [MongoDB Costs](https://cloud.mongodb.com/v2/5c30423dd5ec131335d8eaab#clusters/edit/BearcatPantry)
- [EC2 Pricing](https://aws.amazon.com/ec2/pricing/on-demand/)
- [Azure Pricing](https://azure.microsoft.com/en-us/pricing/details/cloud-services/)
- [Google Cloud Pricing](https://cloud.google.com/appengine/pricing)
- [Domain Names](https://domains.google.com/m/registrar/search?searchTerm=bearcatpantry&hl=en#)
- [Deployment guide](https://medium.com/@Keithweaver_/setting-up-mern-stack-on-aws-ec2-6dc599be4737)
