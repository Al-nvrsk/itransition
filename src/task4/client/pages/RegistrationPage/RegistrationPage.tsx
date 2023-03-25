import React, { useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Form, Input, Button } from 'antd';
import './RegistrationPage.css';
import { routePath } from '../../../../utils/routePath';
import { Context } from '../../../../App';
import { registration } from '../../http/userApi';
import { ErrorType } from '../../types/types';

const { Title } = Typography;

export const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [secondName, setSecondName] = useState('')
    const [secondNameError, setSecondNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const navigate = useNavigate()
    const context = useContext(Context);

    const onSubmit =  async () => {
        setFirstNameError(firstName.length>0 ? '' : "First name can't be empty")
        setSecondNameError(secondName.length>0 ? '' : "Second name can't be empty")
        setEmailError(email.length>0 ? '' : "login can't be empty")
        setPasswordError(password.length>0 ? '' : "password can't be empty")
        setConfirmPasswordError(password===confirmPassword ? '' : "confirm password isn't correct")
        if (!firstName || !secondName || !email || !password || confirmPassword!==password ) {
            return
        }
        const formData = {
            firstName,
            secondName,
            email,
            password
        }

        try {
            const data = await registration(formData);
            context?.userContext?.setUser(data)
            context?.userContext?.setIsAuth(true)
            navigate(routePath.task4);
        } catch (e) {
            alert((e as ErrorType).response.data.message)
        }
    }

    return (
        <Row justify="center" align="middle" className="registration-page">
            <Col className="registration-page__col">
                <Title className="registration-page__title">
                    Registration
                </Title>
                <Form size="large" className="registration-page__form" onFinish={onSubmit}>
                    <Form.Item
                        validateStatus={firstNameError ? 'error' : ''} help={firstNameError}>
                        <Input 
                            placeholder="First name" 
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                e.target.value.length>0 && setFirstNameError('')
                            }}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item 
                        validateStatus={secondNameError ? 'error' : ''} help={secondNameError}>
                        <Input 
                            value={secondName}
                            onChange={(e) => {
                                setSecondName(e.target.value)
                                e.target.value.length > 0 && setSecondNameError('')
                            }}
                            placeholder="Second name" 
                            allowClear
                        />
                    </Form.Item>
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
                            placeholder="Password"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item 
                        validateStatus={confirmPasswordError ? 'error' : ''} help={confirmPasswordError}>
                        <Input.Password 
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                e.target.value===password && setConfirmPasswordError('')
                            }}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className="registration-page__button">
                            Создать аккаунт
                        </Button>
                    </Form.Item>
                </Form>
                <Link className="registration-page__link" to={routePath.auth}>
                    Уже есть аккаунт?
                </Link>
            </Col>
        </Row>
    );
};
