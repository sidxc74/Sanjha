import React from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const HomePage = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) history.push("/chats");
    }, [history]);

    return (
        <Container maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg='white'
                w='100%'
                m='40px 0 15px 0'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text fontSize='4xl' fontFamily='Work sans' color='black' textAlign='center'>Chat-Ease</Text>
            </Box>
            <Box
                p={4}
                w='100%'
                bg='white'
                color='black'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Tabs variant='soft-rounded' >
                    <TabList mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage
