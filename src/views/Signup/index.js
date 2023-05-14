import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { signupUser } from "../../config/firebase";

function Signup(props) {
  // console.log("props", props);
  const [formData, setFormData] = useState({
    email: "nabeel@gmail.com",
    password: "123456",
    age: "23",
    username: "nabeel",
    image: [],
  });
  console.log("formData", formData);

  const setState = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <>
      <h1>This is Signup page</h1>
      <input
        placeholder="username"
        onChange={(e) => setState("username", e.target.value)}
        value={formData.username}
      />
      <input
        placeholder="age"
        onChange={(e) => setState("age", e.target.value)}
        value={formData.age}
      />
      <input
        placeholder="image"
        onChange={(e) => setState("image", e.target.files)}
        type="file"
        // value={formData.email}
      />
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
          const response = await signupUser(formData);
          if (response.status === "error") {
            alert(response.error);
          } else {
            //redirect
            props.setScreen("login");
            alert("success");
          }
        }}
      >
        Signup
      </button>
      <button
        onClick={() => {
          props.setScreen("login");
        }}
      >
        goto login
      </button>
    </>
  );
}

export default Signup;
