import { useState, useContext, useEffect } from "react";
import "./GroupSettings.css";
import { ButtonOne } from "../buttons/Buttons";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ADD_TAGS_TO_GROUP } from "../../utils/mutations";
import { GroupDataContext } from "../../pages/GroupPage/GroupPage";

const options = [
  { label: "JavaScript", value: "javascript" },
  { label: "React", value: "react" },
  { label: "Python", value: "python" },
  { label: "Ecommerce", value: "ecommerce" },
  { label: "MongoDB", value: "mongodb" },
  { label: "MySQL", value: "mysql" },
  { label: "Rust", value: "rust" }
];

const TagSelector = ({ refetch }) => {
  const tags = useContext(GroupDataContext);
  useEffect(() => {
    setSelectedTags([...tags.tags]);
  }, [tags]);

  const [addTagsToGroup] = useMutation(ADD_TAGS_TO_GROUP);
  const { groupId } = useParams();
  const [selectedTags, setSelectedTags] = useState([]);
  const [showResponse, setShowResponse] = useState(false);

  const handleTagSelect = (event) => {
    const tagValue = event.target.value;
    if (selectedTags.includes(tagValue)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagValue));
    } else {
      setSelectedTags([...selectedTags, tagValue]);
    }
  };

  const handleSubmit = async (event) => {
    console.log(selectedTags);
    event.preventDefault();

    try {
      await addTagsToGroup({
        variables: {
          groupId,
          tags: selectedTags
        }
      });
      refetch();
      setShowResponse(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tag-section">
      <h1>Add Tags To Your Group</h1>
      {showResponse && <p>Tags Updated ✅</p>}
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
      </div>
    </div>
  );
};

export default TagSelector;
