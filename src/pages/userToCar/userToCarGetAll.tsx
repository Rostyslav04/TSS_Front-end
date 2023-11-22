import { useEffect, useState } from 'react';
import { userToCarAll } from '../../service/userToCar.service';

export default function UserToCarGetAll() {
  const [data, setData] = useState<any>(null);
  const gitOnServer = async () => {
    const res = await userToCarAll();
    setData(res);
  };

  useEffect(() => {
    gitOnServer();
  }, []);

  return (
    <>
      <div>
        {data &&
          data.map((item: any) => (
            <>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              <div>ID user: {item.userId}</div>
              <div>ID car: {item.carId}</div>
            </>
          ))}
      </div>
    </>
  );
}
