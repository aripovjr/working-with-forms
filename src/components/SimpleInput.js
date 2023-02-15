import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    getEnteredName: getEnteredName,
    nameInputBlurHanlder: nameInputBlurHanlder,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const [formIsValid, setFormIsValid] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.trim() !== "";
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  const emailDoesInclude = enteredEmail.includes("@");
  const emailInputStillInvalid = !emailDoesInclude && enteredEmailTouched;

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid && emailDoesInclude) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid, emailDoesInclude]);

  const getEnteredEmail = (e) => {
    setEnteredEmail(e.target.value);
  };

  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const submitHanlder = (e) => {
    e.preventDefault();

    setEnteredEmailTouched(true);

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    resetNameInput();
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const content1 = <p className="error-text">Email must not be empty!</p>;
  const content2 = (
    <p className="error-text">
      Email does not include "at" sign "example@gmail.com"
    </p>
  );

  const renderSwitch = () => {
    switch (true) {
      case emailInputIsInvalid:
        return content1;
      case emailInputStillInvalid:
        return content2;
    }
  };

  return (
    <form onSubmit={submitHanlder}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={getEnteredName}
          onBlur={nameInputBlurHanlder}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Field must not be empty!</p>
        )}
      </div>
      {/* email validation */}
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          type="email"
          id="email"
          onChange={getEnteredEmail}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
          required
        />
        {renderSwitch()}

        {/* {emailInputIsInvalid && (
          <p className="error-text">Email must not be empty!</p>
        )}
        {emailInputStillInvalid && (
          <p className="error-text">Email does not end with "@gmail.com"</p>
        )} */}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
