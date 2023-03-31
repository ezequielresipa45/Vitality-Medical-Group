# Api Clinica - Documentación

Este archivo recopila todos los endpoints de la Api e indica lo que requiere cada endpoint y que devuelve cada uno.

## Endpoints de la ruta _/doctor_:

- `get => /doctor/names` => Devuelve un array con SOLO los nombres de los doctores disponibles; ideal para implementar en la barra de búsqueda un función de autocompletado para sugerencias.

```shell
[
	"Dolores Delano",
	"Maxima Poronga",
	"Jorge Nitales",
	"Tomas Melano"
]
```

- `get => /doctor || /doctor?name=` => Devuelve un array con todos los doctores de la clínica. Cada elemento del array (objeto), incluye la información asociada sobre, su usuario, especialidades, horarios seteados por los turnos. Este endpoint también puede recibir un nombre para devolver el resultado de la búsqueda de un doctor por nombre en un array.

```shell
[
	{
		"id": 2,
		"dni": 3698754,
		"code": 236514,
		"full_name": "Paco Gerlo",
		"gender": "masculino",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "631498745",
		"address": "CABA, Argentina",
		"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
		"is_delete": false,
		"is_delivery": false,
		"userId": null,
		"specialities": [
			{
				"id": 2,
				"speciality": "neurología"
			},
			{
				"id": 3,
				"speciality": "psiquiatría"
			}
		],
		"schedules": [],
		"user": null
	},
	{
		"id": 1,
		"dni": 8596745,
		"code": 326475,
		"full_name": "Devora Poronga",
		"gender": "masculino",
		"age": 48,
		"birthday": "1975-12-25",
		"phone": "36958745",
		"address": "San Isidro, Argentina",
		"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
		"is_delete": false,
		"is_delivery": false,
		"userId": null,
		"specialities": [
			{
				"id": 1,
				"speciality": "dermatología"
			}
		],
		"schedules": [
			{
				"id": 1,
				"date": "2023-06-10",
				"hour_start": "08:00",
				"hour_end": "08:30",
				"is_delete": true,
				"ticketMedicalId": 1
			},
			{
				"id": 2,
				"date": "2023-06-10",
				"hour_start": "08:30",
				"hour_end": "09:00",
				"is_delete": true,
				"ticketMedicalId": 2
			},
			{
				"id": 3,
				"date": "2023-06-10",
				"hour_start": "08:30",
				"hour_end": "09:00",
				"is_delete": true,
				"ticketMedicalId": 3
			},
			{
				"id": 4,
				"date": "2023-06-10",
				"hour_start": "08:30",
				"hour_end": "09:00",
				"is_delete": true,
				"ticketMedicalId": 4
			}
		],
		"user": null
	}
]
```

- `get => /doctor/dni` => A este endpoint se envía por body un objeto con el dni del doctor para realizar una búsqueda por DNI y envía un objeto con la info del doctor. Recibe:

```shell
{
    "dni": 3698754
}
```

Devuelve:

```shell
{
    {
	"id": 2,
	"dni": 3698754,
	"code": 236514,
	"full_name": "Paco Gerlo",
	"gender": "masculino",
	"age": 25,
	"birthday": "1998-02-06",
	"phone": "631498745",
	"address": "CABA, Argentina",
	"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
	"is_delete": false,
	"is_delivery": false,
	"userId": null,
	"specialities": [
		{
			"id": 2,
			"speciality": "neurología"
		},
		{
			"id": 3,
			"speciality": "psiquiatría"
		}
	],
	"schedules": [],
	"user": null
    }
}
```

- `get => /doctor/:id` => Este endpoint recibe por params un id y devuelve un objeto que contiene el doctor con su información.

```shell
[
	{
		"id": 1,
		"dni": 8596745,
		"code": 326475,
		"full_name": "Devora Poronga",
		"gender": "masculino",
		"age": 48,
		"birthday": "1975-12-25",
		"phone": "36958745",
		"address": "San Isidro, Argentina",
		"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
		"is_delete": false,
		"is_delivery": false,
		"userId": null,
		"specialities": [
			{
				"id": 1,
				"speciality": "dermatología"
			}
		],
		"schedules": [
			{
				"id": 2,
				"date": "2023-06-10",
				"hour_start": "08:30",
				"hour_end": "09:00",
				"is_delete": true,
				"ticketMedicalId": 2
			},
			{
				"id": 4,
				"date": "2023-06-10",
				"hour_start": "08:30",
				"hour_end": "09:00",
				"is_delete": true,
				"ticketMedicalId": 4
			},
			{
				"id": 1,
				"date": "2023-06-10",
				"hour_start": "08:00",
				"hour_end": "08:30",
				"is_delete": true,
				"ticketMedicalId": 1
			},
			{
				"id": 3,
				"date": "2023-06-10",
				"hour_start": "08:30",
				"hour_end": "09:00",
				"is_delete": true,
				"ticketMedicalId": 3
			}
		],
		"user": null
	}
]
```

