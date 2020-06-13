exports.register = function (req, res) {
    // console.log("req", req.body);
    var today = new Date();
    var user = {
        "u_id": req.body.u_id,
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "phone_num": req.body.phone_num,
        "nickname": req.body.nickname,
        "created": today,
        "modified": today
    }
    connenction.query('INSERT INTO user SET ?' , user, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });
}

exports.login = function (req, res) {
    var id = req.body.id;
    var password = req.body.password;
    connection.query('SELECT * FROM user WHERE u_id = ?', [id],
    function( error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                if(results[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Id and password does not match"
                    });
                }
            } else {
                res.send({
                    "code":204,
                    "success": "Id does not exists"
                });
            }
        }
    })
}
