# Subscriber Management System

This project is a **Vue 3 + TypeScript** application that manages subscribers, fields, and their assignments.  
It demonstrates **code organization, API integration, and testing**.  

While there is room for improvement, the main goal is to **showcase my ability to structure code properly** and **write tests**.

  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*    List all subscribers in a paginated table
*    Add new subscribers with validation
*    Edit existing subscribers and update details
*    Delete subscribers with confirmation
*    Create new custom fields (text number boolean date)
*    Edit existing fields and update properties
*    Delete fields that are no longer needed
*    Assign custom fields to subscribers
*    Update assigned field values dynamically
*    Unassign fields from subscribers
*    Uses useFetch for handling API requests
*    Stores subscriber & field data in Pinia
*    Fetches subscribers and fields on demand
*    Displays real-time updates after operations

---

<h2>🛠️ Installation Steps:</h2>

<h3>1️⃣ Clone the Repository</h3>

```
git clone https://github.com/islam-mohammed/mailerlite-subscribers-front.git
cd mailerlite-subscribers-front
```
<h3>2️⃣ Install Dependencies</h3>

```
npm install
```
<h3>3️⃣ Run the Laravel Backend</h3>

```
php artisan serve
```

Navigate to the Laravel backend folder and run:

<h3>4️⃣ Configure Environment Variables</h3>

* Create a .env file in the project's root (if not included).
* Set the API URL (VITE_API_URL) to the backend Laravel API application.

```
VITE_API_URL=http://127.0.0.1:8000/api
```
<b>Necessary:</b> Ensure the Laravel backend is running before starting the Vue application.


<h3>4️⃣ Run the application</h3>

To start the Vue app in development mode, run:

```
npm run dev
```
This will start a Vite development server.

---
<h2>✅ Code Quality Tools </h2>

<h3>Lint Code</h3>

```
npm run lint
```

This will fix and highlight <b>ESLint issues</b>.

<h3>Format Code</h3>

```
npm run format
```
This will format the code using <b>Prettier</b>.

<h3>Type Checking</h3>

```
npm run type-check
```
This will run <b>TypeScript type checking</b>.

---

<h2>🧪 Code Quality Tools </h2>

<h3>Run All Tests</h3>

```
npm run test
```
<h3>Watch Tests for Changes</h3>

```
npm run test:watch
```

---

<h2>💡 Final Notes</h2>

*  There is room for improvement, but this project demonstrates my ability to structure and test code.
*  Basic unit tests have been included to showcase testing capabilities.
*  API requests are handled using fetch with error handling.
*  Pinia store is used for global state management.
*  TypeScript is used for type checking.

