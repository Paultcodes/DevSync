import { ButtonThree } from '../../components/buttons/Buttons';
import './SearchGroups.css';
import { InputOne } from '../../components/inputs/Inputs';
import { useState } from 'react';
import { ButtonOne } from '../../components/buttons/Buttons';
import { useQuery, useLazyQuery } from '@apollo/client';
import { SEARCH_GROUP_NAME, GET_HELP_WANTED_ADS } from '../../utils/queries';
import GroupCard from '../../components/GroupCard/GroupCard';

const SearchGroupsPage = () => {
  const [searchType, setSearchType] = useState(null);

  const [searched, setSearched] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [getGroupByName, { loading, error, data }] =
    useLazyQuery(SEARCH_GROUP_NAME);

  const [getHelpWantedAds, { loading: adLoading, error: adError, data: adData }] =
    useLazyQuery(GET_HELP_WANTED_ADS);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchForGroup = () => {
    if (searchTerm) {
      setSearched(true);
      getGroupByName({ variables: { groupName: searchTerm } });
    }
  };

  const searchForHelpWanted = () => {
    
      getHelpWantedAds();
      setSearchType('helpWanted');
  };

  const group = data?.searchGroupName;

  const ads = adData?.getHelpWantedAds;


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if(adLoading) return <p>Loading help wanted ads...</p>;

  const handleClick = (e) => {
    setSearchType(e.target.name);
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
        <ButtonThree
          name="helpWanted"
          onClick={searchForHelpWanted}
          buttonName="View Help Wanted Ads"
        />
      </div>
      <div className="search-section">
        {searchType === 'groupName' ? (
          <div className="name-search">
            <InputOne placeholder='Group Name' value={searchTerm} onChange={handleSearch} />
            <ButtonOne buttonName="Search" onClick={searchForGroup} />
          </div>
        ) : searchType === 'tags' ? (
          <div className="tag-search">
            <InputOne placeholder='Tag' value={searchTerm} onChange={handleSearch} />
            <ButtonOne buttonName="Search" onClick={searchForGroup} />
          </div>
        ) : searchType === 'helpWanted' ? (
          <div className="help-wanted-search">
           { ads.map((ad) => (
             <div key={ad._id}>
              <h3>{ad.title}</h3>
              <p>contact {ad.group.groupName} to join</p>
              <p>{ad.description}</p>
            </div>
           ))}
           
          </div>
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
