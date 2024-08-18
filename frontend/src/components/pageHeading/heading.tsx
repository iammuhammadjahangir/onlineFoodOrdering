interface headingProps {
  name: string;
}
const Heading = ({ name }: headingProps) => {
  return <h1 className="pageHeading">{name}</h1>;
};

export default Heading;
