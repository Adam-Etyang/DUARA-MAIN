# Duara - Project Management Plan

## Project Overview
**Project Name:** Duara (*"Circle"* in Kiswahili)

###  Description
Duara is a **student club management system** that connects students with campus clubs.  
It was developed to address the problems the school faces with its current manual, scattered, and inefficient club management system.  

By providing one unified platform for both students and club managers, Duara streamlines the process of discovering, joining, and managing clubs.

---

## Tech Stack
- **Apache24** → Web server  
- **PHP** → Backend  
- **Bootstrap** → Frontend  
- **MariaDB** → Database  
- **Git & GitHub** → Version control  

---

## Main Roles

- **Students**
  - Sign up for an account  
  - Join or leave clubs  
  - View announcements and upcoming events  

- **Club Managers**
  - Manage club profiles and membership  
  - Post announcements & events  
  - Generate and view reports  

---

## Why Duara?

- The current system is **manual and disorganized**, forcing students to rely on posters and word-of-mouth.  
- There is **no central platform** for discovering or joining clubs.  
- Club managers lack effective tools for **tracking membership and event participation**.  

 Duara solves these issues by **digitizing the entire process** into a clean, user-friendly system.  

---
## TODO:
- [ ] Setup Database
- [ ] User login and registration
- [ ] UI creation

## Work done on 29th sept:
- Setup project and init files

## 1st Oct
- Db stuff, need to fix problems with singlestore

## 2nd Oct
- DB stuff,
still need to fix IP issues with singlestore
## 3rd Oct
- DB stuff, stopped using singlestore, now using laravel cloud instead
Fixed all the database issues, using mysql-client instead of MariaDB, also made the core DB-models of the project
- still need to deal with ssl/tls certs and all but satisied ith db stuff for now
- Hosting is also done, using free tier of laravel cloud might deploy later and also has free CI

TODO: Start working on core classes and auth

## 6th oct
- started on the main models and auth
- Work on registeration page...its broken

## 9th oct
- Finished up on auth stuff everything looks okay and seems to be working

## 11th oct
- CRUD functionality
Clubs CRUD
Membership management
Events CRUD
Event registration
Resource requests


13th -> TODO fix routing for login and register on the landing page

18th TODO:create Tab for events a user is attending, finish up on the club dashboard(None of the modal pages render)
        Create analytics dashboard for student
        create views for admins


