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
  const { full_name, dni, gender, age, birthday, phone, address } = req.body;

  if (![full_name, dni, gender, age, birthday, phone, address].every(Boolean))
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

// *Validador para crear un turno para estudios/análisis:
const validatorCreateTicketAnalisys = (req, res, next) => {
  const { idAnalysis, idPatient, date, hour, price } = req.body;

  if (![idAnalysis, idPatient, date, hour, price].every(Boolean))
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
};
