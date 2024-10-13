import WeekItem from "../week-item/week-item.component";
import "./directory.styles.scss";

function Directory({ weeks }) {
  const { weeksMapping } = weeks;
  return (
    <div className="directory-container">
      {weeksMapping.map((week) => (
        <WeekItem key={week.id} week={week} />
      ))}
    </div>
  );
}

export default Directory;
