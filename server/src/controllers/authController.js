const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret } = require("../config/jwtConfig");

const register = async (req, res) => {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        role: role || "user",
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
        { username: user.username, role: user.role },
        jwtSecret,
        { expiresIn: "248h" }
    );

    res.json({ token });
};

module.exports = { register, login };
