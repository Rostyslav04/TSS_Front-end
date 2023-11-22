import React, { useState } from 'react';
import axios from 'axios';
import popupStyles from '../user/user.module.scss';

interface IProps {
  active: boolean;
  setActive: (data: boolean) => void;
  userIdImport: string;
}

export default function CarCreate({ active, setActive, userIdImport }: IProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [registerPlate, setRegisterPlate] = useState('');
  const [VIN, setVIN] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/car/create', {
        VIN,
        model,
        year,
        registerPlate,
        brand,
      });

      if (response.status === 200) {
        const responseCreateUserToCar = await axios.post('http://localhost:3001/userToCar/create', {
          userId: userIdImport,
          carId: response.data.id,
        });
        window.location.reload();
        if (responseCreateUserToCar.status === 200) {
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={active ? `${popupStyles.popup_active}` : `${popupStyles.popup}`} onClick={() => setActive(false)}>
        <div
          className={active ? `${popupStyles.popup_content_active}` : `${popupStyles.popup_content}`}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className={popupStyles.formCreate}>
            <div className={popupStyles.popupName}>Додати авто</div>
            <input
              type="text"
              placeholder="Марка"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={popupStyles.input}
            />
            <input
              type="text"
              placeholder="Модель"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={popupStyles.input}
            />
            <input
              type="text"
              placeholder="Рік"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={popupStyles.input}
            />
            <input
              type="text"
              placeholder="Номер"
              value={registerPlate}
              onChange={(e) => setRegisterPlate(e.target.value)}
              className={popupStyles.input}
            />
            <input
              type="text"
              placeholder="VIN"
              value={VIN}
              onChange={(e) => setVIN(e.target.value)}
              className={popupStyles.input}
            />
            <button type="submit" className={popupStyles.button}>
              Надіслати
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
