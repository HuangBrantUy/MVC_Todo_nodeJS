const {DataTypes} = require("sequelize");
const instance = require("../connection");

const task = instance.sequelize.define("tasks", {
    id:{
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      code: {
        type: DataTypes.STRING,
        allowNull: false
      },

      taskName: {
        type: DataTypes.STRING,
        allowNull:false
      },

      description: {
        type: DataTypes.STRING,
        allowNull:false
      },

      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull:false
      }
    },{
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "tasks"
    }
    
)



exports.model = task;