module.exports = function(sequelize, dataTypes) {

    let alias = "Credit_Card";

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
        number: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        expire_date: {
            type: dataTypes.DATE,
            allowNull: false
        }
    };

    let config = {
        tableName: "credit_cards",
        timestamps: false
    }

    let Credit_Card = sequelize.define(alias, cols, config);

    Credit_Card.associate = function(models) {
            Credit_Card.belongsTo(models.User, {
                    as: "credit_card",
                    foreignKey: "id_user"
            })
    }

    return Credit_Card;}