import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

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

  const handleBodyChange = (event) => {
    let newBody = event.target.value;
    updateDetails({ ...articleDetails, body: newBody });
  };

  const handleCreatedDateChange = (event) => {
    let newCreatedDate = event.target.value;
    updateDetails({ ...articleDetails, created_date: newCreatedDate });
  };

  const handleAuthorChange = (event) => {
    let newAuthor = event.target.value;
    updateDetails({ ...articleDetails, author: newAuthor });
  };

  if (!articleDetails) {
    return <p>Loading...</p>;
  }

  const { onEditArticle } = props;

  return (
    <div className="editArticle">
      <form
        onSubmit={(event) => {
          onEditArticle(event, articleDetails);
        }}
      >
        <label htmlFor="Section">Section</label>
        <input
          type="text"
          className="form-control"
          id="sectionEdit"
          name="section"
          onChange={handleSectionChange}
        />
        <label htmlFor="SubSection">Sub-Section</label>
        <input
          type="text"
          className="form-control"
          id="subSectionEdit"
          name="subsection"
          onChange={handleSubSectionChange}
        />
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          className="form-control"
          id="titleEdit"
          name="title"
          onChange={handleTitleChange}
        />
        <label>
          Your article:
          <textarea name="body" onChange={handleBodyChange} />
        </label>
        <label htmlFor="Created_Date">Created Date</label>
        <input
          type="text"
          className="form-control"
          id="createdDateEdit"
          name="created_date"
          onChange={handleCreatedDateChange}
        />
        <label htmlFor="Author">Author</label>
        <input
          type="text"
          className="form-control"
          id="authorEdit"
          name="author"
          onChange={handleAuthorChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditArticle;
