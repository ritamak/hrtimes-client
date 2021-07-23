import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

function EditArticle(props) {
  const [articleDetails, updateDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let id = props.match.params.id;
        let response = await axios.get(`${API_URL}/api/article/${id}`);

        updateDetails(response.data);
      } catch (error) {
        console.log("Todo fetch failed", error);
      }
    })();
  }, []);

  const handleSectionChange = (event) => {
    let newSection = event.target.value;
    updateDetails({ ...articleDetails, section: newSection });
  };

  const handleSubSectionChange = (event) => {
    let newSubSection = event.target.value;
    updateDetails({ ...articleDetails, subsection: newSubSection });
  };

  const handleTitleChange = (event) => {
    let newTitle = event.target.value;
    updateDetails({ ...articleDetails, title: newTitle });
  };

  const handleSectionChange = (event) => {
    let newBody = event.target.value;
    updateDetails({ ...articleDetails, body: newBody });
  };

  const handleSectionChange = (event) => {
    let newCreatedDate = event.target.value;
    updateDetails({ ...articleDetails, created_date: newCreatedDate });
  };

  const handleSectionChange = (event) => {
    let newAuthor = event.target.value;
    updateDetails({ ...articleDetails, author: newAuthor });
  };

  if (!articleDetails) {
    return <p>Loading...</p>;
  }

  const { onEditArticle } = props;

  return (
    <div>

    </div>;
  )
}

export default EditArticle;
