const express = require("express"),
    _ = require("lodash"),
    moment = require("moment"),
    jwt = require("jwt-simple"),
    config = require("../../config/subporter.config"),
    authenticate = require("../middleware/authenticate"),
    admin = require("../middleware/admin"),
    bodyValidator = require("../helpers/bodyValidator"),
    User = require("../models/Users");

let router = express.Router();

/* Register */
router.post("/register", function(req, res) {
    if (Object.keys(req.body).length !== 5 || bodyValidator(req.body.username, req.body.email, req.body.password, req.body.name, req.body.firstname)) {
        res.json({
            info: "Please supply all required fields",
            success: false
        });
    } else {
        User.addUser(req.body, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during creating user, e-mail or username may be already in use or they may be some validation errors",
                    success: false,
                    error: err
                });
            } else {
                let expires = moment().add(7, "days").unix();
                let token = jwt.encode({
                    email: user.email,
                    exp: expires
                }, config.jwt_secret);
                res.json({
                    info: "User created successfully",
                    success: true,
                    token: token,
                    expires: moment().add(7, "days").format("dddd, MMMM Do YYYY, h:mm:ss")
                });
            }
        });
    }
});

/* Login */
router.post("/login", function(req, res) {
    if (Object.keys(req.body).length !== 2 || bodyValidator(req.body.email, req.body.password)) {
        res.json({
            info: "Please supply all required fields",
            success: false
        });
    } else {
        User.getUserByEmailForLogin(req.body.email, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err
                });
            } else if (user) {
                user.comparePassword(req.body.password, user.password, function(err, isMatch) {
                    if (err || !isMatch) {
                        res.json({
                            info: "Error during login, wrong password",
                            success: false
                        });
                    } else {
                        let expires = moment().add(7, "days").unix();
                        let token = jwt.encode({
                            email: user.email,
                            exp: expires
                        }, config.jwt_secret);
                        res.json({
                            info: "Logged in successfully",
                            success: true,
                            token: token,
                            expires: moment().add(7, "days").format("dddd, MMMM Do YYYY, h:mm:ss")
                        });
                    }
                });
            } else {
                res.json({
                    info: "User not found",
                    success: false
                });
            }
        });
    }
});

/* Update username */
router.post("/update/username", authenticate, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.username)) {
            res.json({
                info: "Please supply a username",
                success: false
            });
        } else {
            User.getUserByEmail(req.jwtUser.email, function(err, user) {
                if (err) {
                    res.json({
                        info: "Error during reading user",
                        success: false,
                        error: err
                    });
                } else if (user) {
                    User.updateCrucial(user, req.body, function(err) {
                        if (err) {
                            res.json({
                                info: "Error during updating username",
                                success: false,
                                error: err
                            });
                        } else {
                            res.json({
                                info: "Username updated successfully",
                                success: true
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "User not found",
                        success: false,
                    });
                }
            });
        }
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Update email */
router.post("/update/email", authenticate, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.email)) {
            res.json({
                info: "Please supply an email",
                success: false
            });
        } else {
            User.getUserByEmail(req.jwtUser.email, function(err, user) {
                if (err) {
                    res.json({
                        info: "Error during reading user",
                        success: false,
                        error: err
                    });
                } else if (user) {
                    User.updateCrucial(user, req.body, function(err) {
                        if (err) {
                            res.json({
                                info: "Error during updating email",
                                success: false,
                                error: err
                            });
                        } else {
                            let expires = moment().add(7, "days").unix();
                            let token = jwt.encode({
                                email: user.email,
                                exp: expires
                            }, config.jwt_secret);
                            res.json({
                                info: "Email updated successfully",
                                success: true,
                                token: token,
                                expires: moment().add(7, "days").format("dddd, MMMM Do YYYY, h:mm:ss")
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "User not found",
                        success: false,
                    });
                }
            });
        }
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Update password */
router.post("/update/password", authenticate, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 2 || bodyValidator(req.body.old_password, req.body.new_password)) {
            res.json({
                info: "Please supply a password",
                success: false
            });
        } else {
            User.getUserByEmailForLogin(req.jwtUser.email, function(err, user) {
                if (err) {
                    res.json({
                        info: "Error during reading user",
                        success: false,
                        error: err
                    });
                } else if (user) {
                    user.comparePassword(req.body.old_password, user.password, function(err) {
                        if (err) {
                            res.json({
                                info: "Error during updating password, wrong old password",
                                success: false
                            });
                        } else {
                            req.body.password = req.body.new_password;
                            User.updateCrucial(user, req.body, function(err) {
                                if (err) {
                                    res.json({
                                        info: "Error during updating password",
                                        success: false,
                                        error: err
                                    });
                                } else {
                                    res.json({
                                        info: "Password updated successfully",
                                        success: true
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "User not found",
                        success: false,
                    });
                }
            });
        }
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Check email */
router.post("/check/email", function(req, res) {
    if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.email)) {
        res.json({
            info: "Please supply an email",
            success: false
        });
    } else {
        User.getUserByEmail(req.body.email, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err
                });
            } else if (user) {
                res.json({
                    info: "User with this email already exists",
                    success: true,
                    found: true
                });
            } else {
                res.json({
                    info: "User not found",
                    success: true,
                    found: false
                });
            }
        });
    }
});

/* Check username */
router.post("/check/username", function(req, res) {
    if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.username)) {
        res.json({
            info: "Please supply a username",
            success: false
        });
    } else {
        User.getUserByUsername(req.body.username, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err
                });
            } else if (user) {
                res.json({
                    info: "User with this username already exists",
                    success: true,
                    found: true
                });
            } else {
                res.json({
                    info: "User not found",
                    success: true,
                    found: false
                });
            }
        });
    }
});

/* Check admin */
router.get("/check/admin", authenticate, admin, function(req, res) {
    if (req.granted) {
        res.status(200);
        res.json({
            info: "Authorized",
            success: true
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

module.exports = router;