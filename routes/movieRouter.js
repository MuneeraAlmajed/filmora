const express =require("express");

const router = express.Router();

const movieCtrl = require("../controllers/movieCtrl");

router.get("/",movieCtrl.index);
router.get("/search",movieCtrl.searchMovies);
router.post("/add",movieCtrl.addNewMovie);
router.get("/new",movieCtrl.newMovie);
router.post("/",movieCtrl.createMovie);
router.get("/:movieId",movieCtrl.showMovie);
router.get("/:movieId/edit",movieCtrl.editMovie);
router.put("/:movieId",movieCtrl.updateMovie);
router.delete("/:movieId",movieCtrl.deleteMovie);


module.exports = router;