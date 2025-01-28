import React from "react";

const Comments = ({ handleChange, values, errors, touched }) => {
  return (
    <div className="mb-4">
      <label htmlFor="comments">Comments:</label>
      <textarea
        id="comments"
        name="comments"
        value={values.comments}
        onChange={handleChange}
        className={`border rounded p-2 w-full ${touched.comments && errors.comments ? "border-red-500" : ""}`}
      />
      {touched.comments && errors.comments && (
        <span className="text-red-500">{errors.comments}</span>
      )}
    </div>
  );
};

export default Comments;