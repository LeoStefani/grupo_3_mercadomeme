module.exports = function (sequelize, dataTypes) {

    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            notNull: true,
        },
        avatar: {
            type: dataTypes.STRING
        },
        first_name: {
            type: dataTypes.STRING(65)

        },
        last_name: {
            type: dataTypes.STRING
        },
        dni: {
            type: dataTypes.INTEGER,
            unique: true,
            unsigned: true,
            unique: true
        },
        
        admin: {
            type: dataTypes.INTEGER(2).UNSIGNED

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

    User.associate = function (models) {

        User.hasMany(models.Credit_Card, {
            as: "credit_cards",
            foreignKey: "id_user_credit_card"
        }), 
        User.hasMany(models.Phone, {
            as: "phones",
            foreignKey: "id_user_phone"
        }),
        User.hasMany(models.Address, {
            as: "addresses",
            foreignKey: "id_user_address"
        }),
        User.hasMany(models.User_Meme, {
            as: "user_memes",
            foreignKey: "id_user_meme"
        })


    }


    return User;

}