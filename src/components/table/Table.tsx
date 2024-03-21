import React from "react";
import styles from "./Table.module.css";
import { Contract } from "../../pages/home/api/getContracts";

interface TableDataProps {
  data: Contract[];
}
const Table: React.FC<TableDataProps> = ({ data }) => {
  const formatStatus = (status: string) => {
    if (status === "KREIRANO") {
      return (
        <div
          style={{ backgroundColor: "green" }}
          className={styles.statusBox}
        />
      );
    } else if (status === "NARUČENO") {
      return (
        <div
          style={{ backgroundColor: "yellow" }}
          className={styles.statusBox}
        />
      );
    } else if (status === "ISPORUČENO")
      return (
        <div style={{ backgroundColor: "grey" }} className={styles.statusBox} />
      );
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td className={styles.headerCell}>Ime kupca</td>
          <td className={styles.headerCell}>Broj ugovora</td>
          <td className={styles.headerCell}>Rok isporuke</td>
          <td className={styles.headerCell}>Status</td>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data.map((item) => (
          <tr key={item.id} className={styles.row}>
            <td className={styles.cell}>{item.kupac}</td>
            <td className={styles.cell}>{item.broj_ugovora}</td>
            <td className={styles.cell}>{item.rok_isporuke}</td>
            <td className={styles.cell}>{formatStatus(item.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
