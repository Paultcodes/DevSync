import './homepage.css';
// import HomeCard from '../../components/HomeCards/HomeCard';
// import  cardContent  from '../../components/HomeCards/CardContent';
import HomeCard from '../../components/HomeCards/HomeCard';
import cardContent from '../../components/HomeCards/CardContent';

const HomePage = () => {
  const loggedIn = true;
  return (
    <div className="home">
      <div className="top-front-page">
        <div className="greetings">
          {loggedIn ? (
            <h1>
              Welcome, Jon <br /> You have 7 new notifications
            </h1>
          ) : (
            <h1>
              Join, <br />
              Build and <br /> Share!
            </h1>
          )}
        </div>
        <div>
          {loggedIn ? (
            <h3>Read about whats new with DevSync</h3>
          ) : (
            <h2>Join for free today and connecting with other developer</h2>
          )}
        </div>
      </div>

      <div className="bottom-section">
        {cardContent.map(({ title, text }) => {
          return <HomeCard title={title} text={text} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
