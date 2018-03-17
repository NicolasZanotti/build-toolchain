const env = process.env.NODE_ENV || 'production';
const isDev = env === 'development' || env === 'dev';

module.exports = {
	isWatching: false,
	isDev,
	toString() {
		return `Environment set to '${env}'`;
	}
}
