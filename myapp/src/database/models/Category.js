module.exports = function(sequelize, dataTypes) {

        let alias = "Category";
    
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
            tableName: "categories",
            timestamps: false
        }
    
        let Category = sequelize.define(alias, cols, config);

        Category.associate = function(models) {
                Category.hasMany(models.Products, {
                        as: "products",
                        foreignKey: "id_category"
                })
        }
    
        return Category;
    
    }