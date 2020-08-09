module.exports = function(sequelize, dataTypes) {

        let alias = "Color";
    
        let cols = {
            id:{
                type: dataTypes.INTEGER, 
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name:{
                type: dataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    message: 'El nombre del color ya existe',
                //     fields: [sequelize.fn('lower', sequelize.col('name'))]
                },
                validate: {
                    notNull: { msg: 'El campo "nombre" no puede quedar vacío.'},
                    notEmpty: { msg: 'El campo "nombre" no puede quedar vacío.'}
                } 
            },
            code:{
                type: dataTypes.STRING,
                notNull: true,
                validate: {
                        notNull: { msg: 'El campo "código" no puede quedar vacío.'},
                        notEmpty: { msg: 'El campo "código" no puede quedar vacío.'}
                    }
            }           
        };
    
        let config = {
            tableName: "colors",
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['name']
                }
            ]
        }
    
        let Color = sequelize.define(alias, cols, config);

        Color.associate = function(models) {
                Color.belongsToMany(models.Products, {
                        as: "Products",
                        through: "product_color",
                        foreignKey: "id_color",
                        otherKey: "id_product",
                        timestamps: false
                })
        }
    
        return Color;
    
    }