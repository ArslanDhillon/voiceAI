"use client"
import { useState, useCallback, useEffect, useRef } from 'react';  // useRef added
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Box, Drawer, Modal, Snackbar, Alert, Slide, Fade } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import ProfileAnimation from '@/components/animation/ProfileAnimation';
import LoginModal from '@/components/loginform/LoginModal';
import axios from 'axios';
import Apis from '@/components/apis/Apis';
import CycleArray from '@/components/animation/TestAnimation';
import AnimatedButton from '@/components/testcomponents/Dropdown';

const backgroundImage = {
    backgroundImage: 'url("/backgroundImage.png")', // Ensure the correct path
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
}

const Page = () => {
    const router = useRouter();
    const buttonRef = useRef(null);
    const buttonRef2 = useRef(null);
    const buttonRef3 = useRef(null);
    const buttonRef4 = useRef(null);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackMessage, setSnackMessage] = useState(false);
    const [openBottomForm, setOpenLoginModalDrawer] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [showCreatorBtn, setShowCreatorBtn] = useState(false);
    const [showProfileIcon, setShowProfileIcon] = useState(false);

    const [boxVisible, setBoxVisible] = useState(false);  // Animation state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });  // Mouse position state
    const { creator } = useParams();
    const [getRecentCallData, setGetRecentCallsData] = useState([]);
    const [getAssistantData, setGetAssistantData] = useState(null);
    const [showLogoutBtn, setShowLogoutBtn] = useState(false);
    const [showPopup, setshowPopup] = useState(true);
    const [isWideScreen, setIsWideScreen] = useState(false);
    const [openClaimPopup, setOpenClaimPopup] = useState(false);
    // for side animation
    const [isVisible, setisVisible] = useState(true);
    const [callErr, setCallErr] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 1024);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //move to become creator
    const handleCreatorXClick = () => {
        router.push('/creator/onboarding2')
    }


    const getUserData = async () => {
        // console.log("Username for testing", creator);
        const ApiPath = `${Apis.GetAssistantData}?username=${creator}`;
        console.log("Api path is", ApiPath);
        try {
            const getResponse = await axios.get(ApiPath, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (getResponse) {
                console.log("Response of getassistant data", getResponse.data.data);
                const AssistantData = getResponse.data.data;
                localStorage.setItem('assistantData', JSON.stringify(AssistantData));
                setGetAssistantData(getResponse.data.data);
            } else {
                console.log("Error occured");
            }
        } catch (error) {
            console.error("Error occured in getassistant api is", error);
        }
    }

    useEffect(() => {
        getUserData()
    }, []);
    useEffect(() => {
        console.log("Get assistant data chagned ", getAssistantData)
    }, [getAssistantData])

    //code to remove the route data
    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('route')
        }, 1000);
    }, [])

    //getting user data when logged in

    useEffect(() => {
        const LocalData = localStorage.getItem('User');
        const D = JSON.parse(LocalData);
        console.log("Login details from localstorage", D);
        if (LocalData) {
            setShowProfileIcon(true);
            if (D.data.user.role === "caller") {
                setShowCreatorBtn(true);
            } else {
                setShowCreatorBtn(false);
            }
        } else {
            setShowProfileIcon(false);
            setShowCreatorBtn(false);
        }
    }, [])




    const hideBottom = () => {
        setOpenLoginModalDrawer(false);
    }

    //code for recent calls api

    const getRecentCalls = async () => {
        try {
            const response = await axios.get(Apis.GetRecentCalls, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response) {
                console.log("respose of get recentcalls api", response.data);
                setGetRecentCallsData(response.data.data);
            }
        } catch (error) {
            console.error("Error occured in getrecent calls api", error);
        }
    }

    useEffect(() => {
        getRecentCalls()
    }, []);

    // Call function on small screens
    const smallScreenClick = useCallback(() => {
        const LocalData = localStorage.getItem('User');
        if (LocalData) {
            const D = JSON.parse(LocalData);
            //console.log("Data test", D.data);
            handleTalktoBlandy();
        } else {
            setOpenLoginModalDrawer(true);
        }
        //console.log('do not touch me');
    }, []);

    // Call function on larger screens
    const handleLargeScreenClick = useCallback(() => {
        const LocalData = localStorage.getItem('User');
        if (LocalData) {
            handleTalktoBlandy();
        } else {
            setOpenLoginModal(true);
        }
    }, []);

    // Effect to update screen size status
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width according to your medium screen size breakpoint
        const handleResize = () => setIsSmallScreen(mediaQuery.matches);

        handleResize(); // Check the screen size on component mount
        mediaQuery.addEventListener('change', handleResize); // Add listener for screen resize

        return () => mediaQuery.removeEventListener('change', handleResize); // Cleanup listener on component unmount
    }, []);

    //code for creating account
    const handleClick = async () => {
        const LocalData = localStorage.getItem('User');
        const D = await JSON.parse(LocalData);
        //console.log("Local data for auto cll", D.data.user);

        setOpenLoginModal(true);
    }

    // Handle button click
    const handleContinue = () => {
        if (isSmallScreen) {
            smallScreenClick();
        } else {
            handleLargeScreenClick();
        }
    };

    const styleLoginModal = {
        height: 'auto',
        bgcolor: 'transparent',
        p: 2,
        mx: 'auto',
        my: '50vh',
        transform: 'translateY(-50%)',
        borderRadius: 2,
        border: "none",
        outline: "none",
        // border: "2px solid green"
    };

    // Animation handler
    // const handleMouseMove = (event) => {
    //     const centerX = window.innerWidth / 2;
    //     const centerY = window.innerHeight / 2;
    //     const x = event.clientX;
    //     const y = event.clientY;

    //     setMousePosition({ x, y });

    //     // Check if the mouse is within 100px of the center
    //     if (Math.abs(x - centerX) <= 150 && Math.abs(y - centerY) <= 150) {
    //         setBoxVisible(false); // Hide the box
    //     } else {
    //         // Check if the mouse is over the button
    //         if (buttonRef.current) {
    //             const rect = buttonRef.current.getBoundingClientRect();
    //             if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    //                 setBoxVisible(false);  // Hide the animation when hovering over the button
    //             } else {
    //                 setBoxVisible(true);   // Show the animation otherwise
    //             }
    //         } else {
    //             setBoxVisible(true);  // Show the box if the button ref is not available
    //         }
    //         if (buttonRef2.current) {
    //             const rect = buttonRef2.current.getBoundingClientRect();
    //             if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    //                 setBoxVisible(false);  // Hide the animation when hovering over the button
    //             } else {
    //                 setBoxVisible(true);   // Show the animation otherwise
    //             }
    //         } else {
    //             setBoxVisible(true);  // Show the box if the button ref is not available
    //         }
    //     }
    // };


    const handleMouseMove = (event) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const x = event.clientX;
        const y = event.clientY;

        setMousePosition({ x, y });

        // Check if the mouse is within 150px of the center
        if (Math.abs(x - centerX) <= 150 && Math.abs(y - centerY) <= 150) {
            setBoxVisible(false); // Hide the box
            return;
        }

        // Check if the mouse is over buttonRef
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false);  // Hide the animation when hovering over buttonRef
                return;
            }
        }

        // Check if the mouse is over buttonRef2
        if (buttonRef2.current) {
            const rect = buttonRef2.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false);  // Hide the animation when hovering over buttonRef2
                return;
            }
        }

        if (buttonRef3.current) {
            const rect = buttonRef3.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false);  // Hide the animation when hovering over buttonRef3
                return;
            }
        }

        if (buttonRef4) {
            const rect = buttonRef4.current.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                setBoxVisible(false);
                return;
            }
        }

        // If none of the conditions are met, show the box
        setBoxVisible(true);
    };


    //code for apicall
    const handleTalktoBlandy = async () => {
        setLoading(true);
        setSnackMessage(true);
        // return
        const LocalData = localStorage.getItem('User');
        let D = null;
        if (LocalData) {
            D = JSON.parse(LocalData);
        } else {
            return;
        }
        console.log("Trying to call", D.data.user.phone);
        // console.log("Id to send is", getAssistantData);
        const localAssistanData = localStorage.getItem('assistantData');
        let modelId = null;
        if (localAssistanData) {
            const asistantLocalData = JSON.parse(localAssistanData);
            console.log("Assistant data retrived", asistantLocalData);
            modelId = (asistantLocalData.id);
        }
        console.log("id to send", modelId);

        // setSnackMessage(true);

        // return
        try {
            const axios = require('axios');
            let data = JSON.stringify({
                "name": D.data.user.name,
                "phone": D.data.user.phone,
                "email": D.data.user.email,
                modelId: modelId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: Apis.MakeCall,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1716566901317x213622515056508930'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    localStorage.removeItem('callStatus');
                    console.log("Data of call removed");
                })
                .catch((error) => {
                    console.log(error);
                    setCallErr(true);
                });
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
            setOpen(false);
            console.log('Response is true');
        }
    }

    useEffect(() => {
        if (snackMessage === true) {
            setTimeout(() => {
                setSnackMessage(false);
            }, 2000);
        }
    }, [snackMessage]);


    const handleAni = () => {
        // setShowProfileIcon(false)
        setisVisible(true);
    }

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                // setisVisible(false);
                // setShowProfileIcon(true)
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [isVisible])

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSnackMessage(true);
    //     }, 1000);
    // },[])

    //code to make triangle
    const triangle = {
        width: 5,
        height: 5,
        // border: "2px solid red",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        borderLeft: "6px solid #000000"
    }


    //code for autto call when we add card

    useEffect(() => {
        const callStatusData = localStorage.getItem('callStatus');
        if (callStatusData) {
            const callStatus = JSON.parse(callStatusData);
            console.log("Status of call is", callStatus);

            // return
            if (callStatus.callStatus === true) {
                handleTalktoBlandy();
            }
        }
    }, [])



    return (
        <div style={backgroundImage} className='h-screen overflow-none' onMouseMove={handleMouseMove}>
            <div className='pt-8 ps-8'>
                <div className='2xl:flex hidden w-full flex flex-row justify-between'>
                    <div className='flex flex-col items-start'>
                        <div className='px-6 py-2 flex gap-4 flex-row items-center' ref={buttonRef4}
                            style={{
                                border: "2px solid #ffffff",
                                // borderTopLeftRadius: 50, borderTopRightRadius: 50,
                                // borderBottomRightRadius: 50,
                                // borderRadiusTopright: 50,
                                // borderRadiusTopright : 50,
                                borderTopLeftRadius: 50,
                                borderBottomRightRadius: 50,
                                borderTopRightRadius: 50,
                                backgroundColor: "#ffffff20",
                                zIndex: 1
                            }}>
                            <div className='flex flex-col items-center'>
                                <div className='relative'>
                                    {/* Profile Image with Claim Button */}
                                    <div className='flex flex-row items-center'>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{ border: "2px solid black", borderRadius: "50%" }}>
                                                <Image src={"/assets/profile.png"} alt='profilephoto' height={50} width={50} style={{ padding: 4 }} />
                                            </div>
                                            {/* Claim Button */}
                                            <div className='absolute top-0 -left-2' style={{ backgroundColor: "transparent" }}>
                                                {/* <Image onClick={() => {
                                                    console.log("Sary gama pada na ri sa");
                                                }} src="/assets/claimLogo.png" alt='claimbtn' height={35} width={35}
                                                    style={{ cursor: "pointer", backgroundColor: "" }} /> */}
                                                <div style={{ height: "30px", width: "30px", backgroundColor: "transparent" }}>
                                                    <Image onClick={() => {
                                                        console.log("Sary gama pada na ri sa");
                                                        setOpenClaimPopup(true);
                                                    }} src="/assets/claimLogo.png" alt='claimbtn' height={40} width={40}
                                                        style={{ cursor: "pointer", backgroundColor: "transparent" }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={triangle} />
                                    </div>
                                </div>
                            </div>


                            <div>
                                {/* code for assistant name and calls */}
                                <div className='flex flex-row items-center gap-8'>
                                    <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                        {getAssistantData &&
                                            <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                {
                                                    getAssistantData.name ?
                                                        <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                            {getAssistantData.name}
                                                        </div> :
                                                        <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                            {getAssistantData.assitant.name}
                                                        </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-row'>
                                    <div style={{ fontSize: 12, color: "grey", fontWeight: "400", fontFamily: "inter" }}>
                                        Calls:
                                    </div>
                                    <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                        {
                                            getAssistantData &&
                                            <div>
                                                {getAssistantData.calls ?
                                                    <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                        {getAssistantData.calls}
                                                    </div> :
                                                    <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                        0
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className='ms-2' style={{ fontSize: 12, color: "grey", fontWeight: "400", fontFamily: "inter" }}>
                                        Earned:
                                    </div>
                                    <div className='' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                        {
                                            getAssistantData &&
                                            <div>
                                                {getAssistantData.earned ?
                                                    <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                        $ {Number(getAssistantData.earned.toFixed(2))}
                                                    </div> :
                                                    <div className='ms-1' style={{ fontWeight: "300", fontFamily: "inter", fontSize: 13 }}>
                                                        $ 0
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* code for socials */}
                        <div className='flex flex-row items-center justify-center pb-6 px-6' ref={buttonRef3}
                            style={{
                                border: "2px solid #ffffff", borderTop: "8px solid #e7f3fe",
                                borderBottomLeftRadius: 50,
                                borderBottomRightRadius: 50, marginTop: "-4px",
                                zIndex: 2, backgroundColor: "#ffffff20",
                            }}>
                            <div className='flex flex-col gap-4' style={{ marginTop: 10 }}>
                                <button>
                                    <Image
                                        // layout='responsive'
                                        objectFit='contain' src={"/assets/instagram.png"} alt='social' height={25} width={25} style={{ resize: "cover" }} />
                                </button>
                                <button>
                                    <Image
                                        // layout='responsive'
                                        objectFit='contain' src={"/assets/twitter.png"} alt='social' height={25} width={25} style={{ resize: "cover" }} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {
                        showProfileIcon &&
                        <div ref={buttonRef2} style={{ width: "10%" }}>

                            <AnimatedButton snackMessage={snackMessage} />

                            <div className='flex flex-row gap-4 items-center'>
                            </div>
                        </div>
                    }

                </div>
                <div className='2xl:hidden flex items-center justify-between'>
                    <ProfileAnimation creator={creator} />
                    {
                        showProfileIcon &&
                        <div className='flex flex-row gap-4 items-center'>
                            <div className='me-8'>
                                <AnimatedButton snackMessage={snackMessage} />
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Animating Image */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} className='flex w-9/12 justify-center items-center md:flex hidden'>
                <button className='flex items-center justify-center flex-1 '
                    style={{
                        cursor: "pointer",
                        outline: "none",
                        border: "none",
                        backgroundColor: "transparent",
                    }}>
                    <motion.img onClick={handleContinue}
                        src="/borderedAppLogo.png"
                        alt="Animating Image"
                        animate={{
                            width: isWideScreen ? ["830px", "650px", "830px"] : ["600px", "400px", "600px"],  // Keyframes for width
                            height: isWideScreen ? ["830px", "650px", "830px"] : ["600px", "400px", "600px"], // Keyframes for height
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                        style={{
                            // margin: "auto",
                            display: "block",
                            width: isWideScreen ? "830px" : "600px", // Initial width
                            height: isWideScreen ? "830px" : "600px", // Initial height
                        }}
                    />
                </button>
            </div>

            {/* visible on small screens only */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} className='w-full flex justify-center items-center md:hidden'>
                <button className='flex items-center justify-center flex-1' onClick={handleContinue}
                    style={{
                        cursor: "pointer",
                        outline: "none",
                        border: "none",
                    }}>
                    <motion.img
                        src="/borderedAppLogo.png"
                        alt="Animating Image"
                        animate={{
                            width: ["380px", "200px", "380px"],  // Keyframes for width
                            height: ["380px", "200px", "380px"], // Keyframes for height
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                        style={{
                            // margin: "auto",
                            display: "block",
                            width: "380px", // Initial width
                            height: "380px", // Initial height
                        }}
                    />
                </button>
            </div>

            {/* Mouse Following Box Animation */}
            <div className='lg:flex hidden'>
                <AnimatePresence>
                    {boxVisible && (
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: mousePosition.y - 25,
                                left: mousePosition.x - 25,
                                width: 100,
                                height: 100,
                                backgroundColor: '#ffffff60',
                                borderRadius: "50%",
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ color: 'black' }}>
                                Tap to call
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* Button and Calls array */}
            <div style={{ position: "absolute", bottom: 10 }} className='w-full flex items-end justify-between mb-12 rounded'>
                <div ref={buttonRef} className='flex items-end ms-8 px-4' style={{ backgroundColor: "#620FEB66", width: "fit-content", borderRadius: "70px" }}>
                    {
                        showCreatorBtn &&
                        <button className='flex flex-row p-4 items-center gap-4'>
                            <Image src={"/assets/stars.png"} alt='phone' height={20} width={20} />
                            <div onClick={
                                // handleCreatorXClick
                                () => {
                                    window.open('https://form.jotform.com/noahdeveloperr/creatorX', "_blank")
                                }
                            } className='text-white' style={{ fontSize: 17, fontWeight: "600" }}>
                                Build Your CreatorX
                            </div>
                        </button>
                    }
                </div>
                <div className='me-8 md:flex hidden'>
                    <CycleArray data={getRecentCallData} assistantData={getAssistantData} />
                </div>
            </div>

            {/* Snack messages */}

            <Modal
                open={openLoginModal}
                // onClose={(() => setOpenLoginModal(false))}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(40px)',
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12"
                    sx={styleLoginModal}
                >
                    <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} />
                </Box>
            </Modal>

            <Modal
                open={openClaimPopup}
                onClose={(() => setOpenClaimPopup(false))}
                closeAfterTransition
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(40px)',
                    },
                }}
            >
                <Box className="lg:w-5/12 sm:w-7/12"
                    sx={styleLoginModal}
                >
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                    <div className='flex flex-row justify-center'>
                        <div className='w-7/12' style={{ backgroundColor: "#ffffff23", padding: 20, borderRadius: 10 }}>
                            {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                            <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 10 }}>
                                <div className='mt-4'>
                                    <Image src="/assets/claimIcon.png" alt='claimimg' height={24} width={24} />
                                </div>
                                <div className='mt-8' style={{ fontWeight: '600', fontSize: 24, fontFamily: 'inter' }}>
                                    Claim Account
                                </div>
                                <div className='text-black' style={{ fontWeight: "400", fontSize: 15, fontFamily: "inter", marginTop: 10 }}>
                                    This account hasn't been claimed by its creator. In order to claim this creator, you must be the real creator and verify your identity.
                                </div>
                                <div className='flex flex-row justify-start mt-4 w-full' style={{ marginTop: 30 }}>
                                    <div>
                                        <button
                                            onClick={() => {
                                                window.open("https://www.youtube.com", '_blank')
                                            }} className='bg-purple px-6 py-2 text-white'
                                            style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15, borderRadius: "50px" }}>
                                            Verify Identity
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Drawer
                open={openBottomForm}
                // onClose={() => setOpenLoginModalDrawer(false)}
                anchor='bottom'
                BackdropProps={{
                    timeout: 1000,
                    sx: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(40px)',
                    },
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        height: 'auto',
                        padding: 2,
                    }
                }}>
                <div>
                    <div className='w-full'>
                        <LoginModal creator={creator} assistantData={getAssistantData} closeForm={hideBottom} />
                    </div>
                </div>
            </Drawer>
            {/* {
                snackMessage &&
                <div style={{ width: '280px', height: '80px', padding: 15, borderRadius: 20, border: '2px solid white', backgroundColor: '#ffffff60', position: 'absolute', top: 10, right: 12 }}>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: '500', fontFamily: 'inter' }}>
                            🎉Congratulations
                        </div>
                        <div>
                        </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: '400', fontFamily: 'inter' }}>
                        Your call has been initiated successfully
                    </div>
                </div>
            } */}
            <Snackbar
                open={callErr}
                autoHideDuration={5000}
                onClose={() => setCallErr(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                TransitionComponent={Fade}
                TransitionProps={{
                    timeout: {
                        enter: 1000,
                        exit: 1000,
                    }
                }}
                sx={{
                    position: 'fixed', // Ensures it stays in place
                    top: 20, // Adjust as needed for spacing from the top
                    left: '50%', // Center horizontally
                    transform: 'translateX(-50%)', // Center horizontally
                }}
            >
                <Alert
                    // onClose={() => setCallErr(false)}
                    severity="error"
                    sx={{
                        width: '100%',
                        backgroundColor: 'white', // Set background color to white
                        color: 'black',
                        width: "300px",
                        borderRadius: "20px"
                        // border: "2px solid grey"
                    }}
                >
                    Unfortunately, we were unable to process your payment method on file, please update your payment method to start a call.
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Page;
