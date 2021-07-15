import { useEffect, useState } from "react";

export const Flash = (message, type) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    visible && (
      <div className={`alert alert-${type}`}>
        <span className="close" onClick={setVisible(false)}>
          <strong>X</strong>
        </span>
        <p>{message}</p>
      </div>
    )
  );
};
