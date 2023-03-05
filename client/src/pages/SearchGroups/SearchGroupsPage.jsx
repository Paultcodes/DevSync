import { ButtonThree } from '../../components/buttons/Buttons';
import './SearchGroups.css';
import { InputOne } from '../../components/inputs/Inputs';
import { useState } from 'react';
import { ButtonOne } from '../../components/buttons/Buttons';
import { useQuery, useLazyQuery } from '@apollo/client';
import { SEARCH_GROUP_NAME } from '../../utils/queries';
import GroupCard from '../../components/GroupCard/GroupCard';

const SearchGroupsPage = () => {
  const [searchType, setSearchType] = useState(null);

  const [searched, setSearched] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [getGroupByName, { loading, error, data }] =
    useLazyQuery(SEARCH_GROUP_NAME);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchForGroup = () => {
    if (searchTerm) {
      setSearched(true);
      getGroupByName({ variables: { groupName: searchTerm } });
    }
  };

  const group = data?.searchGroupName;

  console.log(group);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

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
      <div className="search-section">
        {searchType === 'groupName' ? (
          <div className="name-search">
            <InputOne value={searchTerm} onChange={handleSearch} />
            <ButtonOne buttonName="Search" onClick={searchForGroup} />
          </div>
        ) : searchType === 'tags' ? (
          <div className="tag-search"></div>
        ) : (
          <h3>Start searching for a group to work with</h3>
        )}
      </div>
      <div>
        {searched && !group && <p>No group found.</p>}
        {group && <GroupCard groupId={group._id} groupName={group.groupName} />}
      </div>
    </div>
  );
};

export default SearchGroupsPage;
