'use client'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react'
import CreateAccount from './CreateAccount';
import VerifyPhoneNumber from './VerifyPhoneNumber';
import AddCard from './Addcard/AddCard';
import Signin from './Signin';
import Image from 'next/image';

const boxVariants = {
    enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0.4,
    }),
};

const LoginModal = ({ closeForm, creator, assistantData }) => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [direction, setDirection] = useState(1);
    const [userLoginDetails, setUserLoginDetails] = useState(null);
    const [isWideScreen, setIsWideScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleContinue = (details) => {
        // handleCurrentIndex();
        setDirection(1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setUserLoginDetails(details);
    };

    // const handleContinueT = (details) => {
    //     // handleCurrentIndex();
    //     setDirection(1);
    //     setCurrentIndex((prevIndex) => prevIndex + 1);
    //     setUserLoginDetails(details);
    // };

    const handleBack = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleSignin = () => {
        setDirection(-2);
        setCurrentIndex((prevIndex) => prevIndex - 2);
    };

    const containerStyles = {
        position: 'relative',
        // height: '40vh',
        // width: '50vw',
        overflow: 'hidden',
        // border: "2px solid red",
    };

    const styles = {
        // position: 'absolute', // Ensures the boxes are stacked on top of each other
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        // height: "20vh",
        // marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
        // marginInline: 10,
        // border: "2px solid red",
    };

    const shdowBorder = {
        backgroundColor: "#ffffff23", padding: 30, borderRadius: 8
    }

    return (
        <div className='flex flex-row justify-center' style={containerStyles}>
            <AnimatePresence initial={false} custom={direction}>
                {currentIndex === 0 && (
                    <div className='flex flex-col w-full h- justify-center' style={shdowBorder}>
                        <motion.div
                            key="box1"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles} className='px-3 py-5'
                        >
                            <div className='w-full'>
                                <Signin handleContinue={handleContinue} closeForm={closeForm} />
                            </div>
                        </motion.div>
                    </div>
                )}
                {currentIndex === 1 && (
                    <div className='flex flex-col w-full xl:w-9/12 2xl:w-8/12 md:w-9/12  justify-center' style={isWideScreen ? shdowBorder : {}}>
                        <motion.div
                            key="box2"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                            className='p-6'
                        >
                            <div className='w-full'>
                                <CreateAccount
                                    creator={creator} modalData={assistantData}
                                    handleContinue={handleContinue} handleBack={handleBack} closeForm={closeForm} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 2 && (
                    <div className='flex flex-col w-full lg:w-10/12 xl:w-8/12 h- justify-center' style={shdowBorder}>
                        <motion.div
                            className='px-3 py-5'
                            key="box3"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-10/12 lg:w-full '>
                                <VerifyPhoneNumber handleContinue={handleContinue} userLoginDetails={userLoginDetails} handleBack={handleBack} handleSignin={handleSignin} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 3 && (
                    <div className='flex flex-col w-full xl:w-10/12 h- justify-center' style={shdowBorder}>
                        <motion.div
                            className='px-3 py-5'
                            key="box4"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full'>
                                {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                                <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 15 }}>
                                    <div style={{ fontWeight: '700', fontSize: 24, fontFamily: 'inter' }}>
                                        First 5 minutes are on us!
                                    </div>
                                    <div className='text-lightWhite' style={{ fontWeight: "800", fontSize: 13, fontFamily: "inter", marginTop: 10 }}>
                                        We have got your first 5 minutes covered! Anything more is just $1 per minute to get some of the best advice of your life.
                                        <br /> <br />You are only charged for minutes talked. We add 10 minutes to your account when it drops below 2 minutes.
                                        <br /><br />Enjoy!
                                    </div>
                                    <div className='flex flex-row justify-between w-full' style={{ marginTop: 30 }}>
                                        <div>
                                            {/* <button onClick={handleBack}>
                                                <Image src="/assets/backArrow.png" height={9} width={13} alt='back' />
                                            </button> */}
                                        </div>
                                        <div>
                                            <button onClick={handleContinue} className='bg-purple px-6 py-2 text-white' style={{ fontWeight: "400", fontFamily: "inter", fontSize: 15, borderRadius: "50px" }}>
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentIndex === 4 && (
                    <div className='flex flex-col w-full lg:w-10/12 xl:w-8/12 h- justify-center' style={shdowBorder}>
                        <motion.div
                            className='px-3 py-5'
                            key="box5"
                            custom={direction}
                            variants={boxVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0 }}
                            style={styles}
                        >
                            <div className='w-full px-6 py-4'>
                                {/* <button onClick={handleBack}>h</button> */}
                                <AddCard handleBack={handleBack} closeForm={closeForm} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LoginModal