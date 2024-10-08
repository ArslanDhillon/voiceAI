'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis'
import axios from 'axios'
import { Alert, Box, Button, CircularProgress, Fade, Menu, MenuItem, Modal, Snackbar } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'
import AddCardDetails from '@/components/loginform/Addcard/AddCardDetails'
import { loadStripe } from '@stripe/stripe-js'

const Page = () => {

    let stripePublickKey = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Production" ? process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE : process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY;
    //console.log("Public key is ", stripePublickKey)
    const stripePromise = loadStripe(stripePublickKey);

    const [defaultCart, setDefaultCard] = useState("");
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [cardsListData, setCardsListData] = useState([]);
    const [cardLoader, setCardLoader] = useState(false);
    const [invoiceLoader, setInvoiceLoader] = useState(false);
    const [addCardPopup, setAddCardPopup] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [makeDefaultCardLoader, setMakeDefaultCardLoader] = useState(null);
    const [snackMessage, setSnackMessage] = useState(false);

    const handleClosePopup = (e) => {
        setAddCardPopup(e);
        getCards();
    }

    const styles = {
        text: {
            fontSize: 14,
            color: '#00000090',
            fontWeight: '400'
        },
        text2: {
            textAlignLast: 'left',
            fontSize: 14,
            color: '#000000',
            fontWeight: 300,
            whiteSpace: 'nowrap',  // Prevent text from wrapping
            overflow: 'hidden',    // Hide overflow text
            textOverflow: 'ellipsis'  // Add ellipsis for overflow text
        },
        backgroundImage: {
            backgroundImage: 'url("/assets/cardImage.png")',
            backgroundSize: "cover",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 550,
            height: 150,
            borderRadius: 10,
            color: 'white'
        }
    }

    const styleAddCardPopup = {
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



    const getInvoicesDetails = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setInvoiceLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                console.log("Authtoken is", AuthToken);
                const ApiPath = Apis.CallerInvoices;
                console.log("Api Path iis", ApiPath);
                const response = await axios.get(ApiPath, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken
                    }
                });

                if (response) {
                    if (response.data.status === true) {
                        console.log("Response is", response.data.data);
                        setPaymentHistory(response.data.data);
                    } else {
                        console.log("Not recieved data", response.data.message)
                        console.log("Status is", response.data.status);
                    }
                }
            } catch (error) {
                console.error("Error occured in api", error);
            } finally {
                setInvoiceLoader(false);
            }

        }
    }

    const getCards = async () => {
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setCardLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                // console.log("Authtoken is", AuthToken);
                const ApiPath = Apis.GetCardList;
                console.log("Api Path iis", ApiPath);
                const response = await axios.get(ApiPath, {
                    headers: {
                        "Authorization": "Bearer " + AuthToken
                    }
                });

                if (response) {
                    console.log("Response of get cards is", response.data.data);
                    setCardsListData(response.data.data);
                }
            } catch (error) {
                console.error("Error occured in getcards api", error);
            } finally {
                setCardLoader(false);
            }

        }
    }

    useEffect(() => {
        getInvoicesDetails();
        getCards();
    }, []);

    useEffect(() => {
        if (snackMessage) {
            const timeout = setTimeout(() => {
                setSnackMessage(null);
            }, 2000);
            return (() => clearTimeout(timeout));
        }
    }, [snackMessage])

    const handleOpenPdf = async (url) => {
        window.open(url, '_blank');
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMakeDefaultCard = async (id) => {
        console.log("Card id is", id);
        const localData = localStorage.getItem('User');
        if (localData) {
            try {
                setMakeDefaultCardLoader(id);
                const Data = JSON.parse(localData);
                // const AuthToken = "sfdhiuhkajviqnlgh";
                const AuthToken = Data.data.token;
                // console.log("Authtoken is", AuthToken);
                const ApiPath = Apis.makeDefaultCard;
                console.log("Api Path iis", ApiPath);
                const formData = new FormData();
                formData.append('cardId', id);
                const response = await axios.post(ApiPath, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (response) {
                    if (response.data.status === true) {
                        console.log("response of api", response.data.message);
                        setSnackMessage(response.data);
                        getCards();
                    } else {
                        setSnackMessage(response.data)
                    }
                }
            } catch (error) {
                console.error("Error occured in api", error);
            } finally {
                setMakeDefaultCardLoader(null);
            }
        }
    }



    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'auto', scrollbarWidth: 0, }}>
            <div className='w-9/12 flex flex-col gap-2 pt-10 ps-10'>


                <div className='w-full p-5 rounded-xl'
                    style={{ backgroundColor: "#FFFFFF40" }}
                >

                    <div className='flex flex-row justify-between items-center'>
                        <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter', paddingLeft: 10 }}>
                            Payment Method
                        </div>
                        <button onClick={() => setAddCardPopup(true)} className='text-purple underline' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                            Add New
                        </button>
                    </div>
                    <div className='w-full flex flex-row gap-3 mt-4' style={{
                        paddingLeft: 10,
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        scrollbarWidth: 'none'
                    }}>
                        {
                            cardLoader ?
                                <div className='mt-4 w-full flex flex-row justify-center'>
                                    <CircularProgress size={35} />
                                </div> :
                                <div className='w-full flex flex-row gap-3 mt-4' style={{
                                    paddingLeft: 10,
                                    overflowX: "auto",
                                    whiteSpace: "nowrap",
                                    scrollbarWidth: 'none'
                                }}>
                                    {
                                        cardsListData === null || cardsListData.length === 0 ?
                                            <div className='w-full' style={{ textAlign: 'center', marginTop: 20, fontWeight: '500', fontSize: 15, fontFamily: 'inter' }}>
                                                No Payment Source Added
                                            </div> :
                                            <div className='w-full flex flex-row gap-3 mt-4' style={{
                                                paddingLeft: 10,
                                                overflowX: "auto",
                                                whiteSpace: "nowrap",
                                                scrollbarWidth: 'none'
                                            }}>
                                                {
                                                    cardsListData.map((item) => (
                                                        <div className='w-4/12 flex flex-row gap-4' key={item.id}>
                                                            <div className='flex flex-col justify-between p-5' style={styles.backgroundImage}>
                                                                <div className='w-full'>
                                                                    <div className='w-full flex flex-row justify-between items-start'>
                                                                        <div style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                                            **** **** **** {item.last4}
                                                                        </div>
                                                                        <button
                                                                            id="basic-button"
                                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                                            aria-haspopup="true"
                                                                            aria-expanded={open ? 'true' : undefined}
                                                                            onClick={handleClick}
                                                                            style={{ fontSize: 20, fontWeight: "900" }}>
                                                                            ...
                                                                        </button>
                                                                        <Menu
                                                                            id="basic-menu"
                                                                            anchorEl={anchorEl}
                                                                            open={open}
                                                                            onClose={handleClose}
                                                                            MenuListProps={{
                                                                                'aria-labelledby': 'basic-button',
                                                                            }}
                                                                            anchorOrigin={{
                                                                                vertical: 'bottom',
                                                                                horizontal: 'right',
                                                                            }}
                                                                            transformOrigin={{
                                                                                vertical: 'top',
                                                                                horizontal: 'right',
                                                                            }}
                                                                            sx={{
                                                                                '& .MuiPaper-root': {
                                                                                    boxShadow: 'none', // Remove the shadow
                                                                                },
                                                                            }}
                                                                        >
                                                                            <MenuItem onClick={handleClose}
                                                                                style={{ fontWeight: '400', fontFamily: 'Inter', fontSize: 13, color: "#FF124B" }}>
                                                                                Delete
                                                                            </MenuItem>
                                                                        </Menu>

                                                                    </div>
                                                                    <div style={{ fontSize: 12, fontWeight: 400, fontFamily: 'inter' }}>
                                                                        Expiry {item.exp_month} / {item.exp_year}
                                                                    </div>
                                                                </div>
                                                                <div className='w-full flex flex-row justify-between items-end'>
                                                                    {
                                                                        item.isDefault === true ? (
                                                                            <div style={{ fontSize: 12, fontWeight: 400, fontFamily: 'inter' }}>
                                                                                Default Card
                                                                            </div>
                                                                        ) : (
                                                                            <div></div>
                                                                        )
                                                                    }
                                                                    <div>
                                                                        {
                                                                            item.isDefault === true ? (
                                                                                <Image src='/assets/selectedCircle.png' alt='icon'
                                                                                    height={18} width={18} style={{ objectFit: 'contain' }}
                                                                                />
                                                                            ) : (
                                                                                <div>
                                                                                    {
                                                                                        makeDefaultCardLoader === item.id ?
                                                                                            <CircularProgress size={15} sx={{ color: "blue" }} /> :
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    handleMakeDefaultCard(item.id)
                                                                                                }}
                                                                                                style={{
                                                                                                    height: 18, width: 18, borderRadius: '50%',
                                                                                                    border: "1px solid #ffffff"
                                                                                                }} />
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                    <div className='w-full rounded-xl p-8 mt-5' style={{ backgroundColor: '#ffffff40' }}>
                        <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter', }}>
                            Payment History
                        </div>
                        <div className='w-full flex flex-row justify-between mt-5'>
                            <div className='w-2/12'>
                                <div style={styles.text}>ID</div>
                            </div>
                            <div className='w-4/12 '>
                                <div style={styles.text}>Purchases</div>
                            </div>
                            <div className='w-2/12'>
                                <div style={styles.text}>Amount</div>
                            </div>
                            <div className='w-2/12'>
                                <div style={styles.text}>Date</div>
                            </div>
                            <div className='w-2/12'>
                                <div style={styles.text}>Action</div>
                            </div>
                        </div>
                        {
                            invoiceLoader ?
                                <div className='w-full mt-12 flex justify-center'>
                                    <CircularProgress size={35} />
                                </div> :
                                <div>
                                    {
                                        paymentHistory === null || paymentHistory.length === 0 ?
                                            <div className='w-full' style={{ textAlign: 'center', marginTop: 20, fontWeight: '500', fontSize: 15, fontFamily: 'inter' }}>
                                                No Payment History
                                            </div> :
                                            <div>
                                                {paymentHistory.map((item) => (
                                                    <>
                                                        {/* <button className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}
                            > */}
                                                        <div className='w-full flex flex-row justify-between mt-10' key={item.invoice_id}>
                                                            <div className='w-2/12'>
                                                                <div style={styles.text2}>
                                                                    {item.invoice_id}
                                                                </div>
                                                            </div>
                                                            <div className='w-4/12'>
                                                                <div style={styles.text2}>
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                            <div className='w-2/12 ms-2'>
                                                                <div style={styles.text2}>
                                                                    {item.invoice_amount}
                                                                </div>
                                                            </div>
                                                            <div className='w-2/12'>
                                                                <div style={styles.text2}>
                                                                    {item.invoice_date}
                                                                </div>
                                                            </div>
                                                            <div className='w-2/12'>
                                                                <button onClick={() => handleOpenPdf(item.pdf_url)} style={{
                                                                    fontSize: 12, textDecoration: 'underline', fontWeight: 400, fontFamily: 'inter',
                                                                    color: '#2548FD'
                                                                }}>
                                                                    PDF
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                                                        {/* </button> */}
                                                    </>
                                                ))}
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>

            {/* Modal to add card */}
            <Modal
                open={addCardPopup}
                onClose={(() => setAddCardPopup(false))}
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
                    sx={styleAddCardPopup}
                >
                    <div className='flex flex-row justify-center'>
                        <div className='w-9/12' style={{ backgroundColor: "#ffffff23", padding: 20, borderRadius: 5 }}>
                            {/* <AddCard handleBack={handleBack} closeForm={closeForm} /> */}
                            <div style={{ backgroundColor: 'white', padding: 18, borderRadius: 5 }}>
                                <Elements stripe={stripePromise}>
                                    <AddCardDetails
                                        fromMYPlansScreen={true}
                                        closeAddCardPopup={handleClosePopup}
                                    />
                                </Elements>
                            </div>
                        </div>
                    </div>
                    {/* <LoginModal creator={creator} assistantData={getAssistantData} closeForm={setOpenLoginModal} /> */}
                </Box>
            </Modal>

            {/* snack messages */}
            <Snackbar
                open={snackMessage}
                // autoHideDuration={3000}
                onClose={() => {
                    setSnackMessage(null)
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                TransitionComponent={Fade}
                TransitionProps={{
                    direction: 'center'
                }}
            >
                <Alert
                    onClose={() => {
                        setSnackMessage(null);
                    }} severity={snackMessage && snackMessage.status === true ? "success" : "error"}// "error"
                    sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                    {/* {addCardDetails} */}
                    {snackMessage && snackMessage.message}
                </Alert>
            </Snackbar>

        </div>

    )
}

export default Page;