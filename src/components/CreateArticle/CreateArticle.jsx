import React from "react";
import "./CreateArticle.css";

export default function CreateArticle(props) {
  const { onCreateArticle, user } = props;
  return (
    <div className="createArticle">
      <form onSubmit={onCreateArticle}>
        <label htmlFor="Section">Section</label>
        <input
          type="text"
          className="form-control"
          id="sectionCreate"
          name="section"
        />
        <label htmlFor="SubSection">Sub-Section</label>
        <input
          type="text"
          className="form-control"
          id="subSectionCreate"
          name="subsection"
        />
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          className="form-control"
          id="titleCreate"
          name="title"
        />
        <label>
          Your article:
          <textarea name="body" />
        </label>
        <label htmlFor="Created_Date">Created Date</label>
        <input
          type="text"
          className="form-control"
          id="createdDateCreate"
          name="created_date"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
