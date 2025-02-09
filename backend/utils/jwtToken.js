export const generateToken = (user, message, statusCode, res) => {
    // Generate the token
    const token = user.generateJsonWebToken();

    console.log(token)

    // Convert the Mongoose document into a plain JavaScript object
    user = user.toObject();

    // Remove the password from the user object
    delete user.password;

    // Set cookieName based on the role
    let cookieName;
    if (user.role === 'client') {
        cookieName = "clientToken";
    } else if (user.role === 'technician') {
        cookieName = "technicianToken";
    } else if (user.role === 'admin') {
        cookieName = "adminToken";
    } 

    // Send the response with the token and user details (without password)
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }).json({
        success: true,
        message,
        user,
        token
    });
}
