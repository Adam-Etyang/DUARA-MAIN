# RBAC Flow Diagrams

## 1. Registration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    REGISTRATION PAGE                         │
│                   /resources/Auth/Register.jsx               │
│                                                              │
│  [Name Input]                                               │
│  [Email Input]                                              │
│  [Password Input]                                           │
│  [Confirm Password Input]                                   │
│  ┌─ ROLE SELECTION ──────────────────────────────────────┐ │
│  │ ○ Student - Browse clubs and attend events             │ │
│  │ ○ Administrator - Manage the platform                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│  [Create Account Button]                                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ├─ User selects "Student"
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │  POST /register                      │
        │  - name                              │
        │  - email                             │
        │  - password                          │
        │  - password_confirmation             │
        │  - role: "student"                   │
        └──────────────────────┬───────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────┐
        │  RegisteredUserController->store()        │
        ├──────────────────────────────────────────┤
        │  1. Validate all inputs                   │
        │  2. Create Student in DB                  │
        │  3. Skip Admin record (role = student)    │
        │  4. Send verification email              │
        │  5. Fire Registered event                │
        └──────────────────────┬───────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────┐
        │  Redirect to: /verify-email          │
        │  (User verifies email)               │
        └──────────────────────┬───────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────┐
        │  Student Account Created ✓           │
        │  Can now login                       │
        └──────────────────────────────────────┘


                           OR
                           │
                           ├─ User selects "Administrator"
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │  POST /register                      │
        │  - name                              │
        │  - email                             │
        │  - password                          │
        │  - password_confirmation             │
        │  - role: "admin"                     │
        └──────────────────────┬───────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────┐
        │  RegisteredUserController->store()        │
        ├──────────────────────────────────────────┤
        │  1. Validate all inputs                   │
        │  2. Create Student in DB                  │
        │  3. Create Admin record:                  │
        │     - student_id: new_student_id          │
        │     - admin_type: "school_admin"          │
        │  4. Send verification email              │
        │  5. Fire Registered event                │
        └──────────────────────┬───────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────┐
        │  Redirect to: /verify-email          │
        │  (User verifies email)               │
        └──────────────────────┬───────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────┐
        │  Admin Account Created ✓             │
        │  Can now login                       │
        └──────────────────────────────────────┘
```

---

## 2. Login & Redirect Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      LOGIN PAGE                              │
│                   /resources/Auth/Login.jsx                  │
│                                                              │
│  [Email Input]                                              │
│  [Password Input]                                           │
│  [Remember Me Checkbox]                                     │
│  [Sign In Button]                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │  POST /login                         │
        │  - email: "john@example.com"         │
        │  - password: "SecurePass123"         │
        │  - remember: true                    │
        └──────────────────────┬───────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────┐
        │  AuthenticatedSessionController->store()  │
        └──────────────────────┬───────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────┐
        │  LoginRequest->authenticate()             │
        ├──────────────────────────────────────────┤
        │  1. Check rate limiting                   │
        │  2. Auth::attempt(email, password)        │
        │     - Query: SELECT * FROM students       │
        │       WHERE email = 'john@...'            │
        │     - Compare: Hash::check(pwd, hashed)   │
        │  3. Create session                        │
        │  4. Return true/false                     │
        └──────────────────────┬───────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
            ✓ Authenticated         ✗ Failed
                    │                     │
                    ▼                     ▼
        ┌──────────────────────┐  ┌──────────────────────┐
        │ Session Created      │  │ Throw ValidationEx   │
        │ $request->session()  │  │ Redirect to /login   │
        │ ->regenerate()       │  │ Show error message   │
        └──────────┬───────────┘  └──────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────────┐
    │  Smart Redirect Logic                    │
    │  $user = Auth::user();                   │
    │  if ($user->isAdmin()) {                 │
    │    → Check: EXISTS (                     │
    │        SELECT * FROM admins              │
    │        WHERE student_id = $user_id       │
    │      )                                   │
    └──────────────────────┬────────────────────┘
                    ┌──────┴──────┐
                    │             │
               IS ADMIN      IS STUDENT
                    │             │
                    ▼             ▼
          ┌──────────────────┐  ┌──────────────────┐
          │ Redirect to:     │  │ Redirect to:     │
          │ /admin           │  │ /dashboard       │
          │ (Admin Dashboard)│  │ (User Dashboard) │
          └──────────────────┘  └──────────────────┘
                    │                     │
                    ▼                     ▼
          ┌──────────────────────┐  ┌──────────────────┐
          │ AdminController      │  │ DashboardControl │
          │ ->dashboard()        │  │ ->index()        │
          ├──────────────────────┤  ├──────────────────┤
          │ - Clubs              │  │ - My Clubs       │
          │ - Events             │  │ - All Clubs      │
          │ - Users              │  │ - Events         │
          │ - Resources          │  │ - Registrations  │
          │ - Resource Requests  │  │                  │
          └──────────────────────┘  └──────────────────┘
                    │                     │
                    ▼                     ▼
          ┌──────────────────────┐  ┌──────────────────┐
          │ Admin/Dashboard.jsx  │  │ Dashboard/Index  │
          │ Shows admin panel    │  │ Shows user panel │
          └──────────────────────┘  └──────────────────┘
```

