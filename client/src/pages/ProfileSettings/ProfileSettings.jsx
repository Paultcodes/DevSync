import "./settings.css";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ADD_TAG } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { ButtonOne } from "../../components/buttons/Buttons";
const ProfileSettings = () => {
  const [addTagsToUser] = useMutation(ADD_TAG);
  const { loading, data, refetch } = useQuery(GET_ME);
  const userData = data?.me || [];

  const [selectedTag, setSelectedTag] = useState("");

  const handleTagSelected = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const { data } = addTagsToUser({
        variables: { tag: selectedTag }
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const tagOptions = [
    "Javascript",
    "Python",
    "React",
    "HTML",
    "CSS",
    "Express.js",
    "Mongoose",
    "MySQL"
  ];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="settings-section">
      <div className="settings">
        <div className="tech-pros">
          <h2>Technical Proficiencies</h2>
          <div className="tags">
            {userData.skills.map((tag) => {
              return <p className="tag-element">{tag}</p>;
            })}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <select value={selectedTag} onChange={handleTagSelected}>
              <option value="">Choose a tag...</option>
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button type="submit" disabled={!selectedTag}>
              Add Tag
            </button>
          </form>
        </div>
        <div className="add-tag-section">
          <ButtonOne buttonName={<FaPlus />} />
          <div className="tag-selector"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
