import { useContext, useEffect, useMemo, useState } from "react";
import { ContractsContext } from "../../contexts/ContractsContext";
import styles from "./SingleContract.module.css";
import { useParams } from "react-router-dom";
import { ArticlesTable, Loading } from "../../components";
import { formatDate } from "../../utils/formatDate";
import { formatContractStatus } from "../../utils/formatContractStatus";
import { Article, getArticlesById } from "../../api/getArticlesById";
import EditIcon from "../../assets/edit.svg";
import SaveIcon from "../../assets/save.svg";
import { Contract } from "../../api/getContracts";

const SingleContract = () => {
  const { id } = useParams();
  const { contracts, setContracts } = useContext(ContractsContext);
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [memoizedContract, setMemoizedContract] = useState<
    Contract | undefined
  >(undefined);

  // Pronalaženje ugovora s odgovarajućim ID-om
  useMemo(() => {
    const contract = id
      ? contracts.find((contract) => contract.id === parseInt(id))
      : undefined;
    setMemoizedContract(contract);
  }, [id, contracts]);

  // API poziv za artikle
  useEffect(() => {
    getArticlesById() // Dodano slanje ID-ja u API poziv
      .then((res) => {
        setArticlesData(res.data);
      })
      .catch((err) => {
        // TO-DO!: Logika u slučaju errora
        console.log(err);
      });
  }, [id]);

  const updateDeliveryDate = (newDate: string) => {
    if (memoizedContract) {
      const updatedContract = { ...memoizedContract, rok_isporuke: newDate };
      setMemoizedContract(updatedContract);
      updateContract(updatedContract);
    }
  };

  const updateStatus = (newStatus: string) => {
    if (memoizedContract) {
      const updatedContract = { ...memoizedContract, status: newStatus };
      setMemoizedContract(updatedContract);
      updateContract(updatedContract);
    }
  };

  const updateContract = (updatedContract: Contract) => {
    const index = contracts.findIndex(
      (contract) => contract.id === updatedContract.id
    );
    const updatedContracts = [...contracts];
    updatedContracts[index] = updatedContract;
    setContracts(updatedContracts);
  };

  const handleSaveConfirmation = () => {
    if (
      window.confirm("Jeste li sigurni za spremanje promjena?") &&
      memoizedContract
    ) {
      updateContract(memoizedContract);
      setEditMode(false);
      alert("Promjene su uspješno spremljene!");
    } else {
      setMemoizedContract(
        contracts.find((contract) => id && contract.id === parseInt(id))
      );
      setEditMode(false);
    }
  };

  if (!memoizedContract) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>
          Kupoprodajni ugovor -{" "}
          <span className={styles.contractNumber}>
            #{memoizedContract.broj_ugovora}
          </span>
        </h3>
        {(memoizedContract.status === "KREIRANO" ||
          memoizedContract.status === "NARUČENO") && (
          <div
            onClick={() => {
              if (editMode === false) {
                setEditMode(true);
              } else {
                handleSaveConfirmation();
              }
            }}
            className={styles.editContainer}
          >
            <p className={styles.editText}>
              {editMode ? "Spremi promjene" : "Uredi ugovor"}
            </p>
            <img src={editMode ? SaveIcon : EditIcon} height={20} width={20} />
          </div>
        )}
      </div>
      <div className={styles.contractInfo}>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Ime kupca: </p>
          <span className={styles.infoText}>{memoizedContract.kupac}</span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Broj ugovora: </p>
          {
            <span className={styles.infoText}>
              {memoizedContract.broj_ugovora}
            </span>
          }
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Datum akontacije: </p>
          <span className={styles.infoText}>
            {formatDate(memoizedContract.datum_akontacije)}
          </span>
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Rok isporuke: </p>
          {editMode &&
          (memoizedContract.status === "KREIRANO" ||
            memoizedContract.status === "NARUČENO") ? (
            <input
              id="rok_isporuke"
              type="date"
              className={styles.input}
              value={memoizedContract.rok_isporuke}
              onChange={(e) => updateDeliveryDate(e.target.value)}
            />
          ) : (
            <span className={styles.infoText}>
              {formatDate(memoizedContract.rok_isporuke)}
            </span>
          )}
        </div>
        <div className={styles.infoRow}>
          <p className={styles.infoTitle}>Status: </p>
          {editMode &&
          (memoizedContract.status === "KREIRANO" ||
            memoizedContract.status === "NARUČENO") ? (
            <select
              id="status"
              name="status"
              onChange={(e) => updateStatus(e.target.value)}
              className={styles.selectInput}
            >
              {memoizedContract.status === "KREIRANO" && (
                <>
                  <option value="KREIRANO" className={styles.option}>
                    kreirano
                  </option>
                  <option value="NARUČENO" className={styles.option}>
                    naručeno
                  </option>
                </>
              )}
              {memoizedContract.status === "NARUČENO" && (
                <>
                  <option value="NARUČENO" className={styles.option}>
                    naručeno
                  </option>
                  <option value="ISPORUČENO" className={styles.option}>
                    isporučeno
                  </option>
                </>
              )}
            </select>
          ) : (
            <div
              className={styles.statusBox}
              style={{
                backgroundColor: formatContractStatus(memoizedContract.status),
              }}
            >
              <p className={styles.statusText}>{memoizedContract.status}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.articlesContainer}>
        <h3 className={styles.articlesTitle}>Artikli:</h3>
        <ArticlesTable data={articlesData} />
      </div>
    </div>
  );
};

export default SingleContract;
