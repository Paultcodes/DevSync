import './Card.css'

const HomeCard = (props) => {
  return (
    <div className="card">
      <div className="card-title">{props.title}</div>
      <div className="card-body">{props.text}</div>
    </div>
  );
};

export default HomeCard;
