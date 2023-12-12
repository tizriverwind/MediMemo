import styles from "./Header.module.css";
import { useEffect, useState } from "react";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/getUser");
      if (!response.ok) {
        setUser(null);
        return;
      }
      const data = await response.json();
      console.log("Get user got", data);

      setUser(data.username);
    };

    fetchUser();
  }, []);

  return <div className={styles.mainHeader}></div>;
}

export default Header;
