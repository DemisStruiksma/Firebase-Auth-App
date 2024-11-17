# Firebase Auth App

A web app for authentication, built using Firebase, React, TypeScript, and TailwindCSS.

---

## Table of Contents
- [Features](#features)
- [Component Structure](#component-structure)
  - [Atoms](#atoms)
  - [Molecules](#molecules)
- [Future Improvements](#future-improvements)
- [Setup Instructions](#setup-instructions)

---

## Features

- **User Authentication:**
  - Login, Register, and Logout functionalities using Firebase.
- **Route Protection:**
  - Public routes for login and registration pages.
  - Private route (home page) accessible only when the user is logged in.
- **Responsive Design:**
  - Fully responsive layouts using TailwindCSS.
- **Toast Notifications:**
  - Informative toast alerts for user actions like login/logout success or errors.

---

## Component Structure

The project follows **Atomic Design Principles** for structuring components. As of now there are only atoms/molecules in this project, but this can be expanded to organisms as well.

### Atoms

- **Button:**
  - Variants for primary and secondary buttons.
- **Input Field:**
  - Used across login and registration forms. It's made reusable so can be used for any other future form.

### Molecules

- **LoginForm:**
  - Includes an email input field, password input field, and a submit button.
---

## Future Improvements

- **Password Reset Feature:**
  - Add a "Forgot Password" page with a form for users to reset their passwords via email.
- **Custom Error Messages:**
  - More user-friendly error messages from Firebase errors.
- **Accessibility:**
  - Improve accessibility with better ARIA roles and screen-reader support.

---

## Setup Instructions

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/DemisStruiksma/Firebase-Auth-App.git
   ```
2. Navigate to the project directory:
   ```bash
    cd FireBase-Auth-App
   ```
3. Navigate to the project directory:
   ```bash
    npm install
   ```
4. Set up Firebase configuration:
- Go to your [Firebase console](https://console.firebase.google.com) and create a project.
- Enable email/password authentication in Authentication > Sign-in method.
- Get the Firebase configuration values from the Project settings > General tab.
- Create a .env file in the root of your project and add the following environment variables:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```
5. Start the development server:
   ```bash
    npm start
   ```