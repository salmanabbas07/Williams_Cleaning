<div align="center">

# ✨ William Cleaning Services

### Modern Full-Stack Web Platform & Inquiries System

[![PHP](https://img.shields.io/badge/Backend-Core%20PHP%208.x-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![PHPMailer](https://img.shields.io/badge/Mailer-PHPMailer%20v6.9-green?style=for-the-badge&logo=gmail&logoColor=white)](https://github.com/PHPMailer/PHPMailer)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build%20Tool-Vite%205-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%203-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Hostinger Ready](https://img.shields.io/badge/Deployment-Hostinger%20Ready-673AB7?style=for-the-badge&logo=hostinger&logoColor=white)](https://www.hostinger.com/)

<p align="center">
  <b>Vrhunske storitve hotelskega in poslovnega čiščenja po vsej Sloveniji</b><br>
  Premium hotel housekeeping & commercial cleaning services web platform.
</p>

[Quick Start](#-quick-start-guide) • [Architecture](#-project-architecture) • [SMTP Setup](#-gmail-smtp-app-password) • [Hostinger Deployment](#-hostinger-deployment-guide) • [API Docs](#-api-endpoints) • [Troubleshooting](#-troubleshooting--faq)

---

</div>

## 📌 Overview

**William Cleaning Services** is a production-ready, full-stack web application tailored for hotel housekeeping and commercial cleaning services in Slovenia.

- **Frontend**: High-performance Single Page Application (SPA) built with **React 18**, **Vite**, and **Tailwind CSS**. Optimized for instant page loads, smooth navigation, and fully responsive layouts.
- **Backend**: Lightweight, secure **Core PHP 8.x** REST API with **PHPMailer**. Engineered with **zero Node.js dependencies on the server**, making it 100% plug-and-play for shared hosting environments like **Hostinger**.

---

## 🌟 Key Highlights

| Feature | Description |
| :--- | :--- |
| ⚡ **Blazing Fast SPA** | Client-side routing with Apache `.htaccess` rewrites (zero 404 errors on direct refresh). |
| 🛡️ **Zero Node Server** | Backend runs natively on PHP 8.x without needing Node.js, PM2, or server SSH. |
| ✉️ **Reliable Mail Delivery** | Inquiry submissions are dispatched instantly via Gmail SMTP with dual HTML & Plain-text templates. |
| 🔒 **Built-in Security** | Rate limiting (IP-based spam protection), strict CORS origins, header injection sanitization, and payload size guards. |
| 🌐 **Production Ready** | Pre-bundled PSR-4 autoloader for PHPMailer; no manual `composer install` command required. |

---

## 📁 Project Architecture

```text
cleanup/
│
├── 📂 frontend/                      # React + Vite Client Application
│   ├── 📂 public/                    # Static public assets, favicon & .htaccess for SPA
│   │   ├── .htaccess                 # Apache SPA rewrite rules (fixes 404 on refresh)
│   │   └── favicon.ico
│   ├── 📂 src/
│   │   ├── 📂 assets/                # Logos, banner images, SVG icons
│   │   ├── 📂 components/            # Reusable UI components (Navbar, Footer, ContactForm, etc.)
│   │   ├── 📂 pages/                 # Route views (Home, About, Services, FAQ, Blog, Contact)
│   │   ├── App.jsx                   # Main React routing wrapper
│   │   ├── index.css                 # Tailwind directives & global styling
│   │   └── main.jsx                  # React DOM mount point
│   ├── .env                          # Frontend environment config (VITE_BACKEND_URL)
│   ├── .env.example                  # Template for frontend environment variables
│   ├── index.html                    # HTML entry point with Schema.org SEO metadata
│   ├── package.json                  # Frontend scripts & NPM dependencies
│   ├── tailwind.config.js            # Custom theme colors & spacing config
│   └── vite.config.js                # Vite build pipeline configuration
│
├── 📂 backend/                       # Core PHP REST API Service
│   ├── 📂 config/
│   │   ├── config.php                # .env loader, CORS negotiation & runtime error settings
│   │   └── mail.php                  # SMTP credentials & PHPMailer settings
│   ├── 📂 controllers/
│   │   └── InquiryController.php     # Inquiry processing, validation flow & response handling
│   ├── 📂 helpers/
│   │   ├── RateLimiter.php           # File-based IP rate limiter (anti-spam protection)
│   │   ├── Response.php              # Standardized JSON response emitter (status & headers)
│   │   └── Validator.php             # Strict server-side input validator & HTML sanitizer
│   ├── 📂 routes/
│   │   └── api.php                   # Request router dispatching endpoints to controllers
│   ├── 📂 services/
│   │   └── EmailService.php          # Inquiry email builder (HTML + Plain text) & SMTP sender
│   ├── 📂 storage/
│   │   └── 📂 cache/                 # Writable directory for temporary rate-limit storage
│   ├── 📂 vendor/
│   │   ├── 📂 phpmailer/             # Official PHPMailer v6.9 library (standalone)
│   │   └── autoload.php              # Custom PSR-4 autoloader (No Composer CLI needed)
│   ├── .env                          # Production credentials & SMTP secrets (kept private)
│   ├── .env.example                  # Template for backend environment variables
│   ├── .htaccess                     # Front-controller rewrite to index.php & .env protection
│   └── index.php                     # API entry point & security headers
│
└── 📄 README.md                      # Comprehensive project guide & documentation
```

---

## 🚀 Quick Start Guide

Run both the frontend and backend locally in under 3 minutes.

### 📋 Prerequisites
Make sure you have installed:
- **Node.js** (v18 or higher) — [Download Node.js](https://nodejs.org/)
- **PHP** (v8.0 or higher) — Included in [XAMPP](https://www.apachefriends.org/), [Laragon](https://laragon.org/), or via standalone PHP.

---

### Step 1: Start Backend (PHP)

1. Open your terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Setup your environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Update `backend/.env` with your SMTP details:
   ```ini
   APP_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Gmail SMTP Settings
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=info.willamscleaning@gmail.com
   SMTP_PASS=your_16_digit_app_password
   SMTP_FROM_NAME="William Cleaning Services"
   RECEIVER_EMAIL=info.willamscleaning@gmail.com
   ```

4. Start the PHP built-in server:
   ```bash
   php -S localhost:5000 index.php
   ```
   > 🟢 **Backend Live at:** `http://localhost:5000`  
   > Verify by visiting `http://localhost:5000/api/health` in your browser.

---

### Step 2: Start Frontend (React)

1. Open a **second terminal window** and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `frontend/.env` file:
   ```ini
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   > 🔵 **Frontend Live at:** `http://localhost:5173`

---

## 📧 Gmail SMTP & App Password

Standard Gmail account passwords cannot be used for third-party automated sending. You must generate a **Google App Password**.

> [!TIP]
> Setting this up takes less than 60 seconds.

1. Open **Google Account Security**: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Confirm that **2-Step Verification** is turned **ON**.
3. In the search bar at the top, type **"App passwords"** and select it.
4. Set an app name (e.g. `William Cleaning Website`) and click **Create**.
5. Google will provide a **16-character password** (e.g. `abcd efgh ijkl mnop`).
6. Copy this password, remove any spaces, and set it as `SMTP_PASS` in `backend/.env`:
   ```ini
   SMTP_PASS=abcdefghijklmnop
   ```

---

## 🌐 Hostinger Deployment Guide

This project is tailored for Hostinger's Apache environment. You can deploy it using either a **subdomain** or a **subfolder**.

```
                HOSTINGER DEPLOYMENT OPTIONS
                
   Option A: Subdomain                  Option B: Subfolder
   ┌──────────────────────────┐         ┌──────────────────────────┐
   │ Frontend:                │         │ Frontend:                │
   │ williamscleaning.si      │         │ williamscleaning.si      │
   │                          │         │                          │
   │ Backend API:             │         │ Backend API:             │
   │ api.williamscleaning.si  │         │ williamscleaning.si/api  │
   └──────────────────────────┘         └──────────────────────────┘
```

### 1. Backend Upload

1. Login to **Hostinger hPanel** and open **File Manager**.
2. Choose your deployment path:
   - **Subfolder (Recommended)**: Inside `public_html/`, create a folder named `backend/` and upload all files from `backend/` into `public_html/backend/`.
   - **Subdomain**: Create a subdomain (e.g., `api.williamscleaning.si`) in Hostinger and upload the contents of `backend/` into its `public_html/`.
3. In Hostinger File Manager, create or edit `.env` in the backend root:
   ```ini
   APP_ENV=production
   FRONTEND_URL=https://williamscleaning.si,https://www.williamscleaning.si

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=info.willamscleaning@gmail.com
   SMTP_PASS=your_16_digit_app_password
   SMTP_FROM_NAME="William Cleaning Services"
   RECEIVER_EMAIL=info.willamscleaning@gmail.com
   ```
4. Verify directory permissions:
   - `backend/storage/cache/` must have permission **`0755`** or **`0775`** (writable for rate-limiting files).

---

### 2. Frontend Build & Upload

1. In your local `frontend/.env`, set the production backend URL:
   ```ini
   VITE_BACKEND_URL=https://williamscleaning.si/backend
   # Or if using subdomain:
   # VITE_BACKEND_URL=https://api.williamscleaning.si
   ```

2. Build the optimized production bundle:
   ```bash
   cd frontend
   npm run build
   ```
   This generates the production files inside `frontend/dist/`.

3. Upload **everything inside `frontend/dist/`** into your domain's `public_html/`.

> [!IMPORTANT]
> Ensure the `.htaccess` file from `frontend/dist/.htaccess` is uploaded to `public_html/`. It enables React Router to handle direct page refreshes (such as `/kontakt` or `/storitve`) without throwing a 404 error.

---

## 🧪 API Endpoints

All responses are returned with the `Content-Type: application/json` header.

### 1. Server Welcome
- **Route**: `GET /`
- **Purpose**: Verify base backend status and view endpoint links.
```json
{
  "success": true,
  "message": "William Cleaning Services Backend is running.",
  "healthCheck": "/api/health",
  "inquiryEndpoint": "POST /api/inquiry/send"
}
```

---

### 2. Health Check
- **Route**: `GET /api/health`
- **Purpose**: Uptime monitoring and server availability check.
```json
{
  "success": true,
  "service": "William Cleaning Services Backend API",
  "status": "UP",
  "timestamp": "2026-11-10T17:00:00Z"
}
```

---

### 3. Submit Customer Inquiry
- **Route**: `POST /api/inquiry/send` *(Alias: `POST /api/inquiry`)*
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Janez Novak",
  "email": "janez.novak@podjetje.si",
  "phone": "+386 69 803 622",
  "subject": "hotel-housekeeping",
  "message": "Pozdravljeni, zanimamo se za celovito čiščenje hotelskih sob v glavni turistični sezoni."
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Your inquiry has been sent successfully."
}
```

#### Validation Error (`400 Bad Request`)
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

#### Rate Limit Exceeded (`429 Too Many Requests`)
```json
{
  "success": false,
  "message": "Prejeli smo preveč povpraševanj iz vašega naslova. Prosimo, poskusite znova čez 15 minut (Too many requests, please try again later)."
}
```

---

## 🔐 Security & Optimization

- **🛡️ Cross-Origin Resource Sharing (CORS)**: Preflight `OPTIONS` requests are handled automatically. Only origins specified in `FRONTEND_URL` are granted access.
- **⏱️ Anti-Spam Rate Limiter**: 
  - Submissions are capped at **5 requests per 15 minutes** per IP address.
  - Rate limits are stored safely in `backend/storage/cache/` using file-based locks.
- **🧼 Data Sanitization**: Incoming strings are sanitized against XSS, script injection, and email header injection (`\r`, `\n`).
- **📦 Payload Size Guard**: Payloads exceeding **10KB** are rejected immediately to protect server RAM.
- **🚫 File Protection**: The `.htaccess` file prevents public web access to `.env`, `.git`, and config files.

---

## ⚙️ Environment Configuration Reference

### Backend (`backend/.env`)

| Variable | Description | Example / Default | Required |
| :--- | :--- | :--- | :---: |
| `APP_ENV` | Application environment (`development` or `production`) | `production` | Yes |
| `FRONTEND_URL` | Allowed frontend origins (comma-separated for multiple) | `https://williamscleaning.si` | Yes |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` | Yes |
| `SMTP_PORT` | SMTP port (`465` for SSL, `587` for TLS) | `465` | Yes |
| `SMTP_USER` | SMTP username / Google account | `info.willamscleaning@gmail.com` | Yes |
| `SMTP_PASS` | 16-character Google App Password | `abcd efgh ijkl mnop` | Yes |
| `SMTP_FROM_NAME`| Name displayed as sender in recipient inbox | `William Cleaning Services` | No |
| `RECEIVER_EMAIL`| Recipient inbox that receives customer inquiries | `info.willamscleaning@gmail.com` | Yes |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | Base URL of the PHP backend API | `https://williamscleaning.si/backend` |

---

## ❓ Troubleshooting & FAQ

<details>
<summary><b>1. Why does direct page refresh give a 404 error on Hostinger?</b></summary>
<p>

This happens when the web server doesn't know how to route single-page client applications.
**Solution**: Make sure the `.htaccess` file inside `frontend/public/.htaccess` is uploaded to your Hostinger `public_html/` folder. It redirects all non-file requests to `index.html`.
</p>
</details>

<details>
<summary><b>2. How to fix "CORS error: No 'Access-Control-Allow-Origin' header present"?</b></summary>
<p>

Verify that `FRONTEND_URL` in `backend/.env` exactly matches your frontend domain (including protocol `https://` and `www` if used).
```ini
FRONTEND_URL=https://williamscleaning.si,https://www.williamscleaning.si
```
</p>
</details>

<details>
<summary><b>3. Why am I getting "SMTP Error: Could not authenticate"?</b></summary>
<p>

Google does not accept regular account passwords for SMTP.
1. Make sure **2-Step Verification** is turned on in your Google Account.
2. Generate an **App Password** from [Google Security](https://myaccount.google.com/security).
3. Paste the 16-character key (without spaces) into `backend/.env` as `SMTP_PASS`.
</p>
</details>

<details>
<summary><b>4. Does this backend need Composer or Node.js on the server?</b></summary>
<p>

**No.** The backend is pure Core PHP 8.x. PHPMailer and a custom PSR-4 autoloader are already included inside `backend/vendor/`, so it runs out-of-the-box on any standard Hostinger shared hosting plan.
</p>
</details>

---

## 📞 Support & Inquiries

For questions or support regarding this codebase:
- 📧 **Email**: [info.willamscleaning@gmail.com](mailto:info.willamscleaning@gmail.com)
- 🌐 **Website**: [williamscleaning.si](https://williamscleaning.si)
- 📍 **Location**: Ljubljana, Slovenia

---

<div align="center">
  <sub>Built with ❤️ for <b>William Cleaning Services</b>. All rights reserved.</sub>
</div>
