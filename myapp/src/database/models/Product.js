module.exports = function(sequelize, dataTypes) {

        let alias = "Product";
    
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
                    message: 'El nombre de producto ya existe',
                //     fields: [sequelize.fn('lower', sequelize.col('name'))]
                },
                validate: {
                    notNull: { msg: 'El campo "nombre" no puede quedar vacío.'},
                    notEmpty: { msg: 'El campo "nombre" no puede quedar vacío.'}
                } 
            },
            description:{
                type: dataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'El campo "descripción" no puede quedar vacío.'}
                }  
            },
            price:{
                type: dataTypes.DECIMAL,
                notNull: true,
                unsigned: true
            },
            qty_sold:{
                type: dataTypes.INTEGER,
                unsigned: true
            },
            id_category:{
                type: dataTypes.INTEGER,
                notNull: true
            },
            image_0:{
                type: dataTypes.STRING
            },
            image_1:{
                type: dataTypes.STRING
            },
            image_2:{
                type: dataTypes.STRING
            },
            image_3:{
                type: dataTypes.STRING
            },
            image_4:{
                type: dataTypes.STRING
            }            
        };
    
        let config = {
            tableName: "products",
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['name']
                }
            ]
        }
    
        let Product = sequelize.define(alias, cols, config);
    
        Product.associate = function(models) {
                Product.hasMany(models.Sizes, {
                        as: "sizes",
                        foreignKey: "id_product_size"
                })

                Product.belongsTo(models.Categories, {
                        as: "categories",
                        foreignKey: "id_category"
                })

                Product.belongsToMany(models.Colors, {
                        as: "colors",
                        through: "product_color",
                        foreignKey: "id_product",
                        otherKey: "id_color",
                        timestamps: false
                })
        }

        return Product;
    
    }