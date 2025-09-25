import React, { useState, useContext } from "react";
import classes from "./signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Componenets/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  // console.log(email, password);
  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true, signUp: false });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          dispatch({ type: "SET_USER", user: user });
          setLoading({ ...loading, signIn: false, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false, signUp: false });
        });
    } else {
      setLoading({ signIn: false, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          dispatch({ type: "SET_USER", user: user });
          setLoading({ ...loading, signIn: false, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/800px-Amazon_2024.svg.png"
          alt=""
        />
      </Link>
      {/* form */}

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <p style={{ paddingTop: "5px", color: "red", alignItems: "center" }}>
            {navStateData?.state?.msg}
          </p>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signIn}
          >
            {loading.signIn ? (
              <ClipLoader color="white" size={15} />
            ) : (
              "Sign In"
            )}
            {/* Sign In */}
          </button>

          <p>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
          <Link to="/auth">Forgot Password?</Link>
          <button
            type="submit"
            onClick={authHandler}
            name="signup"
            className={classes.register_button}
          >
            {loading.signUp ? (
              <ClipLoader color="white" size={15} />
            ) : (
              "Create your Amazon account"
            )}
            {/* Create your Amazon account */}
          </button>
          {error && <p style={{ paddingTop: "5px", color: "red" }}>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Auth;
