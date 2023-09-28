import { useEffect, useState } from 'react';
import { Login } from '../../service/user.service';

export default function LoginFunction() {
  const [data, setData] = useState<any>(null);
  const gitOnServer = async () => {
    const res = await Login();
    setData(res);
  };
  console.log(data);

  useEffect(() => {
    gitOnServer();
  }, []);

  return (
    <>
      <input type="text" placeholder="Phone" />
      <input type="text" placeholder="Password" />
    </>
  );
}
