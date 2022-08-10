const express = require("express");

const router = express.Router();

const userContoller = require("../controllers/user");

router.get("/", userContoller.getIndex);

router.get("/blogs", userContoller.getBlogs);
router.get("/blogs/:blogId", userContoller.getBlogDetails);

router.get("/favourites", userContoller.getFavourites);
router.post("/favourites", userContoller.postFavourites);

router.post("/delete-favourite-item", userContoller.postDeleteFavourite);

router.post("/add-comment", userContoller.postAddComment);
router.post("/delete-comment", userContoller.postDeleteComment)

module.exports = router;