- `post => /doctor` => A este endpoint se envía por body un `objeto` con la info necesaria para crear al doctor.

En este caso:

`code`: hace referencia al código de Colégio de Médicos del doctor.

`is_delivery`: hace referencia a si trabaja fuera de la clínica. Esta propiedad por defecto viene seteada en `false`, por lo que si el médico trabaja fuera de la clínica, depo poder setearse en `true` desde el front.

`especialities`: se refiere a las especialidades del doctor; si es una sola especialidad recibe un `string`, sin embargo si son más de una, puede recibir un array de `strings`.

```shell
{
    "dni": 3698754,
    "code": 236514,
    "full_name": "Paco Gerlo",
    "gender": "masculino",
    "birthday": "1998-02-06",
    "age": 25,
    "phone": 631498745,
    "address": "CABA, Argentina",
    "is_delivery": true,
    "image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
    "specialities": ["neurología", "psiquiatría"]
}
```

Devuelve un objeto con la siguiente información:

```shell
{
	"message": "El registro del médico se ha creado exitosamente",
	"doctor_created": {
	"id": 2,
	"dni": 3698754,
	"code": 236514,
	"full_name": "Paco Gerlo",
	"gender": "masculino",
	"age": 25,
	"birthday": "1998-02-06",
	"phone": "631498745",
	"address": "CABA, Argentina",
	"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
	"is_delete": false,
	"userId": null,
	"specialities": [
		{
			"speciality": "neurología"
		},
		{
			"speciality": "psiquiatría"
		}
	]
}
```

- `put => /doctor` => A este endpoint se envía por body un objeto con `id, phone, address, image` para actualizar el doctor. Es importante que si es un dato específico de alguno de estos el que se va a modificar, enviar la info que tenía del resto para que no quede null en la base de datos algún campo.

```shell
{
    "id": 1,
    "phone": 814452551,
    "address": "Rosario, Argentina",
    "image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png"
}
```

- `delete => /doctor/:id/delete` => A este endpoint se envía por params un `id` para buscar el doctor a borrar; setea su atributo `is_delete` como true, impidiendo que pueda mostrarse de nuevo (borrado lógico). Retorna el siguiente mensaje:

```shell
{
	"message": "El Médico fue borrado exitosamente"
}
```

- `delete => /doctor/:id/delSchedule` => A este endpoint se envía por params un `id` para buscar el doctor y a través de él setear el atributo `is_delete` de cada `schedule` asociado como true. de Esta manera desde el front se pueden filtrar los horarios de los doctores y sólo se muestren los que tienen ese atributo en false (borrado lógico). Retorna el siguiente mensaje:

```shell
"Se han borrado los horarios exitosamente"
```

## Endpoints de la ruta _/patient_:

- `get => /patient || /patient?=` => Devuelve un array con todos los pacientes de la clínica. Cada elemento del array (objeto), incluye la información asociada sobre, su usuario, Turnos Médicos, Turnos a Análisis, Usuario y Plan. Este endpoint también puede recibir un nombre para devolver el resultado de la búsqueda de un paciente por nombre en un array.

```shell
[
	{
		"id": 1,
		"dni": 79563254,
		"full_name": "Maluma la del Barrio",
		"gender": "empoderada",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "859874621",
		"address": "Colombia",
		"consultations_available": 10,
		"is_delete": false,
		"planId": null,
		"userId": null,
		"ticketMedicals": [
			{
				"id": 2,
				"title": "sarampión",
				"observations": "Consulta con dermatología",
				"date": "2023-06-10",
				"hour_start": "08:30",
				"is_confirmed": false,
				"is_delete": true,
				"patientId": 1
			},
			{
				"id": 1,
				"title": "Sarna",
				"observations": "Consulta con dermatología",
				"date": "2023-06-10",
				"hour_start": "08:00",
				"is_confirmed": true,
				"is_delete": true,
				"patientId": 1
			},
			{
				"id": 3,
				"title": "sarampión",
				"observations": "Consulta con dermatología",
				"date": "2023-06-10",
				"hour_start": "08:30",
				"is_confirmed": true,
				"is_delete": true,
				"patientId": 1
			},
			{
				"id": 4,
				"title": "sarampión",
				"observations": "Consulta con dermatología",
				"date": "2023-06-10",
				"hour_start": "08:30",
				"is_confirmed": true,
				"is_delete": true,
				"patientId": 1
			}
		],
		"user": null,
		"plan": null
	}
]
```

- `get => /patient/dni` => A este endpoint se envía por body un objeto con el dni del paciente para realizar una búsqueda por DNI y envía un objeto con la info del paciente. Recibe:

