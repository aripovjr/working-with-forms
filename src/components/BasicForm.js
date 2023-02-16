import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  // aplying useInput() hook to get input value from name field
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  // aplying useInput hook to get input value from last name field
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");

  // aplying useInput() hook to get input value from email field
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (nameIsValid && emailIsValid && lastNameIsValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [nameIsValid, emailIsValid, lastNameIsValid]);

  const submitHandler = (e) => {
    e.perventDefault();

    if (!nameValue && !emailValue && !lastNameValue) {
      return;
    }

    resetName();
    resetLastName();
    resetEmail();
  };

  const nameClass = nameInputHasError ? "form-control invalid" : "form-control";
  const emailClass = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClass = lastNameInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={nameClass}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
          />
          {nameInputHasError && (
            <p className="error-text">Name is not valid!</p>
          )}
        </div>

        <div className={lastNameClass}>
          <label htmlFor="Lname">Last Name</label>
          <input
            type="text"
            id="Lname"
            value={lastNameValue}
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Last name is invalid</p>
          )}
        </div>
      </div>

      <div className={emailClass}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={emailValue}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Email is not valid!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
