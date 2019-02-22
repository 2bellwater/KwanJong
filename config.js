module.exports = {
	server_port: 3000,
	db_url: 'mongodb://test02:whdtn8083@ds341825.mlab.com:41825/heroku_8th5xkn2',
	db_schemas: [
	    {file:'./user_schema', collection:'users5', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [
	]
}