```shell
{
	"dni": 3265984
}
```

Devuelve:

```shell
{
	"id": 3,
	"dni": 3265984,
	"full_name": "Shakira Cornuda",
	"gender": "loba",
	"age": 43,
	"birthday": "1980-06-03",
	"phone": "795486524",
	"address": "Madrid, España",
	"consultations_available": 10,
	"is_delete": false,
	"planId": null,
	"userId": null,
	"ticketMedicals": [],
	"user": null,
	"plan": null
}
```

- `get => /patient/:id` => Este endpoint recibe por params un id y devuelve un objeto que contiene el paciente con su información.

```shell
{
	"id": 1,
	"dni": 79563254,
	"full_name": "Maluma la del Barrio",
	"gender": "empoderada",
	"age": 25,
	"birthday": "1998-02-06",
	"phone": "859874621",
	"address": "Colombia",
	"consultations_available": 10,
	"is_delete": false,
	"planId": null,
	"userId": null,
	"ticketMedicals": [
		{
			"id": 2,
			"title": "urticaria",
			"observations": "Consulta con dermatología",
			"date": "2023-06-10",
			"hour_start": "08:30",
			"is_confirmed": false,
			"is_delete": true,
			"patientId": 1
		},
		{
			"id": 1,
			"title": "Sarna",
			"observations": "Consulta con dermatología",
			"date": "2023-06-10",
			"hour_start": "08:00",
			"is_confirmed": true,
			"is_delete": true,
			"patientId": 1
		},
		{
			"id": 3,
			"title": "sarampión",
			"observations": "Consulta con dermatología",
			"date": "2023-06-10",
			"hour_start": "08:30",
			"is_confirmed": true,
			"is_delete": true,
			"patientId": 1
		},
		{
			"id": 4,
			"title": "dermatitis",
			"observations": "Consulta con dermatología",
			"date": "2023-06-10",
			"hour_start": "08:30",
			"is_confirmed": true,
			"is_delete": true,
			"patientId": 1
		}
	],
	"user": null,
	"plan": null
}
```

- `post => /patient` => A este endpoint se envía por body un `objeto` con la info necesaria para crear al paciente.

En este caso:

`consultations_available`: hace referencia a la cantidad de consultas disponibles de acuerdo al plan seleccionado por el usuario.

Debe recibir:

```shell
{
    "dni": 79563254,
    "full_name": "Maluma la del Barrio",
    "gender": "empoderada",
    "birthday": "1998-02-06",
    "age": 25,
    "phone": 859874621,
    "address": "Colombia",
    "consultations_available": 10
}
```

Devuelve:

```shell
{
	"message": "El registro del paciente se ha creado exitosamente",
	"patient_created": {
		"id": 1,
		"dni": 79563254,
		"full_name": "Maluma la del Barrio",
		"gender": "empoderada",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "859874621",
		"address": "Colombia",
		"consultations_available": 10,
		"is_delete": false,
		"planId": null,
		"userId": null,
		"ticketMedicals": [],
		"user": null,
		"plan": null
	}
}
```

- `put => /patient` => A este endpoint se envía por body un objeto con `id, phone, address` para actualizar al paciente. Es importante que si es un dato específico de alguno de estos el que se va a modificar, enviar la info que tenía del resto para que no quede null en la base de datos algún campo.

```shell
{
    "id": 1,
    "phone": 814452551,
    "address": "Rosario, Argentina"
}
```

- `delete => /patient/:id/delete` => A este endpoint se envía por params un `id` para buscar al paciente a borrar; setea su atributo `is_delete` como true, impidiendo que pueda mostrarse de nuevo (borrado lógico). Retorna el siguiente mensaje:

```shell
{
	"message": "El Paciente fue borrado exitosamente"
}
```

## Endpoints de la ruta _/ticketMedical_:

- `get => /ticketMedical` => Este endpoint permite devolver todos los ticketsMedicals en un array de objetos. Cada objeto representa un ticket médico son su información asociada: horario, doctor, paciente.

```shell
[
	{
		"id": 5,
		"title": "piel delicadita",
		"observations": "Consulta con dermatología",
		"date": "2023-06-10",
		"hour_start": "08:30",
		"is_confirmed": false,
		"is_delete": false,
		"patientId": 3,
		"schedule": {
			"id": 5,
			"date": "2023-06-10",
			"hour_start": "08:30",
			"hour_end": "09:00",
			"is_delete": false,
			"ticketMedicalId": 5
		},
		"patient": {
			"id": 3,
			"dni": 79563245,
			"full_name": "Maluma la del Barrio",
			"gender": "empoderada",
			"age": 25,
			"birthday": "1998-02-06",
			"phone": "859874621",
			"address": "Colombia",
			"consultations_available": 10,
			"is_delete": false,
			"planId": null,
			"userId": null
		},
		"doctors": [
			{
				"id": 2,
				"dni": 3698754,
				"code": 236514,
				"full_name": "Paco Gerlo",
				"gender": "masculino",
				"age": 25,
				"birthday": "1998-02-06",
				"phone": "631498745",
				"address": "CABA, Argentina",
				"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
				"is_delete": false,
				"is_delivery": false,
				"userId": null,
				"DoctorTM": {
					"createdAt": "2023-03-30T02:11:06.338Z",
					"updatedAt": "2023-03-30T02:11:06.338Z",
					"doctorId": 2,
					"ticketMedicalId": 5
				}
			}
		]
	}
]
```

