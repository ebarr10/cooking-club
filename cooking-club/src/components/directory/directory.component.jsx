import WeekItem from "../week-item/week-item.component";

import "./directory.styles.scss";

function Directory({ weeks }) {
  return (
    <div className="directory-container">
      {weeks.map((week) => (
        <WeekItem key={week.id} week={week} />
      ))}
    </div>
  );
}

export default Directory;
