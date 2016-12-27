const express = require("express"),
    authenticate = require("../middleware/authenticate"),
    admin = require("../middleware/admin"),
	bodyValidator = require("../helpers/bodyValidator"),
	User = require("../models/Users"),
    Address = require("../models/Addresses");

let router = express.Router();

/* Read (all users) */
router.get("/users/all", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.getUsers(function(err, users) {
            if (err) {
                res.json({
                    info: "Error during reading users",
                    success: false,
                    error: err
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
                    error: err
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

router.get("/users/:username", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.getUserByUsername(req.params.username, function(err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err
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
        User.getUserByEmail(req.jwtUser.email, function (err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err
                });
            } else if (user) {
                User.updateUser(user, req.body, function (err) {
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
        User.getUserByUsername(req.params.username, function (err, user) {
            if (err) {
                res.json({
                    info: "Error during reading user",
                    success: false,
                    error: err
                });
            } else if (user) {
                User.updateUser(user, req.body, function (err) {
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

/* Delete */
router.delete("/users/:username", authenticate, admin, function(req, res) {
    if (req.granted) {
        User.deleteUser(req.params.username, function (err) {
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