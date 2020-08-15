module.exports = function(sequelize, dataTypes) {

    let alias = "User";

    let cols = {
        id:{
            type: dataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        username:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email:{
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: dataTypes.STRING,
            notNull: true,
        },
        avatar:{
            type: dataTypes.STRING
        },
        first_name:{
            type: dataTypes.STRING
        },
        last_name:{
            type: dataTypes.STRING
        },
        dni:{
            type: dataTypes.INTEGER,
            unique: true,
            unsigned: true,
            unique: true
        },
        phone_0:{
            type: dataTypes.INTEGER,
            unsigned: true
        },
        phone_1:{
            type: dataTypes.INTEGER,
            unsigned: true
        },
        phone_2:{
            type: dataTypes.INTEGER,
            unsigned: true
        },
        credit_card_0:{
            type: dataTypes.INTEGER,
            unsigned: true
        },
        credit_card_1:{
            type: dataTypes.INTEGER,
            unsigned: true
        },
        credit_card_2:{
            type: dataTypes.INTEGER,
            unsigned: true
        },
        credit_card_3:{
            type: dataTypes.INTEGER,
            unsigned: true
        },
        address_0:{
            type: dataTypes.STRING
        },
        address_1:{
            type: dataTypes.STRING
        },
        address_2:{
            type: dataTypes.STRING
        }
        
    };

    let config = {
        tableName: "users",
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['username', 'email']
            }
        ]
    }

    let User = sequelize.define(alias, cols, config);

    return User;

}