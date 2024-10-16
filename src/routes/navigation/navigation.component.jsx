import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as FoodLogo } from "../../assets/food-club.svg";

import "./navigation.styles.scss";

function Navigation() {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <FoodLogo className="logo">Logo</FoodLogo>
        </Link>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
