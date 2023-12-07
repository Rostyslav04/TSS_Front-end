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

// interface IInput {
//   id: string;
//   data: string;
// }

export default function OrderCreate({ active, setActive, userIdImport, carIdImport }: IProps) {
  const [workList, setWorkList] = useState('');
  // const [data, setData] = useState<IInput[]>([]);

  // const addInput = () => {
  //   setData((prev) => [...prev, { id: v4(), data: '' }]);
  // };
  // const deleteInput = (id: string) => {
  //   setData((prev) => prev.filter((item) => item.id === id));
  // };
  // const changeInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
  //   setData((prev) =>
  //     prev.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, data: e.target.value };
  //       }
  //       return item;
  //     }),
  //   );
  // };

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
          {/* <button onClick={addInput}>add</button>
          {data.map((item) => (
            <input
              type="text"
              placeholder="Список робіт"
              value={data.find((findDate) => findDate.id === item.id)?.data}
              onChange={(e) => changeInput(e, item.id)}
              className={styles.input}
            />
          ))} */}
          {/* <input
              type="text"
              placeholder="Список робіт"
              value={workList}
              onChange={(e) => setWorkList(e.target.value)}
              className={styles.input}
            /> */}
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
