# Natsite


This repository uses an express.js, node js, mongoDB stack. It is a website built for a real estate agent in New York.




.
├── api
│   ├── controllers
│   │   ├── UserController.js   <---- Controls user data/views
│   │   ├── ViewController.js
│   │   └── InviteController.js
│   ├── models
│   │   └── appModel.js  <--- Database model
│   └── routes
│       ├── centralRoutes.js <--- route delegator
│       ├── homeRoutes.js <---- home routes
│       └── userRoutes.js <----user routes
├── app
│   └── appSetup.js <--- sets up app.use and app.set stuff
├── design_doc.md
├── package-lock.json
├── package.json
├── public
│   ├── ...
├── server.js <-- entry point
