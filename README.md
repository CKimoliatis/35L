# Yooni
## Table of Contents
* [General Info](#general-info)
* [Setup](#usage)
* [Languages, Frameworks, and Dependencies](#languages-frameworks-and-dependencies)
* [Authors](#authors)
* [Publish Date](#publish-date)
## General Info
This project is to aid in the selection of countries for the Doctors Without Borders Program.
While showing the probability of the selections. 
## Setup
* Clone the repo
* Chmod +x start.sh
    * Sub start.sh does the following:
    * Sub git pull origin main
    * Sub git pull origin main;
    * Sub pip3 install -r requirements.txt;
    * Sub cd backend;
    * Sub cd frontend;
    * Sub npm i;
    * Sub This is the initial startup where it installs all the dependencies
* After doing that do the following:
    * Sub Activate your python virtual environment (not necessary but recommended)
    * Sub cd backend
    * Sub python (windows) or python3 (mac/linux) manage.py makemigrations
    * Sub python (windows) or python3 (mac/linux) manage.py migrate
    * Sub python (windows) or python3 (mac/linux) manage.py runserver
* After migrating and running the server
    * Sub Open another instance of the terminal 
    * Sub cd into /backend/frontend
    * Sub npm run dev
* After doing all that, the setup is complete
* Open your favourite browser and enter http://127.0.0.1:8000/ into the address bar and this will bring you to the login page.
## Languages, Frameworks, and Dependencies
* [React] for the frontend (https://react.dev/)
* [Django] for the backend (https://www.djangoproject.com/)
* [sqlite] for the database used (https://www.sqlite.org/)
* [Django_Rest_Framework] was used for the API calls and responses (https://www.django-rest-framework.org/)
* [Axios] for the API requests (https://www.npmjs.com/package/axios)
## Authors
* Christopher Kimoliatis (806281561)
* Rony Vayner
* Ryan Carney
* Christian Escobar
* Narek Khachikyan
## Publish Date
* 12/1/2022
