import { useEffect, useState } from 'react';
import UserService from '../../service/user.service';

export default function UserGetAll() {
  const [data, setData] = useState<any>(null);
  const gitOnServer = async () => {
    const res = await UserService();
    setData(res);
  };
  console.log(data);

  useEffect(() => {
    gitOnServer();
  }, []);

  return (
    <>
      <div>
        {data && (
          <div>
            {data[0].phone}
          </div>
        )}
      </div>
    </>
  );
}
