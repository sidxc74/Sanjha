import React, { useState } from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Signup() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleClick = () => setShow(!show);
    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            console.log('hello');
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', "chat-app");
            data.append('cloud_name', "dom7ry2q1");
            fetch("https://api.cloudinary.com/v1_1/dom7ry2q1", {
                method: "post",
                body: data
            }).then((res) => res.json()).then(data => {
                setPic(data.url.toString());
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        } else {
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            console.log("please fill all the fields");
            setLoading(false);
            return;
        }
        if (password !== confirmpassword) {
            console.log('password dont match');
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };
            const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
            console.log('registration successful');
            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            history.push('/')
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>

    )
}

export default Signup
