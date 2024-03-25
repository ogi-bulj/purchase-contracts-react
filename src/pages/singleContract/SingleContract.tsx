import { useContext, useEffect, useMemo, useState } from "react";
import { ContractsContext } from "../../contexts/ContractsContext";
import styles from "./SingleContract.module.css";
import { useParams } from "react-router-dom";
import { ArticlesTable, Loading } from "../../components";
import { formatDate } from "../../utils/formatDate";
import { formatContractStatus } from "../../utils/formatContractStatus";
import { Article, getArticlesById } from "../../api/getArticlesById";

const SingleContract = () => {
  const { id } = useParams();
  const { contracts } = useContext(ContractsContext);
  const [articlesData, setArticlesData] = useState<Article[]>([]);

  // Pronalaženje ugovora s odgovarajućim ID-om
  const contract =
    id && contracts.find((contract) => contract.id === parseInt(id));

  // Ovdje koristimo useMemo za memoriziranje contracts podataka.
  const memoizedContract = useMemo(() => contract, [contract]);

  // API poziv za artikle
  useEffect(() => {
    getArticlesById() // Kod prave date i API-ja šaljemo ID odabranog ugovora u API poziv, objašnjenje je u komentaru unutar poziva.
      .then((res) => {
        setArticlesData(res.data);
      })
      .catch((err) => {
        // TO-DO!: Logika u slučaju errora
        console.log(err);
      });
  }, [id]);

  if (!memoizedContract) {
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
        <span className={styles.contractNumber}>
          #{memoizedContract.broj_ugovora}
        </span>
      </h3>
      <div className={styles.contractInfo}>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Ime kupca: </p>
          <span className={styles.infoText}>{memoizedContract.kupac}</span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Broj ugovora: </p>
          <span className={styles.infoText}>
            {memoizedContract.broj_ugovora}
          </span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Datum akontacije: </p>
          <span className={styles.infoText}>
            {formatDate(memoizedContract.datum_akontacije)}
          </span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Rok isporuke: </p>
          <span className={styles.infoText}>
            {formatDate(memoizedContract.rok_isporuke)}
          </span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Status: </p>
          <div
            style={{
              backgroundColor: formatContractStatus(memoizedContract.status),
            }}
            className={styles.statusBox}
          >
            <p className={styles.statusText}>{memoizedContract.status}</p>
          </div>
        </div>
      </div>
      <div className={styles.articlesContainer}>
        <h3 className={styles.articlesTitle}>artikli:</h3>
        <ArticlesTable data={articlesData} />
      </div>
    </div>
  );
};

export default SingleContract;
