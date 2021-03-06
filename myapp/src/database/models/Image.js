module.exports = function(sequelize, dataTypes) {

        let alias = "Image";
    
        let cols = {
            id:{
                type: dataTypes.INTEGER, 
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name:{
                type: dataTypes.STRING,
                allowNull: false
            },
            id_product_image: {
                type: dataTypes.INTEGER,
                allowNull: false
            }
        };
    
        let config = {
            tableName: "images",
            timestamps: false
        }
    
        let Image = sequelize.define(alias, cols, config);

        Image.associate = function(models) {
                Image.belongsTo(models.Product, {
                        as: "products",
                        foreignKey: "id_product_image"
                })
        }
    
        return Image;
    
    }