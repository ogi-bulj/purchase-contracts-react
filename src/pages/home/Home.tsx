import { useMemo, useState } from "react";
import styles from "./Home.module.css";
import { Contract, getContracts } from "./api/getContracts";
import { Loading, Table } from "../../components";

const Home = () => {
  const [tableData, setTableData] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  useMemo(() => {
    //API poziv
    getContracts()
      .then((res) => {
        setTableData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.container}>
      {/* Table */}
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Purchase contracts list</h3>
          <Table data={tableData} />
        </div>
      )}
    </div>
  );
};

export default Home;