- `get => /ticketMedical/:id` => Este endpoint recibe por params un id correspondiente al ticket médico a buscar y devuelve un objeto con toda la información asociada a ese turno:

```shell
{
	"id": 5,
	"title": "piel delicadita",
	"observations": "Consulta con dermatología",
	"date": "2023-06-10",
	"hour_start": "08:30",
	"is_confirmed": false,
	"is_delete": false,
	"patientId": 3,
	"schedule": {
		"id": 5,
		"date": "2023-06-10",
		"hour_start": "08:30",
		"hour_end": "09:00",
		"is_delete": false,
		"ticketMedicalId": 5
	},
	"patient": {
		"id": 3,
		"dni": 79563245,
		"full_name": "Maluma la del Barrio",
		"gender": "empoderada",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "859874621",
		"address": "Colombia",
		"consultations_available": 10,
		"is_delete": false,
		"planId": null,
		"userId": null
	},
	"doctors": [
		{
			"id": 2,
			"dni": 3698754,
			"code": 236514,
			"full_name": "Paco Gerlo",
			"gender": "masculino",
			"age": 25,
			"birthday": "1998-02-06",
			"phone": "631498745",
			"address": "CABA, Argentina",
			"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
			"is_delete": false,
			"is_delivery": false,
			"userId": null,
			"DoctorTM": {
				"createdAt": "2023-03-30T02:11:06.338Z",
				"updatedAt": "2023-03-30T02:11:06.338Z",
				"doctorId": 2,
				"ticketMedicalId": 5
			}
		}
	]
}
```

- `post => /ticketMedical/createTicketMedical` => Este endpoint permite crear un turno médico.

Recibe:

`title`: breve motivo de la consulta.

`observations`: con que especialidad es la consulta.

`doctorId`: id del doctor seleccionado para la consulta.

`patientId`: id del paciente que pide el turno.

`date`: fecha del turno (en este formato: año, mes, día).

`hour_start`: hora de comienzo del turno.

`hour_end`: hora de finalización del turno

```shell
{
    "title": "piel delicadita",
    "observations": "Consulta con dermatología",
    "doctorId": 2,
    "patientId": 3,
    "date": "2023-06-10",
    "hour_start": "08:30",
    "hour_end": "09:00"
}
```

- `put => /ticketMedical/confirmTicket` => Este endpoint permite confirmar un turno médico. Recibe un `id` por body. Al confirmarse el turno, deja de aparecer en la lista de turnos y los horarios relacionados a ese turno se modifican a `is_delete: true`.
  Devuelve el siguiente mensaje:

```shell
"El turno ha sido confirmado exitosamente"
```

- `delete => /ticketMedical/:id/delete` => A este endpoint se envía por params un `id` para buscar el turno médico a borrar; setea su atributo `is_delete` como true, impidiendo que pueda mostrarse de nuevo (borrado lógico). Así también, setea el mismo atributo en el horario asociado. Retorna el siguiente mensaje:

```shell
"El Turno médico fue borrado exitosamente"
```

## Endpoints de la ruta _/speciality_:

- `get => /speciality` => Este endpoint devuelve un array con todas las especialidades de la clínica.

```shell
[
	{
		"id": 1,
		"speciality": "dermatología"
	},
	{
		"id": 2,
		"speciality": "neurología"
	},
	{
		"id": 3,
		"speciality": "psiquiatría"
	}
]
```

- `post => /speciality` => Este endpoint permite crear una especialidad.
  Recibe por body un objeto con:

```shell
{
    "speciality": "psiquiatría"
}
```

Devuelve:

```shell
{
	"message": "El registro de especialidad se ha creado exitosamente"
}
```

- `put => /speciality` => Este permite modificar una especialidad.
  Recibe por body el `id` de la especialidad a modificar y el `nuevo valor` a setear.

```shell
{
    "id": 1,
    "speciality": "obstetricia"
}
```

<!-- - `delete => /speciality` => A este endpoint se envía por params un `id` para buscar al paciente a borrar; setea su atributo `is_delete` como true, impidiendo que pueda mostrarse de nuevo (borrado lógico) POR MODIFICAR. -->
