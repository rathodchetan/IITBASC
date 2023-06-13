
const services = require('../Services/Login.services');

const getLoginInfo = (req, res) => {
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    console.log(UserName, Password)
    services.getLoginInfo(UserName, Password)
        .then((result) => {
            if (result.response.status == "Success") {

                console.log("in loign")
                req.session.user = req.body.UserName;
                req.session.role = result.response;

                console.log(req.session)
                res.json({ "status": 200, "error": null, "response": 'Success' });
            }
            else {

            }
        })
        .catch((error) => {
            res.status(401).send({ "status": 401, "error": error, "response": null });
        }
        );
}

const logout = (req, res) => {
    req.session.destroy();
    res.json({ "status": 200, "error": null, "response": 'Success' });
}


module.exports = {
    getLoginInfo,
    logout
}