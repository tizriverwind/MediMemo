import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
// import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./SignUp.module.css";

export default function SignUp() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [ID, setID] = useState("123456");
  const [password, setPassword] = useState("qwerty");

  // const { login, isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // if (email && password) login(email, password);
  }

  // useEffect(
  //   function () {
  //     // if (isAuthenticated)
  //     navigate("/app", { replace: true });
  //   },
  //   [isAuthenticated, navigate]
  // );

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="ID">ID</label>
          <input
            type="ID"
            id="ID"
            onChange={(e) => setID(e.target.value)}
            value={ID}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="secondary">Sign Up</Button>
        </div>
      </form>
    </main>
  );
}
