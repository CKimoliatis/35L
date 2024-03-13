# Yooni
## Table of Contents
* [General Info](#general-info)
* [Setup](#setup)
* [Languages, Frameworks, and Dependencies](#languages-frameworks-and-dependencies)
* [Authors](#authors)
* [Publish Date](#publish-date)
## General Info
Yooni is an innovative online platform tailored for college students, crafted by college students themselves. Much like OfferUp, Yooni serves as a dynamic marketplace where students can seamlessly buy, sell, and trade goods within their campus community. What sets Yooni apart is its unique focus on the specific needs and lifestyles of college students, offering a user-friendly interface and features designed to enhance the student-to-student shopping experience. Whether students are seeking textbooks, electronics, furniture, or even seeking to unload their own items, Yooni provides a convenient and trusted space to connect and transact. With its roots firmly planted in the collegiate world, Yooni fosters a sense of community and resourcefulness among students, making it more than just a marketplace—it's a vibrant hub where college life meets commerce.
## Setup
* Clone the repo
* Chmod +x start.sh
    * start.sh does the following:
    ```shell   
        git pull origin main
        pip3 install -r requirements.txt
        cd backend
        cd frontend
        npm i
    ```
    * This is the initial startup where it installs all the dependencies
* After doing that do the following:
    * Activate your python virtual environment (not necessary but recommended)
    * Windows
    ```shell
        cd backend
        python manage.py makemigrations
        python manage.py migrate
        python manage.py runserver
    ```
    * Mac/Linux
    ```shell
        cd backend
        python3 manage.py makemigrations
        python3 manage.py migrate
        python3 manage.py runserver
    ```
* After migrating and running the server
    *  Open another instance of the terminal 
    ```shell
        cd /backend/frontend
        npm run dev
    ```
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
* Rony Vayner (906179252)
* Ryan Carney (806284003)
* Christian Escobar (206231362)
* Narek Khachikyan (706229984)
## Publish Date
* 3/12/2024
