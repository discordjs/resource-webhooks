const sapphirePrettierConfig = require('@sapphire/prettier-config');

module.exports = {
	...sapphirePrettierConfig,
	overrides: [
		{
			files: '*.svg',
			options: {
				parser: 'xml'
			}
		}
	]
};
