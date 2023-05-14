import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { postAd } from "../../config/firebase";

function CreateAd(props) {
  // console.log("props", props);
  const [formData, setFormData] = useState({
    title: "iphone 16 pro max",
    price: "50,000",
    // image,
    description: "water sealed 10/10 battery health 99% with charger",
    location: "Karachi",
  });
  console.log("formData", formData);

  const setState = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <>
      <h1>This is Create Ad page</h1>
      <input
        placeholder="Ad Title"
        onChange={(e) => setState("title", e.target.value)}
        value={formData.title}
      />
      <input
        placeholder="price"
        onChange={(e) => setState("price", e.target.value)}
        value={formData.price}
      />
      <input
        placeholder="image"
        onChange={(e) => setState("image", e.target.files)}
        type="file"
        // value={formData.email}
      />
      <input
        placeholder="description"
        onChange={(e) => setState("description", e.target.value)}
        value={formData.description}
      />
      <input
        placeholder="location"
        onChange={(e) => setState("location", e.target.value)}
        value={formData.location}
      />
      <button
        onClick={async () => {
          const response = await postAd(formData);
          if (response.status === "error") {
            alert(response.error);
          } else {
            //redirect
            props.setScreen("dashboard");
            alert("success");
          }
        }}
      >
        Create Ad
      </button>
      <button
        onClick={() => {
          props.setScreen("dashboard");
        }}
      >
        Go Back
      </button>
    </>
  );
}

export default CreateAd;
