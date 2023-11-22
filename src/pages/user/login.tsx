import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './user.module.scss';

export default function LoginFunction() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        phone,
        password,
      });

      if (response.status === 200) {
        navigate('/user/getAll');
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWindow}>
        Авторизація
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form__group}>
            <input
              type="input"
              className={styles.form__field}
              placeholder="Телефон"
              name="name"
              id="name"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label htmlFor="name" className={styles.form__label}>
              Телефон
            </label>
          </div>
          <div className={styles.form__group}>
            <input
              type="input"
              className={styles.form__field}
              placeholder="Пароль"
              name="name"
              id="name"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="name" className={styles.form__label}>
              Пароль
            </label>
          </div>
          <button type="submit" className={styles.button}>
            Надіслати
          </button>
        </form>
      </div>
    </div>
  );
}
