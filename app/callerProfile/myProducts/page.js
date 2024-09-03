"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Apis from '@/components/apis/Apis'
import axios from 'axios'
import { Alert, CircularProgress, Drawer, Fade, Snackbar } from '@mui/material'
import moment from 'moment'
const Page = () => {

    const [callerDashboardData, setCallerDashboardData] = useState( //[]
        [
            // {
            //     "profile": {
            //         "id": 7,
            //         "name": "Hamza",
            //         "profile_image": "",
            //         "full_profile_image": "",
            //         "email": "tristancreatorx@gmail.com",
            //         "phone": "+923263414533",
            //         "role": "creator_platform",
            //         "assitant": {
            //             "id": 2,
            //             "name": "tristan",
            //             "userId": 7,
            //             "modelId": "1722472206904x423273324192727040",
            //             "apikey": "1722463149628x824591000853013500",
            //             "createdAt": "2024-08-12T19:44:22.000Z",
            //             "updatedAt": "2024-08-12T19:44:22.000Z"
            //         },
            //         "calls": 33,
            //         "earned": 243.5,
            //         "plan": null
            //     },
            //     "products": [
            //         {
            //             "id": 1,
            //             "name": "Iphone Case",
            //             "productUrl": "",
            //             "productPrice": 20,
            //             "userId": 3,
            //             "stripeProductId": "prod_QmP9r3r9jRUG8Y",
            //             "stripePriceId": "price_1PuqLRJlIaVux60F9BKLaXjD",
            //             "stripePaymentLink": "",
            //             "createdAt": "2024-08-30T05:32:51.000Z",
            //             "updatedAt": "2024-09-03T06:36:06.000Z"
            //         },
            //         {
            //             "id": 2,
            //             "name": "Iphone Cover",
            //             "productUrl": "",
            //             "productPrice": 20,
            //             "userId": 2,
            //             "stripeProductId": "prod_QmP6rj4vI6G9IE",
            //             "stripePriceId": "price_1PuqIPJlIaVux60F6yZFAcsG",
            //             "stripePaymentLink": "",
            //             "createdAt": "2024-08-30T16:43:52.000Z",
            //             "updatedAt": "2024-09-03T06:32:58.000Z"
            //         },
            //         {
            //             "id": 24,
            //             "name": "iPhone 15 pro",
            //             "productUrl": "",
            //             "productPrice": 1200,
            //             "userId": 6,
            //             "stripeProductId": "prod_QloqSvZotMzhby",
            //             "stripePriceId": "price_1PuHCjJlIaVux60FJLb5Efyh",
            //             "stripePaymentLink": "https://buy.stripe.com/test_fZe2bu69b2lM6iscMO",
            //             "createdAt": "2024-09-01T17:04:46.000Z",
            //             "updatedAt": "2024-09-01T17:04:46.000Z"
            //         }
            //     ]
            // },
            // {
            //     "profile": {
            //         "id": 10,
            //         "name": "Arslan",
            //         "profile_image": "",
            //         "full_profile_image": "",
            //         "email": "tristancreatorx@gmail.com",
            //         "phone": "+923263414533",
            //         "role": "creator_platform",
            //         "assitant": {
            //             "id": 2,
            //             "name": "tristan",
            //             "userId": 7,
            //             "modelId": "1722472206904x423273324192727040",
            //             "apikey": "1722463149628x824591000853013500",
            //             "createdAt": "2024-08-12T19:44:22.000Z",
            //             "updatedAt": "2024-08-12T19:44:22.000Z"
            //         },
            //         "calls": 33,
            //         "earned": 243.5,
            //         "plan": null
            //     },
            //     "products": [
            //         {
            //             "id": 1,
            //             "name": "Car Cover",
            //             "productUrl": "",
            //             "productPrice": 20,
            //             "userId": 3,
            //             "stripeProductId": "prod_QmP9r3r9jRUG8Y",
            //             "stripePriceId": "price_1PuqLRJlIaVux60F9BKLaXjD",
            //             "stripePaymentLink": "",
            //             "createdAt": "2024-08-30T05:32:51.000Z",
            //             "updatedAt": "2024-09-03T06:36:06.000Z"
            //         },
            //         {
            //             "id": 2,
            //             "name": "Game board Cover",
            //             "productUrl": "",
            //             "productPrice": 20,
            //             "userId": 2,
            //             "stripeProductId": "prod_QmP6rj4vI6G9IE",
            //             "stripePriceId": "price_1PuqIPJlIaVux60F6yZFAcsG",
            //             "stripePaymentLink": "",
            //             "createdAt": "2024-08-30T16:43:52.000Z",
            //             "updatedAt": "2024-09-03T06:32:58.000Z"
            //         },
            //         {
            //             "id": 24,
            //             "name": "iPhone 15 pro",
            //             "productUrl": "",
            //             "productPrice": 1200,
            //             "userId": 6,
            //             "stripeProductId": "prod_QloqSvZotMzhby",
            //             "stripePriceId": "price_1PuHCjJlIaVux60FJLb5Efyh",
            //             "stripePaymentLink": "https://buy.stripe.com/test_fZe2bu69b2lM6iscMO",
            //             "createdAt": "2024-09-01T17:04:46.000Z",
            //             "updatedAt": "2024-09-01T17:04:46.000Z"
            //         }
            //     ]
            // }
        ]
    );
    const [buyedProducts, setBuyedProducts] = useState(
        [
            // {
            //     "id": 1,
            //     "name": "Iphone Case",
            //     "productUrl": "",
            //     "productPrice": 20,
            //     "userId": 3,
            //     "stripeProductId": "prod_QmP9r3r9jRUG8Y",
            //     "stripePriceId": "price_1PuqLRJlIaVux60F9BKLaXjD",
            //     "stripePaymentLink": "",
            //     "createdAt": "2024-08-30T05:32:51.000Z",
            //     "updatedAt": "2024-09-03T06:36:06.000Z"
            // },
            // {
            //     "id": 2,
            //     "name": "Iphone Cover",
            //     "productUrl": "",
            //     "productPrice": 20,
            //     "userId": 2,
            //     "stripeProductId": "prod_QmP6rj4vI6G9IE",
            //     "stripePriceId": "price_1PuqIPJlIaVux60F6yZFAcsG",
            //     "stripePaymentLink": "",
            //     "createdAt": "2024-08-30T16:43:52.000Z",
            //     "updatedAt": "2024-09-03T06:32:58.000Z"
            // },
            // {
            //     "id": 24,
            //     "name": "iPhone 15 pro",
            //     "productUrl": "",
            //     "productPrice": 1200,
            //     "userId": 6,
            //     "stripeProductId": "prod_QloqSvZotMzhby",
            //     "stripePriceId": "price_1PuHCjJlIaVux60FJLb5Efyh",
            //     "stripePaymentLink": "https://buy.stripe.com/test_fZe2bu69b2lM6iscMO",
            //     "createdAt": "2024-09-01T17:04:46.000Z",
            //     "updatedAt": "2024-09-01T17:04:46.000Z"
            // }
        ]
    );
    const [openProducts, setOpenProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const itemsToDisplay = showAll ? buyedProducts : buyedProducts.slice(0, 3);
    const [openBuyProductDrawer, setOpenBuyProductDrawer] = useState(null);
    const [buyProductLoader, setBuyProductLoader] = useState(null);
    const [buyProductSuccess, setBuyProductSuccess] = useState(null);

    const styles = {
        text: {
            fontSize: 14,
            color: '#00000090',
            fontWeight: '400'
        },
        text2: {
            textAlignLast: 'left',
            fontSize: 18,
            color: '#000000',
            fontWeight: 300,
            whiteSpace: 'nowrap',  // Prevent text from wrapping
            overflow: 'hidden',    // Hide overflow text
            textOverflow: 'ellipsis'  // Add ellipsis for overflow text
        }
    }

    const products = [
        {
            id: 1,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
        {
            id: 2,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
        {
            id: 3,
            disc: '30 days transformation journey for the mind and body',
            price: "$400"
        },
    ]

    const productsDetails = [
        {
            id: 1,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
        {
            id: 2,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
        {
            id: 3,
            name: '30 days transformation journey for the mind and body',
            price: '$400',
            creator: 'Andrew Tate',
            date: '10/3/2007'
        },
    ]

    const getCallerDashoboard = async () => {
        const localData = localStorage.getItem("User");
        if (localData) {
            try {
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                const ApiPath = Apis.CallerDashboard;
                const response = await axios.get(ApiPath, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    console.log("Response of callerdashboard api is", response.data.data);
                    if (response.data.status === true) {
                        setCallerDashboardData(response.data.data.callersDashboardData);
                        setBuyedProducts(response.data.data.products);
                    } else {
                        console.log("Status is", response.data.message);
                        console.log("Status is", response.data.status);
                    }
                }
            } catch (error) {
                console.error("Eror ocured in api", error);

            }
        }
    }

    useEffect(() => {
        if (buyProductSuccess) {
            const timeout = setTimeout(() => {
                setBuyProductSuccess(null);
            }, 2000);
            return (() => clearTimeout(timeout))
        }
    }, [buyProductSuccess]);

    useEffect(() => {
        getCallerDashoboard();
    }, []);

    const handleBuyProduct = async (id) => {
        const localData = localStorage.getItem("User");
        if (localData) {
            try {
                setBuyProductLoader(true);
                const Data = JSON.parse(localData);
                const AuthToken = Data.data.token;
                // const AuthToken = "afieglbjlhdfblsbhilhgkfnangieornkcvnlsjl";
                const ApiPath = Apis.BuyProduct;
                const ApiData = {
                    productId: id
                }
                console.log("Id sending", ApiData);
                // return
                const response = await axios.post(ApiPath, ApiData, {
                    headers: {
                        'Authorization': 'Bearer ' + AuthToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (response) {
                    console.log("Response of apis is", response.data);
                    setBuyProductSuccess(response.data);
                    if (response.data.status === true) {
                        setOpenBuyProductDrawer(null);
                    } else {
                        console.log("Status is", response.data.status);
                        console.log("No responce :", response.data.message);
                    }
                }
            } catch (error) {
                console.error("Error occured in api", error);
            } finally {
                setBuyProductLoader(false);

            }
        }
    }

    const handleOpenProducts = (item) => {
        setOpenProducts(item);
    }

    return (
        <div className='h-screen w-full' style={{ backgroundColor: "#ffffff40", overflow: 'auto', scrollbarWidth: 0, }}>
            <div className='w-10/12 flex flex-col gap-2 pt-10 ps-10'>
                <div style={{ fontSize: 20, fontWeight: 400, fontFamily: 'inter' }}>
                    Products
                </div>
                <div className='w-full flex flex-row p-4 rounded-xl' style={{ backgroundColor: "#ffffff40" }}>

                    <div className='w-6/12'>
                        <div className='flex flex-row justify-between items-center mt-4 px-4'>
                            <div>
                                Creators
                            </div>
                            <button>
                                <Image src="/assets/searchIcon.png" height={24} width={24} alt='search' />
                            </button>
                        </div>
                        {
                            callerDashboardData.map((item) => (
                                <div key={item.profile.id} className='w-full rounded-xl flex flex-row mt-2'
                                // style={{ backgroundColor: "#FFFFFF30" }}
                                >
                                    <button onClick={() => handleOpenProducts(item)}
                                        className='w-full flex flex-row gap-2 p-2'
                                        style={{ backgroundColor: openProducts === item ? '#ffffff' : "transparent" }}>
                                        <div className='w-full flex flex-row gap-2' style={{ height: 'fit-content' }}>
                                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                                height={50} width={50} style={{ borderRadius: "50%", height: "fit-content" }}
                                            />
                                            <div className='flex flex-col' style={{ textAlign: "start" }}>
                                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter', }}>
                                                    {item.profile.name}
                                                </div>
                                                <div style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter', color: '#00000090', }}>
                                                    {item.products.length} {
                                                        item.products.length === 0 ? "Product" : "Products"
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                    <div className='w-6/12'>
                        {
                            openProducts &&
                            <div className='w-full'>

                                {
                                    openProducts === null || openProducts.length === 0 ?
                                        <div className='mt-2'>

                                        </div> :
                                        <div>
                                            <div className='w-full flex flex-col gap-5 bg-white px-4 pb-4'>
                                                <div className='mt-6' style={{ fontWeight: "500", fontSize: 20, fontFamily: "inter" }}>
                                                    {openProducts.profile.name}'s Products
                                                </div>
                                                {
                                                    openProducts.products.map((product) => (
                                                        <div key={product.id} className='w-full flex flex-col'>
                                                            <div className='flex flex-row justify-between items-start'>
                                                                <div className='flex flex-col'>
                                                                    <div
                                                                        style={{ fontSize: 13, fontWeight: "400", fontFamily: 'inter' }}>
                                                                        {/* {item.disc} */}
                                                                        {product.name}
                                                                    </div>
                                                                    <div style={{ fontSize: 20, fontWeight: "500", fontFamily: 'inter' }}>
                                                                        {/* {item.price} */}
                                                                        ${product.productPrice}
                                                                    </div>
                                                                </div>

                                                                <button className='px-3'
                                                                    onClick={() => {
                                                                        console.log("Product sendding in api", product);
                                                                        // return
                                                                        setOpenBuyProductDrawer(product);
                                                                        // window.open('https://www.myagentx.com/tate', '_blank')
                                                                    }}
                                                                    style={{
                                                                        color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14,
                                                                        paddingTop: "2px", paddingBottom: "2px"
                                                                    }}>
                                                                    Buy
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                }
                            </div>
                        }
                    </div>

                    {/* <div className='w-6/12 p-5 rounded-xl'
                        style={{ backgroundColor: "#FFFFFF30" }}
                    >
                        <div className='flex flex-row gap-2'>
                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                height={50} width={50} style={{ borderRadius: "50%" }}
                            />
                            <div className='flex flex-col'>
                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                    Andrew Tate
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 400, fontFamily: 'inter', color: '#00000090' }}>
                                    3 products
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {
                                products.map((item) => (
                                    <div key={item.id} className='w-full flex flex-col'>
                                        <div className='flex flex-row justify-between items-start'>
                                            <div className='flex flex-col'>
                                                <div className='w-10/12'
                                                    style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.disc}
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.price}
                                                </div>
                                            </div>

                                            <button className='px-3 py-2'
                                                style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div> */}

                </div>

                <div className='w-full flex flex-row gap-2'>

                    {/* <div className='w-6/12 p-5 rounded-xl'
                        style={{ backgroundColor: "#FFFFFF30" }}
                    >
                        <div className='flex flex-row gap-2'>
                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                height={50} width={50} style={{ borderRadius: "50%" }}
                            />
                            <div className='flex flex-col'>
                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                    Andrew Tate
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 400, fontFamily: 'inter', color: '#00000090' }}>
                                    3 products
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {
                                products.map((item) => (
                                    <div key={item.id} className='w-full flex flex-col'>
                                        <div className='flex flex-row justify-between items-start'>
                                            <div className='flex flex-col'>
                                                <div className='w-10/12'
                                                    style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.disc}
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.price}
                                                </div>
                                            </div>

                                            <button className='px-3 py-2'
                                                style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='w-6/12 p-5 rounded-xl'
                        style={{ backgroundColor: "#FFFFFF30" }}
                    >
                        <div className='flex flex-row gap-2'>
                            <Image src="/assets/placeholderImg.jpg" alt='profile'
                                height={50} width={50} style={{ borderRadius: "50%" }}
                            />
                            <div className='flex flex-col'>
                                <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                                    Andrew Tate
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 400, fontFamily: 'inter', color: '#00000090' }}>
                                    3 products
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {
                                products.map((item) => (
                                    <div key={item.id} className='w-full flex flex-col'>
                                        <div className='flex flex-row justify-between items-start'>
                                            <div className='flex flex-col'>
                                                <div className='w-10/12'
                                                    style={{ fontSize: 14, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.disc}
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 400, fontFamily: 'inter' }}>
                                                    {item.price}
                                                </div>
                                            </div>

                                            <button className='px-3 py-2'
                                                style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div> */}

                </div>

                <div className='w-full p-8 rounded-xl' style={{ backgroundColor: '#FFFFFF40' }}>
                    <div className='w-full flex flex-row justify-between'>
                        <div style={{ fontSize: 18, fontWeight: 400, fontFamily: 'inter' }}>
                            Purchased Products
                        </div>
                        {
                            showAll ?
                                <button
                                    onClick={() => setShowAll(false)}
                                    className='px-3 py-2'
                                    style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                    View Less
                                </button> :
                                <button
                                    onClick={() => setShowAll(true)}
                                    className='px-3 py-2'
                                    style={{ color: 'white', backgroundColor: '#552AFF', borderRadius: 20, fontSize: 14 }}>
                                    View All
                                </button>
                        }
                    </div>

                    <div className='w-full flex flex-row justify-between mt-10'>
                        <div className='w-4/12'>
                            <div style={styles.text}>Name</div>
                        </div>
                        <div className='w-2/12 '>
                            <div style={styles.text}>Amount</div>
                        </div>
                        <div className='w-3/12'>
                            <div style={styles.text}>Creator</div>
                        </div>
                        <div className='w-2/12'>
                            <div style={styles.text}>Date</div>
                        </div>
                    </div>

                    {
                        buyedProducts === null || buyedProducts.length === 0 ?
                            <div className='mt-10' style={{ fontWeight: '500', fontFamily: 'inter', fontSize: 15, textAlign: 'center' }}>
                                No Product
                            </div> :
                            <div className='w-full'>
                                {itemsToDisplay.map((item) => (
                                    <div key={item.id}>
                                        <button className='w-full' //</>style={{}} onClick={() => { setOpen(item) }}
                                        >
                                            <div className='w-full flex flex-row justify-between mt-10' key={item.id}>
                                                <div className='w-4/12' style={{}}>
                                                    <div style={styles.text2}>{item.name}</div>
                                                </div>
                                                <div className='w-2/12'>
                                                    <div style={styles.text2}>{item.productPrice}</div>
                                                </div>
                                                <div className='w-3/12 '>
                                                    <div style={styles.text2}>
                                                        {item.user.name}
                                                    </div>
                                                </div>
                                                <div className='w-2/12'>
                                                    <div style={styles.text2}>{moment(item.createdAt).format('MM/DD/YYYY')}</div>
                                                </div>
                                            </div>
                                            <div className='w-full h-0.5 rounded mt-2' style={{ backgroundColor: '#00000011' }}></div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                    }

                </div>

            </div>

            {/* Buy product drawer */}

            <Drawer
                open={!!openBuyProductDrawer}  // Convert to boolean to control the Drawer
                onClose={() => setOpenBuyProductDrawer(null)}
                anchor='right'
                sx={{ '& .MuiDrawer-paper': { width: '30%' } }}
            >
                <div className='pt-6 px-8' style={{ backgroundColor: "#ffffff70", height: "auto" }}>
                    <div className='flex flex-row w-full justify-between items-center'>
                        <div style={{ color: 'black', fontWeight: '400', fontSize: 15, fontFamily: 'inter' }}>
                            Product Details
                        </div>
                        <div>
                            <button onClick={() => setOpenBuyProductDrawer(null)}>
                                <Image src="/assets/crossBtn2.png" alt='cross' height={15} width={15} />
                            </button>
                        </div>
                    </div>

                    {openBuyProductDrawer &&
                        <div>
                            <div className='mt-6'>
                                Price :
                            </div>
                            <div
                                className='px-4 py-2 rounded-lg mt-2 flex flex-row gap-3 items-center'
                                style={{
                                    border: "1px solid #00000015",
                                }}
                            >
                                <div>
                                    <Image className='rounded' src="/us.jpg" alt='flag' height={20} width={40} />
                                </div>
                                <div>
                                    $ {openBuyProductDrawer.productPrice}
                                </div>
                            </div>

                            <div>
                                <div className='mt-5 w-full flex flex-row justify-between'>
                                    <div style={{ fontWeight: '500', fontFamily: 'inter', fontSize: 15 }}>
                                        {openBuyProductDrawer.name}
                                    </div>
                                    <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                                        USD {openBuyProductDrawer.productPrice}
                                    </div>
                                </div>
                                <div style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
                                    Buy {openBuyProductDrawer.name}  $ {openBuyProductDrawer.productPrice}
                                </div>
                            </div>

                            <div className='w-full flex flex-row justify-center mt-12'>
                                {
                                    buyProductLoader ?
                                        <div className='w-full py-3 bg-purple flex flex-row justify-center'
                                            style={{ borderRadius: '50px' }}>
                                            <CircularProgress size={25} />
                                        </div> :
                                        <button
                                            onClick={() => handleBuyProduct(openBuyProductDrawer.id)}
                                            className='w-full py-3 w-10/12 bg-purple'
                                            style={{ fontWeight: '400', fontSize: 15, fontFamily: 'inter', color: 'white', borderRadius: '50px' }}>
                                            Buy
                                        </button>
                                }
                            </div>
                        </div>
                    }
                </div>
            </Drawer>

            <Snackbar
                open={buyProductSuccess}
                // autoHideDuration={3000}
                onClose={() => {
                    setBuyProductSuccess(null)
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
                        setBuyProductSuccess(null)
                    }} severity={buyProductSuccess && buyProductSuccess.status === true ? "success" : "error"}
                    sx={{ width: 'auto', fontWeight: '700', fontFamily: 'inter', fontSize: '22' }}>
                    {/* {addCardDetails} */}
                    {buyProductSuccess && buyProductSuccess.status === true ?
                        "Product purchased successfully." :
                        <div>
                            {buyProductSuccess && buyProductSuccess.message}
                        </div>}
                </Alert>
            </Snackbar>


        </div >
    )
}

export default Page