import axios from 'axios';
import styles from './user.module.scss';

interface IProps {
  active: boolean;
  setActive: (data: boolean) => void;
  userId: string;
}

export default function UserDelete({ active, setActive, userId }: IProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    try {
      const response = await axios.post('http://localhost:3001/user/delete', {
        id: userId,
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
          <form onSubmit={handleSubmit} className={styles.form_delete}>
            <div>Видалити користувача?</div>
            <button type="submit" className={styles.button}>Підтвердити</button>
          </form>
        </div>
      </div>
    </>
  );
}
