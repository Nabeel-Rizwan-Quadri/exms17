import { useParams } from "react-router-dom";

function AdDetail() {
  const params = useParams();
  console.log(params);
  //get ad by id
  return (
    <>
      <div>Ad detail page</div>
    </>
  );
}

export default AdDetail;
