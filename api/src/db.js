const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const DoctorModel = require("./models/Doctor");
const PatientModel = require("./models/Patient");
const PaidsModel = require("./models/Paids");
const ScheduleModel = require("./models/Schedule");
const PlanModel = require("./models/Plan");
const PaymentModel = require("./models/Payment");
const SpecialityModel = require("./models/Speciality");
const TicketMedicalModel = require("./models/TicketMedical ");
const TicketAnalysislModel = require("./models/TicketAnalysis");
const UserModel = require("./models/User");
const AnalysisModel = require("./models/Analysis");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DB_DEPLOY } =
  process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

DoctorModel(sequelize);
PatientModel(sequelize);
PaidsModel(sequelize);
ScheduleModel(sequelize);
PlanModel(sequelize);
PaymentModel(sequelize);
SpecialityModel(sequelize);
TicketMedicalModel(sequelize);
TicketAnalysislModel(sequelize);
UserModel(sequelize);
AnalysisModel(sequelize);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// *En sequelize.models están todos los modelos importados como propiedades
// *Para relacionarlos hacemos un destructuring
const {
  Doctor,
  Paids,
  Patient,
  Payment,
  Plan,
  Schedule,
  Speciality,
  TicketMedical,
  TicketAnalysis,
  User,
  Analysis,
} = sequelize.models;

/// *Aca vendrian las relaciones:
// *Relaciones 1 a 1:
// ?Schedule vs TicketMedical = 1 : 1
TicketMedical.hasOne(Schedule, { onDelete: "cascade" });
Schedule.belongsTo(TicketMedical, { onDelete: "cascade" });

// *Relaciones 1 a N:
// ?Patient vs TicketMedical = 1 : N
Analysis.hasMany(TicketAnalysis);
TicketAnalysis.belongsTo(Analysis);

// *Relaciones 1 a N:
// ?Patient vs TicketMedical = 1 : N
Patient.hasMany(TicketMedical);
TicketMedical.belongsTo(Patient);

// ?TicketAnalysis vs Payment = 1 : N
Payment.hasMany(TicketAnalysis);
TicketAnalysis.belongsTo(Payment);

// ?Payment vs Paids = 1 : N
Payment.hasMany(Paids);
Paids.belongsTo(Payment);

// ?User vs Payment = 1 : N
User.hasMany(Payment);
Payment.belongsTo(User);

// ?Patient vs TicketAnalysis = 1 : N
Patient.hasMany(TicketAnalysis);
TicketAnalysis.belongsTo(Patient);

// ?Plan vs Patient = 1 : N
Plan.hasMany(Patient);
Patient.belongsTo(Plan);

// ?Plan vs User = 1 : N
Plan.hasMany(User);
User.belongsTo(Plan);

// ?User vs Paid = 1 : N
User.hasMany(Paids);
Paids.belongsTo(User);

// ?User vs Patient = 1 : N
User.hasMany(Patient);
Patient.belongsTo(User);

// ?Plan vs Paids = 1 : N
Plan.hasMany(Paids);
Paids.belongsTo(Plan);

// ?User vs Doctor = 1 : N
User.hasMany(Doctor);
Doctor.belongsTo(User);

// *Relaciones N a N:
// ?Doctor vs Speciality = N : N
Doctor.belongsToMany(Speciality, { through: "DoctorSpeciality" });
Speciality.belongsToMany(Doctor, { through: "DoctorSpeciality" });

// ?Doctor vs Schedule = N : N
Doctor.belongsToMany(Schedule, { through: "DoctorSchedule" });
Schedule.belongsToMany(Doctor, { through: "DoctorSchedule" });

// ?Doctor vs TicketMedical = N : N
Doctor.belongsToMany(TicketMedical, { through: "DoctorTM" });
TicketMedical.belongsToMany(Doctor, { through: "DoctorTM" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
