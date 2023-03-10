import { ButtonThree } from '../../components/buttons/Buttons';
import './SearchGroups.css';
import { InputOne } from '../../components/inputs/Inputs';
import { useState } from 'react';
import { ButtonOne } from '../../components/buttons/Buttons';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  SEARCH_GROUP_NAME,
  GET_HELP_WANTED_ADS,
  SEARCH_GROUP_BY_TAG,
} from '../../utils/queries';
import GroupCard from '../../components/GroupCard/GroupCard';
import { Link } from 'react-router-dom';

const options = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Python', value: 'python' },
  { label: 'Ecommerce', value: 'ecommerce' },
  { label: 'MongoDB', value: 'mongodb' },
  { label: 'MySQL', value: 'mysql' },
  { label: 'Rust', value: 'rust' },
];

const SearchGroupsPage = () => {
  const [searchType, setSearchType] = useState(null);

  const [searched, setSearched] = useState(false);

  const [searchTag, setSearchedTag] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleTagSelect = (event) => {
    const tagValue = event.target.value;
    if (selectedTags.includes(tagValue)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagValue));
    } else {
      setSelectedTags([...selectedTags, tagValue]);
    }
  };

  const [getGroupByName, { loading, error, data }] =
    useLazyQuery(SEARCH_GROUP_NAME);

  const [
    searchGroupByTag,
    { loading: groupTagsLoading, error: tagsError, data: tagsData },
  ] = useLazyQuery(SEARCH_GROUP_BY_TAG);

  const [
    getHelpWantedAds,
    { loading: adLoading, error: adError, data: adData },
  ] = useLazyQuery(GET_HELP_WANTED_ADS);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchForGroup = () => {
    if (searchTerm) {
      setSearched(true);
      getGroupByName({ variables: { groupName: searchTerm } });
    }
  };

  const handleSubmit = () => {
    setSearchedTag(true);
    searchGroupByTag({ variables: { tags: selectedTags } });
  };

  const searchForHelpWanted = () => {
    getHelpWantedAds();
    setSearchType('helpWanted');
  };

  const group = data?.searchGroupName;

  const ads = adData?.getHelpWantedAds;

  const tData = tagsData?.searchGroupByTag;

  console.log(tData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (adLoading) return <p>Loading help wanted ads...</p>;
  if (groupTagsLoading) return <p>loading</p>;

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
            <InputOne
              placeholder="Group Name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <ButtonOne buttonName="Search" onClick={searchForGroup} />
          </div>
        ) : searchType === 'tags' ? (
          <div className="tag-section">
            <h1>Search for group by tags</h1>
            <div>
              {options.map(({ label, value }) => (
                <div className="all-tags" key={value}>
                  <input
                    type="checkbox"
                    id={value}
                    name={value}
                    value={value}
                    checked={selectedTags.includes(value)}
                    onChange={handleTagSelect}
                  />
                  <label htmlFor={value}>{label}</label>
                </div>
              ))}
              <ButtonOne onClick={handleSubmit} buttonName="Submit" />
              {searchTag && tData.length === 0 && (
                <p>No groups found with these tags ????</p>
              )}
              {searchTag &&
                tData.length > 0 &&
                tData.map((group) => {
                  return (
                    <Link className='group-card-link' to={`/group/${group._id}`}>
                      <h2>{group.groupName}</h2>
                      <p>
                        {group.members.length}{' '}
                        {group.members.length > 1 || group.members.length === 0
                          ? 'members'
                          : 'member'}
                      </p>
                      <div className='tag-section-card'>
                        {group.tags.map((tag) => {
                          return <p>{tag}</p>
                        })}

                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        ) : searchType === 'helpWanted' ? (
          <div className="help-wanted-search">
            {ads.map((ad) => (
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
