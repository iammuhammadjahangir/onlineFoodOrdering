import Helmet from "react-helmet";
const MetaData = (title: string) => {
  return (
    <Helmet>
      <title>
        {import.meta.env.VITE_BRANDNAME} {title}
      </title>
    </Helmet>
  );
};

export default MetaData;
