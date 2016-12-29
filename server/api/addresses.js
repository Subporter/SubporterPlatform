const express = require('express'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    bodyValidator = require('../helpers/bodyValidator'),
    Address = require('../models/Addresses');

let router = express.Router();

/* Create */
router.post("/addresses", authenticate, admin, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 5 || bodyValidator(req.body.street, req.body.number, req.body.postal, req.body.city, req.body.country)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Address.addAddress(req.body, function(err) {
                if (err) {
                    res.json({
                        info: "Error during creating address",
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        info: "Address created succesfully",
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

/* Read (all addresses) */
router.get("/addresses", authenticate, admin, function(req, res) {
    if (req.granted) {
        Address.getAddresses(function(err, addresses) {
            if (err) {
                res.json({
                    info: "Error during reading addresses",
                    success: false,
                    error: err
                });
            } else if (addresses) {
                res.json({
                    info: "Addresses found succesfully",
                    success: true,
                    data: addresses
                });
            } else {
                res.json({
                    info: "Addresses not found",
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

/* Read (one sport) */
router.get("/addresses/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        Address.getAddressById(req.params.id, function(err, address) {
            if (err) {
                res.json({
                    info: "Error during reading address",
                    success: false,
                    error: err
                });
            } else if (address) {
                res.json({
                    info: "Address found succesfully",
                    success: true,
                    data: address
                });
            } else {
                res.json({
                    info: "Address not found",
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
router.put("/addresses/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 5 || bodyValidator(req.body.street, req.body.number, req.body.postal, req.body.city, req.body.country)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Address.getAddressById(req.params.id, function (err, address) {
                if (err) {
                    res.json({
                        info: "Error during reading address",
                        success: false,
                        error: err
                    });
                } else if (address) {
                    Address.updateAddress(address, req.body, function (err) {
                        if (err) {
                            res.json({
                                info: "Error during updating address",
                                success: false,
                                error: err
                            });
                        } else {
                            res.json({
                                info: "Address updated succesfully",
                                success: true
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "Address not found",
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
router.delete("/addresses/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        Address.deleteAddress(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting address",
                    success: false,
                    error: err
                });
            } else {
                res.json({
                    info: "Address deleted succesfully",
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