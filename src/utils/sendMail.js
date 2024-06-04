const crypto = require("crypto");
const UserModel = require("../models/user.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});
exports.sendPasswordResetEmail = async (to) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expirationTime = Date.now() + 3600000; // 1 hora en milisegundos

    // Encuentra al usuario y guarda el token y el tiempo de expiración
    const user = await UserModel.findOneAndUpdate(
      { email: to },
      {
        resetPasswordToken: token,
        resetPasswordExpires: expirationTime,
      },
      { new: true }
    );

    if (!user) {
      throw new Error(
        "No se encontró ningún usuario con ese correo electrónico."
      );
    }

    const resetUrl = `http://localhost:9090/session/cambiar-contrasena?token=${token}`;

    await transporter.sendMail({
      from: {
        name: "Aerolíneas Argentinas",
        address: "maxi21498@gmail.com",
      },
      to,
      subject: "Recuperación de contraseña",
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetUrl}. Este enlace es válido por 1 hora.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0044cc;">Recuperación de contraseña</h2>
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>Aerolíneas Argentinas</strong>.</p>
          <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #0044cc; text-decoration: none; border-radius: 5px;">
              Restablecer contraseña
            </a>
          </p>
          <p>Si no solicitaste este cambio, puedes ignorar este correo. Este enlace es válido por 1 hora.</p>
          <p>Gracias,</p>
          <p>El equipo de Aerolíneas Argentinas</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">Este es un correo generado automáticamente, por favor no respondas a este mensaje.</p>
        </div>
      `,
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
