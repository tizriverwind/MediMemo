import styles from "./PatientRecords.module.css";
import { useEffect, useState } from "react";
import Search from "./Search";
import Button from "./Button";
import TableHeader from "./TableHeader";
export default function PatientRecords() {
  const [query, setQuery] = useState("");
  // ...component logic
  return (
    <div className={styles.container}>
      <h2>All Patients Records</h2>
      <div className={styles.patientNav}>
        <Search query={query} setQuery={setQuery} />
        <Button type="patientB">Add New Patient</Button>
      </div>
      <div>
        <TableHeader />
        {/* <TableRow /> */}
      </div>
      {/* More content goes here */}
    </div>
  );
}
