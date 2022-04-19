/* eslint-disable @typescript-eslint/no-var-requires */
// Load node modules
const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

// Configure Angular `environment.ts` file path
const environment = argv.environment;
const isProduction = environment === 'prod';
if (isProduction) {
	const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;

	// `environment.ts` file structure
	const envConfigFile = `export const environment = {
		production: ${process.env['PRODUCTION']},
		firebase: {
			apiKey: '${process.env['API_KEY']}',
			authDomain: '${process.env['AUTH_DOMAIN']}',
			databaseURL: '${process.env['DATABASE_URL']}',
			projectId: '${process.env['PROJECT_ID']}',
			appId: '${process.env['APP_ID']}',
		},
	};
	`;
	console.log('==================================================================== \n');
	console.log('The file `environment.ts` will be written with the following content: \n');
	// console.log(colors.grey(envConfigFile));
	writeFile(targetPath, envConfigFile, function (err: any) {
		if (err) {
			throw console.error(err);
		} else {
			console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
		}
		console.log('==================================================================== \n');
	});
}
