require('dotenv').config();

module.exports = {
	production: {
		use_env_variable: 'DB_URL',
		dialect: 'postgres',
		dialectOptions: {
			ssl: false
		},
		auth_client_secret:'authclientsecret',	
		search_cab_redius:1.0000000	
	},
	development: {
		use_env_variable: 'DB_URL',
		dialect: 'postgres',
		dialectOptions: {
			ssl: false
		},
		auth_client_secret:'authclientsecret',
		search_cab_redius:1.0000000		
	},
	local: {
		use_env_variable: 'DB_URL',
		dialect: 'postgres',
		dialectOptions: {
			ssl: false
		},
		auth_client_secret:'authclientsecret',
		search_cab_redius:1.0000000		
	},
	staging: {
		use_env_variable: 'DB_URL',
		dialect: 'postgres',
		dialectOptions: {
			ssl: false
		},
		auth_client_secret:'authclientsecret',	
		search_cab_redius:1.0000000	
	},
	test: {
		use_env_variable: 'DB_URL',
		dialect: 'postgres',
		dialectOptions: {
			ssl: false
		},
		auth_client_secret:'authclientsecret',	
		search_cab_redius:1.0000000	
	},
};
