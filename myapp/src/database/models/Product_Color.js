module.exports = function(sequelize, dataTypes) {

        let alias = "Product_Color";
    
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
                validate: {
                        notNull: { msg: 'Este campo no puede quedar vacío.'}
                    }  
            },
            size_unit:{
                type: dataTypes.STRING,
                allowNull: false,
                unsigned: true,
                validate: {
                    notNull: { msg: 'Este campo no puede quedar vacío.'}
                }  
            }
        };
    
        let config = {
            tableName: "product_color",
            timestamps: false
        }
    
        let Product_Color = sequelize.define(alias, cols, config);
    
        return Product_Color;
    
    }