---

## 3. Database Schema - RBAC Related

```
STUDENTS TABLE
┌─────────────────────────────────────┐
│ student_id (PK)                     │
│ name                                │
│ email (UNIQUE)                      │
│ password (hashed)                   │
│ email_verified_at (nullable)        │
│ created_at                          │
│ updated_at                          │
└──────────────┬──────────────────────┘
               │
               │ (1 to Many)
               │
               ▼
ADMINS TABLE (if admin role)
┌─────────────────────────────────────┐
│ admin_id (PK)                       │
│ student_id (FK to students)         │
│ admin_type:                         │
│  - "school_admin"                   │
│  - "club_admin"                     │
│ club_id (nullable, for club_admin)  │
│ created_at                          │
│ updated_at                          │
└─────────────────────────────────────┘


EXAMPLE DATA:

STUDENTS TABLE:
│ student_id │ name      │ email               │ verified_at │
├────────────┼───────────┼─────────────────────┼─────────────┤
│ 1          │ John Doe  │ john@school.edu     │ 2025-11-12  │
│ 2          │ Jane Doe  │ jane@school.edu     │ 2025-11-12  │

ADMINS TABLE:
│ admin_id │ student_id │ admin_type    │ club_id │
├──────────┼────────────┼───────────────┼─────────┤
│ 1        │ 1          │ school_admin  │ NULL    │

→ John (student_id=1) is a school admin
→ Jane (student_id=2) is NOT an admin
```

---

## 4. Authentication State Flow

```
USER NOT LOGGED IN
│
├─ Can access: / (landing)
├─ Can access: /register
├─ Can access: /login
└─ Cannot access: /dashboard, /admin (redirected to /login)


STUDENT USER LOGGED IN
│
├─ Can access: / (landing)
├─ Can access: /dashboard
├─ Can access: /clubs
├─ Can access: /events
├─ Cannot access: /admin (403 Forbidden)
│              (IsSchoolAdmin middleware blocks)
└─ On logout: Redirected to /


ADMIN USER LOGGED IN
│
├─ Can access: / (landing)
├─ Can access: /admin
├─ Can access: /admin/clubs
├─ Can access: /admin/events
├─ Can access: /admin/users
├─ Can access: /admin/resources
├─ CAN ALSO access: /dashboard, /clubs (shared features)
│                    (But will be redirected on login)
└─ On logout: Redirected to /
```

---

## 5. Method Call Chain on Login

