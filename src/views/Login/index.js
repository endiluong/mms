import React, { useState } from "react";
import { useHistory } from "react-router";
import * as style from "./index.module.scss";

import { userState } from "atoms/user.atom";
import { useSetRecoilState } from "recoil";

// reactstrap components
import { Button, Card, CardBody, FormGroup, Col, Spinner } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

import { login } from "boostrap/auth";
import { setAccessToken } from "../../boostrap/auth";

const Login = () => {
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event, errors, values) => {
    if (!formData.username && !formData.password) return;
    event.preventDefault();
    setLoading(true);
    const result = await login({
      payload: {
        username: formData.username,
        password: formData.password,
      },
    });

    // Process Access token

    if (result?.code !== 200) {
      // toast error
      setLoading(false);
      window.alert(`${result.status}: ${result.message}`);
    } else {
      setLoading(false);
      const { data } = result;
      const { access_token, id, roles } = data;
      if (access_token) {
        setAccessToken(access_token);
      }

      // fetch user info
      setUser(result);
      // save role list

      // navigate
      history.push("/admin");
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

            <AvForm onSubmit={handleSubmit}>
              <AvField
                name="username"
                className="input-group-alternative"
                placeholder="Tên đăng nhập"
                type="text"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Vui lòng nhập tên đăng nhập",
                  },
                }}
                onChange={(event) =>
                  setFormData({ ...formData, username: event.target.value })
                }
                required
              />
              <AvField
                placeholder="Mật khẩu"
                className="input-group-alternative"
                name="password"
                type="password"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Vui lòng nhập mật khẩu",
                  },
                  minLength: {
                    value: 8,
                    errorMessage: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                }}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
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
              <FormGroup className="d-flex justify-content-center align-items-center">
                <Button className="my-4" color="primary" disabled={loading}>
                  {loading && <Spinner color="light" className="mr-3" />}
                  Đăng nhập
                </Button>
              </FormGroup>
            </AvForm>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
