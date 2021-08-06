const styles = {
  root: {
    position: "absolute",
    top: "calc(50% + 25vh)",
    width: "100vw",
    textAlign: "center",
    margin: "auto",
    color: "white",
  },
  text: {
    fontFamily: "Kanit",
  },
};

export const WrapContent = ({ currentRegion, page, setPage }) => {
  const Content = () => {
    //TODO: 要素を追加
    if (page === "beginApp") {
      return (
        <div className="bg-wrap">
          <span className="slide-in" style={styles.text}>
            {currentRegion}
          </span>
        </div>
      );
    } else if (page === "running") {
      return (
        <div className="bg-wrap">
          <span className="slide-in">
            <h1 style={styles.text}>0.0km</h1>
          </span>
          <input
            type="submit"
            value="FINISH RECORD"
            style={styles.text}
            className="slide-in"
            onClick={() => {
              if (page !== "running") {
                //ランニング開始
                //NOTE: 正常に動作している場合この分岐は機能しない.(終了時にこのボタンを押すことはできない)
                //TODO: このonClick関数部分を抽象化して使いまわせるようにしたい.
                setPage("running");
              } else {
                //ランニング終了.
                setPage("finishRunning");
              }
            }}
          />
        </div>
      );
    } else if (page === "finishRunning") {
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
