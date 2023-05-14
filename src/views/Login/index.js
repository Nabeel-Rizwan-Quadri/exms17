import { useState } from "react";
import { loginUser } from "../../config/firebase";

export default function Login(props) {
  // console.log("props", props);
  const [formData, setFormData] = useState({
    email: "nabeel@gmail.com",
    password: "123456",
  });
  console.log("formData", formData);
  const setState = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <>
      <h1>This is Login page</h1>
      <input
        placeholder="email"
        onChange={(e) => setState("email", e.target.value)}
        value={formData.email}
      />
      <input
        placeholder="password"
        onChange={(e) => setState("password", e.target.value)}
        value={formData.password}
      />
      <button
        onClick={async () => {
          const response = await loginUser(formData);
          if (response.status === "error") {
            alert(response.error);
          } else {
            //redirect
            // props.setScreen("dashboard");
            alert("success");
          }
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          // props.setScreen("signup");
        }}
      >
        goto signup
      </button>
      <button
        onClick={() => {
          // props.setScreen("dashboard");
        }}
      >
        goto dashboard
      </button>
    </>
  );
}
