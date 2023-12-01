import axios from 'axios';

interface IProps {
  userIdImport: string;
}

export default function UserToCarCreate({ userIdImport }: IProps) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://localhost:3001/userToCar/create', {
        userId: userIdImport,
      });


      if (response.status === 200) {

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
