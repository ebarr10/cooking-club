import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FoodContext } from "../../contexts/food.component";
import Button from "../../components/button/button.component";
// import { mock_data } from "./mock-data.component";

import "./week.styles.scss";

function Week() {
  const { id, theme } = useParams();
  const navigate = useNavigate();
  const foodMapping = useContext(FoodContext);

  function uploadHandler() {
    navigate(`/upload/${id}/${theme}`);
  }

  return (
    <div className="week-card-container">
      <span className="week-title">
        Week {id}: {theme}
      </span>
      <div className="card-items">
        {foodMapping["foodMapping"].map((upload, index) => {
          if (upload.week === id) {
            return (
              <div className="card" key={index}>
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
            );
          }
          return null;
        })}
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
