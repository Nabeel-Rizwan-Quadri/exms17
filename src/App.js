import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dashboard from "./views/Dashboard";
import Signup from "./views/Signup";
import Login from "./views/Login";
import CreateAd from "./views/CreateAd";
import ErrorPage from "./views/ErrorPage";
import Layout from "./views/Layout";
import AdDetail from "./views/AdDetail";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("loader");
  const [user, setUser] = useState({ email: "nabeel" });
  console.log("user ==>", user);

  //components dashboard createAd my profile
  const protectedRoute = (component) => {
    if (user) {
      return component;
    } else {
      // navigate("/login");
      return <Login />;
    }
  };

  const protectedRouteAuth2 = (component) => {
    if (!user) {
      // alert("")
      return component;
    } else {
      return <Dashboard />;
    }
  };

  //component login signup
  const protectedRouteAuth = (component) => {
    if (user) {
      return <Dashboard />;
    } else {
      // navigate("/login");
      return component;
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/dashboard"
                element={protectedRoute(<Dashboard user={user} />)}
              />
              <Route path="/login" element={protectedRouteAuth2(<Login />)} />
              <Route path="/signup" element={protectedRouteAuth2(<Signup />)} />
              <Route
                path="/dashboard/createAd"
                element={protectedRoute(<CreateAd />)}
              />
              <Route path="/dashboard/addetail/:docId" element={<AdDetail />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </header>
      </div>
    </>
  );
}
export default App;

// {todoData.map((item) => {
//   return item.title;
// })}

// <TextField
//               id="outlined-basic"
//               label="Email"
//               variant="outlined"
//             />
