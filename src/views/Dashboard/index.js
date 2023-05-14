import { useEffect, useState } from "react";
import { getAllUsersData, logoutUser, getAllAds } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateAd from "../CreateAd";

function Dashboard(props) {
  console.log("props", props);
  const reduxState = useSelector((state) => state);
  console.log(reduxState);
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
      <div>
        <button
          onClick={() => {
            navigate("createAd");
          }}
        >
          Create Ad
        </button>
        <button
          onClick={async () => {
            await logoutUser();
          }}
        >
          logout
        </button>
        {data.map((item, index) => {
          console.log(item);
          return (
            <div key={index} onClick={() => navigate(`addetail/${item.docId}`)}>
              <div>{item.title}</div>
              <div>{item.price}. rs</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
