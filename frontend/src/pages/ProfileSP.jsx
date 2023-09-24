import React,{useState} from "react";
import Navbar from "../components/Navbar";

const ProfileSP = () => {

    const tabs = ["Profile", "Updates", "More"];
    const [activeTab, setActiveTab] = useState("Profile");
    const [barStyle, setBarStyle] = useState({
      width: "33.33%",
      left: "0%",
      backgroundColor: "#10375c",
    });
  
    const handleTabClick = (tabName, index) => {
      setActiveTab(tabName);
      const tabWidth = 100 / tabs.length;
      setBarStyle({
        width: `${tabWidth}%`,
        left: `${index * tabWidth}%`,
        backgroundColor: "#10375c",
      });
    };


  return (
    <>
      {/* <Navbar/> */}
      <section className="d-flex justify-content-center mt-5 pt-5 gap-5">
        <section className=" d-flex justify-content-center" style={{width:"20%", color:"#10375C"}}>
          <div className="">
            <div
              className="rounded shadow p-2 pb-0   rounded"
              style={{ backgroundColor: "rgba(224, 242, 254, 0.70)", width:"90%" }}
            >
              <img
              style={{width:"100%" }}
                src="/images/ProfileSV.jpg"
                alt="Profile Image"
                className="rounded"
              />
              <div className="d-flex justify-content-center align-items-center flex-column">
                <label
                  className=" py-3"
                  style={{ fontSize: "18px", colour: "#10375C" }}
                >
                  Susan Ejiofor
                </label>
                <label
                  className=""
                  style={{ fontSize: "16px", colour: "#10375C" }}
                >
                  Attorney
                </label>
              </div>
              <div className="mt-4">
                <hr
                  style={{ backgroundColor: "#E2EDF9" }}
                  className="border  m-0 border-2"
                />
                <div className="d-flex justify-content-evenly">
                  <div className="py-4 d-flex flex-column align-items-center ">
                    <p className="m-0 fs-4" style={{ colour: "#10375C" }}>
                      189
                    </p>
                    <p className="m-0">points</p>
                  </div>
                  <div
                    class="vr border border-2"
                    style={{ backgroundColor: "#E2EDF9" }}
                  ></div>
                  <div className="py-4 d-flex flex-column align-items-center">
                    <p className="m-0 fs-4">98</p>
                    <p className="m-0">points</p>
                  </div>
                </div>
                <hr
                  style={{ backgroundColor: "#E2EDF9" }}
                  className="border  m-0 border-2"
                />
              </div>
              <div
                style={{ fontSize: "16px", color: "#0F69C9" }}
                className="d-flex flex-column align-items-center py-4"
              >
                View Profiles
              </div>
            </div>
            <div className=" mt-5 rounded shadow py-3 px-4   " style={{width:"90%"}}>
              <div className="" style={{ fontSize: "25px" }}>
                Achivements
              </div>
              <div className="py-2  d-flex">
                <img src="/images/100highcourtcasesbatch.jpg" alt="batch" />
                <div className="ps-2">
                  <p className="m-0 ">100 High Court Cases</p>
                  <p className="m-0 " style={{ fontSize: "12px" }}>
                    June 2023
                  </p>
                </div>
              </div>
              <div className="py-2  d-flex">
                <img src="/images/criminallawbatch.jpg" alt="batch" />
                <div className="ps-2">
                  <p className="m-0 ">Criminal Law Expert</p>
                  <p className="m-0 " style={{ fontSize: "12px" }}>
                    March 2023
                  </p>
                </div>
              </div>
              <div className="py-2  d-flex">
                <img src="/images/notaryexpertbatch.png" alt="batch" />
                <div className="ps-2">
                  <p className="m-0 ">Notary Expert</p>
                  <p className="m-0 " style={{ fontSize: "12px" }}>
                    June 2022
                  </p>
                </div>
              </div>
              <div className="py-2  d-flex">
                <img src="/images/profilecompletionbatch.jpg" alt="batch" />
                <div className="ps-2">
                  <p className="m-0 ">Profile Completion</p>
                  <p className="m-0 " style={{ fontSize: "12px" }}>
                    Feb 2021
                  </p>
                </div>
              </div>

              <p className="d-flex justify-content-center align-items-center m-0 pt-2">
                show more
              </p>
            </div>
          </div>
        </section>
        <main className="  " style={{width:"65%"}}>
          <div
            className="p-5 rounded w-100 shadow d-flex"
            style={{ backgroundColor: "#10375C", color: "#FFFFFF" }}
          >
            <div className="w-75 mx-5">
                <p className="fs-1">Welcome back!</p>
                <p className="fs-5">
                You have 4 new{" "}
                <span style={{ color: "#fff4d4" }}>Notifications</span> and 3 new{" "}
                <span style={{ color: "#fff4d4" }}>messages</span>
                </p>{" "}
                <p className="fs-6 py-4 pe-5">
                    Take professional courses to help you stay up to date with legal
                    matters and the world.
                </p>
                <a href="#" class="text-decoration-underline mt-5">Get started</a>
            
            </div>
            <div className=" w-25 d-flex justify-content-end align-items-center ">
                <img src="/images/klipartz5.jpg" alt="taraju"  />
            </div>
          </div>

          <div className="w-75 py-5">
            <div className="w-50 position-relative">
                <div className="d-flex justify-content-around">
                {tabs.map((tab, index) => (
                    <a
                    className="pb-3"
                    key={index}
                    onClick={() => handleTabClick(tab, index)}
                    style={{
                        color: activeTab === tab ? "#10375c" : "#6b7280",
                        cursor: "pointer",
                        textDecoration: "none",
                    }}
                    >
                    {tab}
                    </a>
                ))}
                </div>
                <div
                className="tab-bar"
                style={{
                    width: barStyle.width,
                    left: barStyle.left,
                    backgroundColor: barStyle.backgroundColor,
                    height: "3px",
                    position: "relative",
                    top:0,
                    transition: "0.3s",
                }}
                ></div>
                <div
                className="tab-bar"
                style={{
                    width: "200%",
                    backgroundColor: "#E0F2FE",
                    height: "3px",
                }}
                ></div>
                
            </div>
          </div>

          <div className="w-75   ">
          <div className=" px-5" style={{color:"#10375C"}}>
            <div className="ps-5">
            <div className="fs-3 pb-4">About me</div>
            <p className="w-100 pb-4">Hey there, my name is Susan Ejiofor, i am a barrister with 3 years experience in criminal law, buisness law and family law, my career started off while i was in school when i won my first ever case of fund misapropriation.</p>

            </div>
          </div>
          <div
                className="tab-bar"
                style={{
                   
                    backgroundColor: "#E0F2FE",
                    height: "5px",
                }}
                ></div>

          <div className="px-5 py-3" style={{color:"#10375C"}}>
            <div className="ps-5">
                <div className="fs-3 pt-2" >Professional Experience</div>
                <div className="fs-5 pt-3">Supreme Court Abuja</div>
                <p style={{color:"#6B7280"}} className="fs-8 pt-3">State Attorney</p>
                <div className="d-flex gap-5 fs-7" style={{color:"#6B7280"}}>
                
                    <p>  From: Nov 2018</p>
                    <p>To: Oct 2020</p>
                </div>
            </div>
            <div
                className="tab-bar"
                style={{
                   
                    backgroundColor: "#E0F2FE",
                    height: "2px",
                }}
                ></div>
            
            <div className="ps-5">

            <div className="fs-5 pt-3">Supreme Court Abuja</div>
            <p style={{color:"#6B7280"}} className="fs-8 pt-3">State Attorney</p>
            <div className="d-flex gap-5 fs-7" style={{color:"#6B7280"}}>
              
                <p>  From: Nov 2018</p>
                <p>To: Oct 2020</p>
            </div>
            </div>

          </div>
          <div
                className="tab-bar"
                style={{
                   
                    backgroundColor: "#E0F2FE",
                    height: "5px",
                }}
                ></div>

          <div className="px-5 py-3" style={{color:"#10375C"}}>
            <div className="ps-5">
            <div className="fs-3 pt-2" >Education and Certifications</div>
            <div className="fs-5 pt-3">Law School Abuja</div>
            <p style={{color:"#6B7280"}} className="fs-8 pt-3">Barr, OND</p>
            <div className="d-flex gap-5 fs-7" style={{color:"#6B7280"}}>
              
                <p>  From: Nov 2018</p>
                <p>To: Oct 2020</p>
            </div>
            </div>
            <div
                className="tab-bar"
                style={{
                   
                    backgroundColor: "#E0F2FE",
                    height: "2px",
                }}
                ></div>

            <div className="ps-5">
            <div className="fs-5 pt-3">Law School Abuja</div>
            <p style={{color:"#6B7280"}} className="fs-8 pt-3">Barr, OND</p>
            <div className="d-flex gap-5 fs-7" style={{color:"#6B7280"}}>
              
                <p>  From: Nov 2018</p>
                <p>To: Oct 2020</p>
            </div>
            </div>
          </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ProfileSP;
