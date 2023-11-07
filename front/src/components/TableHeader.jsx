import styles from "./TableHeader.module.css";
function TableHeader() {
  return (
    <div className={styles.container}>
      <div>ID</div>
      <div>Name</div>
      <div>Date of Birth</div>
      <div>Gender</div>
    </div>
  );
}

export default TableHeader;
