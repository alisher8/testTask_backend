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
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      }
    });
  
    return File;
  };