import { useState } from "react";

function CustomButton(props) {
  //props is an object
  // console.log("props", props);

  const [data, setData] = useState("Custom button data");

  return (
    <>
      <button onClick={() => props.setLoginData(data)}>{props.name}</button>
    </>
  );
}

export default CustomButton;
