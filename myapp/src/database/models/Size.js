module.exports = function(sequelize, dataTypes) {

        let alias = "Size";
    
        let cols = {
            id:{
                type: dataTypes.INTEGER, 
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            tag:{
                type: dataTypes.STRING,
                allowNull: false,
                validate: {
                        notNull: { msg: 'Este campo no puede quedar vacío.'}
                    }  
            },
            size_main:{
                type: dataTypes.INTEGER,
                allowNull: false,
                unsigned: true,
                validate: {
                    notNull: { msg: 'Este campo no puede quedar vacío.'}
                }  
            },
            size_secondary:{
                type: dataTypes.INTEGER,
                unsigned: true
            },
            id_product_size: {
                type: dataTypes.INTEGER,
                allowNull: false
            }
        };
    
        let config = {
            tableName: "sizes",
            timestamps: false
        }
    
        let Size = sequelize.define(alias, cols, config);

        Size.associate = function(models) {
                Size.belongsTo(models.Products, {
                        as: "products",
                        foreignKey: "id_product_size"
                })
        }
    
        return Size;
    
    }