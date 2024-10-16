

export const giveToken = (user, statusCode, res) => {
     console.log('give fn called')
     const token = user.jwtToken();
     console.log(token)
     res.status(statusCode).cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 1000 * 24 * 7,
      sameSite: 'None',
      secure: true 
    }).send({ message: "success", user, token });
    
}