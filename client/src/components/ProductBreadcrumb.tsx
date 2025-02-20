import React from "react";
import { NavLink } from "react-router";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import { IoIosArrowForward } from "react-icons/io";
import styles from "../styles/ProductBreadcrumb.module.css";
const routes: Array<{
  path: string;
  breadcrumb: ({
    match,
  }: {
    match: { params: { id: string; slug: string } };
  }) => string;
}> = [
  {
    path: "/shop/:id/:slug",
    breadcrumb: ({ match }): string => `${match.params.slug}`,
  },
];

const ProductBreadcrumb = () => {
  const breadcrumbs = useBreadcrumbs(routes as []);

  // Filter out the unwanted breadcrumb (the one at index 2)
  const filteredBreadcrumbs = breadcrumbs.filter((_, index) => index !== 2);

  return (
    <div className={styles["breadcrumbs-productDetail"]}>
      {filteredBreadcrumbs.map(({ match, breadcrumb }, index) => {
        const breadcrumbLink = match.params.slug
          ? `/shop/${match.params.slug}`
          : match.pathname;

        return (
          <React.Fragment key={match.pathname}>
            {index < filteredBreadcrumbs.length - 1 ? (
              <NavLink to={breadcrumbLink}>{breadcrumb}</NavLink>
            ) : (
              <p>
                <span>|</span>
                {breadcrumb}
              </p>
            )}
            {index < filteredBreadcrumbs.length - 1 && (
              <span>
                <IoIosArrowForward />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProductBreadcrumb;
