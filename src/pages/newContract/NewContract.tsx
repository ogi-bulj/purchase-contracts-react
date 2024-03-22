import { useContext, useState } from "react";
import styles from "./NewContract.module.css";
import { ContractsContext } from "../../contexts/ContractsContext";
import { Contract } from "../../api/getContracts";
import { useNavigate } from "react-router";

const NewContract = () => {
  const navigate = useNavigate();
  const { contracts, setContracts } = useContext(ContractsContext);
  const [newContract, setNewContract] = useState<Contract>({
    kupac: "",
    broj_ugovora: "",
    datum_akontacije: "",
    rok_isporuke: "",
    status: "KREIRANO",
    id: 0,
  });
  const [isCreated, setIsCreated] = useState(false);
  const handleKupacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContract({ ...newContract, kupac: e.target.value });
  };
  const handleBrojUgovoraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContract({ ...newContract, broj_ugovora: e.target.value });
  };
  const handleDatumAkontacijeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewContract({ ...newContract, datum_akontacije: e.target.value });
  };
  const handleRokIsporukeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContract({ ...newContract, rok_isporuke: e.target.value });
  };
  const handleCreateContract = () => {
    const newContractWithId = {
      ...newContract,
      id: Math.floor(Math.random() * 100000) + 1,
    };
    setContracts([...contracts, newContractWithId]);
    setIsCreated(true);
    setNewContract({
      id: null,
      kupac: "",
      broj_ugovora: "",
      datum_akontacije: "",
      rok_isporuke: "",
    });
  };
  return (
    <div className={styles.container}>
      {isCreated ? (
        <div className={styles.createdContract}>
          <p className={styles.title}>Ugovor uspješno kreiran!</p>
          <p className={styles.subtitle}>
            Povratak na{" "}
            <a onClick={() => navigate("/")} className={styles.link}>
              pregled ugovora
            </a>
            .
          </p>
        </div>
      ) : (
        <>
          <h3 className={styles.title}>Novi ugovor</h3>
          <form className={styles.form} id="contract_form">
            <div className={styles.formRow}>
              <label className={styles.label}>
                Ime kupca
                <input
                  id="kupac"
                  type="text"
                  className={styles.input}
                  value={newContract.kupac}
                  onChange={handleKupacChange}
                />
              </label>
              <label className={styles.label}>
                Broj ugovora
                <input
                  id="broj_ugovora"
                  type="text"
                  className={styles.input}
                  value={newContract.broj_ugovora}
                  onChange={handleBrojUgovoraChange}
                />
              </label>
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>
                Datum akontacije
                <input
                  id="datum_akontacije"
                  type="date"
                  className={styles.input}
                  value={newContract.datum_akontacije}
                  onChange={handleDatumAkontacijeChange}
                />
              </label>
              <label className={styles.label}>
                Rok isporuke
                <input
                  id="rok_isporuke"
                  type="date"
                  className={styles.input}
                  value={newContract.rok_isporuke}
                  onChange={handleRokIsporukeChange}
                />
              </label>
            </div>
            <button
              className={styles.button}
              type="button"
              onClick={handleCreateContract}
            >
              <p className={styles.buttonText}>Kreiraj ugovor</p>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewContract;
