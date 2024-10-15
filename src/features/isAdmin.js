

export const isAdmin = (req,res,next)=> {
        console.log(req.user)
        let roles = ['admin'];
        if(!roles.includes(req.user.role)){
           return res.status(401).send({message: "Unauthorized"})
        }
        next()
}
