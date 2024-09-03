"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
// import Apis from '../Apis/Apis';
import Image from 'next/image';
import { Link } from '@mui/material';

const callerProfileNav = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [formattedName, setformattedName] = useState('');
    const [formattedEmail, setformattedEmail] = useState('');
    const [separateLetters, setSeparateLetters] = useState('');
    const [getAssistantData, setGetAssistantData] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const links = [
        {
            id: 1,
            name: 'My Account',
            href: '/callerProfile',
            // href: '/callerProfile',
            image: '/assets/about.png',
            unSelectedImg: '/unselectedAccountIcon.png'
        },
        {
            id: 2,
            name: 'Calls',
            href: '/callerProfile/calls',
            image: '/assets/selectedCallIcon.png',
            unSelectedImg: '/assets/unselectedCallIcon.png'
        },
        {
            id: 3,
            name: 'My Products',
            href: '/callerProfile/myProducts',
            image: '/assets/selectedCreatorIcon.png',
            unSelectedImg: '/assets/unselectedCreatorIcon.png'
        },
        {
            id: 4,
            name: 'Payment Methods',
            href: '/callerProfile/plans',
            image: '/assets/selectedPlansIcon.png',
            unSelectedImg: '/assets/plansI.png'
        },
        {
            id: 5,
            name: 'Feedback',
            href: '',
            image: '/assets/selectedfeedbackIcon.png',
            unSelectedImg: '/assets/feedback.png'
        },
        {
            id: 6,
            name: 'Terms & Condition',
            href: '',
            image: '/assets/selectedtermsIcon.png',
            unSelectedImg: '/assets/terms.png'
        }
    ]

    useEffect(() => {
        const localData = localStorage.getItem('User');
        const data = JSON.parse(localData);
        console.log("Get user details", data.data.user);
        setUserDetails(data.data.user);
    }, []);

    useEffect(() => {
        const formatName = (name) => {
            if (name.length <= 8) {
                return name;
            }
            else if (name.length > 8) {
                return name.slice(0, 8) + "...";
            }
        };
        const reduceName = (name) => {
            if (name.length) {
                return name.slice(0, 1).toUpperCase()
            }
        }
        const A = localStorage.getItem('User');
        const B = JSON.parse(A);
        const name = B.data.user.name;
        // setProfileData(B);
        if (name) {
            setformattedName(formatName(name));
            setSeparateLetters(reduceName(name));
        };


    }, []);

    useEffect(() => {
        const formatEmail = (email) => {
            if (email.length <= 15) {
                return email;
            }
            else if (email.length > 15) {
                return email.slice(0, 15) + "...";
            }
        };
        const reduceemail = (email) => {
            if (email.length) {
                return email.slice(0, 1).toUpperCase()
            }
        }
        const A = localStorage.getItem('User');
        const B = JSON.parse(A);
        const email = B.data.user.email;
        console.log("Local value is", B);
        console.log("Email value is", email);
        // return
        // setProfileData(B);
        if (email) {
            setformattedEmail(formatEmail(email));
            setSeparateLetters(reduceemail(email));
        }
        else {
            return
        }


    }, []);

    const handleSideBtnsClick = (e, link) => {
        e.preventDefault();
        router.push(link);
    }

    const handleLogout = () => {
        localStorage.removeItem('User');
        router.push("/tate")
    }


    const triangle = {
        width: 5,
        height: 5,
        // border: "2px solid red",
        borderTop: "4px solid transparent",
        borderBottom: "4px solid transparent",
        borderLeft: "6px solid #000000"
    }



    return (
        <div className='w-full flex flex-flex-col justify-center' style={{ height: '100%' }}>
            <div className='w-full'>


                <div className='flex flex-col items-start w-full items-center' style={{ marginTop: 10 }}>
                    <div className='flex flex-col gap-3 items-start w-11/12'>

                        <div style={{ marginTop: 20 }}>
                            <div className='px-4 flex gap-4 flex-row items-center py-1'
                                style={{ borderRadius: 50, backgroundColor: "#ffffff30", width: "fit-content" }}>
                                <div className='flex flex-row items-center'>
                                    <div style={{ border: "2px solid black", borderRadius: "50%" }}>
                                        <Image src={"/assets/placeholderImg.jpg"} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2, borderRadius: "50%" }} />
                                        {/* {
                                            userDetails && userDetails.profile_image ?
                                                <Image src={userDetails.profile_image} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2, borderRadius: "50%" }} /> :
                                                <Image src={"/assets/placeholderImg.jpg"} alt='profilephoto' height={40} width={40} style={{ resize: "cover", padding: 2, borderRadius: "50%" }} />
                                        } */}
                                    </div>
                                    <div style={triangle} />
                                </div>
                                <div>
                                    <div className='flex flex-row items-center gap-8' style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                        {/* Hamza */}
                                        {
                                            userDetails && userDetails.name ?
                                                <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                    {formattedName}
                                                </div> :
                                                <div style={{ fontSize: 16, fontWeight: "400", fontFamily: "inter" }}>
                                                    {/* {userDetails &&
                                                        { formattedEmail }
                                                    } */}
                                                </div>
                                        }

                                    </div>
                                    {/* <div className='flex flex-row gap-4'>
                                <button>
                                    <Image
                                        // layout='responsive'
                                        objectFit='contain' src={"/assets/twitter.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                </button>
                                <button>
                                    <Image
                                        // layout='responsive'
                                        objectFit='contain' src={"/assets/instagram.png"} alt='social' height={11} width={11} style={{ resize: "cover" }} />
                                </button>
                            </div> */}
                                </div>
                            </div>
                        </div>

                        <div>
                            {
                                links.map((link) => {
                                    return (
                                        <div key={link.id} className='mt-3'>
                                            <Link className='flex flex-row gap-4 items-center py-2' sx={{ textDecoration: 'none', cursor: "pointer", color: "black" }}
                                                key={link.name}
                                                href={link.href}
                                                onClick={(e) => handleSideBtnsClick(e, link.href)}
                                                style={{
                                                    fontWeight: '400', fontSize: 13, fontFamily: 'inter',
                                                    color: pathName === link.href ? 'white' : '#00000070',
                                                    backgroundColor: pathName === link.href ? 'blue' : '',
                                                    // padding: pathName === link.href ? 6 : "", 
                                                    borderRadius: "50px",
                                                    paddingInline: 10
                                                }}> {/* 2548FD40 */}
                                                <Image src={pathName === link.href ? link.image : link.unSelectedImg}
                                                    height={20} width={20} alt='icon'
                                                />
                                                <div
                                                    style={{
                                                        fontWeight: '400', fontSize: 13, fontFamily: 'inter',
                                                        color: pathName === link.href ? 'white' : '#00000070',
                                                        backgroundColor: pathName === link.href ? 'blue' : '',
                                                        // padding: pathName === link.href ? 6 : "",
                                                        borderRadius: "50px",
                                                        // paddingInline: pathName === link.href ? 20 : ""
                                                    }}>
                                                    {link.name}
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div>
                            <button className='px-4 py-1' onClick={handleLogout}
                                style={{ backgroundColor: '#FF424250', fontWeight: '400', fontFamily: 'inter', color: '#FF4242', cursor: "pointer", borderRadius: '25px' }}>
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default callerProfileNav