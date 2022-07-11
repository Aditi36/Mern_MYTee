import React from "react";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";


const UserDashBoard = () => {

  const {
    user: { name, email, role }
  } = isAutheticated();

  const userSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">user details</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome !"
      description="glad you here .."
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-9">{userSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
