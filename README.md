# Yooni
## Table of Contents
* [General Info](#general-info)
* [Setup](#setup)
* [Languages, Frameworks, and Dependencies](#languages-frameworks-and-dependencies)
* [Authors](#authors)
* [Publish Date](#publish-date)
## General Info
This project is to aid in the selection of countries for the Doctors Without Borders Program.
While showing the probability of the selections. 
## Setup
* Clone the repo
* Chmod +x start.sh
    * start.sh does the following:
    `   git pull origin main;
        pip3 install -r requirements.txt;
        cd backend;
        cd frontend;
        npm i;
    `
    *  git pull origin main
    *  git pull origin main;
    *  pip3 install -r requirements.txt;
    *  cd backend;
    *  cd frontend;
    *  npm i;
    *  This is the initial startup where it installs all the dependencies
* After doing that do the following:
    *  Activate your python virtual environment (not necessary but recommended)
    *  cd backend
    *  python (windows) or python3 (mac/linux) manage.py makemigrations
    *  python (windows) or python3 (mac/linux) manage.py migrate
    *  python (windows) or python3 (mac/linux) manage.py runserver
* After migrating and running the server
    *  Open another instance of the terminal 
    *  cd into /backend/frontend
    *  npm run dev
* After doing all that, the setup is complete
* Open your favourite browser and enter http://127.0.0.1:8000/ into the address bar and this will bring you to the login page.
## Languages, Frameworks, and Dependencies
* [React](https://react.dev/) for the frontend 
* [Django](https://www.djangoproject.com/) for the backend 
* [sqlite](https://www.sqlite.org/) for the database used 
* [Django_Rest_Framework](https://www.django-rest-framework.org/) was used for the API calls and responses 
* [Axios](https://www.npmjs.com/package/axios) for the API requests 
* [Babel](https://babeljs.io/) as the main compiler for the code
* [Webpack](https://webpack.js.org/) to bundle our modules for simpler running
* [react-bootstrap](https://react-bootstrap.netlify.app/) for easy navbar's, buttons, modals within our app
* [react-helmet](https://www.npmjs.com/package/react-helmet) used as the head element 
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) to navigate pages within the webapp
## Authors
* Christopher Kimoliatis (806281561)
* Rony Vayner
* Ryan Carney
* Christian Escobar
* Narek Khachikyan
## Publish Date
* 3/12/2024
