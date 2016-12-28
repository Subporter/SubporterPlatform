const express = require("express"),
	authenticate = require("../middleware/authenticate"),
	admin = require("../middleware/admin"),
	bodyValidator = require("../helpers/bodyValidator"),
	Subscription = require("../models/Subscriptions");

let router = express.Router();

/* Create */
router.post("/subscriptions", authenticate, function (req, res) {
	if (req.granted) {
		if (Object.keys(req.body).length !== 2 || bodyValidator(req.body.place, req.body.team)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
			Subscription.addSubscription(req.body, function (err) {
				if (err) {
					res.json({
						info: "Error during creating subscription",
						success: false,
						error: err
					});
				} else {
					res.json({
						info: "Subscription created succesfully",
						success: true
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

/* Read (all subscriptions) */
router.get("/subscriptions", authenticate, function (req, res) {
	if (req.granted) {
		Subscription.getSubscriptions(function(err, subscriptions) {
			if (err) {
				res.json({
					info: "Error during reading subscriptions",
					success: false,
					error: err
				});
			} else if (subscriptions) {
				res.json({
					info: "Subscriptions found succesfully",
					success: true,
					data: subscriptions
				});
			} else {
                res.json({
                    info: "Subscriptions not found",
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

router.get("/subscriptions/team/:team", authenticate, function (req, res) {
	if (req.granted) {
        Subscription.getSubscriptionsByTeam(req.params.team, function(err, subscriptions) {
            if (err) {
                res.json({
                    info: "Error during reading subscriptions",
                    success: false,
                    error: err
                });
            } else if (subscriptions) {
				res.json({
					info: "Subscriptions found succesfully",
					success: true,
					data: subscriptions
				});
			} else {
                res.json({
                    info: "Subscriptions not found",
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

/* Read (one subscription) */
router.get("/subscriptions/:id", authenticate, function (req, res) {
	if (req.granted) {
        Subscription.getSubscriptionById(req.params.id, function(err, subscription) {
            if (err) {
                res.json({
                    info: "Error during reading subscription",
                    success: false,
                    error: err
                });
            } else if (subscription) {
                res.json({
                    info: "Subscription found succesfully",
                    success: true,
                    data: subscription
                });
            } else {
				res.json({
                    info: "Subscription not found",
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
router.put("/subscriptions/:id", authenticate, function (req, res) {
	if (req.granted) {
		if (Object.keys(req.body).length !== 2 || bodyValidator(req.body.place, req.body.team)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
			Subscription.getSubscriptionById(req.params.id, function (err, subscription) {
				if (err) {
                    res.json({
                        info: "Error during reading subscription",
                        success: false,
                        error: err
                    });
                } else if (subscription) {
                    Subscription.updateSubscription(subscription, req.body, function (err) {
                        if (err) {
                            res.json({
                                info: "Error during updating subscription",
                                success: false,
                                error: err
                            });
                        } else {
                            res.json({
                                info: "Subscription updated succesfully",
                                success: true
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "Subscription not found",
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
router.delete("/subscriptions/:id", authenticate, function (req, res) {
	if (req.granted) {
        Subscription.deleteSubscription(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting subscription",
                    success: false,
                    error: err
                });
            } else {
                res.json({
                    info: "Subscription deleted succesfully",
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