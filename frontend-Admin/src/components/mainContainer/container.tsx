import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
}

const Container = ({ children }: ComponentProps) => {
  return (
    <section className="mainContainer">
      <section className="centeredContainer">{children}</section>
    </section>
  );
};

export default Container;
