import React, { useState } from "react";
import { useHistory } from "react-router";

import { userState } from "atoms/user.atom";
import { useSetRecoilState } from "recoil";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
  FormFeedback,
} from "reactstrap";
import { login } from "boostrap/auth";
import { setAccessToken } from "../../boostrap/auth";

const Login = () => {
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await login({
      payload: {
        username: formData.username,
        password: formData.password,
      },
    });
    // Process Access token

    if (result.code === 200) {
      setLoading(false);
      const { accessToken, id, roles } = result;
      if (accessToken) {
        setAccessToken(accessToken);
      }

      // fetch user info
      setUser(result);
      // save role list

      // navigate
      history.push("/admin");
    } else {
      // toast error
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Đăng nhập bằng tài khoản được cung cấp</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Tên đăng nhập"
                    type="text"
                    required
                    onChange={(event) =>
                      setFormData({ ...formData, username: event.target.value })
                    }
                  />
                  <FormFeedback>
                    Oh noes! that name is already taken
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
                    required
                    onChange={(event) =>
                      setFormData({ ...formData, password: event.target.value })
                    }
                  />
                  <FormFeedback>
                    Oh noes! that name is already taken
                  </FormFeedback>
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      rememberMe: event.target.checked,
                    })
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">
                    Lưu lại thông tin đăng nhập
                  </span>
                </label>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  disabled={
                    (!formData.username && !formData.password) || loading
                  }
                  onClick={handleSubmit}
                >
                  {loading && <Spinner color="light" className="mr-3" />}
                  Đăng nhập
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
