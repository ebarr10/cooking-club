import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { WeeksContext } from "../../contexts/weeks.component";
import Directory from "../../components/directory/directory.component";

function Home() {
  const weeksMapping = useContext(WeeksContext);

  return (
    <div>
      <Outlet />
      <Directory weeks={weeksMapping} />
    </div>
  );
}

export default Home;
