# Duara – Project Management Plan

## 📘 Overview

**Project Name:** Duara (_“Circle”_ in Kiswahili)

Duara is a **student club management system** built with **Laravel** to help students easily discover, join, and manage campus clubs.  
It replaces the scattered manual process with one organized digital platform for both students and club managers.

---
## Team
Developed by:
- Adam Etyang
- Hellen Nzisa
- Dalton Mule
- Caleb Munene
- Dwayne Makendi

---

## ⚙️ Tech Stack
- **Laravel** – Framework  
- **MySQL / MariaDB** – Database  
- **Bootstrap** – Frontend  
- **Apache / Laravel Cloud** – Hosting  
- **Git & GitHub** – Version control  

---

## 👥 Roles & Features

### Students
- Create accounts  
- Join or leave clubs  
- View events and announcements  

### Club Managers
- Manage clubs, members, and events  
- Post announcements  
- Generate and view reports  

---

## 🚀 How to Run

### Requirements
- PHP 8.1+  
- Composer  
- MySQL or MariaDB  
- Apache / Laravel Cloud  
- Git  

### Steps
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/duara.git

# 2. Move into the project directory
cd duara

# 3. Install dependencies
composer install
npm install && npm run build

# 4. Copy environment file
cp .env.example .env

# 5. Generate app key
php artisan key:generate

# 6. Update .env with your database credentials
# (DB_DATABASE, DB_USERNAME, DB_PASSWORD)

# 7. Run migrations
php artisan migrate

# 8. Start the local development server
php artisan serve
