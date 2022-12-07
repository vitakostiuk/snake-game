import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors } from "../../redux/auth";

import s from "./SignUp.module.css";

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
        <form className={s.ContactForm} onSubmit={handleSubmit}>
          <div className={s.InputWrapper}>
            <label className={s.Label}>
              Enter your name
              <input
                className={s.Input}
                value={name}
                type="text"
                // placeholder="Cucumber"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <button type="submit" className={s.FormBtn} disabled={isBtnDisabled}>
            Done
          </button>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SignUp;
