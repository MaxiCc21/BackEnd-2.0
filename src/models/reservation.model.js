const { default: mongoose, Schema } = require("mongoose");

const reservationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    require: true,
    enum: ["masculino", "femenino", "otro"],
  },
  docType: {
    type: String,
    enum: ["DNI", "pasaporte"],
    required: true,
  },
  docNumber: {
    type: String,
    required: true,
  },
  CountryOfIssue: {
    type: String,
    require: true,
  },
  flightDay: {
    type: String,
    require: true,
  },
  flightPrice: {
    type: String,
    require: true,
  },
  shortCode: {
    type: String,
    // unique: true,
    // required: true,
  },
  email: {
    type: String,
    require: true,
  },
});

async function generateShortCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";

  let code = "";
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  for (let i = 0; i < 2; i++) {
    code += nums.charAt(Math.floor(Math.random() * nums.length));
  }

  return code;
}

reservationSchema.pre("save", async function (next) {
  if (!this.shortCode) {
    let shortCode = await generateShortCode();
    this.shortCode = shortCode;
  }
  next();
});

const reservationModel = mongoose.model("reservation", reservationSchema);

module.exports = reservationModel;
