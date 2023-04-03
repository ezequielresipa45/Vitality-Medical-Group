import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsByID, putDoctor } from '../../redux/actions';
import style from './PutDoctor.module.css';

const PutDoctor = () => {
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctor);

  useEffect(() => {
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
    full_name: '',
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
    dispatch(putDoctor(userDate));
  };

  return (
    <div className={style.container__putMedic}>
      <form onSubmit={handleSubmit}>

        <div className={style.container__search}>

        <input
          type="text"
          id="id"
          name="id"
          value={id}
          placeholder='Ingrese un Id'
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}><i class="fas fa-search"></i> Buscar Médico</button>
        


        </div>

        {doctor.id && (
          <>


<div className={style.container__input__medic__info}>
            <label htmlFor="full_name">Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={userDate.full_name}
              onChange={handleChange}
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
          </>
        )}
      </form>
    </div>
  );
};
export default PutDoctor;




