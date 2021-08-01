const styles = {
  grid: {
    marginBottom: 30,
  },
};

export const WrapContent = ({ currentRegion }) => {
  return (
    <div className="bg-wrap">
      <span className="slide-in">{currentRegion}</span>
    </div>
  );
};
