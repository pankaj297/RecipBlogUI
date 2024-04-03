import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const MyProfile = () => {
  const { auth } = useContext(AuthContext); 
  return (
    <div className="customPadding ">
      <h1> MyProfile</h1>
      <div className="myProfile">
        <div className="myProfileb">
          <div className="data">
            <h3>UserName : {auth?.user?.name}</h3>
            <h4>Email : {auth?.user?.email}</h4>
            <p>Bio : {auth?.user?.bio}</p>
            {/* <h3>UserName : {auth?.user?.name}</h3> */}
          </div>
          <div className="img">
            {auth?.user?._id && (
              <img
                src={`${import.meta.env.VITE_BURL}/api/v1/users/singleUserImg/${
                  auth?.user?._id
                }`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
