module.exports = function(sequelize, dataTypes) {

    let alias = "User_Meme";

    let cols = {
        id:{
            type: dataTypes.INTEGER, 
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        id_user:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        meme_location: {
            type: dataTypes.STRING,
            allowNull: false
        }

    };

    let config = {
        tableName: "user_memes",
        timestamps: false
    }

    let User_Meme = sequelize.define(alias, cols, config);

    User_Meme.associate = function(models) {
            User_Meme.belongsTo(models.User, {
                    as: "user_meme",
                    foreignKey: "id_user"
            })
    }

    return User_Meme;}