const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/files.controller");
const upload = require("../middleware/upload");

let routes = (app) => {
  router.post("/file/upload", upload.single("file"), uploadController.uploadFiles);
  router.get("/file/list", uploadController.getFiles);
  router.get("/file/:id", uploadController.getOneFile);
  router.get("/file/download/:id", uploadController.downloadFile);
  router.put("/file/update/:id", upload.single("file"), uploadController.updateFile);
  router.delete("/file/delete/:id", uploadController.deleteOneFile);
  return app.use("/", router);
};

module.exports = routes;