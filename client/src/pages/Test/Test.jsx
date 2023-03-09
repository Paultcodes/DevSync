import { useQuery } from '@apollo/client';
import { ALL_USERS } from '../../utils/queries';
import { Link } from 'react-router-dom';

const Test = () => {
  const { loading, data } = useQuery(ALL_USERS);

  const allUser = data?.getAllUsers || [];

  return (
    <div>
      {allUser.map((data) => {
        return (
          <div>
            <Link to={`/profile/${data._id}`}>{data.username}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Test;
