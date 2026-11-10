# William Cleaning Services – Fullstack Project

This repository contains the complete frontend and backend for the **William Cleaning Services** website.
- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Core PHP 8.x + PHPMailer (Zero Node.js dependency in backend, fully compatible with Hostinger shared & cloud hosting)

---

## 📁 Project Architecture

```text
cleanup/
│
├── frontend/                     # React + Vite frontend application
│   ├── public/                   # Static assets & icons
│   ├── src/                      # React components, pages, styles
│   ├── .env.example              # Frontend environment variables template
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite build configuration
│   └── index.html                # HTML entry point
│
├── backend/                      # Core PHP Backend Service
│   ├── config/
│   │   ├── config.php            # Environment loader, CORS & rate limit configuration
│   │   └── mail.php              # PHPMailer SMTP credentials & settings
│   │
│   ├── controllers/
│   │   └── InquiryController.php # Inquiry business logic & rate check
│   │
│   ├── services/
│   │   └── EmailService.php      # PHPMailer SMTP email builder & dispatcher
│   │
│   ├── helpers/
│   │   ├── Response.php          # Standardized JSON response handler
│   │   ├── Validator.php         # Server-side inquiry input validator & sanitizer
│   │   └── RateLimiter.php       # File-based IP rate limiter (spam protection)
│   │
│   ├── routes/
│   │   └── api.php               # API route definitions & router dispatcher
│   │
│   ├── storage/
│   │   └── cache/                # Temporary rate-limiting cache (writable)
│   │
│   ├── vendor/
│   │   ├── autoload.php          # Standalone PSR-4 autoloader (No composer CLI required)
│   │   └── phpmailer/            # PHPMailer library
│   │
│   ├── .htaccess                 # Apache rewrite rules & file protection
│   ├── .env                      # Environment credentials (ignored in Git)
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   └── index.php                 # Application entry point & front controller
│
└── README.md                     # Documentation & setup guide
```

---

## 🚀 Quick Start Guide

Follow these steps to run the backend and frontend on your local machine:

### 1. Backend Setup (Core PHP)

Ensure PHP 8.0+ is installed on your machine (e.g. via XAMPP, Laragon, or standalone PHP).

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Configure `.env`:
   Create or update `backend/.env` (see `backend/.env.example`):
   ```env
   APP_ENV=development
   FRONTEND_URL=http://localhost:5173
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=info.willamscleaning@gmail.com
   SMTP_PASS=your_16_digit_app_password
   SMTP_FROM_NAME="William Cleaning Services"
   RECEIVER_EMAIL=info.willamscleaning@gmail.com
   ```

3. Run the PHP Development Server:
   ```bash
   php -S localhost:5000 -t backend backend/index.php
   ```
   Or from inside the `backend` directory:
   ```bash
   php -S localhost:5000 index.php
   ```
   The backend API will run at `http://localhost:5000`.

---

### 2. Frontend Setup (React)

In a new terminal window, navigate to the `frontend` folder and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The website will be available at `http://localhost:5173`.

---

## 📧 How to Generate a Google App Password for Gmail SMTP

Standard Gmail passwords do not work with SMTP. You must create a dedicated 16-character **Google App Password**:

1. Go to your Google Account security settings: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Ensure **2-Step Verification** is turned **ON**.
3. In the search box at the top, type **"App passwords"** and click on it.
4. Enter an app name (e.g. `William Cleaning Website`) and click **Create**.
5. Google will generate a **16-letter password** (e.g. `abcd efgh ijkl mnop`).
6. Copy this 16-letter password (without spaces) and paste it into `backend/.env` as `SMTP_PASS`.

---

## 🌐 Hostinger Deployment Guide

This backend is specifically designed for standard Hostinger shared or cloud hosting without needing Node.js or SSH access.

### Step 1: Upload Backend to Hostinger

1. Log into your **Hostinger hPanel** and open **File Manager**.
2. Navigate to your website's root:
   - If hosting backend on a subdomain (e.g. `api.yourdomain.com`): upload contents of `backend/` directly into `domains/api.yourdomain.com/public_html/`.
   - If hosting backend inside a subfolder (e.g. `yourdomain.com/backend/`): upload contents of `backend/` into `domains/yourdomain.com/public_html/backend/`.
3. Create the `.env` file in the uploaded backend directory and populate your production credentials:
   ```env
   APP_ENV=production
   FRONTEND_URL=https://yourdomain.com,https://www.yourdomain.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=info.willamscleaning@gmail.com
   SMTP_PASS=your_16_digit_app_password
   SMTP_FROM_NAME="William Cleaning Services"
   RECEIVER_EMAIL=info.willamscleaning@gmail.com
   ```
4. Verify that `storage/cache/` has write permissions (`0755` or `0775`).

### Step 2: Configure Frontend Production URL

1. In `frontend/.env`:
   ```env
   VITE_BACKEND_URL=https://api.yourdomain.com
   # Or if subfolder:
   # VITE_BACKEND_URL=https://yourdomain.com/backend
   ```
2. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
3. Upload the contents of `frontend/dist/` to your frontend's `public_html/`.

---

## 🧪 API Endpoints

### 1. Root Welcome
- **Method**: `GET /`
- **Response**:
  ```json
  {
    "success": true,
    "message": "William Cleaning Services Backend is running.",
    "healthCheck": "/api/health",
    "inquiryEndpoint": "POST /api/inquiry/send"
  }
  ```

### 2. Health Check
- **Method**: `GET /api/health`
- **Response**:
  ```json
  {
    "success": true,
    "service": "William Cleaning Services Backend API",
    "status": "UP",
    "timestamp": "2026-11-10T14:00:00Z"
  }
  ```

### 3. Send Inquiry
- **Method**: `POST /api/inquiry/send` (or alias `POST /api/inquiry`)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Janez Novak",
    "email": "janez@primer.si",
    "phone": "+386 69 803 622",
    "subject": "hotel-housekeeping",
    "message": "Pozdravljeni, zanimamo se za čiščenje hotelskih prostorov za prihajajočo sezono."
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Your inquiry has been sent successfully."
  }
  ```
- **Validation Error Response (400 Bad Request)**:
  ```json
  {
    "success": false,
    "message": "Vnesite veljaven e-poštni naslov (Invalid email address).",
    "errors": [
      {
        "field": "email",
        "message": "Vnesite veljaven e-poštni naslov (Invalid email address)."
      }
    ]
  }
  ```
- **Rate Limit Response (429 Too Many Requests)**:
  ```json
  {
    "success": false,
    "message": "Prejeli smo preveč povpraševanj iz vašega naslova. Prosimo, poskusite znova čez 15 minut (Too many requests, please try again later)."
  }
  ```

---

## 🔒 Security Features

1. **Strict CORS**: Cross-Origin requests are restricted exclusively to origins declared in `FRONTEND_URL`.
2. **Double Rate Limiting**:
   - Global rate limiter (100 requests per 15 min across API endpoints).
   - Inquiry spam protector (5 submissions per 15 min per IP) with temporary file-based storage.
3. **Server-Side Validation**: All fields validated and sanitized independently of client inputs.
4. **Header Injection Prevention**: Rejects newlines in email, name, and subject fields.
5. **Payload Size Guard**: Request body capped at 10KB to prevent memory exhaustion attacks.
6. **No Information Leaks**: Raw PHP notices, warnings, and stack traces are suppressed in production mode.
