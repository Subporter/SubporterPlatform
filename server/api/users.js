const express = require('express'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    config = require('../../config/subporter.config'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    bodyValidator = require('../helpers/bodyValidator'),
    User = require('../models/Users'),
    Address = require('../models/Addresses');

let router = express.Router();

/* Read (all users) */
router.get("/users/all", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.getUsers(function(err, users) {
            if (err) {
                res.json({
                    info: "Error during reading users",
                    success: false,
                    error: err.errmsg
                });
            } else if (users) {
                res.json({
                    info: "Users found successfully",
                    success: true,
                    data: users
                });
            } else {
                res.json({
                    info: "Users not found",
                    success: false
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Read (one user) */
router.get("/users", authenticate, function(req, res) {
    if (req.granted) {
        User.getUserByEmail(req.jwtUser.email, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err.errmsg
                });
            } else if (user) {
                res.json({
                    info: "User found successfully",
                    success: true,
                    data: user
                });
            } else {
                res.json({
                    info: "User not found",
                    success: false
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

router.get("/users/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.getUserById(req.params.id, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err.errmsg
                });
            } else if (user) {
                res.json({
                    info: "User found successfully",
                    success: true,
                    data: user
                });
            } else {
                res.json({
                    info: "User not found",
                    success: false
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

router.get("/users/:email", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.getUserByEmail(req.params.email, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err.errmsg
                });
            } else if (user) {
                res.json({
                    info: "User found successfully",
                    success: true,
                    data: user
                });
            } else {
                res.json({
                    info: "User not found",
                    success: false
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

router.get("/users/:username", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.getUserByUsername(req.params.username, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err.errmsg
                });
            } else if (user) {
                res.json({
                    info: "User " + user.username + " found successfully",
                    success: true,
                    data: user
                });
            } else {
                res.json({
                    info: "User not found",
                    success: false
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Update */
router.put("/users", authenticate, function(req, res) {
    if (req.granted) {
        User.getUserByEmail(req.jwtUser.email, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err.errmsg
                });
            } else if (user) {
                User.updateUser(user, req.body, function(err) {
                    if (err) {
                        res.json({
                            info: "Error during updating user",
                            success: false,
                            error: err
                        });
                    } else {
                        res.json({
                            info: "User updated successfully",
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
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

router.put("/users/:username", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.getUserByUsername(req.params.username, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err.errmsg
                });
            } else if (user) {
                User.updateUser(user, req.body, function(err) {
                    if (err) {
                        res.json({
                            info: "Error during updating user",
                            success: false,
                            error: err
                        });
                    } else {
                        res.json({
                            info: "User updated successfully",
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
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
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

/* Delete */
router.delete("/users/:username", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.deleteUser(req.params.username, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting user",
                    success: false,
                    error: err
                });
            } else {
                res.json({
                    info: "User deleted succesfully",
                    success: true
                });
            }
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