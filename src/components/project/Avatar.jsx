import React from "react";

const Avatar = ({ pic, name }) => {
  return (
    <div className="d-flex d-inline mb-3 align-items-center">
      <img
        src={pic}
        class="rounded-circle"
        style={{ width: "50px" }}
        alt="Img"
      />
      <b className="mx-2">{name}</b>
    </div>
  );
};

export default Avatar;
