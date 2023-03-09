import './homepage.css';
// import HomeCard from '../../components/HomeCards/HomeCard';
// import  cardContent  from '../../components/HomeCards/CardContent';
import HomeCard from '../../components/HomeCards/HomeCard';
import cardContent from '../../components/HomeCards/CardContent';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import auth from '../../utils/auth';

const HomePage = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="home">
      <div className="top-front-page">
        <div className="greetings">
          {auth.loggedIn() ? (
            <h1>
              Welcome, {userData.firstName} <br />{' '}
              {userData.invites.length === 0 ? (
                <span>You have no new notifications</span>
              ) : (
                <span>
                  You have {userData.invites.length} new{' '}
                  {userData.invites.length > 1
                    ? 'notifications'
                    : 'notification'}
                </span>
              )}
            </h1>
          ) : (
            <h1>
              Join, <br />
              Build and <br /> Share!
            </h1>
          )}
        </div>
        <div>
          {auth.loggedIn() ? (
            <h3>Read about whats new with DevSync</h3>
          ) : (
            <h2>Join for free today and connecting with other developer</h2>
          )}
        </div>
      </div>

      <div className="bottom-section">
        {cardContent.map(({ title, text }) => {
          return <HomeCard key={title} title={title} text={text} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
