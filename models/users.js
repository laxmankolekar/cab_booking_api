/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(255),
            field: 'first_name',
            allowNull: true,
            defaultValue: ""
        },
        last_name: {
            type: DataTypes.STRING(255),
            field: 'last_name',
            allowNull: true,
            defaultValue: ""
        },
        profile_image_url: {
            type: DataTypes.STRING(255),
            field: 'profile_image_url',
            allowNull: true,
            defaultValue: ""
        },
        mobile_number: {
            type: DataTypes.STRING(255),
            field: 'mobile_number',
            allowNull: true,
            defaultValue: ""
        },
        email: {
            type: DataTypes.STRING(255),
            field: 'email',
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            field: 'password',
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
        tableName: 'users',
        timestamps: false,
        classMethods: {
            associate: function(model) {
                const User = model.User;
                const CabBooking = model.CabBooking;
                const RefreshToken = model.RefreshToken;
                const Cab = model.Cab;

                User.hasMany(CabBooking, {
                    as: 'CabBookingUsers',
                    foreignKey: 'user_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

                User.hasMany(RefreshToken, {
                    as: 'RefreshTokenUsers',
                    foreignKey: 'user_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

                User.belongsToMany(Cab, {
                    as: 'CabBookingCabs',
                    through: CabBooking,
                    foreignKey: 'user_id',
                    otherKey: 'cab_id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                });

            }
        }
    });
};
