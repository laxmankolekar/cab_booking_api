/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cab', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cab_info: {
            type: DataTypes.JSONB,
            field: 'cab_info',
            allowNull: false,
            defaultValue: "{}"
        },
        current_latitude: {
            type: DataTypes.FLOAT(53),
            field: 'current_latitude',
            allowNull: true
        },
        current_longitude: {
            type: DataTypes.FLOAT(53),
            field: 'current_longitude',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'cab',
        timestamps: false,
        classMethods: {
            associate: function(model) {
                const Cab = model.Cab;
                const CabBooking = model.CabBooking;
                const User = model.User;

                Cab.hasMany(CabBooking, {
                    as: 'CabBookingCabs',
                    foreignKey: 'cab_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

                Cab.belongsToMany(User, {
                    as: 'CabBookingUsers',
                    through: CabBooking,
                    foreignKey: 'cab_id',
                    otherKey: 'user_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

            }
        }
    });
};
