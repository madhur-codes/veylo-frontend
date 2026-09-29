# Veylo — Personal Cloud Storage

Veylo is a clean and modern personal cloud storage interface built to make file management simple. The frontend provides the user interface for authentication, file uploads, folders, and managing files stored through Google Drive.

The project focuses on keeping the interface simple, responsive, and easy to use while handling the storage operations through a separate backend API.

## Features

* User registration and login
* Google authentication
* Personal dashboard
* File upload interface
* File and folder management
* File size and type information
* Responsive dark UI
* Google Drive based storage
* Authentication-aware frontend
* Backend API integration

## Tech Stack

* HTML5
* CSS3
* JavaScript
* Google OAuth
* REST API
* Google Drive API

## Project Structure

```text
veylo-frontend/
├── index.html
├── style.css
├── script.js
├── assets/
└── README.md
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/madhur-codes/veylo-frontend.git
```

Open the project folder:

```bash
cd veylo-frontend
```

The frontend can be served using any local development server.

For example:

```bash
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Backend Connection

The frontend communicates with the Veylo backend through REST API endpoints.

During local development, the backend runs separately, for example:

```text
http://localhost:5000
```

Make sure the backend is running before testing authentication or file operations.

## Security

No private credentials or API secrets should be stored directly in the frontend source code.

Environment-specific configuration should be handled separately and sensitive credentials should never be committed to GitHub.

## Current Status

Veylo is currently under active development. Authentication, Google integration, dashboard functionality, and file management are being developed and tested.

## Author

**Madhur Tiwari**

GitHub: https://github.com/madhur-codes

---

Built as a personal cloud storage project while learning and working with modern web development.
