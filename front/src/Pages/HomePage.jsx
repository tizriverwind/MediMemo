import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Empowering care providers.
          <br />
          Medimemo streamlines your practice.
        </h1>
        <h2>
          Streamline clinical workflows and patient care with our all-in-one
          electronic health records and scheduling system—crafted for efficiency
          by healthcare experts.
        </h2>
        <Link to="/signup" className="cta">
          Optimize your practice now
        </Link>
      </section>
    </main>
  );
}
