import { useContext } from "react";
import { ContractsContext } from "../../contexts/ContractsContext";
import styles from "./SingleContract.module.css";
import { useParams } from "react-router-dom";
import { Loading } from "../../components";
import { formatDate } from "../../utils/formatDate";
import { formatContractStatus } from "../../utils/formatContractStatus";

const SingleContract = () => {
  const { id } = useParams();
  const { contracts } = useContext(ContractsContext);
  // Pronalaženje ugovora s odgovarajućim ID-om
  const contract =
    id && contracts.find((contract) => contract.id === parseInt(id));
  if (!contract) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Kupoprodajni ugovor -{" "}
        <span className={styles.contractNumber}>#{contract.broj_ugovora}</span>
      </h3>
      <div className={styles.contractInfo}>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Ime kupca: </p>
          <span className={styles.infoText}>{contract.kupac}</span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Broj ugovora: </p>
          <span className={styles.infoText}>{contract.broj_ugovora}</span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Datum akontacije: </p>
          <span className={styles.infoText}>
            {formatDate(contract.datum_akontacije)}
          </span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Rok isporuke: </p>
          <span className={styles.infoText}>
            {formatDate(contract.rok_isporuke)}
          </span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Status: </p>
          <div
            style={{ backgroundColor: formatContractStatus(contract.status) }}
            className={styles.statusBox}
          >
            <p className={styles.statusText}>{contract.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleContract;
