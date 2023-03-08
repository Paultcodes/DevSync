import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../../utils/queries';

const MyGroupsPage = () => {
  const { loading, data } = useQuery(GET_ME);
  console.log(data);

  const userData = data?.me.ownedGroups || [];

  console.log(userData);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {userData.map((data) => {
        return (
          <Link to={`/group/${data._id}`}>
            <h1>{data.groupName}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default MyGroupsPage;
