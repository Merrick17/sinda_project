import React from "react";

const Main = () => {
  return (
    <div className="maincontainer">
      <div className="maintitle">
        <div className="maingreeting">
          <h1>Hello test</h1>
          <p>Welcome to your admin dashboard</p>
        </div>
      </div>

      <div className="maincards">
        <div className="card">
          <i className="fa fa-user-o fa-2x text-lightblue" aria-hidden="true"></i>
          <div className="cardinner">
            <p className="text-primary-p">Number of Subscribers</p>
            <span className="font-bold text-title">578</span>
          </div>
        </div>

        <div className="card">
          <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
          <div className="cardinner">
            <p className="text-primary-p">Times of Watching</p>
            <span className="font-bold text-title">2467</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
