import axios from 'axios';
import { useState } from 'react';
import styles from './order.module.scss';
// import { v4 } from 'uuid';

interface IProps {
  active: boolean;
  setActive: (data: boolean) => void;
  userIdImport: string;
  carIdImport: string;
}

export default function OrderCreate({ active, setActive, userIdImport, carIdImport }: IProps) {
  const [workList, setWorkList] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/order/create', {
        workList,
        userId: userIdImport,
        carId: carIdImport,
        createData: new Date(),
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
    <div className={active ? `${styles.popup_active}` : `${styles.popup}`} onClick={() => setActive(false)}>
      <div
        className={active ? `${styles.popup_content_active}` : `${styles.popup_content}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className={styles.formCreate}>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Список робіт"
            value={workList}
            onChange={(e) => setWorkList(e.target.value)}
            className={styles.input}
          ></textarea>
          <button type="submit" className={styles.button}>
            Надіслати
          </button>
        </form>
      </div>
    </div>
  );
}
