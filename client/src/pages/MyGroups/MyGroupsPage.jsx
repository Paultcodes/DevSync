import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../../utils/queries';
import './mygroupspage.css';

const MyGroupsPage = () => {
  const { loading, data } = useQuery(GET_ME);
  console.log(data);

  const userData = data?.me|| [];

  console.log(userData);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return(
  <div>
    <div className="mygroups">
      <h1>My Groups</h1>
  
    {userData.ownedGroups.map((data) => {
      
      
      return (<Link to={`/group/${data._id}`}> 
      <h1>{data.groupName}</h1>
      </Link>)
     })}
</div>
<div className="membergroups">
      <h1>Groups I am in </h1>
  
    {userData.groupsAsMember.map((data) => {
      
      
      return (<Link to={`/group/${data._id}`}> 
      <h1>{data.groupName}</h1>
      </Link>)
     })}
</div>

  </div>
  )
  
  
    
  
  
};

export default MyGroupsPage;
