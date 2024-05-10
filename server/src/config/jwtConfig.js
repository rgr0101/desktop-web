require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
};
