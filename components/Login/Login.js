import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Login.module.css";

const Login = () => {
  const [displayName, setDisplayName] = useState("");
  const { anonymousSignIn, googleSignIn } = useAuth();

  return (
    <div className={styles.root}>
      <h1>Welcome to Moos!</h1>
      <div className={styles.anon}>
        <label>Display Name</label>
        <Input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}></Input>
      </div>
      <Button className={styles.anonButton} onClick={() => anonymousSignIn(displayName)} disabled={!displayName}>
        Anonymous Sign In
      </Button>
      <div>
        <span> - - - - - - - - - - - - - - - - - - - - - </span>
        OR
        <span> - - - - - - - - - - - - - - - - - - - - </span>
      </div>
      <div className={styles.other}>
        <Button onClick={googleSignIn}>Continue with Google</Button>
      </div>
    </div>
  );
};

export default Login;
