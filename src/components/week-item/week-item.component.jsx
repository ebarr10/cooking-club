import "./week-item.styles.scss";
/** id: 1,
      theme: "Chicken",
      start_date: "01-01-2000",
      end_date: "01-07-2000", */
function WeekItem({ week }) {
  const { id, theme, start_date, end_date } = week;

  return (
    <div className="week-container">
      <div className="title">Week {id}</div>
      <div className="week-body-container">
        <div className="theme">
          Theme: <b>{theme}</b>
        </div>
        <div className="date_span">
          <b>{start_date}</b> to <b>{end_date}</b>
        </div>
      </div>
    </div>
  );
}

export default WeekItem;
