import { useContext } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import SearchIcon from "../../assets/search.svg";

const Header = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {/* Left (logo) box */}
      <div
        onClick={() => navigate("/purchase-contracts-react")}
        className={styles.logoBox}
      >
        <h1 className={styles.title}>
          purchase contracts
          <br />
          <span className={styles.subtitle}>management</span>
        </h1>
      </div>
      {/* Center (search) box */}
      <div className={styles.searchBox}>
        <label className={styles.searchLabel}>
          <img
            src={SearchIcon}
            height={20}
            width={20}
            className={styles.searchIcon}
          />
          <input
            name="search"
            type="search"
            placeholder="Pretraži kupca, broj ugovora, rok isporuke..."
            className={styles.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => navigate("/purchase-contracts-react")}
          />
        </label>
      </div>
      {/* Right (button) box */}
      <div className={styles.buttonBox}>
        <button
          onClick={() => navigate("/purchase-contracts-react/new-contract")}
          className={styles.button}
        >
          <p className={styles.buttonText}>add new</p>
          <div className={styles.crossIcon} />
        </button>
      </div>
    </div>
  );
};

export default Header;
