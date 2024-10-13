import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import { mock_data } from "./mock-data.component";

import "./week.styles.scss";

function Week() {
  const { id, theme } = useParams();
  const navigate = useNavigate();

  function uploadHandler() {
    navigate(`/upload/${id}`);
  }

  return (
    <div className="week-card-container">
      <span className="week-title">
        Week {id}: {theme}
      </span>
      <div className="card-items">
        {mock_data.map((upload) => (
          <div className="card" key={upload.id}>
            <img
              src={upload.img}
              alt={`${upload.title}`}
              className="recipe-img"
            />
            <span>
              Recipe: <a href={upload.url}>{upload.title}</a>
            </span>
            <span>Uploader: {upload.user}</span>
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
