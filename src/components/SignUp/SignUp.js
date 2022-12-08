import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors } from "../../redux/auth";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const loading = useSelector(authSelectors.getLoading);
  const error = useSelector(authSelectors.getError);

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { name };

    dispatch(authOperations.signup(credentials));
  };

  useEffect(() => {
    if (!error) {
      return;
    }
    console.log(error);
  }, [error]);

  const isBtnDisabled = loading || !name;

  return (
    <>
      <div>
        <h1 className={styles.title}>Welcome to the Snake Game</h1>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>
              Enter your name
              <input
                className={styles.input}
                value={name}
                type="text"
                // placeholder="Cucumber"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            className={styles.formBtn}
            disabled={isBtnDisabled}
          >
            Done
          </button>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SignUp;
