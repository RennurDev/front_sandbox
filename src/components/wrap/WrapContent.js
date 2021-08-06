const styles = {
  root: {
    position: "absolute",
    top: "50%",
    width: "100vw",
    margin: "auto",
    color: "white",
    textAlign: "center",
  },
  text: {
    fontFamily: "Kanit",
  },
  input: {
    fontFamily: "Kanit",
    color: "white",
    margin: "0 auto",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
  },
  upper: {
    textAlign: "center",
    position: "absolute",
    width: "100vw",
    top: "-40vh",
  },
  lower: {
    textAlign: "center",
    position: "absolute",
    width: "100vw",
    top: "25vh",
  },
};

export const WrapContent = ({
  currentRegion,
  distance,
  appState,
  setAppState,
  currentPlace,
}) => {
  const Content = () => {
    //TODO: 要素を追加
    if (appState === "beginApp") {
      return (
        <div className="bg-wrap" style={styles.lower}>
          <span className="slide-in" style={styles.text}>
            {currentRegion}
          </span>
        </div>
      );
    } else if (appState === "running") {
      return (
        <div>
          <div style={styles.upper}>
            <h1 className="bg-wrap">
              <span style={styles.text} className="slide-in">
                {currentPlace}
              </span>
            </h1>
            <p className="bg-wrap">
              <span style={styles.text} className="slide-in">
                山形駅まで900m
              </span>
            </p>
          </div>
          <div style={styles.lower}>
            <h1 className="bg-wrap">
              <span style={styles.text} className="slide-in">
                {Math.floor(distance / 100) / 10}km
              </span>
            </h1>
            <div className="bg-wrap">
              <input
                type="submit"
                value="FINISH RECORD"
                style={styles.input}
                className="slide-in"
                onClick={() => {
                  setAppState("finishRunning");
                }}
              />
            </div>
          </div>
        </div>
      );
    } else if (appState === "finishRunning") {
      return <div />;
    } else {
      return <div />;
    }
  };
  return (
    <div style={styles.root}>
      <Content />
    </div>
  );
};
