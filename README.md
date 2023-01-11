### projet-03-gamer-heleper-back

<img src="./GH_Logo.png" alt="Logo" width="120">
<h1 align="center">Gamer Helper</h1>

<a href="https://github.com/O-clock-Icare/projet-03-gamer-heleper-front">About the project for the front-end</a>

<a href="https://github.com/O-clock-Icare/projet-03-gamer-heleper-back">About the project for the back-end</a>

*Management games, from the management of a factory to that of a royal dynasty, passing by a football team or an F1 team.*
*What do all of these (retro) games have in common?*
*Taking notes, lots of notes, to optimize and organize your game.*
*The idea is to create an application that brings together tools to facilitate note taking and optimization.*

### Built with

<p> In this section, we mainly used React, Zustand, Axios, HMTL, SCSS for the front end.</p>

<p>
And for the back-end part we used Postgres, Sequelize, Sqitch, Express, Bcrypt, Totp Generator, Nodemailer.
</p>

### Getting started

#### Installation

1. Clone the files :
   ```sh
   git clone git@github.com:O-clock-Icare/projet-03-gamer-heleper-front.git + git@github.com:O-clock-Icare/projet-03-gamer-heleper-back.git(for the ssh format)
   or 
   git clone https://github.com/O-clock-Icare/projet-03-gamer-heleper-front.git + https://github.com/O-clock-Icare/projet-03-gamer-heleper-back.git(for the https format)
   ```
2. Install NPM packages for both files :
   ```sh
   npm install
   ```
3. Creation of your database in the back file :
   ```sh
   sudo -i -u postgres psql / Connecting to the database
   CREATE USER gamerhelper PASSWORD 'gamerhelper'; / Creating an user with password
   CREATE DATABASE gamerhelper OWNER 'gamerhelper'; / Creating a database
   ```
4. Rename the files .env.example and sqitch.example.conf with your user and database logs :
   ```sh
   in the sqitch.conf file for example
   target = db:pg://gamehelper:gamehelper@localhost:5432/gamerhelper 
   
   in the .env file
   DATABASE_URL=postgres://gamerhelper:gamerhelper@localhost:5432/gamerhelper
   SECRET_KEY=vDgBt.1@WjN2sT-iT7+I$:MJyb&!
   KEY_OTP=JBSWY3DPEHPK3PXP
   ```
5. Use Sqitch :
   ```sh
   sqitch deploy

   The message displayed on your screen should be
   + init .......... ok
   + otp ........... ok
   + refreshToken .. ok
   ```
6. Start both project together :
   ```sh
   npm start
   ```

### Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. 
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star ! Thanks again !

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

### Contact

We are part of the Icare promo at O'clock school

It's a half-year end project

You can contact us on Git

> Product Owner : Kevin A.

> Scrum Master : Kevin A. / Houmaïr S.

> Lead Dev Front : Maxime Q.

> Lead Dev Back : Thomas C.

> Git Master : Thomas Y.