```
POST /login
  │
  └─▶ AuthenticatedSessionController->store()
       │
       ├─▶ LoginRequest->authenticate()
       │   │
       │   ├─▶ ensureIsNotRateLimited()
       │   │   └─▶ RateLimiter::tooManyAttempts() [check limit]
       │   │
       │   └─▶ Auth::attempt(['email', 'password'], remember)
       │       │
       │       ├─▶ Query Student table by email
       │       │   └─▶ SELECT * FROM students WHERE email = ?
       │       │
       │       └─▶ Hash::check(password, $student->password)
       │           └─▶ Bcrypt comparison
       │
       ├─▶ $request->session()->regenerate() [new session ID]
       │
       └─▶ Check if user is admin
           │
           ├─▶ Auth::user()->isAdmin()
           │   │
           │   └─▶ $student->adminRecords()->exists()
           │       └─▶ SELECT * FROM admins 
           │           WHERE student_id = ? LIMIT 1
           │
           ├─ YES → redirect()->route('admin.dashboard')
           │        └─▶ GET /admin
           │           └─▶ IsSchoolAdmin middleware ✓
           │
           └─ NO → redirect()->route('dashboard')
                  └─▶ GET /dashboard
                     └─▶ Authenticate middleware ✓
```

---

## 6. User Journey Example

### Student Journey
```
1. Click "Get Started" on landing page
   │
2. Fill registration form
   ├─ Name: "John Student"
   ├─ Email: "john@school.edu"
   ├─ Password: "Secure123!"
   └─ Role: ○ Student [SELECTED]
   │
3. Click "Create Account"
   │
4. See email verification page
   │
5. Click link in verification email
   │
6. Redirected to dashboard
   │
7. Login page appears (session expired or new session)
   │
8. Enter: john@school.edu / Secure123!
   │
9. Redirected to: /dashboard
   │
10. See user dashboard
    ├─ My Clubs
    ├─ All Clubs to Join
    ├─ Events
    └─ My Registrations
```

### Admin Journey
```
1. Click "Get Started" on landing page
   │
2. Fill registration form
   ├─ Name: "Jane Admin"
   ├─ Email: "jane@school.edu"
   ├─ Password: "Secure123!"
   └─ Role: ○ Administrator [SELECTED]
   │
3. Click "Create Account"
   │
4. See email verification page
   │
5. Click link in verification email
   │
6. Redirected to admin dashboard (auto redirect)
   │
7. Login page appears (new session)
   │
8. Enter: jane@school.edu / Secure123!
   │
9. Redirected to: /admin
   │
10. See admin dashboard
    ├─ Total Students
    ├─ Total Clubs
    ├─ Total Events
    ├─ Clubs Management
    ├─ Events Management
    ├─ Users Management
    ├─ Resources Management
    └─ Resource Requests
```

---

## 7. Code Execution Timeline

```
TIME │ LOCATION              │ ACTION
─────┼───────────────────────┼──────────────────────────────
  0  │ Browser               │ User clicks "Create Account"
     │                       │
  1  │ Register.jsx          │ setData('role', 'student/admin')
     │                       │ post(route('register'), {...})
     │                       │
  2  │ HTTP Request          │ POST /register with form data
     │                       │
  3  │ routes/auth.php       │ Route::post('register', ...)
     │                       │ Matches route
     │                       │
  4  │ RegisteredUser        │ ->store() method starts
     │ Controller            │
     │                       │
  5  │ FormRequest           │ ->validate() checks:
     │                       │ - name (required, string)
     │                       │ - email (required, unique)
     │                       │ - password (required, confirmed)
     │                       │ - role (required, 'student'|'admin')
     │                       │
  6  │ Student Model         │ Student::create([...])
     │                       │ INSERT INTO students (...)
     │                       │
  7  │ Conditional Logic     │ if ($request->role === 'admin') {
     │                       │
  8  │ Admin Model           │ Admin::create([...])
     │                       │ INSERT INTO admins (...)
     │                       │ [ONLY IF ROLE == ADMIN]
     │                       │
  9  │ Event Dispatcher      │ event(new Registered($student))
     │                       │
 10  │ HTTP Response         │ Redirect to /verify-email
     │                       │
 11  │ Browser               │ User sees email verification page
```
