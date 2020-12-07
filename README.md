# News App

Build your News feed with the News application. End user will enter their First and Last Name,
as well as up to seven categories before clicking the 'Render News Feed' button. The buttonw will
make an api call using the NewsAPI (npm package) and return six articles per each category. The
articles will render on the page. Refresh the page to engage in another News Feed.

## Installation Instructions

In order to the use the application, end user will need to download the contents of the project to
their local machine from GitHub. Following download, the end user should open terminal and 'npm install'
the package dependencies. After the package dependencies have been downloaded, the end user can start
the server using either the 'npm start' (MacOS) or 'npm start-WIN' (WindowsOS) command.

End user will also need an API key set up for NewsAPI (https://newsapi.org/) and place in an .env file.

Or access the application from Heroku deployment.

## Access to the application (Heroku)

* The URL of the deployed application

## Access to the GitHub Repository

* https://github.com/ac08/NewsApp


#### Directory Structure

```
.
├── config
│   ├── config.json.
│
├── controllers
│   └── api-routes.js
│   └── banner-routes.js
│   └── html-routes.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── article.js
│   └── category.js
│   └── index.js
│   └── user.js
│
├── node_modules
│ 
├── package.json
├── package-lock.json
│
├── public
│   └── assets
│       ├── css
│       │   └── style.css
│       └── js
│           └── news.js
│
├── server.js
├── .gitignore
├── .eslintrc.js
├── README.md
│
└── views
    ├── index.handlebars
    ├── index.html
    └── layouts
        └── main.handlebars
```