import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_ME } from "../../utils/queries";
import "./mygroupspage.css";

const MyGroupsPage = () => {
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || [];

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="mygroups">
        <h1>My Groups</h1>

        {userData.ownedGroups.map((data) => {
          return (
            <Link to={`/group/${data._id}`}>
              <h1>{data.groupName} fgf</h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyGroupsPage;
