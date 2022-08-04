# Housing Program Rentals (Natsite)

### 
 This is a repository that stores the [Node.js](https://nodejs.org/) project for [Housing Program Rentals](https://www.housingprogramrentals.com)  



## Implementation details

This repository uses Node v16, Express and mongoDB to serve static HTML/CSS pages, hosted on Heroku. Some other cools features include:
- Static assets stored on a public AWS S3 Bucket
- Client-side image upload to S3, with website handling signing
- Heroku CI/CD pipeline and auto-deploy features
- Google Maps API in listings(off currently)


#### Tree structure of codebase
```
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
```

