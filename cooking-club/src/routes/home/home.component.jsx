import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

function Home() {
  const weeks = [
    {
      id: 1,
      theme: "Chicken",
      start_date: "01-01-2000",
      end_date: "01-07-2000",
    },
    {
      id: 2,
      theme: "Soup",
      start_date: "01-01-2001",
      end_date: "01-07-2001",
    },
    {
      id: 3,
      theme: "Cheese",
      start_date: "01-01-2002",
      end_date: "01-07-2002",
    },
    {
      id: 4,
      theme: "Bread",
      start_date: "01-01-2003",
      end_date: "01-07-2003",
    },
    {
      id: 5,
      theme: "Pasta",
      start_date: "01-01-2004",
      end_date: "01-07-2004",
    },
  ];

  return (
    <div>
      <Outlet />
      <Directory weeks={weeks} />
    </div>
  );
}

export default Home;
