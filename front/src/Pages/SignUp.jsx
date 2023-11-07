import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
// import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const { login, isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  function resetForm() {
    setEmail("");
    setID("");
    setPassword("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    resetForm();
    console.log("submitted");
    const formData = {
      email: email,
      id: ID,
      password: password,
    };
    console.log(formData);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        alert("You have successfully signed up!");
        navigate("/login");
      } else {
        alert("You have entered the wrong credentials");
      }
    } catch (err) {
      console.log(err.message);
    }
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
            placeholder="hla@example.com"
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="ID">ID</label>
          <input
            type="ID"
            id="ID"
            onChange={(e) => setID(e.target.value)}
            placeholder="123456"
            value={ID}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="qwerty"
            required
          />
        </div>

        <div>
          <Button actionType="submit" type="secondary">
            Sign Up
          </Button>
        </div>
      </form>
    </main>
  );
}
