const styles = {
  text: {
    fontFamily: "Kanit",
  },
};

export const WrapContent = ({ currentRegion }) => {
  return (
    <div className="bg-wrap">
      <span className="slide-in" style={styles.text}>
        {currentRegion}
      </span>
    </div>
  );
};
