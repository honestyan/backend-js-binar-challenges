const express = require("express");
const router = express.Router();
const c = require("../controllers");
const mid = require("../helpers/middleware");

router.post("/auth/register", c.auth.register);
router.post("/auth/login", c.auth.login);
router.put("/auth/changePassword", mid.mustLogin, c.auth.changePassword);
router.delete("/auth/deleteAccount", mid.mustLogin, c.auth.deleteAccount);
router.get("/detail/", mid.mustLogin, c.auth.getUserBiodataHistory);

router.get(
  "/admin/getAllUserDetail/",
  mid.mustAdmin,
  c.auth.getAllUserBiodataHistory
);
router.get(
  "/admin/getAllUserDetail/:id",
  mid.mustAdmin,
  c.auth.getUserBiodataHistoryById
);
router.post("/admin/login", c.auth.adminLogin);
// router.post("/admin/auth/register", c.auth.adminAdd);

router.post("/biodata", mid.mustLogin, c.biodata.addBiodata);
router.put("/biodata", mid.mustLogin, c.biodata.editBiodata);
router.get("/biodata", mid.mustLogin, c.biodata.getBiodata);

router.post("/history", mid.mustLogin, c.history.addRecord);

module.exports = router;
