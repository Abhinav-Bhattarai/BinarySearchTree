import React from "react";
import styles from "../../styles/node.module.scss";

const Node: React.FC<{ data: number | null; id: string }> = ({
  data,
  children,
  id,
}) => {
  return (
    <React.Fragment>
      <div className={styles.NodeContainer} id={id}>
        <div>{data}</div>
        {children}
      </div>
    </React.Fragment>
  );
};

export default Node;
