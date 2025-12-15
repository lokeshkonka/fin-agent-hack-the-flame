# fin-agent-hack-the-flame-
## 🌐 Base Configuration

```env
BACKEND_URL=http://localhost:3000/api
```

All backend endpoints are prefixed with:

```
/api
```

---

## 🔑 Authentication Model (IMPORTANT)

* Email verification is handled by **Supabase Magic Link**
* Backend **must not** implement email/password auth
* Backend trusts Supabase JWT for user identity

Frontend sends:

```
Authorization: Bearer <SUPABASE_JWT>
```

Backend must:

* Verify JWT using Supabase public key
* Extract `email` / `sub` from token

---

## 👤 USER & KYC APIs

---

### 1️⃣ Submit Signup & KYC Data

Used after email verification.

**POST** `/auth/signup`

**Headers**

```
Content-Type: application/json
Authorization: Bearer <SUPABASE_JWT>
```

**Request Body**

```json
{
  "email": "user@example.com",
  "phone": "9876543210",
  "address": "Full residential address",
  "pan": "ABCDE1234F",
  "aadhaar": "123412341234",
  "approved": false
}
```

**Backend Responsibilities**

* Create user record if not exists
* Store KYC details
* Set `approved = false`
* Mark KYC status as `pending`

**Response**

```json
{
  "message": "KYC submitted successfully",
  "status": "pending"
}
```

---

### 2️⃣ Upload Address Proof (PDF)

**POST** `/kyc/upload`

**Headers**

```
Authorization: Bearer <SUPABASE_JWT>
```

**Form Data**

```
file   -> PDF document
email  -> user@example.com
```

**Backend Responsibilities**

* Validate PDF
* Store file (local / S3 / Supabase Storage)
* Save file path against user record

**Response**

```json
{
  "message": "Document uploaded",
  "file_url": "/uploads/abc.pdf"
}
```

---

### 3️⃣ Get Current User Profile

**GET** `/user/me`

**Headers**

```
Authorization: Bearer <SUPABASE_JWT>
```

**Response**

```json
{
  "email": "user@example.com",
  "approved": false,
  "kyc_status": "pending"
}
```

---

### 4️⃣ Check Approval Status

Used during login to block access until approved.

**GET** `/auth/status`

**Headers**

```
Authorization: Bearer <SUPABASE_JWT>
```

**Response**

```json
{
  "approved": true
}
```

---

## 🛡️ ADMIN APIs (Admin Portal)

---

### 5️⃣ Get All Pending KYC Users

**GET** `/admin/pending-users`

**Headers**

```
Authorization: Bearer <ADMIN_JWT>
```

**Response**

```json
[
  {
    "email": "user@example.com",
    "phone": "9876543210",
    "pan": "ABCDE1234F",
    "aadhaar": "123412341234",
    "document_url": "/uploads/abc.pdf",
    "approved": false
  }
]
```

---

### 6️⃣ Approve or Reject User

**PATCH** `/admin/approve-user`

**Headers**

```
Content-Type: application/json
Authorization: Bearer <ADMIN_JWT>
```

**Request Body**

```json
{
  "email": "user@example.com",
  "approved": true
}
```

**Response**

```json
{
  "message": "User approval updated"
}
```

---

## 🤖 FRAUD ANALYSIS (OPTIONAL / FUTURE)

---

### 7️⃣ Analyze Transaction Risk

**POST** `/fraud/analyze`

**Request Body**

```json
{
  "user_id": "uuid",
  "amount": 12000,
  "merchant": "Amazon",
  "location": "Mumbai"
}
```

**Response**

```json
{
  "risk_score": 0.12,
  "decision": "ALLOW",
  "explanation": "Low-risk transaction pattern"
}
```

---

## 📊 SYSTEM

---

### 8️⃣ Health Check

**GET** `/health`

**Response**

```json
{
  "status": "ok",
  "uptime": "12h"
}
```

---

## 📌 API SUMMARY

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/auth/signup`         | Submit KYC data      |
| POST   | `/kyc/upload`          | Upload address proof |
| GET    | `/user/me`             | Current user profile |
| GET    | `/auth/status`         | Approval status      |
| GET    | `/admin/pending-users` | Admin KYC list       |
| PATCH  | `/admin/approve-user`  | Approve user         |
| POST   | `/fraud/analyze`       | AI fraud analysis    |
| GET    | `/health`              | Health check         |

---

## 🧠 NOTES FOR BACKEND TEAM

* Supabase handles **authentication**
* Backend handles **authorization + business logic**
* Do NOT store passwords
* Always validate Supabase JWT
* KYC approval gates dashboard access

---

