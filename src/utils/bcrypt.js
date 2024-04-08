const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de hashing


async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error al hashear la contraseña');
    }
}


async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error al comparar contraseñas');
    }
}

module.exports = { hashPassword, comparePassword };
