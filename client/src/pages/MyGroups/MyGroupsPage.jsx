import { useQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const MyGroupsPage = () => {
  const { loading, data } = useQuery(GET_ME);
  console.log(data)

  const userData = data?.me.ownedGroups || [];

  console.log(userData);
  return <div>
    {userData.map((data) => {
        return <h1>{data.groupName}</h1>
    })}
  </div>;
};

export default MyGroupsPage;
