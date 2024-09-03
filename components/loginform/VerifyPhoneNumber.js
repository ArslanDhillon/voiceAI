"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Apis from '../apis/Apis'
import axios from 'axios'
import { CircularProgress } from '@mui/material'

const VerifyPhoneNumber = ({ handleBack, handleContinue, userLoginDetails, handleSignin }) => {


    const [P1, setP1] = useState("")
    const [P2, setP2] = useState("")
    const [P3, setP3] = useState("")
    const [P4, setP4] = useState("")
    const [P5, setP5] = useState("")
    const [verifyLoader, setVerifyLoader] = useState(false);
    const [showError, setShowError] = useState(null)

    const data = {
        code: P1 + P2 + P3 + P4 + P5,
        phone: userLoginDetails.phone,
    }

    useEffect(() => {
        console.log("User details are", userLoginDetails);
    }, [])


    //code for moving to next field
    const handleInputChange = (e, setFunc, nextInputId) => {
        const value = e.target.value;
        if (value.length === 1) {
            setFunc(value); // Update the current field
            if (nextInputId) {
                document.getElementById(nextInputId).focus(); // Move to the next field
            }
        }
    };

    const handleBackspace = (e, setFunc, prevInputId) => {
        if (e.key === 'Backspace') {
            setFunc(''); // Clear the current field
            if (e.target.value === '' && prevInputId) {
                document.getElementById(prevInputId).focus(); // Move to the previous field
            }
        }
    };




    const handleVerifyClick = async () => {
        // handleContinue();
        setVerifyLoader(true);
        console.log("Code sending is", data);
        // return
        try {
            const response = await axios.post(Apis.verifyCode, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                console.log("response of check code ", response.data);
                if (response.data.status === true) {
                    // handleContinue();
                    const SignUpApiPath = Apis.SignUp;
                    try {
                        const response = await axios.post(SignUpApiPath, userLoginDetails, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response.data.status === true) {
                            console.log("Response of signup api", response.data);
                            localStorage.setItem("User", JSON.stringify(response.data));
                            handleContinue();
                            localStorage.removeItem('formData');
                        } else if (response.data.status === false) {
                            console.log("Response of api", response.data);
                            console.log("Signup api response not found");
                        }
                    } catch (error) {
                        console.error("Error in login api is", error);
                    } finally {
                        setVerifyLoader(false);
                    }
                } else {
                    setShowError(response.data.message);
                }
            }
        } catch (error) {
            console.log("Error uccured in verification api is", error);
        } finally {
            setVerifyLoader(false);
        }
    }

    const handleBackClick = () => {
        handleBack()
    }


    return (
        <div>
            <div style={{ fontSize: 24, fontWeight: "600" }}>
                Verify Phone Number
            </div>
            <div className='text-lightWhite' style={{ fontSize: 13, fontWeight: "400" }}>
                6 digit code was sent to number ending with ***{userLoginDetails.phone.slice(-4)}
            </div>



            <div className='flex flex-row gap-4 mt-4'>
                <input
                    id="P1"
                    type='text'
                    value={P1}
                    onChange={(e) => handleInputChange(e, setP1, "P2")}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onKeyDown={(e) => handleBackspace(e, setP1, null)}
                />
                <input
                    id="P2"
                    type='text'
                    value={P2}
                    onChange={(e) => handleInputChange(e, setP2, "P3")}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onKeyDown={(e) => handleBackspace(e, setP2, "P1")}
                />
                <input
                    id="P3"
                    type='text'
                    value={P3}
                    onChange={(e) => handleInputChange(e, setP3, "P4")}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onKeyDown={(e) => handleBackspace(e, setP3, "P2")}
                />
                <input
                    id="P4"
                    type='text'
                    value={P4}
                    onChange={(e) => handleInputChange(e, setP4, "P5")}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onKeyDown={(e) => handleBackspace(e, setP4, "P3")}
                />
                <input
                    id="P5"
                    type='text'
                    value={P5}
                    onChange={(e) => handleInputChange(e, setP5, null)}
                    maxLength={1}
                    style={{ height: "40px", width: "40px", borderRadius: 6, backgroundColor: "#EDEDEDC7", textAlign: "center", outline: "none", border: "none" }}
                    onKeyDown={(e) => handleBackspace(e, setP5, "P4")}
                />
            </div>


            <div>
                {
                    showError &&
                    <div className='mt-4' style={{ fontWeight: "600", fontSize: 14, color: "red" }}>
                        {showError}
                    </div>
                }
            </div>



            <div className='flex flex-row justify-between items-center mt-8'>
                <div>
                    <button onClick={handleBackClick}>
                        <Image src={"/assets/backarrow.png"} alt='backArrow' height={9} width={13} />
                    </button>
                </div>
                <div>
                    <button onClick={handleVerifyClick} className='bg-purple px-8 text-white py-2' style={{ fontWeight: "400", fontSize: 15, borderRadius: "50px" }}>
                        {
                            verifyLoader ?
                                <CircularProgress size={25} /> :
                                "Continue"
                        }
                    </button>
                </div>
            </div>
            <div className='flex flex-row gap-1 mt-6'>
                <div style={{ fontSize: 13, fontWeight: "400" }}>
                    Have an account?
                </div>
                <button onClick={() => handleSignin()} className='text-purple' style={{ fontSize: 13, fontWeight: "400" }}>
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default VerifyPhoneNumber