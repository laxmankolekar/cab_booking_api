/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RefreshToken', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        refresh_token: {
            type: DataTypes.STRING(255),
            field: 'refresh_token',
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            field: 'status',
            allowNull: true,
            defaultValue: "active"
        }
    }, {
        schema: 'public',
        tableName: 'refresh_token',
        timestamps: false,
        classMethods: {
            associate: function(model) {
                const RefreshToken = model.RefreshToken;
                const User = model.User;

                RefreshToken.belongsTo(User, {
                    as: 'User',
                    foreignKey: 'user_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

            }
        }
    });
};
