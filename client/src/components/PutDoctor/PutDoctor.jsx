import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsByID,getDoctors, putDoctor } from '../../redux/actions';
import style from './PutDoctor.module.css';
import Swal from 'sweetalert2';


const PutDoctor = () => {
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctor);
  const doctors = useSelector((state) => state.doctors);

  const [cerrar, setCerrar] = useState(false);

  useEffect(() => {
    dispatch(getDoctors())  
    setUserDate({
      id: doctor.id,
      phone: doctor.phone,
      address: doctor.address,
      image: doctor.image,
      full_name: doctor.full_name
    });
  }, [doctor]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getDoctorsByID(id));
  };

  const [userDate, setUserDate] = useState({
    id: '',
    phone: '',
    address: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Su médico ah sido actualizado.',
      showConfirmButton: false,
      timer: 800
    })
    
    dispatch(putDoctor(userDate));
  };



  const handleCerrar = (e)=>{
    e.stopPropagation();
    setCerrar(true)
  }
  return (
    <div className={style.container__putMedic}>
      <form onSubmit={handleSubmit}>


        <div className={style.container__search}>
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          placeholder='Ingrese ID'
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}><i class="fas fa-search"></i> Editar Médico</button>
      
        </div>

        <div className={style.tablesName}>
        <p>ID</p>
        <p>Perfíl</p>
        <p>Nombre</p>
        <p>Dirección</p>
        <p>Género</p>
        <p>Edad</p>
        <p>Matrícula</p>
      </div>




{doctors && doctors.map((doctor) => (
          <div className={style.medicInfo}>
            <p>{doctor.id}</p>
            <div className={style.container__image}>
              <img src={doctor.image} alt={doctor.full_name} />
            </div>
            <p>{doctor.full_name}</p>
            <p>{doctor.address}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.age}</p>
            <p>{doctor.code}</p>

          </div>
        ))}
    60432382

        {doctor.id && (
          <div className={style.containerForm} >
           

<h2 className={style.h2Container}>Editar Medico </h2>
<div className={style.container__input__medic__info}>
            <label htmlFor="full_name">Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={userDate.full_name}
              disabled
            />
</div>

<div className={style.container__input__medic__info}>

            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDate.phone}
              onChange={handleChange}
            />
</div>



<div className={style.container__input__medic__info}>

            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userDate.address}
              onChange={handleChange}
            />
</div>


<div className={style.container__input__medic__info}>

            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={userDate.image}
              onChange={handleChange}
            />
</div>

            <button className={style.button} type="submit">Actualizar Datos</button>
          </div>
        )}
      </form>
    </div>
  );
};
export default PutDoctor;




