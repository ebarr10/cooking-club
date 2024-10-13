import { useNavigate } from "react-router-dom";
import "./week-item.styles.scss";

function WeekItem({ week }) {
  const { id, theme, start_date, end_date } = week;
  const startDate = start_date.toDate().toLocaleDateString();
  const endDate = end_date.toDate().toLocaleDateString();
  const navigate = useNavigate();

  function goToWeekHandler() {
    navigate(`/week/${id}/${theme}`);
  }

  return (
    <div className="week-container" onClick={goToWeekHandler}>
      <div className="title">Week {id}</div>
      <div className="week-body-container">
        <div className="theme">
          Theme: <b>{theme}</b>
        </div>
        <div className="date_span">
          <b>{startDate}</b> to <b>{endDate}</b>
        </div>
      </div>
    </div>
  );
}

export default WeekItem;
