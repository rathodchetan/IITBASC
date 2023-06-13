
const checkToken = (req, res, next) => {
    // const token = req.body.token;
    const user = req.session.user;
    const role = req.session.role;
    // console.log(token)
    if (!user) {
        console.log("token not found1")
        return res.json({ err: "Access Denied" });
    }
    try {
        console.log("finding token")

        if (req.session.user) {
            console.log("token found")
            return next();
        }
    }
    catch (err) {
        if (!token) {
            console.log("token not found2")
            return res.json({ err: "Access Denied" });
        }
    }
}

module.exports = {
    checkToken
}