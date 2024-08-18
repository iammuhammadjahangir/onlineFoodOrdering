interface SkeletonProps {
  width?: string;
  length?: number;
}

const SkeletonLoader = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeletons = Array.from({ length }, (_, index) => (
    <div key={index} className="skeletonShape"></div>
  ));
  return (
    <div className="skeletonLoader" style={{ width }}>
      {skeletons}
    </div>
  );
};

export default SkeletonLoader;
