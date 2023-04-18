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
{
		"id": 4,
		"dni": 26589874,
		"code": 687498,
		"full_name": "Maxima Poronga",
		"gender": "femenino",
		"age": 43,
		"birthday": "1980-12-09",
		"phone": "46859731",
		"address": "Tierra de Fuego, Argentina",
		"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
		"is_delete": false,
		"is_delivery": false,
		"is_morning": false,
		"is_evening": true,
		"userId": 5,
		"specialities": [
			{
				"speciality": "cardiología"
			}
		],
		"schedules": [],
		"user": {
			"id": 5,
			"full_name": "Maluma Diva",
			"email": "divinayarrecha@gmail.com",
			"password": "superpasiva",
			"user_name": "Bendecida y Afortunada",
			"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
			"is_admin": false,
			"is_plan_pay": true,
			"is_delete": false,
			"planId": 2
		},
		"days": [
			{
				"day": "Martes"
			},
			{
				"day": "Lunes"
			}
		]
	}
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
	"id": 1,
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
	"is_morning": true,
	"is_evening": false,
	"userId": 3,
	"specialities": [
		{
			"speciality": "neurología"
		}
	],
	"schedules": [
		{
			"id": 34,
			"date": "2023-04-10",
			"hour": "08:00",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 37,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 39,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 36,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 38,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		}
	],
	"user": {
		"id": 3,
		"full_name": "Shakira la Loba",
		"email": "piquemepusoloscachos@gmail.com",
		"password": "soypaquitaladelbarrio2",
		"user_name": "Loba y Llorona",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 3
	},
	"days": [
		{
			"day": "Lunes"
		},
		{
			"day": "Martes"
		}
	]
}
```

- `get => /doctor/:id` => Este endpoint recibe por params un id y devuelve un objeto que contiene el doctor con su información.

```shell
{
	"id": 1,
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
	"is_morning": true,
	"is_evening": false,
	"userId": 3,
	"specialities": [
		{
			"speciality": "neurología"
		}
	],
	"schedules": [
		{
			"id": 35,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 36,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 38,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 39,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 40,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 34,
			"date": "2023-04-10",
			"hour": "08:00",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		{
			"id": 37,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		}
	],
	"user": {
		"id": 3,
		"full_name": "Shakira la Loba",
		"email": "piquemepusoloscachos@gmail.com",
		"password": "soypaquitaladelbarrio2",
		"user_name": "Loba y Llorona",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 3
	},
	"days": [
		{
			"day": "Lunes"
		},
		{
			"day": "Martes"
		}
	]
}
```

- `post => /doctor` => A este endpoint se envía por body un `objeto` con la info necesaria para crear al doctor. Es necesario que se envíe el `Id del usuario` para poder enlazarlo.

En este caso recibe:

`idUser`: id del usuario al que pertenece.

`dni`: hace referencia al Documento de Nacional de Identificación.

`full_name`: nombre completo.

`gender`: género.

`birthday`: fecha de nacimiento.

`age`: edad.

`phone`: número telefónico.

`address`: dirección.

`image`: string con la dirección de la foto del doctor.

`is_delivery`: hace referencia a si es prestador externo. Esta propiedad por defecto viene seteada en `false`, por lo que si el médico trabaja fuera de la clínica, debe poder setearse en `true` desde el front.

`code`: hace referencia al código de Colégio de Médicos del doctor.

`especialities`: se refiere a las especialidades del doctor; si es una sola especialidad recibe un `string`, sin embargo si son más de una, puede recibir un array de `strings`.

`is_morning`: atributo booleano que hace referencia a si trabaja en el turno de la mañana.

`is_evening`: atributo booleano que hace referencia a si trabaja en el turno de la tarde.

`day`: puede ser un array con varios strings indicando los días en lo que presta servicio, o un solo string indicando el día.

```shell
{
	"idUser": 1,
    "dni": 65749138,
    "code": 2146852,
    "full_name": "Pedro Nitales",
    "gender": "masculino",
    "birthday": "1998-02-06",
    "age": 25,
    "phone": 69854784,
    "address": "Banfield, Argentina",
    "image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
    "specialities": "neumonología",
    "is_morning": false,
	"is_evening": true,
	"day": ["Miércoles", "Jueves"]
}
```

Devuelve un objeto con la siguiente información:

```shell
{
		"message": "El registro del médico se ha creado exitosamente",
		"doctor_created": {
		"id": 6,
		"dni": 65749138,
		"code": 2146852,
		"full_name": "Pedro Nitales",
		"gender": "masculino",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "69854784",
		"address": "Banfield, Argentina",
		"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
		"is_delete": false,
		"is_delivery": false,
		"is_morning": false,
		"is_evening": true,
		"userId": null,
		"specialities": [
			{
				"speciality": "neumonología"
			}
		],
		"days": [
			{
				"day": "Jueves"
			},
			{
				"day": "Miércoles"
			}
		],
		"user": null
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

- `delete => /doctor/delSchedule` => A este endpoint se envía por body `id` y `date` para buscar el doctor y a través de `date` buscar los horarios asociados y setear el atributo `is_delete` de cada `schedule` como true. De esta manera desde el front se pueden filtrar los horarios de los doctores y sólo se muestren los que tienen ese atributo en false (borrado lógico). Retorna el siguiente mensaje:
  Recibe:

```shell
{
	"id": 1,
	"date": "2023-04-10"
}
```

Devuelve:

```shell
"Se han borrado los horarios exitosamente"
```

- `get => /doctor/doctorsDeleted` => Este endpoint devuelve en un array a todos los doctores que han sido borrados.

```shell
[
	{
		"id": 1,
		"dni": 3698754,
		"code": 236514,
		"full_name": "Paco Gerlo",
		"gender": "masculino",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "631498745",
		"address": "CABA, Argentina",
		"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
		"is_delete": true,
		"is_delivery": false,
		"is_morning": true,
		"is_evening": false,
		"userId": 3
	}
]
```

- `put => /doctor/recoverDoctor` => Este endpoint recibe por body el `id` del médico que se quiere dar de alta nuevamente, reestableciendo su ptopiedad `is_delete` en `false`. Devuelve un objeto con la información del médico recuperado.

```shell
{
	"id": 1,
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
	"is_morning": true,
	"is_evening": false,
	"userId": 3
}
```

- `put => /doctor/medicalGuard` => Este endpoint recibe por body `doctorId`, `is_morning`, `is_evening` del médico al que se le quiere modificar el horario del su turno.
  Recibe:

```shell
{
	"doctorId": 2,
	"is_morning": false,
	"is_evening": true
}
```

Devuelve:

```shell
{
	"id": 2,
	"dni": 5469854,
	"code": 148796,
	"full_name": "Devora Testa",
	"gender": "femenino",
	"age": 35,
	"birthday": "1988-12-03",
	"phone": "79632548",
	"address": "Lanus, Argentina",
	"image": "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
	"is_delete": false,
	"is_delivery": false,
	"is_morning": false,
	"is_evening": true,
	"userId": 4,
	"specialities": [
		{
			"speciality": "obstetricia"
		}
	],
	"days": [
		{
			"day": "Jueves"
		},
		{
			"day": "Viernes"
		}
	],
	"user": {
		"id": 4,
		"full_name": "Kylian Mbappé",
		"email": "putoenlacancha@gmail.com",
		"password": "mangueraasesina",
		"user_name": "Negro Manguera",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 3
	}
}
```

## Endpoints de la ruta _/patient_:

- `get => /patient || /patient?name=` => Devuelve un array con todos los pacientes de la clínica. Cada elemento del array (objeto), incluye la información asociada sobre, su usuario, Turnos Médicos, Turnos a Análisis, Usuario y Plan. Este endpoint también puede recibir un nombre para devolver el resultado de la búsqueda de un paciente por nombre en un array.

```shell
[
	{
		"id": 1,
		"dni": 43183214,
		"full_name": "Jonathan Rodriguez",
		"gender": "diabolico",
		"age": 40,
		"birthday": "1983-05-04",
		"phone": "256589742541",
		"address": "Aragua, Venezuela",
		"is_delete": false,
		"planId": null,
		"userId": 1,
		"ticketMedicals": [
			{
				"id": 34,
				"title": "disritmia cerebral",
				"observations": "Consulta con Neurología",
				"date": "2023-04-10",
				"hour": "08:00",
				"is_confirmed": false,
				"is_delete": true,
				"is_canceled": false,
				"scheduleId": 34,
				"patientId": 1,
				"doctorId": 1,
				"dayId": 1
			}
		],
		"ticketAnalyses": [],
		"user": {
			"id": 1,
			"full_name": "Lionel Messi",
			"email": "elguevodelmundo@gmail.com",
			"password": "quetepasabobo",
			"user_name": "Dios y yo",
			"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
			"is_admin": false,
			"is_plan_pay": true,
			"is_delete": false,
			"planId": 1
		},
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
	"id": 4,
	"dni": 6598425,
	"full_name": "Gerard Pique",
	"gender": "pendejo",
	"age": 43,
	"birthday": "1980-12-23",
	"phone": "6598532458",
	"address": "Madrid, España",
	"is_delete": false,
	"planId": null,
	"userId": 4,
	"ticketMedicals": [],
	"user": {
		"id": 4,
		"full_name": "Kylian Mbappé",
		"email": "putoenlacancha@gmail.com",
		"password": "mangueraasesina",
		"user_name": "Negro Manguera",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": null,
		"is_plan_pay": false,
		"is_delete": false,
		"planId": null
	},
	"plan": null
}
```

- `post => /patient` => A este endpoint se envía por body un `objeto` con la info necesaria para crear al paciente.

En este caso:

`IdUser`: id del usuario al que pertenece.

`planId`: id del plan que tiene asociado ese usuario.

`dni`: hace referencia al Documento de Nacional de Identificación.

`full_name`: nombre completo.

`gender`: género.

`birthday`: fecha de nacimiento.

`age`: edad.

`phone`: número telefónico.

`address`: dirección.

Debe recibir:

```shell
{
	"idUser": 1,
	"planId": 1,
    "dni": 79563254,
    "full_name": "Maluma la del Barrio",
    "gender": "empoderada",
    "birthday": "1998-02-06",
    "age": 25,
    "phone": 859874621,
    "address": "Colombia"
}
```

Devuelve:

```shell
{
	"message": "El registro del paciente se ha creado exitosamente",
	"patient_created": {
		"id": 6,
		"dni": 79563254,
		"full_name": "Maluma la del Barrio",
		"gender": "empoderada",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "859874621",
		"address": "Colombia",
		"is_delete": false,
		"planId": 1,
		"userId": 1,
		"user": {
			"id": 1,
			"full_name": "Maluma Diva",
			"email": "divinayarrecha@gmail.com",
			"password": "superpasiva",
			"user_name": "Bendecida y Afortunada",
			"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
			"is_admin": false,
			"is_plan_pay": true,
			"is_delete": false,
			"planId": 1
		},
		"plan": {
			"id": 1,
			"name": "Joven",
			"members": 1,
			"price": 50,
			"description": "individual",
			"code": 1002,
			"consultations_per_patients": 20,
			"is_delete": false
		}
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

- `get => /patient/patientsDeleted` => Este endpoint devuelve en un array a todos los pacientes que han sido borrados, es decir, los que tienen seteado `is_delete` como `true`.
  Devuelve:

```shell
[
	{
		"id": 1,
		"dni": 43183214,
		"full_name": "Jonathan Rodriguez",
		"gender": "diabolico",
		"age": 40,
		"birthday": "1983-05-04",
		"phone": "256589742541",
		"address": "Aragua, Venezuela",
		"is_delete": true,
		"planId": null,
		"userId": 1
	},
	{
		"id": 2,
		"dni": 5986487,
		"full_name": "Bernardo Brocheit",
		"gender": "masculino",
		"age": 53,
		"birthday": "1970-12-12",
		"phone": "2659749851",
		"address": "Lima, Perú",
		"is_delete": true,
		"planId": null,
		"userId": 2
	}
]
```

- `put => /patient/recoverPatient` => Este endpoint recibe por body el `id` del paciente que se quiere dar de alta nuevamente, reestableciendo su ptopiedad `is_delete` en `false`. Devuelve un objeto con la información del paciente recuperado.
  Recibe:

```shell
{
	"id": 1
}
```

Devuelve:

```shell
{
	"id": 1,
	"dni": 43183214,
	"full_name": "Jonathan Rodriguez",
	"gender": "diabolico",
	"age": 40,
	"birthday": "1983-05-04",
	"phone": "256589742541",
	"address": "Aragua, Venezuela",
	"is_delete": false,
	"planId": null,
	"userId": 1
}
```

## Endpoints de la ruta _/ticketMedical_:

- `get => /ticketMedical` => Este endpoint permite devolver todos los ticketsMedicals en un array de objetos. Cada objeto representa un ticket médico son su información asociada: horario, doctor, paciente, día.

```shell
[
	{
		"id": 36,
		"title": "cefaleas",
		"observations": "Consulta con Neurología",
		"date": "2023-04-10",
		"hour": "08:30",
		"is_confirmed": false,
		"is_delete": false,
		"is_canceled": false,
		"scheduleId": 36,
		"patientId": 2,
		"doctorId": 1,
		"dayId": 1,
		"schedule": {
			"id": 36,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		"patient": {
			"id": 2,
			"dni": 5986487,
			"full_name": "Bernardo Brocheit",
			"gender": "masculino",
			"age": 53,
			"birthday": "1970-12-12",
			"phone": "2659749851",
			"address": "Lima, Perú",
			"is_delete": true,
			"planId": null,
			"userId": 2
		},
		"doctor": {
			"id": 1,
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
			"is_morning": false,
			"is_evening": false,
			"userId": 3
		},
		"day": {
			"id": 1,
			"day": "Lunes"
		}
	},
	{
		"id": 38,
		"title": "cefaleas",
		"observations": "Consulta con Neurología",
		"date": "2023-04-10",
		"hour": "08:30",
		"is_confirmed": false,
		"is_delete": false,
		"is_canceled": false,
		"scheduleId": 38,
		"patientId": 2,
		"doctorId": 1,
		"dayId": 1,
		"schedule": {
			"id": 38,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		"patient": {
			"id": 2,
			"dni": 5986487,
			"full_name": "Bernardo Brocheit",
			"gender": "masculino",
			"age": 53,
			"birthday": "1970-12-12",
			"phone": "2659749851",
			"address": "Lima, Perú",
			"is_delete": true,
			"planId": null,
			"userId": 2
		},
		"doctor": {
			"id": 1,
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
			"is_morning": false,
			"is_evening": false,
			"userId": 3
		},
		"day": {
			"id": 1,
			"day": "Lunes"
		}
	},
	{
		"id": 39,
		"title": "cefaleas",
		"observations": "Consulta con Neurología",
		"date": "2023-04-10",
		"hour": "08:30",
		"is_confirmed": false,
		"is_delete": false,
		"is_canceled": false,
		"scheduleId": 39,
		"patientId": 2,
		"doctorId": 1,
		"dayId": 1,
		"schedule": {
			"id": 39,
			"date": "2023-04-10",
			"hour": "08:30",
			"is_delete": true,
			"doctorId": 1,
			"dayId": 1
		},
		"patient": {
			"id": 2,
			"dni": 5986487,
			"full_name": "Bernardo Brocheit",
			"gender": "masculino",
			"age": 53,
			"birthday": "1970-12-12",
			"phone": "2659749851",
			"address": "Lima, Perú",
			"is_delete": true,
			"planId": null,
			"userId": 2
		},
		"doctor": {
			"id": 1,
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
			"is_morning": false,
			"is_evening": false,
			"userId": 3
		},
		"day": {
			"id": 1,
			"day": "Lunes"
		}
	}
]
```

- `get => /ticketMedical/:id` => Este endpoint recibe por params un id correspondiente al ticket médico a buscar y devuelve un objeto con toda la información asociada a ese turno:

```shell
{
	"id": 39,
	"title": "cefaleas",
	"observations": "Consulta con Neurología",
	"date": "2023-04-10",
	"hour": "08:30",
	"is_confirmed": false,
	"is_delete": false,
	"is_canceled": false,
	"scheduleId": 39,
	"patientId": 2,
	"doctorId": 1,
	"dayId": 1,
	"schedule": {
		"id": 39,
		"date": "2023-04-10",
		"hour": "08:30",
		"is_delete": true,
		"doctorId": 1,
		"dayId": 1
	},
	"patient": {
		"id": 2,
		"dni": 5986487,
		"full_name": "Bernardo Brocheit",
		"gender": "masculino",
		"age": 53,
		"birthday": "1970-12-12",
		"phone": "2659749851",
		"address": "Lima, Perú",
		"is_delete": true,
		"planId": null,
		"userId": 2
	},
	"doctor": {
		"id": 1,
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
		"is_morning": false,
		"is_evening": false,
		"userId": 3
	},
	"day": {
		"id": 1,
		"day": "Lunes"
	}
}
```

- `post => /ticketMedical/createTicketMedical` => Este endpoint permite crear un turno médico.

Recibe:

`title`: breve motivo de la consulta.

`observations`: con que especialidad es la consulta.

`doctorId`: id del doctor seleccionado para la consulta.

`patientId`: id del paciente que pide el turno.

`date`: fecha del turno (en este formato: año, mes, día).

`hour`: hora del turno.

`day`: día de la semana del turno.

```shell
{
    "title": "cefaleas",
    "observations": "Consulta con Neurología",
    "day": "Lunes",
    "doctorId": 1,
    "patientId": 2,
    "date": "2023-04-10",
    "hour": "08:30"
}
```

Devuelve:

```shell
"Turno creado exitosamente"
```

- `put => /ticketMedical/confirmTicket` => Este endpoint permite confirmar un turno médico. Recibe un `id` por body. Al confirmarse el turno, deja de aparecer en la lista de turnos.
  Devuelve el siguiente mensaje:

```shell
"El turno ha sido confirmado exitosamente"
```

- `delete => /ticketMedical/:id/delete` => A este endpoint se envía por params un `id` para buscar el turno médico a borrar; setea su atributo `is_delete` como true, impidiendo que pueda mostrarse de nuevo (borrado lógico). Así también, setea el mismo atributo en el horario asociado. Retorna el siguiente mensaje:

```shell
"El Turno médico fue borrado exitosamente"
```

- `delete => /ticketMedical/destroyTicket` => A este endpoint se envía por body `idTicket` para buscar el turno médico a borrar; destruye el registro de la base de datos, así también con el horario asociado. Retorna el siguiente mensaje:
  Recibe:

```shell
{
	"idTicket": 35
}
```

```shell
""El Turno médico fue cancelado exitosamente""
```

- `delete => /ticketMedical/destroyAllTicket` => este endpoint es capaz de destruir TODOS los registros de turnos médicos creados en la base de datos y asimismo, destruir tambien los schedules asociados a el.
  Devuelve:

```shell
"Todos los registros de los turnos médicos fueron exitosamente destruidos"
```

## Endpoints de la ruta _/speciality_:

- `get => /speciality` => Este endpoint devuelve un array con todas las especialidades de la clínica y los nombres y ids de los médicos asociados a esas especialidades.

```shell
[
	{
		"id": 3,
		"speciality": "neurología",
		"doctors": [
			{
				"id": 1,
				"full_name": "Paco Gerlo"
			}
		],
		"is_delete": false
	},
	{
		"id": 11,
		"speciality": "obstetricia",
		"doctors": [
			{
				"id": 2,
				"full_name": "Devora Testa"
			}
		],
		"is_delete": false
	},
	{
		"id": 8,
		"speciality": "cardiología",
		"doctors": [
			{
				"id": 4,
				"full_name": "Maxima Poronga"
			}
		],
		"is_delete": false
	},
	{
		"id": 14,
		"speciality": "neumonología",
		"doctors": [
			{
				"id": 5,
				"full_name": "Jorge Nitales"
			},
			{
				"id": 6,
				"full_name": "Pedro Nitales"
			}
		],
		"is_delete": false
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
  Recibe:

```shell
{
	"id": 2,
	"speciality": "cardiología"
}
```

```shell
{
	"message": "modificado con exito"
}
```

- `delete => /speciality/:id` => A este endpoint se envía por params un `id` para buscar la especialidad a borrar; setea su atributo `is_delete` como true, impidiendo que pueda mostrarse de nuevo (borrado lógico).
  Devuelve:

```shell
"La Especialidad fue borrado exitosamente"
```

## Endpoints de la ruta _/user_:

- `get => /user` => Este endpoint devuelve un array con todos los usuarios de la clínica.

```shell
[
	{
		"id": 2,
		"full_name": "Lady Gaga",
		"email": "locadeabola@gmail.com",
		"password": "soypsicopata",
		"user_name": "Tengo Problemas",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 1,
		"plan": {
			"id": 1,
			"name": "Maximun care",
			"members": 8,
			"price": 300,
			"description": "Familiar",
			"code": 1005,
			"consultations_per_patients": 50,
			"is_delete": false
		},
		"paids": [
			{
				"id": 2,
				"date": "2019-07-10T14:47:58.000Z",
				"description": "pago de plan Maximun care",
				"price": 300,
				"paymentId": 2,
				"userId": 2,
				"planId": 1
			}
		],
		"comments": []
	},
	{
		"id": 5,
		"full_name": "Maluma Diva",
		"email": "divinayarrecha@gmail.com",
		"password": "superpasiva",
		"user_name": "Bendecida y Afortunada",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 2,
		"plan": {
			"id": 2,
			"name": "Full Care",
			"members": 5,
			"price": 100,
			"description": "Familiar",
			"code": 1001,
			"consultations_per_patients": 20,
			"is_delete": false
		},
		"paids": [
			{
				"id": 4,
				"date": "2019-07-10T14:47:58.000Z",
				"description": "pago de plan Full care",
				"price": 100,
				"paymentId": 4,
				"userId": 5,
				"planId": 2
			}
		],
		"comments": []
	},
	{
		"id": 4,
		"full_name": "Kylian Mbappé",
		"email": "putoenlacancha@gmail.com",
		"password": "mangueraasesina",
		"user_name": "Negro Manguera",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 3,
		"plan": {
			"id": 3,
			"name": "Joven",
			"members": 1,
			"price": 50,
			"description": "individual",
			"code": 1002,
			"consultations_per_patients": 20,
			"is_delete": false
		},
		"paids": [
			{
				"id": 5,
				"date": "2019-07-10T14:47:58.000Z",
				"description": "pago de plan joven",
				"price": 50,
				"paymentId": 5,
				"userId": 4,
				"planId": 3
			}
		],
		"comments": []
	},
	{
		"id": 1,
		"full_name": "Lionel Messi",
		"email": "elguevodelmundo@gmail.com",
		"password": "quetepasabobo",
		"user_name": "Dios y yo",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 1,
		"plan": {
			"id": 1,
			"name": "Maximun care",
			"members": 8,
			"price": 300,
			"description": "Familiar",
			"code": 1005,
			"consultations_per_patients": 50,
			"is_delete": false
		},
		"paids": [
			{
				"id": 1,
				"date": "2019-07-10T14:47:58.000Z",
				"description": "pago de plan Maximun Care",
				"price": 300,
				"paymentId": 1,
				"userId": 1,
				"planId": 1
			}
		],
		"comments": []
	},
	{
		"id": 3,
		"full_name": "Shakira la Loba",
		"email": "piquemepusoloscachos@gmail.com",
		"password": "soypaquitaladelbarrio2",
		"user_name": "Loba y Llorona",
		"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
		"is_admin": false,
		"is_plan_pay": true,
		"is_delete": false,
		"planId": 3,
		"plan": {
			"id": 3,
			"name": "Joven",
			"members": 1,
			"price": 50,
			"description": "individual",
			"code": 1002,
			"consultations_per_patients": 20,
			"is_delete": false
		},
		"paids": [
			{
				"id": 3,
				"date": "2019-07-10T14:47:58.000Z",
				"description": "pago de plan Joven",
				"price": 50,
				"paymentId": 3,
				"userId": 3,
				"planId": 3
			}
		],
		"comments": []
	}
]
```

- `get => /user/:id` => Este endpoint devuelve un objeto con el usuario que coincida con ese id con toda su info relacionada. Recibe por params el id a buscar en la DB.

```shell
{
	"id": 1,
	"full_name": "Lionel Messi",
	"email": "elguevodelmundo@gmail.com",
	"password": "quetepasabobo",
	"user_name": "Dios y yo",
	"image": "https://www.softzone.es/app/uploads/2018/04/guest.png",
	"is_admin": false,
	"is_plan_pay": true,
	"is_delete": false,
	"planId": 1,
	"plan": {
		"id": 1,
		"name": "Maximun care",
		"members": 8,
		"price": 300,
		"description": "Familiar",
		"code": 1005,
		"consultations_per_patients": 50,
		"is_delete": false
	},
	"paids": [
		{
			"id": 1,
			"date": "2019-07-10T14:47:58.000Z",
			"description": "pago de plan Maximun Care",
			"price": 300,
			"paymentId": 1,
			"userId": 1,
			"planId": 1
		}
	],
	"comments": []
}
```

- `post => /user` => Este endpoint permite crear un usuario. Recibe por body un objeto con la siguiente información:

`full_name`: nombre completo del usuario.

`email`: correo electrónico del usuario.

`password`: contraseña del usuario.

`user_name`: nombre de usuario para la página.

`image`: string con la url de la imagen del usuario.

```shell
{
    "full_name": "Lionel Messi",
    "email": "elguevodelmundo@gmail.com",
    "password": "quetepasabobo",
    "user_name": "Dios y yo",
    "image": "https://www.softzone.es/app/uploads/2018/04/guest.png"
}
```

Devuelve:

```shell
{
	"message": "El Usuario a sido creado con exito"
}
```

- `put => /user/isAdmin` => Este endpoint permite setear a un usuario como administrador cambiando el valor de la propiedad `is_admin` como verdadero o falso, de acuerdo a lo que se necesite. Recibe por body el id del usuario y la propiedad isAdmin con el valor asignado.

```shell
{
	"id": 1,
	"isAdmin": true
}
```

Devuelve:

```shell
{
	"message": "El usuario ya es Administador"
}
```

- `delete => /user/:id` => Este endpoint permite borrar a un usuario enviando el id del usuario por params.
  Devuelve:

```shell
"El usuario fue borrado exitosamente"
```

## Endpoints de la ruta _/plan_:

- `get => /plan || /plan?code=` => Este endpoint permite 2 acciones diferentes; por un lado permite buscar un plan a través de su `code` si se envía por query; y por otro lado devuelve un array con todos los planes disponibles.

```shell
[
	{
		"id": 1,
		"name": "Adulto mayor",
		"members": 2,
		"price": 120,
		"description": "Pareja de adultos mayores",
		"code": 1003,
		"consultations_per_patients": 20
	},
	{
		"id": 2,
		"name": "Full Care",
		"members": 5,
		"price": 100,
		"description": "Familiar",
		"code": 1001,
		"consultations_per_patients": 20
	}
]
```

- `get => /plan/:id` => Este endpoint permite buscar un plan por su id. Recibe por params el id del plan a buscar y devuelve un objeto con la información del mismo:

```shell
{
	"id": 1,
	"name": "Adulto mayor",
	"members": 2,
	"price": 120,
	"description": "Pareja de adultos mayores",
	"code": 1003,
	"consultations_per_patients": 20
}
```

- `pots => /plan` => Este endpoint permite crear un nuevo plan. Recibe un objeto con la siguiente información:

`name`: nombre del plan.

`members`: cantidad de personas que permite afiliar por el plan.

`price`: costo del plan. El tipo de dato es un INTEGER, por lo que no se recomienda usar separadores de miles.

`description`: descripción del plan.

`code`: código correlativo del plan.

`consultations_per_patients`: _este dato está próximo a ser eliminado porque no se implementará_. Cantidad de consultas por paciente.

```shell
{
    "name": "Full Care",
    "members": 5,
    "price": 100.000,
    "description": "Familiar",
    "code": 1001,
	"consultations_per_patients": 20
}
```

Devuelve:

```shell
{
	"id": 2,
	"name": "Full Care",
	"members": 5,
	"price": 100,
	"description": "Familiar",
	"code": 1001,
	"consultations_per_patients": 20
}
```

- `put => /plan` => Este endpoint recibe por body un objeto que incluye: id, name, members, price, description, code y consultations_per_patients y permite actualizar el plan con la nueva información que reciba.

Devuelve:

```shell
{
	"id": 2,
	"name": "Max Care",
	"members": 5,
	"price": 500,
	"description": "Familiar",
	"code": 1001,
	"consultations_per_patients": 30
}
```

- `delete => /plan/:id` => Este endpoint permite eliminar un plan. Recibe por params el id del plan a borrar.
  Devuelve:

```shell
"Se elimino el plan con el id = 1"
```

## Endpoints de la ruta _/analysis_:

- `get => /analysis` => Este endpoint devuelve un array con todos los análisis clínicos.

```shell
[
	{
		"id": 1,
		"name": "endoscopía",
		"speciality": "gastroenterología",
		"price": 200
	},
	{
		"id": 2,
		"name": "ecografía articular",
		"speciality": "kinesiología",
		"price": 200
	},
	{
		"id": 3,
		"name": "hematología completa",
		"speciality": "clínica médica",
		"price": 200
	},
	{
		"id": 4,
		"name": "electroencefalograma",
		"speciality": "neurología",
		"price": 200
	}
]
```

- `post => /analysis` => Este endpoint permite crear un nuevo análisis clinico. Recibe un objeto que contiene:

`name`: nombre del análisis.

`speciality`: especialidad asociada a ese análisis.

`price`: costo de ese análisis.

```shell
{
    "name": "electroencefalograma",
    "speciality": "neurología",
    "price": 200
}
```

Devuelve:

```shell
{
	"message": "El registro del Analisis se ha creado exitosamente"
}
```

- `put => /analysis` => Este endpoint permite actualizar un análisis específico. Recibe por body el id, name, speciality y price.
  Recibe por body:

```shell
{
	"id": 1
    "name": "electroencefalograma",
    "speciality": "neurología",
    "price": 300
}
```

Devuelve:

```shell
{
	"message": "modificado con exito"
}
```

- `delete => /analysis/:id` => Este endpoint permite borrar un análisis clinico enviando el id del análisis por params.

Devuelve:

```shell
"El Analisis fue borrado exitosamente"
```

## Endpoints de la ruta _/paid_:

- `get => /paid/:id` => Este endpoint recibe por params el id de un pago almacenado en el registro. Devuelve:

```shell
{
	"id": 16,
	"date": "2019-07-10T14:47:58.000Z",
	"description": "pago de análisis clínico",
	"price": 200,
	"paymentId": 16,
	"userId": 2,
	"planId": null
}
```

- `get => /paid` => Este endpoint recibe por body el id de un usuario específico y permite ubicar el histórico de pagos de ese usuario.
  Recibe:

```shell
{
	"userId": 2
}
```

Devuelve:

```shell
[
	{
		"id": 2,
		"date": "2019-07-10T14:47:58.000Z",
		"description": "pago de plan full care",
		"price": 100,
		"paymentId": 2,
		"userId": 2,
		"planId": 2
	},
	{
		"id": 16,
		"date": "2019-07-10T14:47:58.000Z",
		"description": "pago de análisis clínico",
		"price": 200,
		"paymentId": 16,
		"userId": 2,
		"planId": null
	},
	{
		"id": 17,
		"date": "2019-07-10T14:47:58.000Z",
		"description": "pago de análisis clínico",
		"price": 200,
		"paymentId": 17,
		"userId": 2,
		"planId": null
	}
]
```

## Endpoints de la ruta _/ticketAnalysis_:

- `get => /ticketAnalysis` => Este endpoint devuelve un array con todos los turnos para análisis clínicos solicitados.
  Devuelve:

```shell
[
	{
		"id": 14,
		"date": "2023-04-13",
		"hour": "09:55",
		"price": 200,
		"is_paid": true,
		"is_delete": false,
		"analysisId": 2,
		"paymentId": 16,
		"patientId": 2,
		"analysis": {
			"id": 2,
			"name": "ecografía articular",
			"speciality": "kinesiología",
			"price": 200
		},
		"payment": {
			"id": 16,
			"description": "pago de análisis clínico",
			"price": 200,
			"code": 69754896,
			"userId": 2
		},
		"patient": {
			"id": 2,
			"dni": 5986487,
			"full_name": "Bernardo Brocheit",
			"gender": "masculino",
			"age": 53,
			"birthday": "1970-12-12",
			"phone": "2659749851",
			"address": "Lima, Perú",
			"is_delete": false,
			"planId": null,
			"userId": 2
		}
	},
	{
		"id": 16,
		"date": "2023-04-13",
		"hour": "10:55",
		"price": 200,
		"is_paid": false,
		"is_delete": false,
		"analysisId": 1,
		"paymentId": null,
		"patientId": 1,
		"analysis": {
			"id": 1,
			"name": "endoscopía",
			"speciality": "gastroenterología",
			"price": 200
		},
		"payment": null,
		"patient": {
			"id": 1,
			"dni": 79563254,
			"full_name": "Maluma la del Barrio",
			"gender": "empoderada",
			"age": 25,
			"birthday": "1998-02-06",
			"phone": "859874621",
			"address": "Colombia",
			"is_delete": false,
			"planId": null,
			"userId": 1
		}
	}
]
```

- `get => /ticketAnalysis/:id` => Este endpoint permite buscar un turno para análisis por id. Recibe por params el id del turno y devuelve un objeto con la información del turno.

```shell
{
	"id": 16,
	"date": "2023-04-13",
	"hour": "10:55",
	"price": 200,
	"is_paid": false,
	"is_delete": false,
	"analysisId": 1,
	"paymentId": null,
	"patientId": 1,
	"analysis": {
		"id": 1,
		"name": "endoscopía",
		"speciality": "gastroenterología",
		"price": 200
	},
	"payment": null,
	"patient": {
		"id": 1,
		"dni": 79563254,
		"full_name": "Maluma la del Barrio",
		"gender": "empoderada",
		"age": 25,
		"birthday": "1998-02-06",
		"phone": "859874621",
		"address": "Colombia",
		"is_delete": false,
		"planId": null,
		"userId": 1
	}
}
```

- `post => /ticketAnalysis/createTicketAnalisys` => Este endpoint permite crear un nuevo turno para análisis clínico. Recibe por body un objeto con la siguiente información:

`idAnalysis`: el id del análisis que seleccionó.

`idPatient`: el id del paciente que se realizará el estudio.

`date`: fecha del estudio en el formato indicado en el ejemplo.

`hour`: hora del estudio.

`price`: costo del estudio.

```shell
{
        "idAnalysis": "1",
        "idPatient": "1",
        "date": "2023-04-13",
        "hour": "10:55",
        "price": 200
}
```

Devuelve:

```shell
"Turno creado exitosamente"
```

- `delete => /ticketAnalysis/:id/delete` => Este endpoint permite borrar un turno para análisis clínico. Recibe por params el id del turno a borrar. Devuelve:

```shell
"El turno para análisis clinico fue borrado exitosamente"
```

- `delete => /ticketAnalysis/destroyAllTicket` => este endpoint es capaz de destruir TODOS los registros de turnos para análisis creados en la base de datos.
  Devuelve:

```shell
"Todos los registros de los turnos para análisis clínico fueron exitosamente destruidos"
```

## Endpoints de la ruta _/payment_:

- `get => /payment` => Este endpoint recibe por body el id del usuario y permite consultar pagos asociados a ese usuario.
  Recibe:

```shell
{
	"userId": 2
}
```

Devuelve:

```shell
[
	{
		"id": 2,
		"description": "pago de plan full care",
		"price": 100,
		"code": 75982146,
		"userId": 2
	},
	{
		"id": 16,
		"description": "pago de análisis clínico",
		"price": 200,
		"code": 69754896,
		"userId": 2
	},
]
```

- `get => /payment/:id` => Este endpoint recibe por params el id del pago específico a consultar.
  Devuelve:

```shell
{
	"id": 16,
	"description": "pago de análisis clínico",
	"price": 200,
	"code": 69754896,
	"userId": 2
}
```

- `post => /payment/createPaymentPlan` => Este endpoint permite registrar el pago realizado por un usuario por concepto de "pago de algún plan". Recibe un objeto con la siguiente información:

`user`: id del usuario que realizó el pago para la adquisición del plan.

`planId`: id del plan que contrató.

`description`: concepto o breve descripción del pago. Proviene en el objeto con la aprobación que envía la pasarella de MercadoPago.

`price`: monto cancelado. Proviene en el objeto con la aprobación que envía la pasarella de MercadoPago.

`code`: id del objeto que envía MercadoPago.

`date`: fecha de creación de la incidencia. Proviene en el objeto con la aprobación que envía la pasarella de MercadoPago.

```shell
{
    "user": 2,
    "planId": 2,
    "description": "pago de plan full care",
    "price": 100.000,
    "code": 75982146,
	"date": "2019-07-10T14:47:58.000Z"
}
```

Devuelve:

```shell
"El pago del plan se ha realizado con éxito"
```

- `post => /payment/createPaymentAnalysis` => Este endpoint permite registrar el pago realizado por un usuario por concepto de "pago de análisis clínicos". Recibe un objeto con la siguiente información:

`user`: id del usuario que realizó el pago para la adquisición del plan.

`ticketsId`: id del turno clínico.

`description`: concepto o breve descripción del pago. Proviene en el objeto con la aprobación que envía la pasarella de MercadoPago.

`price`: monto cancelado. Proviene en el objeto con la aprobación que envía la pasarella de MercadoPago.

`code`: id del objeto que envía MercadoPago.

`date`: fecha de creación de la incidencia. Proviene en el objeto con la aprobación que envía la pasarella de MercadoPago.

```shell
{
    "ticketsIds": 16,
    "user": 2,
    "description": "pago de análisis clínico",
    "price": 200,
    "code": 69754896,
	"date": "2019-07-10T14:47:58.000Z"
}
```

Devuelve:

```shell
"El pago del análisis se ha realizado con éxito"
```

## Endpoints de la ruta _/comment_:

- `get => /comment/` => Este endpoint devuelve un array con todos los comentarios guardados en la base de datos.
  Devuelve:

```shell
[
	{
		"id": 1,
		"comment": "Su servicio es excelente",
		"rating": 10,
		"userId": 2
	},
	{
		"id": 2,
		"comment": "Muy buenos los servicios",
		"rating": 10,
		"userId": 2
	},
	{
		"id": 3,
		"comment": "Muy buenos los servicios",
		"rating": 10,
		"userId": 5
	},
	{
		"id": 4,
		"comment": "Excelente",
		"rating": 10,
		"userId": 5
	}
]
```

- `get => /comment/userComments` => Este endpoint devuelve un array con todos los comentarios que pertenecen a un usuario eb específico. Recibe el id del usuario por body:
  Rebibe:

```shell
{
	"userId": 2
}
```

Devuelve:

```shell
[
	{
		"id": 1,
		"comment": "Su servicio es excelente",
		"rating": 10,
		"userId": 2
	},
	{
		"id": 2,
		"comment": "Muy buenos los servicios",
		"rating": 10,
		"userId": 2
	}
]
```

- `post => /comment` => Este endpoint recibe por body un objeto con el id del usuario que crea el comentario, su momentario y su calificación; devuelve un mensaje.
  Recibe:

```shell
{
	"id": 2,
	"comment": "Muy buenos los servicios",
	"rating": 10,
}
```

Devuelve:

```shell
{
	"Comentario creado satisfactoriamente"
}
```

## Endpoints de la ruta _/day_:

- `get => /day` => Este endpoint devuelve un array con los días de la semana creados, junto con la información de los turnos, horarios y doctores asociados a ese día.

```shell
[
	{
		"id": 1,
		"day": "Lunes",
		"ticketMedicals": [
			{
				"id": 35,
				"title": "cefaleas",
				"observations": "Consulta con Neurología",
				"date": "2023-04-10",
				"hour": "08:30",
				"is_confirmed": false,
				"is_delete": false,
				"is_canceled": false,
				"scheduleId": 35,
				"patientId": null,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 36,
				"title": "cefaleas",
				"observations": "Consulta con Neurología",
				"date": "2023-04-10",
				"hour": "08:30",
				"is_confirmed": false,
				"is_delete": false,
				"is_canceled": false,
				"scheduleId": 36,
				"patientId": 2,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 38,
				"title": "cefaleas",
				"observations": "Consulta con Neurología",
				"date": "2023-04-10",
				"hour": "08:30",
				"is_confirmed": false,
				"is_delete": false,
				"is_canceled": false,
				"scheduleId": 38,
				"patientId": 2,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 39,
				"title": "cefaleas",
				"observations": "Consulta con Neurología",
				"date": "2023-04-10",
				"hour": "08:30",
				"is_confirmed": false,
				"is_delete": false,
				"is_canceled": false,
				"scheduleId": 39,
				"patientId": 2,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 40,
				"title": "cefaleas",
				"observations": "Consulta con Neurología",
				"date": "2023-04-10",
				"hour": "08:30",
				"is_confirmed": false,
				"is_delete": false,
				"is_canceled": false,
				"scheduleId": 40,
				"patientId": 2,
				"doctorId": 1,
				"dayId": 1
			}
		],
		"schedules": [
			{
				"id": 37,
				"date": "2023-04-10",
				"hour": "08:30",
				"is_delete": true,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 34,
				"date": "2023-04-10",
				"hour": "08:00",
				"is_delete": true,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 40,
				"date": "2023-04-10",
				"hour": "08:30",
				"is_delete": true,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 39,
				"date": "2023-04-10",
				"hour": "08:30",
				"is_delete": true,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 38,
				"date": "2023-04-10",
				"hour": "08:30",
				"is_delete": true,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 36,
				"date": "2023-04-10",
				"hour": "08:30",
				"is_delete": true,
				"doctorId": 1,
				"dayId": 1
			},
			{
				"id": 35,
				"date": "2023-04-10",
				"hour": "08:30",
				"is_delete": true,
				"doctorId": 1,
				"dayId": 1
			}
		],
		"doctors": [
			{
				"id": 1,
				"full_name": "Paco Gerlo",
				"specialities": [
					{
						"speciality": "neurología"
					}
				]
			},
			{
				"id": 4,
				"full_name": "Maxima Poronga",
				"specialities": [
					{
						"speciality": "cardiología"
					}
				]
			}
		]
	}
]
```

- `post => /day` => Este endpoint recibe por body `day` con el día de la semana a crear.
  Recibe:

```shell
{
	"day": "Viernes"
}
```

Devuelve:

```shell
"Se ha creado el día exitosamente"
```
