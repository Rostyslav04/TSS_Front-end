import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IProps {
  userIdImport: string;
}

export default function UserToCarCreate({ userIdImport }: IProps) {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://localhost:3001/userToCar/create', {
        userId: userIdImport,
      });


      if (response.status === 200) {
        console.log('ok');
        navigate('/order/getAll');

      } else {
        console.log('error');
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      </form>
    </>
  );
}
