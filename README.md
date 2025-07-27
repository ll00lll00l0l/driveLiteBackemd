# driveLiteBackemd

# 📦 File Upload & Auth API (Node.js + Express)

This project is a Node.js Express backend that provides:

- User Signup and Login using JWT-based authentication (Access + Refresh tokens)
- Secure file upload system with metadata storage (filename, type, size, etc.)
- File listing, previewing by ID, and deletion
- Middleware-based protected routes for authenticated users

> Note: AWS S3 integration is planned, but currently not implemented in the live version due to free-tier limitations.

---

## 🔧 Technologies Used

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** (Access + Refresh token-based authentication)
- **BcryptJS** (Password hashing)
- **Multer** (Local file upload)
- **dotenv**
- **Postman** (Collection included for demo)

---

## 📁 Features

### ✅ Authentication
- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login and receive access/refresh tokens
- `POST /api/auth/token` – Get new access token using refresh token

### 📤 File Management
- `POST /api/files/upload` – Upload a file (Protected route)
- `GET /api/files` – List all uploaded files (pagination + optional fileType filter)
- `GET /api/files/:id` – Get file metadata by ID
- `DELETE /api/files/:id` – Delete a file (also deletes from storage)

---

## 🔐 Auth Token Flow

- **Access Token**: Short-lived (e.g. `1h`)
- **Refresh Token**: Long-lived (`7d`)
- Include the access token in the `Authorization` header:  

# env temp

ATLAS_URI= 
PORT=
JWT_SECRET=
JWT_REFRESH_SECRET=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET_NAME=
AWS_S3_BUCKET_NAME=