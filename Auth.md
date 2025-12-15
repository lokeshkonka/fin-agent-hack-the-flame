## 📡 Backend API

### ➤ `POST /api/auth/signup`

**Purpose:**
Submit KYC details + documents for admin approval.

---

### Request Type

`multipart/form-data`

---

### Request Parts

#### 1️⃣ JSON Payload (`data`)

```json
{
  "name": "Vishal Kumar",
  "email": "user@example.com",
  "phone": "9876543210",
  "address": "Full residential address",
  "pan": "ABCDE1234F",
  "aadhaar": "123412341234",
  "approved": false
}
```

> Sent as:

```
FormData.append("data", Blob(application/json))
```

---

#### 2️⃣ File Uploads (PDF only)

| Field Name   | Description          |
| ------------ | -------------------- |
| `aadhaarPdf` | Aadhaar document PDF |
| `panPdf`     | PAN card PDF         |
| `addprofPdf` | Address proof PDF    |

---

### Example cURL

```bash
curl -X POST "http://localhost:8080/api/auth/signup" \
  -H "Accept: application/json" \
  -F 'data={"name":"Vishal","email":"user@example.com","phone":"9876543210","address":"Some address","pan":"ABCDE1234F","aadhaar":"123412341234","approved":false};type=application/json' \
  -F "aadhaarPdf=@aadhaar.pdf;type=application/pdf" \
  -F "panPdf=@pan.pdf;type=application/pdf" \
  -F "addprofPdf=@addprof.pdf;type=application/pdf"
```

---

## 🔑 Sign In API (Supabase)

Handled **directly by Supabase**:

* Email + Password
* Magic link sign-in
* Session stored client-side

No backend API required.

---

## 🛡️ Admin Approval (Future)

* Backend stores user with `approved = false`
* Admin reviews KYC documents
* Admin sets `approved = true`
* User gets full access after approval

---