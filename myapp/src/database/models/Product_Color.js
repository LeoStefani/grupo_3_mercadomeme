module.exports = function(sequelize, dataTypes) {

        let alias = "Product_Color";
    
        let cols = {
            id:{
                type: dataTypes.INTEGER, 
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            id_product:{
                type: dataTypes.INTEGER,
                notNull: true
            } ,
            id_color:{
                type: dataTypes.INTEGER,
                notNull: true
            },
            status:{
                type: dataTypes.INTEGER,
                notNull: true
            }  
        };
    
        let config = {
            tableName: "product_color",
            timestamps: false
        }
    
        let Product_Color = sequelize.define(alias, cols, config);
    
        return Product_Color;
    
    }