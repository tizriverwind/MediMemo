import { useState } from "react";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      resetForm();
      if (res.status === 200) {
        alert("You have successfully logged in!");
        navigate("/app");
      } else {
        alert("You have entered the wrong credentials");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

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
            placeholder="hh@example.com"
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="ID">ID</label>
          <input
            type="ID"
            id="ID"
            onChange={(e) => setID(e.target.value)}
            value={ID}
            placeholder="123134"
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
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
