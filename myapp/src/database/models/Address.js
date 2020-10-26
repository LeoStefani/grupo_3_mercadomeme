module.exports = function(sequelize, dataTypes) {

    let alias = "Address";

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
        address_street: {
            type: dataTypes.STRING,
            allowNull: false
        },
        address_number: {
            type: dataTypes.STRING,
        },
        address_floor: {
            type: dataTypes.STRING,
        },
        address_door: {
            type: dataTypes.STRING,
        },
        address_city: {
            type: dataTypes.STRING,
        },
        address_country: {
            type: dataTypes.STRING,
        },
        address_zipcode: {
            type: dataTypes.STRING,
        },
        address_state: {
            type: dataTypes.STRING,
        }
    };

    let config = {
        tableName: "addresses",
        timestamps: false
    }

    let Address = sequelize.define(alias, cols, config);

    Address.associate = function(models) {
            Address.belongsTo(models.User, {
                    as: "address",
                    foreignKey: "id_user"
            })
    }

    return Address;}