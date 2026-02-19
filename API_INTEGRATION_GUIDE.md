# API Integration Guide - BoatCheckPro Frontend

This guide helps backend developers understand the API contracts expected by the frontend.

## 🔗 API Base URL Configuration

Update the environment variables:

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.boatcheckpro.com
```

## 📚 API Endpoints Expected by Frontend

### Authentication

#### POST /api/auth/login
**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "boat-owner"
  },
  "token": "jwt_token_here"
}
```

#### POST /api/auth/register
**Request**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "boat-owner|technician|insurance-agent"
}
```

**Response**: Same as login

#### POST /api/auth/logout
**Request**: Headers with Authorization token
**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Inspections

#### GET /api/inspections
**Headers**: `Authorization: Bearer {token}`

**Query Parameters**:
- `status`: "completed|scheduled|in-progress"
- `limit`: number (default: 10)
- `offset`: number (default: 0)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "boatName": "Sea Breeze",
      "boatType": "sailboat",
      "length": "35ft",
      "status": "completed",
      "date": "2026-02-15T00:00:00Z",
      "price": 499,
      "technician": "Captain James Mitchell",
      "technician_id": "uuid",
      "report_url": "https://..."
    }
  ],
  "total": 3
}
```

#### POST /api/inspections
**Headers**: `Authorization: Bearer {token}`

**Request**:
```json
{
  "boatName": "Ocean Spirit",
  "boatType": "motor-yacht",
  "length": "45",
  "year": "2015",
  "builder": "Azimut",
  "inspectionType": "full|basic|pre-purchase|insurance|maintenance",
  "location": "Marina Bay",
  "preferredDate": "2026-02-25",
  "notes": "Check engine carefully"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "pending",
    "estimatedPrice": 499
  }
}
```

#### GET /api/inspections/:id
**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "boatName": "Sea Breeze",
    "boatType": "sailboat",
    "length": "35ft",
    "year": "2018",
    "builder": "Beneteau",
    "status": "completed",
    "date": "2026-02-15",
    "technician": "Captain James Mitchell",
    "technician_id": "uuid",
    "report_url": "https://...",
    "findings": "...",
    "price": 499
  }
}
```

#### PATCH /api/inspections/:id
**Headers**: `Authorization: Bearer {token}`

**Request** (partial updates):
```json
{
  "status": "scheduled|in-progress|completed|cancelled",
  "preferredDate": "2026-02-25",
  "notes": "Updated notes"
}
```

### Technicians

#### GET /api/technicians
**Query Parameters**:
- `specialization`: "sailboat|motor-yacht|speedboat|all"
- `location`: city/region
- `rating_min`: minimum rating (4.0)
- `limit`: 10
- `offset`: 0

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Captain James Mitchell",
      "title": "Senior Marine Inspector",
      "location": "Marina Bay District",
      "rating": 4.9,
      "reviewCount": 127,
      "experience": "15+ years",
      "inspections": 2034,
      "specialties": ["sailboat", "motor-yacht"],
      "languages": ["English", "Spanish"],
      "hourlyRate": 150
    }
  ],
  "total": 50
}
```

#### GET /api/technicians/:id
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Captain James Mitchell",
    "title": "Senior Marine Inspector",
    "location": "Marina Bay District",
    "rating": 4.9,
    "reviewCount": 127,
    "experience": "15+ years",
    "inspections": 2034,
    "responseTime": "2 hours",
    "certifications": ["ABYC Certified", "Marine Surveyor"],
    "languages": ["English", "Spanish"],
    "bio": "With over 15 years...",
    "specialties": ["sailboat", "motor-yacht"],
    "hourlyRate": 150,
    "availability": {
      "monday": { "available": true, "slots": 3 },
      "tuesday": { "available": true, "slots": 2 }
    },
    "reviews": [
      {
        "id": "uuid",
        "author": "Sarah Chen",
        "rating": 5,
        "date": "2026-02-01",
        "text": "Excellent service!"
      }
    ]
  }
}
```

### Scheduling/Appointments

#### GET /api/availability/:technicianId
**Query Parameters**:
- `startDate`: ISO date
- `endDate`: ISO date

**Response**:
```json
{
  "success": true,
  "data": {
    "technician_id": "uuid",
    "available_dates": [
      {
        "date": "2026-02-20",
        "slots": ["09:00", "11:00", "13:00", "15:00"]
      }
    ],
    "booked_dates": ["2026-02-15", "2026-02-18"]
  }
}
```

#### POST /api/appointments
**Headers**: `Authorization: Bearer {token}`

**Request**:
```json
{
  "inspection_id": "uuid",
  "technician_id": "uuid",
  "date": "2026-02-20",
  "time": "10:00"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "inspection_id": "uuid",
    "technician_id": "uuid",
    "date": "2026-02-20",
    "time": "10:00",
    "status": "confirmed",
    "confirmationCode": "BC-20260220-1234"
  }
}
```

#### GET /api/appointments
**Headers**: `Authorization: Bearer {token}`

**Query Parameters**:
- `status`: "scheduled|completed|cancelled"
- `limit`: 10

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "boatName": "Ocean Spirit",
      "date": "2026-02-20",
      "time": "10:00",
      "location": "Marina Bay",
      "technician": "Captain James Mitchell",
      "technician_id": "uuid",
      "status": "confirmed",
      "confirmationCode": "BC-20260220-1234"
    }
  ]
}
```

### Dashboard Stats

#### GET /api/dashboard/stats
**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "success": true,
  "data": {
    "totalInspections": 3,
    "completedInspections": 1,
    "totalSpent": 1547,
    "averageTime": 4.5
  }
}
```

## 🔐 Authentication Headers

All protected endpoints require:

```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

## ⚠️ Error Response Format

**Standard Error Response**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      {
        "field": "email",
        "message": "Email must be valid"
      }
    ]
  }
}
```

**HTTP Status Codes**:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (duplicate entry)
- 500: Server Error

## 🔄 Frontend State Management Pattern

The frontend expects a pattern for API integration:

```typescript
// Example hook pattern
const fetchInspections = async () => {
  const response = await fetch('/api/inspections', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data.data
}
```

## 📋 Required Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.boatcheckpro.com
NEXT_PUBLIC_APP_NAME=BoatCheckPro
NEXT_PUBLIC_APP_URL=https://boatcheckpro.com
```

## 🧪 Testing Endpoints

### Mock Authentication Token
Use this format for development:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Test Credentials (Development Only)
```
Email: demo@boatcheckpro.com
Password: Demo123!
```

## 📱 Rate Limiting

Expected rate limits:
- 60 requests per minute for authenticated users
- 10 requests per minute for unauthenticated endpoints

## 🔄 Pagination

All list endpoints support pagination:

**Query Parameters**:
- `limit`: Default 10, Max 100
- `offset`: Default 0

**Response**:
```json
{
  "data": [],
  "total": 150,
  "limit": 10,
  "offset": 0
}
```

## 📧 Email Templates (Backend Task)

Email confirmations should be sent for:
- User registration
- Inspection confirmation
- Appointment scheduled
- Inspection report ready
- Status updates

## 🔔 Notifications (Future)

Plan for WebSocket/real-time updates:
- Inspection status changes
- Message from technician
- Appointment reminders (24h before)
- Report ready notification

## 📞 Support

For integration questions:
- Email: dev@boatcheckpro.com
- Check frontend code in `/src` directory for usage examples
- Reference actual component implementations in `/src/app` pages

---

**Last Updated**: February 19, 2026
**API Version**: 1.0
