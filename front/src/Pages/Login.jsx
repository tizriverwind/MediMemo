import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function changeClick() {
    setIsActive((cur) => !cur);
    resetForm();
  }

  function togglePWVisibility() {
    setIsVisible((cur) => !cur);
  }

  function resetForm() {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleSubmitSignUp(e) {
    e.preventDefault();
    resetForm();
    console.log("submitted");
    const formData = {
      email: email,

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
        toast.success("You have successfully signued up and logged in!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        navigate("/app/patient-records");
      } else {
        alert("You have entered the wrong credentials");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  async function handleSubmitLogin(e) {
    e.preventDefault();
    resetForm();
    console.log("submitted");
    const formData = {
      email: email,

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
        // alert("You have successfully logged in!");
        toast.success("You have successfully logged in!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        navigate("/app/patient-records");
      } else {
        toast.error("You have entered the wrong credentials!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        // alert("You have entered the wrong credentials");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <main className={styles.container}>
      <PageNav />
      <section>
        <div
          className={`${styles.formcontainer} ${isActive ? styles.active : ""}`}
        >
          <div className={styles.forms}>
            <div className={`${styles.form} ${styles.login}`}>
              <span className={styles.title}>Login</span>
              <form className={` ${styles.dummy}`} onSubmit={handleSubmitLogin}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    {/* <label htmlFor="email">Email Address</label> */}

                    <input
                      type="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter Your Email"
                      required
                    />
                    <HiOutlineMail className={styles.icon} />
                  </div>
                </div>

                {/* <div className={styles.row}>
                <label htmlFor="ID">ID</label>
                <input
                  type="ID"
                  id="ID"
                  onChange={(e) => setID(e.target.value)}
                  value={ID}
                  placeholder="Enter Your ID"
                  required
                />
              </div> */}

                <div className={styles.row}>
                  <div className={styles.field}>
                    {/* <label htmlFor="password">Password</label> */}

                    <input
                      type={isVisible ? "text" : "password"}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Enter Your Password"
                      required
                    />
                    <RiLockPasswordLine className={styles.icon} />
                    {isVisible ? (
                      <FaRegEye
                        className={styles.ricon}
                        onClick={togglePWVisibility}
                      />
                    ) : (
                      <FaRegEyeSlash
                        className={styles.ricon}
                        onClick={togglePWVisibility}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.checkbox}>
                  <div className={styles.content}>
                    <input type="checkbox" id="logCheck" />
                    <label htmlFor="logCheck" className={styles.cbtext}>
                      Remember Me
                    </label>
                  </div>
                  <a href="#" className={styles.cbtext}>
                    Forgot Password?
                  </a>
                </div>

                <div>
                  <Button
                    className={styles.ctabutton}
                    actionType="submit"
                    type="secondary"
                  >
                    Login
                  </Button>
                </div>
              </form>
              <div className={styles.loginSignup}>
                <span className={styles.cbtext}>Not a member?</span>
                <a
                  href="#"
                  className={`${styles.cbtext} ${styles.signupLink}`}
                  onClick={changeClick}
                >
                  Signup Now
                </a>
              </div>
            </div>
            <div className={`${styles.form} ${styles.signup}`}>
              <span className={styles.title}>Registration</span>
              <form
                className={` ${styles.dummy}`}
                onSubmit={handleSubmitSignUp}
              >
                <div className={styles.row}>
                  <div className={styles.field}>
                    {/* <label htmlFor="email">Email Address</label> */}

                    <input
                      type="text"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Enter Your Name"
                      required
                    />
                    <FaRegUser className={styles.icon} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    {/* <label htmlFor="email">Email Address</label> */}

                    <input
                      type="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter Your Email"
                      required
                    />
                    <HiOutlineMail className={styles.icon} />
                  </div>
                </div>

                {/* <div className={styles.row}>
                <label htmlFor="ID">ID</label>
                <input
                  type="ID"
                  id="ID"
                  onChange={(e) => setID(e.target.value)}
                  value={ID}
                  placeholder="Enter Your ID"
                  required
                />
              </div> */}

                <div className={styles.row}>
                  <div className={styles.field}>
                    {/* <label htmlFor="password">Password</label> */}

                    <input
                      type={isVisible ? "text" : "password"}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Enter Your Password"
                      pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                      title="Password must be 8-20 characters long and include at least one letter, one number, and one special character (!@#$%^&*)."
                      required
                    />
                    <RiLockPasswordLine className={styles.icon} />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    {/* <label htmlFor="password">Password</label> */}

                    <input
                      type={isVisible ? "text" : "password"}
                      id="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      placeholder="Enter Your Password"
                      pattern={`${password}`}
                      required
                      title="Passwords need to match"
                    />
                    <RiLockPasswordLine className={styles.icon} />
                    {isVisible ? (
                      <FaRegEye
                        className={styles.ricon}
                        onClick={togglePWVisibility}
                      />
                    ) : (
                      <FaRegEyeSlash
                        className={styles.ricon}
                        onClick={togglePWVisibility}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.checkbox}>
                  <div className={styles.content}>
                    <input type="checkbox" id="logCheck" />
                    <label htmlFor="logCheck" className={styles.cbtext}>
                      I have accepted all terms and conditions
                    </label>
                  </div>
                </div>

                <div>
                  <Button
                    className={styles.ctabutton}
                    actionType="submit"
                    type="secondary"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
              <div className={styles.loginSignup}>
                <span className={styles.cbtext}>Already a member?</span>
                <a
                  href="#"
                  className={`${styles.cbtext} ${styles.signupLink}`}
                  onClick={changeClick}
                >
                  Login Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
