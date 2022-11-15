const fs = require("fs");
const db = require("../models");
const File = db.files;
var stream = require('stream');

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`Select a file`);
    }
    File.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      size: fs.readFileSync(
        __basedir + "/resources/uploads/" + req.file.filename
      ),
    }).then((file) => {
      fs.writeFileSync(
        __basedir + "/resources/tmp/" + file.name,
        file.size
      );
      return res.send(`File is uploaded`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error with file upload: ${error}`);
  }
};

const downloadFile = async (req, res) => {
  id = req.params.id;
  File.findOne({
    where: { id }
}).then(file => {
    var fileContents = Buffer.from(file.size, "base64");
    var readStream = new stream.PassThrough();
    readStream.end(fileContents);
    
    res.set('Content-disposition', 'attachment; filename=' + file.name);
    res.set('Content-Type', file.type);
  
    readStream.pipe(res);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files."
      });
    });
};

const updateFile = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`Select a file`);
    }
    File.update({
      name: req.file.filename,
      type: req.file.mimetype,
      size: fs.readFileSync(
        __basedir + "/resources/uploads/" + req.file.filename
      ) },
      { where:{ id: req.params.id } }
    ).then((file) => {
      return res.send(`File is updated`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error with file upload: ${error}`);
  }
};

const getFiles = async (req, res) => {
      File.findAll({
        attributes: [
          'id', 'name', 'type', 'createdAt'
        ]
      })
      .then(file => {
        res.send(file);
      })
      .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files."
      });
    });
  };

  const getOneFile = async (req, res) => {
    id = req.params.id;
    File.findOne({
        where: { id },
        attributes: [
            'name', 'type', 'createdAt'
          ]
    })
    .then(file => {
      res.send(file);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files."
      });
    });
};

const deleteOneFile = async (req, res) => {
    id = req.params.id;
    File.destroy({
        where: { id }
    }).then(function (deletedRecord) {
        if(deletedRecord === 1){
            res.status(200).json({message:"Deleted successfully"});          
        }
        else
        {
            res.status(404).json({message:"record not found"})
        }
    })
    .catch(function (error){
        res.status(500).json(error);
    });
};

module.exports = {
  uploadFiles, getFiles, getOneFile, deleteOneFile, downloadFile, updateFile
};