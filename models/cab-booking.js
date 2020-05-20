/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CabBooking', {
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
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        cab_id: {
            type: DataTypes.INTEGER,
            field: 'cab_id',
            allowNull: true,
            references: {
                model: 'cab',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        pickup_info: {
            type: DataTypes.JSONB,
            field: 'pickup_info',
            allowNull: true,
            defaultValue: "{}"
        },
        drop_info: {
            type: DataTypes.JSONB,
            field: 'drop_info',
            allowNull: true,
            defaultValue: "{}"
        },
        status: {
            type: DataTypes.ENUM("pending", "inprogress", "done", "cancel"),
            field: 'status',
            allowNull: true,
            defaultValue: "pending"
        }
    }, {
        schema: 'public',
        tableName: 'cab_booking',
        timestamps: false,
        classMethods: {
            associate: function(model) {
                const CabBooking = model.CabBooking;
                const Cab = model.Cab;
                const User = model.User;

                CabBooking.belongsTo(Cab, {
                    as: 'Cab',
                    foreignKey: 'cab_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

                CabBooking.belongsTo(User, {
                    as: 'User',
                    foreignKey: 'user_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

            }
        }
    });
};
