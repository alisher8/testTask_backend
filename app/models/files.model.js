module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define("files", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      size: {
        type: DataTypes.BLOB("long"),
      }
    });
  
    return File;
  };