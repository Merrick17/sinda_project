import React from 'react'

function test() {
    return (
        <>
   

<div className="body">
<div className="container">

<div className="main">
        <div className="maincontainer">
        

          <div className="maintitle">
            
            <div className="maingreeting">
              <h1>Hello Codersbite</h1>
              <p>Welcome to your admin dashboard</p>
            </div>
          </div>

          <div className="maincards">
            <div className="card">
              <i
                className="fa fa-user-o fa-2x text-lightblue"
                aria-hidden="true"
              ></i>
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
            </div></div> 

            </div> </div> </div>
            

            <div id="sidebar">
        <div className="sidebartitle">
          <div className="sidebarimg">
            <img src="assets/logo.png" alt="logo" />
            <h1>Codersbite</h1>
          </div>
          <i
            onclick="closeSidebar()"
            className="fa fa-times"
            id="sidebarIcon"
            aria-hidden="true"
          ></i>
        </div>

        <div className="sidebarmenu">
          <div className="sidebarink active_menu_link">
            <i className="fa fa-home"></i>
            <a href="#">Dashboard</a>
          </div>
          <h2>MNG</h2>
          <div className="sidebarlink">
            <i className="fa fa-user-secret" aria-hidden="true"></i>
            <a href="#">Admin Management</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-building-o"></i>
            <a href="#">Company Management</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-wrench"></i>
            <a href="#">Employee Management</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-archive"></i>
            <a href="#">Warehouse</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-handshake-o"></i>
            <a href="#">Contracts</a>
          </div>
          <h2>LEAVE</h2>
          <div className="sidebarlink">
            <i className="fa fa-question"></i>
            <a href="#">Requests</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-sign-out"></i>
            <a href="#">Leave Policy</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-calendar-check-o"></i>
            <a href="#">Special Days</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-files-o"></i>
            <a href="#">Apply for leave</a>
          </div>
          <h2>PAYROLL</h2>
          <div className="sidebarlink">
            <i className="fa fa-money"></i>
            <a href="#">Payroll</a>
          </div>
          <div className="sidebarlink">
            <i className="fa fa-briefcase"></i>
            <a href="#">Paygrade</a>
          </div>
          <div className="sidebarlogout">
            <i className="fa fa-power-off"></i>
            <a href="#">Log out</a>
          </div>
          <div className="charts">
            <div className="charts__left">
              <div className="charts__left__title">
                <div>
                  <h1>Daily Reports</h1>
                  <p>Cupertino, California, USA</p>
                </div>
                <i className="fa fa-usd" aria-hidden="true"></i>
              </div>
              <div id="apex1"></div>
            </div>

            <div className="charts__right">
              <div className="charts__right__title">
                <div>
                  <h1>Stats Reports</h1>
                  <p>Cupertino, California, USA</p>
                </div>
                <i className="fa fa-usd" aria-hidden="true"></i>
              </div>

              <div className="charts__right__cards">
                <div className="card1">
                  <h1>Income</h1>
                  <p>$75,300</p>
                </div>
</div></div>
        </div></div></div>


            
            
            
            
           

           
        </>
    )
}

export default test
