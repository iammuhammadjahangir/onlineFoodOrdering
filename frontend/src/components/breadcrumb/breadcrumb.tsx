import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);
  // console.log(pathnames);
  let breadcrumbPath = "";

  if (pathnames.length === 0 || pathnames.includes("login")) {
    // If the current route is the home route ('/'), do not render the breadcrumbs
    return null;
  }

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const formattedName = name.replace(/\%20/g, " ");

        console.log(formattedName);
        breadcrumbPath += `/${formattedName}`;
        const isLast = index === pathnames.length - 1;
        // console.log(pathnames, breadcrumbPath);

        return isLast ? (
          <span key={breadcrumbPath}> / {formattedName}</span>
        ) : (
          <span key={breadcrumbPath}>
            {" "}
            / <Link to={breadcrumbPath}>{formattedName}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
