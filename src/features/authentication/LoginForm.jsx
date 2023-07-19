import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import { VISITOR, VISITOR_PASS } from "../../../visitor";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogin } = useLogin();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }

  function handleVisitor(evt) {
    evt.preventDefault();
    login({ email: VISITOR, password: VISITOR_PASS });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogin}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogin}>
          {isLogin ? <SpinnerMini /> : "Login"}
        </Button>
        <Button
          size="medium"
          disabled={isLogin}
          onClick={handleVisitor}
          $variation="secondary"
        >
          {isLogin ? <SpinnerMini /> : "Login as a visitor"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
