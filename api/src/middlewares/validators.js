// *Creamos varios Middlewares para verificar que nos envían los datos que son obligatorios por sus modelos para crear y actualizar:
// *Validador para crear a un doctor:
const validatorCreateDoctor = (req, res, next) => {
  const {
    code,
    dni,
    full_name,
    gender,
    age,
    birthday,
    phone,
    address,
    image,
    specialities,
  } = req.body;
  if (
    ![
      code,
      dni,
      full_name,
      gender,
      age,
      birthday,
      phone,
      address,
      image,
      specialities,
    ].every(Boolean)
  )
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para actualizar al registro de un médico:
const validatorUpdateDoctor = (req, res, next) => {
  const { id } = req.body;
  if (!id) return res.status(404).json({ error: "Falta el id" });
  next();
};

// *Validador para crear a un paciente:
const validatorCreatePatient = (req, res, next) => {
  const { idUser, full_name, dni, gender, age, birthday, phone, address } =
    req.body;

  if (
    ![idUser, full_name, dni, gender, age, birthday, phone, address].every(
      Boolean
    )
  )
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para actualizar al registro de un paciente:
const validatorUpdatePatient = (req, res, next) => {
  const { id } = req.body;
  if (!id) return res.status(404).json({ error: "Falta el id" });
  next();
};

// *Validador para crear a un turno médico:
const validatorCreateTicketMedical = (req, res, next) => {
  const {
    title,
    observations,
    doctorId,
    patientId,
    date,
    hour_start,
    hour_end,
  } = req.body;

  if (
    ![
      title,
      observations,
      doctorId,
      patientId,
      date,
      hour_start,
      hour_end,
    ].every(Boolean)
  )
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para crear un turno para estudios clínicos:
const validatorCreateTicketAnalisys = (req, res, next) => {
  const { idAnalysis, idPatient, date, hour, price } = req.body;

  if (![idAnalysis, idPatient, date, hour, price].every(Boolean))
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para crear un análisis:
const validatorCreateAnalysis = (req, res, next) => {
  const { name, speciality, price } = req.body;
  if (![name, speciality, price].every(Boolean))
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para crear un payment y un registro de paids para el pago de un plan:
const validatorCreatePaymentPlan = (req, res, next) => {
  const { user, planId, description, price, code, date } = req.body;
  if (![user, planId, description, price, code, date].every(Boolean))
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para crear un payment y un registro de paids para el pago de un análisis clínico:
const validatorCreatePaymentAnalysis = (req, res, next) => {
  const { ticketsIds, user, description, price, code, date } = req.body;
  if (![ticketsIds, user, description, price, code, date].every(Boolean))
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para crear un plan:
const validatorCreatePlan = (req, res, next) => {
  const {
    name,
    members,
    price,
    description,
    code,
    consultations_per_patients,
  } = req.body;
  if (
    ![
      name,
      members,
      price,
      description,
      code,
      consultations_per_patients,
    ].every(Boolean)
  )
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para crear una especialidad médica:
const validatorCreateSpeciality = (req, res, next) => {
  const { speciality } = req.body;
  if (![speciality].every(Boolean))
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

// *Validador para crear un usuario:
const validatorCreateUser = (req, res, next) => {
  const { full_name, email, password, user_name, image } = req.body;
  if (![full_name, email, password, user_name, image].every(Boolean))
    return res.status(404).json({ error: "Falta enviar datos obligatorios" });

  next();
};

module.exports = {
  validatorCreateDoctor,
  validatorUpdateDoctor,
  validatorCreatePatient,
  validatorUpdatePatient,
  validatorCreateTicketMedical,
  validatorCreateTicketAnalisys,
  validatorCreateAnalysis,
  validatorCreatePaymentPlan,
  validatorCreatePaymentAnalysis,
  validatorCreatePlan,
  validatorCreateSpeciality,
  validatorCreateUser,
};
