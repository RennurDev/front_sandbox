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
};

export const Notifications = ({ setContent }) => {
  return (
    <div style={styles.filter}>
      <img
        src={`${process.env.PUBLIC_URL}/modalImage.svg`}
        style={styles.modal}
        alt="modalBackGround"
      />
      <div style={styles.textArea}>
        <input
          type="image"
          style={styles.button}
          onClick={() => setContent("none")}
          src={`${process.env.PUBLIC_URL}/button_close.svg`}
          alt="close"
        />
        <div style={styles.textContent} className="hideScrollBar">
          <p>
            PETAMPは現在モリモリ開発中です～！未完成も愛して・・・
            <br />
            そのため,
            実際に使ってもらう上ではいくつか注意してもらわないといけない箇所があります。ここでは,
            そうした注意事項や更新情報をお知らせします！
            <br />
            ちょっとずつ出来上がっていく様子を楽しみに,
            たびたび遊びに来てください！
          </p>
          <h3>ごちゅうい</h3>
          <ul style={styles.list}>
            <li>
              軌跡の保存はブラウザを開いているときしか行われないよ（スリープにしたり,
              ブラウザから離れると記録が中断されてしまいます.
              ここは早急に直したい...）
            </li>
            <li>PETAMPはスマホ専用アプリだよ</li>
          </ul>
          <h3>いまできないこと</h3>
          <ul style={styles.list}>
            <li>リザルト画面の出力</li>
            <li>アカウントの作成</li>
            <li>過去レコードの日付, 移動距離の表示</li>
            <li>各種設定</li>
          </ul>
          <h3>更新情報</h3>
          <p>07.30 この画面をつくりました</p>
        </div>
      </div>
    </div>
  );
};
