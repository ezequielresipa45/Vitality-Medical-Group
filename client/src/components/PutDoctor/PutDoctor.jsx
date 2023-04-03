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
    dispatch(putDoctor(userDate));
  };

  return (
    <div className={style.firstDiv}>
      <h2>Update Doctor Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Doctor ID</label>
        <input
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <br />
        <br />
        {doctor.id && (
          <>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDate.phone}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userDate.address}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={userDate.image}
              onChange={handleChange}
            />
            <br />
            <br />
            <button className={style.button} type="submit">Update Details</button>
          </>
        )}
      </form>
    </div>
  );
};
export default PutDoctor;   




