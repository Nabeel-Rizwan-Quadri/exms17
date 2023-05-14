import { useEffect, useState } from "react";
import { getAllUsersData, logoutUser, getAllAds } from "../../config/firebase";
import CreateAd from "../CreateAd";

function Dashboard(props) {
  console.log("props", props);
  const [data, setData] = useState([]);
  const [screen, setScreen] = useState("dashboard");

  const getData = async () => {
    //firebase function call for user data
    // const res = await getAllUsersData();
    const res = await getAllAds();
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>dashboard</div>
      <h1>Welcome, {props.user.email}</h1>
      {screen == "createAd" && <div>{<CreateAd setScreen={setScreen} />}</div>}
      {screen == "dashboard" && (
        <div>
          <button onClick={() => setScreen("createAd")}>Create Ad</button>
          <button
            onClick={async () => {
              await logoutUser();
            }}
          >
            logout
          </button>
          {data.map((item, index) => {
            return (
              <div key={index}>
                <div>{item.title}</div>
                <div>{item.price}. rs</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Dashboard;
