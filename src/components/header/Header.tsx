import styles from "./Header.module.css";
import CrossIcon from "../../assets/cross.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      {/* Left (logo) box */}
      <div className={styles.logoBox}>
        <h1 className={styles.title}>
          purchase contracts
          <br />
          <span className={styles.subtitle}>management</span>
        </h1>
      </div>
      {/* Center (search) box */}
      <div className={styles.searchBox}>
        <input
          type="search"
          placeholder="Search..."
          className={styles.search}
        />
      </div>
      {/* Right (button) box */}
      <div className={styles.buttonBox}>
        <button className={styles.button}>
          <p className={styles.buttonText}>new</p>
          <img src={CrossIcon} height={22} width={22} />
        </button>
      </div>
    </div>
  );
};

export default Header;
