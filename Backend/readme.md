this are the all test cases: 


✅ Testing Checklist
Test all scenarios:
Registration Tests

 Register with valid data → Success (201)
 Register with duplicate email → Error (400)
 Register with duplicate mobile → Error (400)
 Register with invalid email format → Error (400)
 Register with short password (< 6 chars) → Error (400)
 Register without required fields → Error (400)

Login Tests

 Login with correct credentials → Success (200)
 Login with wrong password → Error (401)
 Login with non-existent email → Error (401)
 Login without email → Error (400)
 Login without password → Error (400)

Protected Route Tests

 Access /api/auth/me without token → Error (401)
 Access /api/auth/me with invalid token → Error (401)
 Access /api/auth/me with valid token → Success (200)

Update Profile Tests

 Update with valid data → Success (200)
 Update without token → Error (401)
 Update with invalid mobile format → Error (400)

Change Password Tests

 Change with correct current password → Success (200)
 Change with wrong current password → Error (401)
 Change without token → Error (401)

Password Reset Tests

 Forgot password with valid email → Success (200)
 Forgot password with invalid email → Error (404)
 Reset password with valid token → Success (200)
 Reset password with expired token → Error (400)
 Reset password with invalid token → Error (400)