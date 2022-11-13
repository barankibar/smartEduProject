const roleChecker = (roles) => {
    return (req, res ,next) => {
        const userRole = req.body.role;
        console.log(userRole);
        if(roles.includes(userRole)) {
            next();
        }
        else {
            return res.status(401).send("Denied");
        }
    }
}


module.exports = {roleChecker};