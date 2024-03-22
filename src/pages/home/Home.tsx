import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./Home.module.css";
import { Contract, getContracts } from "../../api/getContracts";
import { Loading, Table } from "../../components";
import SearchContext from "../../contexts/SearchContext";
import { formatDate } from "../../utils/formatDate";

const Home = () => {
  const { searchQuery } = useContext(SearchContext);
  const [tableData, setTableData] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(true);
  const [filterInactive, setFilterInactive] = useState(true);
  // Funkcija za filtriranje date preko live search query-a i checkbox filtera
  const filteredData = useMemo(() => {
    let filtered = tableData;
    if (!searchQuery) {
      if (!filterActive && !filterInactive) {
        filtered = [];
      } else if (filterActive && !filterInactive) {
        filtered = filtered.filter(
          (item) => item.status === "KREIRANO" || item.status === "NARUČENO"
        );
      } else if (!filterActive && filterInactive) {
        filtered = filtered.filter((item) => item.status === "ISPORUČENO");
      }
    } else {
      filtered = filtered.filter((item) => {
        const isActive =
          item.status === "KREIRANO" || item.status === "NARUČENO";
        return (
          (item.kupac.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.broj_ugovora.toString().includes(searchQuery) ||
            formatDate(item.rok_isporuke).includes(searchQuery)) &&
          ((filterActive && isActive) ||
            (filterInactive && item.status === "ISPORUČENO"))
        );
      });
    }
    return filtered;
  }, [tableData, searchQuery, filterActive, filterInactive]);
  // API poziv
  useEffect(() => {
    getContracts()
      .then((res) => {
        setTableData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleFilterActive = () => {
    setFilterActive(!filterActive);
  };
  const handleFilterInactive = () => {
    setFilterInactive(!filterInactive);
  };
  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Purchase contracts list</h3>
          {/* Filter checkboxes */}
          <div className={styles.filters}>
            <label className={styles.filterLabel}>
              <input
                id="active"
                type="checkbox"
                checked={filterActive}
                onChange={handleFilterActive}
                className={styles.checkbox}
              />
              Aktivni ugovori
            </label>
            <label className={styles.filterLabel}>
              <input
                id="inactive"
                type="checkbox"
                checked={filterInactive}
                onChange={handleFilterInactive}
                className={styles.checkbox}
              />
              Neaktivni ugovori
            </label>
          </div>
          <Table data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default Home;
