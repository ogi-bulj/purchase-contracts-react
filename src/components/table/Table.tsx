import React from "react";
import styles from "./Table.module.css";
import { Contract } from "../../api/getContracts";
import { formatDate } from "../../utils/formatDate";
import { formatContractStatus } from "../../utils/formatContractStatus";
import { useNavigate } from "react-router";

interface TableDataProps {
  data: Contract[];
}
const Table: React.FC<TableDataProps> = ({ data }) => {
  const navigate = useNavigate();
  const handleContract = (contract: Contract) => {
    navigate(`/contract/${contract.id}`, { state: contract });
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
          <tr
            key={item.id}
            className={styles.row}
            onClick={() => handleContract(item)}
          >
            <td className={styles.cell}>{item.kupac}</td>
            <td className={styles.cell}>{item.broj_ugovora}</td>
            <td className={styles.cell}>{formatDate(item.rok_isporuke)}</td>
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

export default Table;
