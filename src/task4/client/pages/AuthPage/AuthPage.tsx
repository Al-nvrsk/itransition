import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Form, Input, Button, message } from 'antd';
import './AuthPage.css';
import { routePath } from '../../../../utils/routePath';
import { check, login } from '../../http/userApi';
import { Context } from '../../../../App';
import { ErrorType } from '../../types/types';

const { Title } = Typography;

export const AuthPage = () => {
    const context = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        check().then(data => {
            context?.userContext?.setUser(data)
            context?.userContext.setIsAuth(true)
            navigate(routePath.task4)
        })},[])

    const onSubmit = useCallback( async() => {
        setEmailError(email.length>0 ? null : "login can't be empty")
        setPasswordError(password.length>0 ? null : "password can't be empty")
        if (!email || !password) {
            return
        }         
        try {
            const data = await login(email, password);
            context?.userContext.setUser(data)
            context?.userContext?.setIsAuth(true)
            navigate(routePath.task4);
        } catch (e) {
            alert((e as ErrorType).response.data.message)
        }
    }, [password, email])

    return (
        <Row justify="center" align="middle" className="auth-page">
            <Col className="auth-page__col">
                <Title className="auth-page__title">
                    Sing in
                </Title>
                <Form size="large" className="auth-page__form" onFinish={onSubmit}>
                    <Form.Item 
                        validateStatus={emailError ? 'error' : ''} help={emailError}
                    >
                        <Input 
                            value = {email}
                            placeholder="E-mail"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                e.target.value.length > 0 && setEmailError('')
                            }}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={passwordError ? 'error' : ''} help={passwordError}
                    >
                        <Input.Password
                            value={password}
                            onChange={ (e) => {
                                setPassword(e.target.value)
                                e.target.value.length > 0 && setPasswordError('')
                            }}
                            placeholder="Пароль"
                            allowClear
                        />
                    </Form.Item>
                <Form.Item>
                    <Button 
                        htmlType="submit"
                        className="auth-page__button"
                    >
                        Authorization
                    </Button>
                </Form.Item>
            </Form>
            <Link 
                className="auth-page__link"
                to={routePath.registration}
            >
                Don't have an account?
            </Link>
        </Col>
    </Row>
    );
};
