import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
// import { mock_data } from "./mock-data.component";

import "./week.styles.scss";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";

function Week() {
  const { id, theme } = useParams();
  const [foodMapping, setFoodMapping] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getWeeksFood() {
      const foodMapping = await getCollectionAndDocuments("food", id);
      setFoodMapping(foodMapping);
    }
    getWeeksFood();
  });

  function uploadHandler() {
    navigate(`/upload/${id}/${theme}`);
  }

  return (
    <div className="week-card-container">
      <span className="week-title">
        Week {id}: {theme}
      </span>
      <div className="card-items">
        {foodMapping.map((upload) => (
          <div className="card" key={upload.id}>
            <img
              src={upload.img}
              alt={`${upload.title}`}
              className="recipe-img"
            />
            <span>
              Recipe: <b>{upload.title}</b>
            </span>
            <span>
              Uploader: <b>{upload.user}</b>
            </span>
          </div>
        ))}
      </div>
      <div className="upload-button">
        <Button type="submit" onClick={uploadHandler}>
          Upload Entry
        </Button>
      </div>
    </div>
  );
}

export default Week;
