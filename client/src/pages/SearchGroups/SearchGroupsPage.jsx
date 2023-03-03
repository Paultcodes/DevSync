import { ButtonThree } from '../../components/buttons/Buttons';
import './SearchGroups.css';
import { useState } from 'react';

const SearchGroupsPage = () => {
  const [searchType, setSearchType] = useState(null);

  const handleClick = (e) => {
    setSearchType(e.target.name);
    console.log(searchType);
  };
  return (
    <div className="search-group-page">
      <h1>Search groups</h1>
      <div className="button-section">
        <ButtonThree
          name="groupName"
          onClick={handleClick}
          buttonName="Search by name"
        />
        <ButtonThree
          name="tags"
          onClick={handleClick}
          buttonName="Search by tags"
        />
      </div>
    </div>
  );
};

export default SearchGroupsPage;
