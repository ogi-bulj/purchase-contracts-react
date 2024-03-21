import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {/* Left (logo) box */}
      <div onClick={() => navigate("/")} className={styles.logoBox}>
        <h1 className={styles.title}>
          purchase contracts
          <br />
          <span className={styles.subtitle}>management</span>
        </h1>
      </div>
      {/* Center (search) box */}
      <div className={styles.searchBox}>
        <input
          name="search"
          type="search"
          placeholder="Search..."
          className={styles.search}
        />
      </div>
      {/* Right (button) box */}
      <div className={styles.buttonBox}>
        <button
          onClick={() => navigate("/new-contract")}
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
