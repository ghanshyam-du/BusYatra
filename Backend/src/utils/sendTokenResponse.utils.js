const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  // Create token
  const token = user.getSignedJwtToken();

  // Determine redirect based on role
  let redirectUrl;
  switch (user.role?.toUpperCase()) {
    case 'CUSTOMER':
      redirectUrl = '/customer/dashboard';
      break;
    case 'TRAVELER':
      redirectUrl = '/traveler/dashboard';
      break;
    case 'ADMIN':
      redirectUrl = '/admin/dashboard';
      break;
    default:
      redirectUrl = '/dashboard';
  }

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
      is_active: user.is_active
    },
    redirect: redirectUrl
  });
};

export default sendTokenResponse;