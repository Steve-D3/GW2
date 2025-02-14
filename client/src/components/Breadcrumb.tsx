import React from "react";
import { NavLink, useLocation } from "react-router";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const routes = [
  { path: "/", breadcrumb: "Home" },
  { path: "/shop", breadcrumb: "Shop" },
  {
    path: "/shop/:id/:slug",
    breadcrumb: ({
      match,
    }: {
      match: { params: { id: string; slug: string } };
    }): string => `Product ${match.params.id}`,
  },
  { path: "/about", breadcrumb: "About" },
];

const Breadcrumb = () => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs(routes as []);
  const pageName = location.pathname.substring(1);

  return (
    <div className={`breadcrumbs-${pageName}`}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <React.Fragment key={match.pathname}>
          {index < breadcrumbs.length - 1 ? (
            <NavLink to={match.pathname}>{breadcrumb}</NavLink>
          ) : (
            <p>{breadcrumb}</p>
          )}
          {index < breadcrumbs.length - 1 && <i> › </i>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
