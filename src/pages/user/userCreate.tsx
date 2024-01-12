import axios from 'axios';
import { useState } from 'react';
import styles from './user.module.scss'

interface IProps {
  active: boolean;
  setActive: (data: boolean) => void;
}

export default function UserCreate({ active, setActive }: IProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [surName, setSurName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/create', {
        firstName,
        lastName,
        surName,
        phone,
        email,
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={active ? `${styles.popup_active}` : `${styles.popup}`} onClick={() => setActive(false)}>
        <div
          className={active ? `${styles.popup_content_active}` : `${styles.popup_content}`}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className={styles.formCreate}>
            <div className={styles.popupName}>Додати клієнта</div>
            <input type="text" placeholder="Ім'я" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={styles.input}/>
            <input type="text" placeholder="Прізвище" value={lastName} onChange={(e) => setLastName(e.target.value)} className={styles.input}/>
            <input type="text" placeholder="По батькові" value={surName} onChange={(e) => setSurName(e.target.value)} className={styles.input}/>
            <input type="text" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input}/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input}/>
            <button type="submit" className={styles.button}>Надіслати</button>
          </form>
        </div>
      </div>
    </>
  );
}
