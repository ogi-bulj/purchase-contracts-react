import React from "react";
import styles from "./ArticlesTable.module.css";
import { formatContractStatus } from "../../utils/formatContractStatus";
import { Article } from "../../api/getArticlesById";

interface ArticlesTableDataProps {
  data: Article[];
}

const ArticlesTable: React.FC<ArticlesTableDataProps> = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td className={styles.headerCell}>Naziv</td>
          <td className={styles.headerCell}>Dobavljač</td>
          <td className={styles.headerCell}>Status</td>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data.map((item) => (
          <tr key={item.id} className={styles.row}>
            <td className={styles.cell}>{item.naziv}</td>
            <td className={styles.cell}>{item.dobavljač}</td>
            <td className={styles.cell}>
              <div
                style={{
                  backgroundColor: formatContractStatus(item.status),
                }}
                className={styles.statusBox}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArticlesTable;
