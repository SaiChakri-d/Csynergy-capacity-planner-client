import React from "react";

const Description = ({ particular }) => {
  return (
    <>
      <div
        className="card"
        style={{ width: "93%", borderLeft: "solid #1976D2" }}
      >
        <div className="row mx-3 mt-3">
          <div className="col-md-6">
            <b>Project Name</b>
            <p>{particular.projectName}</p>
          </div>
          <div className="col-md-6">
            <b>Start Date</b>
            <p>{particular.startDate}</p>
          </div>
          <div className="col-md-6">
            <b>Description</b>
            <p>{particular.description}</p>
          </div>
          <div className="col-md-6">
            <b>End Date</b>
            <p>{particular.endDate}</p>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <b>Status</b>
            <p>
              <span className={`badge bg-${particular.color}`}>
                {particular.state}
              </span>
            </p>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <b>Project Manager</b>
            <p>{particular.projectManager}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
