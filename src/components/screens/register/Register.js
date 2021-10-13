import { useState, useRef } from "react";
import { ArrowForwardIos } from "@material-ui/icons";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleEmailSubmission(e) {
    const email = emailRef.current.value;
    if (validateEmail(email)) setEmail(emailRef.current.value);
    else {
      setWarning("Enter a  valid Email address");
      setTimeout(() => setWarning(""), 5000);
    }
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    const password = passwordRef.current.value;
    if (password.length > 8) setPassword();
    else {
      setWarning("Password length must be greater than 8");
      setTimeout(() => setWarning(""), 5000);
    }
  }

  return (
    <div className="registerScreen">
      <div className="top">
        <img src="/images/netflix-logo.png" alt="" className="logo" />
        <button className="signIn">Sign In</button>
      </div>

      <div className="container">
        <h1 className="head">Unlimited movies, TV shows and more.</h1>
        <h2 className="subHead">Watch anywhere. Cancel anytime.</h2>
        <h3 className="text">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className="formButton" onClick={handleEmailSubmission}>
              <span>Get Started</span> <ArrowForwardIos className="icon" />
            </button>
          </div>
        ) : (
          <form action="" className="input" onSubmit={handleOnSubmit}>
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button type="submit" className="formButton">
              <span>Start</span> <ArrowForwardIos className="icon" />
            </button>
          </form>
        )}

        <div className="warning">{warning}</div>
      </div>
    </div>
  );
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default Register;
