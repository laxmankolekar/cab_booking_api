'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			first_name: {
				type: Sequelize.STRING,
				defaultValue: ""
			},
			last_name: {
				type: Sequelize.STRING,
				defaultValue: ""
			},
			profile_image_url: {
				type: Sequelize.STRING,
				defaultValue: ""
			},
			mobile_number: {
				type: Sequelize.STRING,
				defaultValue: ""
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM,
				field: 'status',
				values: ['active', 'inactive'],
				defaultValue: 'active',
			}
		}).then(() => {
			return queryInterface.createTable('refresh_token', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				user_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'users',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				refresh_token: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				status: {
					type: Sequelize.ENUM,
					field: 'status',
					values: ['active', 'inactive'],
					defaultValue: 'active',
				},
			})
		}).then(() => {
			return queryInterface.createTable('cab', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				cab_info: {
					type: Sequelize.JSONB,
					allowNull: false,
					defaultValue: {},

				},
				current_latitude: {
					type: Sequelize.DOUBLE,
					allowNull: true,
					defaultValue: null
				},
				current_longitude: {
					type: Sequelize.DOUBLE,
					allowNull: true,
					defaultValue: null
				}
			})
		}).then(() => {
			return queryInterface.createTable('cab_booking', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				user_id: {
					type: Sequelize.INTEGER,
					references: {
						model: 'users',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				cab_id: {
					type: Sequelize.INTEGER,
					references: {
						model: 'cab',
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				pickup_info: {
					type: Sequelize.JSONB,
					field: 'pickup_info',
					defaultValue: {},
				},
				drop_info: {
					type: Sequelize.JSONB,
					field: 'drop_info',
					defaultValue: {},
				},
				status: {
					type: Sequelize.ENUM,
					field: 'status',
					values: ['pending', 'inprogress', 'done', 'cancel'],
					defaultValue: 'pending',
				},
			})
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropAllTables().then(() => {
			return queryInterface.dropAllEnums();
		})
	},
};
