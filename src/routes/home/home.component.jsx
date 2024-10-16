import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { WeeksContext } from "../../contexts/weeks.component";
import Directory from "../../components/directory/directory.component";

function Home() {
  const weeks = useContext(WeeksContext);
  console.log(weeks.weeksMapping.length);
  return (
    <div>
      <Outlet />
      {weeks.weeksMapping.length > 0 ? (
        <Directory weeks={weeks} />
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
}

export default Home;
