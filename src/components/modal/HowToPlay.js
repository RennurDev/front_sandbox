import "../../App.css";

const styles = {
  filter: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 90,
  },
  modal: {
    position: "fixed",
    top: "5vh",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    height: "85vh",
  },
  textArea: {
    position: "fixed",
    top: "5vh",
    height: "85vh",
    width: "calc(85vh * 906 / 1782)",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
  },
  textContent: {
    marginTop: "40%",
    marginLeft: "10%",
    marginRight: "10%",
    color: "white",
    lineHeight: "1.5em",
    height: "55%",
    overflowY: "scroll",
  },
  button: {
    position: "absolute",
    display: "block",
    width: "15%",
    right: 0,
  },
  list: {
    paddingLeft: 20,
  },
  instructionImage: {
    width: "60%",
    display: "block",
    margin: "0 auto",
  },
};

export const HowToPlay = ({ setContent }) => {
  return (
    <div style={styles.filter}>
      <img
        src={`${process.env.PUBLIC_URL}/howToPlay.svg`}
        style={styles.modal}
        alt="modalBackGround"
      />
      <div style={styles.textArea}>
        <input
          type="image"
          style={styles.button}
          onClick={() => setContent("notifications")}
          src={`${process.env.PUBLIC_URL}/button_next.svg`}
        />
        <div style={styles.textContent} className="hideScrollBar">
          <p>画面最下部にいるペタンプくんを押すと軌跡の記録が始まります.</p>
          <img
            src={`${process.env.PUBLIC_URL}/instruction01.png`}
            style={styles.instructionImage}
          />
          <p>
            終了するときはもう一度ペタンプくんを押すと記録が終了し,
            いいかんじのリザルト画面がでてきます.
          </p>
        </div>
      </div>
    </div>
  );
};
