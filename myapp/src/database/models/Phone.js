module.exports = function(sequelize, dataTypes) {

    let alias = "Phone";

    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED, 
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        id_user_phone:{
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        phone_number: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };

    let config = {
        tableName: "phones",
        timestamps: false
    }

    let Phone = sequelize.define(alias, cols, config);

    Phone.associate = function(models) {
            Phone.belongsTo(models.User, {
                    as: "phone",
                    foreignKey: "id_user_phone"
            })
    }

    return Phone;}