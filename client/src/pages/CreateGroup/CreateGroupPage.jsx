import { useState } from "react";
import { InputTwo } from "../../components/inputs/Inputs";
import { ButtonOne } from "../../components/buttons/Buttons";
import { Link } from "react-router-dom";
import "./creategroup.css";

import auth from "../../utils/auth";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GROUP } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";

const CreateGroupPage = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [createGroup] = useMutation(CREATE_GROUP);
  const [groupType, setGroupType] = useState("open");
  const [responseMessage, setResponseMessage] = useState(false);
  const userData = data?.me.ownedGroups || [];

  const [groupForm, setGroupForm] = useState({
    groupName: "",
    type: "open"
  });

  const handleRadioChange = (event) => {
    setGroupType(event.target.value);

    setGroupForm((prevState) => ({
      ...prevState,
      type: event.target.value
    }));
  };

  const handleChange = (e) => {
    setGroupForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await createGroup({
        variables: { ...groupForm }
      });
      if (data) {
        refetch();
      }
    } catch (err) {
      console.log(err);
    }

    setGroupForm({
      groupName: "",
      type: "open"
    });
    setResponseMessage(true);
  };

  if (loading) return <h1>loading...</h1>;

  const AccessLvl = (lvl) => (
    <div>
      <label>
        <input
          type="radio"
          name="groupType"
          value={lvl}
          checked={groupType === lvl}
          onChange={handleRadioChange}
        />
        {lvl.toUpperCase()}
      </label>
    </div>
  );

  return (
    <form className="create-form">
      <h1>Create Group</h1>

      <div>
        {AccessLvl("open")}
        {AccessLvl("private")}
      </div>

      <div className="create-group-input">
        {responseMessage && <p>Group Created ✅</p>}
        <InputTwo
          name="groupName"
          onChange={handleChange}
          placeholder="Group name"
          value={groupForm.groupName}
        />
        <ButtonOne buttonName="Submit" onClick={handleSubmit} />
      </div>

      <div className="card-section">
        {userData ? (
          userData.map(({ _id, groupName, members, tags }) => {
            return (
              <Link className="group-card" to={`/group/${_id}`}>
                <h2>{groupName}</h2>
                <p>
                  {members.length}{" "}
                  {members.length > 1 || members.length === 0
                    ? "members"
                    : "member"}
                </p>
                <div className="tag-section">
                  {tags.map((tag) => {
                    return <p>{tag}</p>;
                  })}
                </div>
              </Link>
            );
          })
        ) : (
          <>Create a group</>
        )}
      </div>
    </form>
  );
};

export default CreateGroupPage;
