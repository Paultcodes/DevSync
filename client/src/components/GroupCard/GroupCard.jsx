import { Link } from 'react-router-dom';

const GroupCard = (props) => {
  return (
    <div>
      <Link to={`/group/${props.groupId}`}>{props.groupName}</Link>
    </div>
  );
};

export default GroupCard;
