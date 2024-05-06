import React from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            console.log('please fill all the fields');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            console.log('login succesful');

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
        }
    };


    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="green"
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login
