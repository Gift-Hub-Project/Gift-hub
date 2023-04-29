import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Baskets from "./baskets";

const APIURL = "http://localhost:8080"


const EditBasket = () => {
    const [editBasket, setEditBasket] = useState({});
    const [name, setName] = useState("");
    const [selectedOccasionsId, setSelectedOccasionsId] = useState(0);
    const [description, setDescription] = useState("");
    const [price, setprice] = useState("");
    const [isAdmin, setIsAdmin] =useState(false)
    const [unauthorizedUserError, setUnauthorizedUserError] = useState(false);
    const [duplicateBasket, setDuplicateBasket] = useState(false);
    const [successfulMessage, setSuccessfulMessage] = useState(false)
    const { basketId } = useParams();

    const getBasket = async () => {
        try {
            const response = await fetch(`/api/baskets/${basketsId}`,{
                method:"GET",
                headers:{
                    "Content-type": "application/json",
                },
                body:JSON.stringify({
                    username,
                    password
                }),
            });
            setEditBasket(response.data);
        } catch (error) {
            console.error(error);
        };
    };
    const setValues = () => {
        if (editBasket && Object.keys(editBasket).length){
            setName(editBasket.name)
            setPrice(editBasket.price);
            setDescription(editBasket.description);
            setIsAdmin(editBasket.isAdmin);
        };
    };

    useEffect(() => {
        getBasket();
        setValues();
    }, [])

    useEffect(() => {
        setValues();
    }, [editBasket])

    const editEstablishedBasket = async (event) => {
        event.preventDefault();
        setSuccessfulMessage(false);
        const fields = {}
        if (name && name !== editBasket.name) {
            fields.name = name
        };
        if (price && price !== editBasket.price) {
            fields.price = price
        };
        if (isAdmin !== editBasket.isAdmin) {
            fields.isAdmin = isAdmin
        };
        if (Object.keys(fields).length) {
            setUnauthorizedUserError(false);
            try {
                const response = await fetch(`${APIURL}/api/baskets/${basketId}`, fields, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        name,
                        price,
                        description
                    })
                });
                setSuccessfulMessage(true);
                getBasket();
            } catch (error) {
                if (error.response.status === 403) {
                    setUnauthorizedUserError(true);
                }
                console.error(error)
            };
        }
    };

    const deleteBasket = async (basketId) => {
        try {
            const response = await fetch(`${URLAPI}/api/baskets/${basketId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("token")}`
                },
            });
            const result = await response.json();
            if (result.error === 'unauthorizedDeleteError') {
                setUnauthorizedUserError(true);
            } else {
                getBasket();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addBasket = async (event) => {
        event.preventDefault();
        setUnauthorizedUserError(false);
        setDuplicateBasket(false);
        if (selectedOccasionsId !== "0" && price && description && Number(price)) {
            try {
                const response = await fetch(`${APIURL}/api/baskets/${basketsId}`, {
                    BasketId: selectedBasketId,
                    price,
                    description
                }, {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("token")}`
                    },
                });
                if (response.data.error === "unauthorizedUpdateError") {
                    setUnauthorizedUserError(true);
                } else if (response.data.error === "duplicateBasketError") {
                    setDuplicateBasket(true);
                } else {
                    getBasket();
                    setdescription("");
                    setprice("");
                }
            } catch (error) {
                console.error(error)
            }
        }
    };

    return (
        <div>
            {
                (unauthorizedUserError) ?
                    <p>You may not edit a basket if you are not admin</p> :
                    null
            }
            {
                (successfulMessage) ?
                    <p>Basket Updated</p> :
                    null
            }
            <form onSubmit={editEstablishedBasket}>
                {
                    (Object.keys(editBasket).length) ?
                        <h5>{editBasket.name}</h5> :
                        null
                }
                <div>
                    <label htmlFor="name">Basket Name</label>
                    <input id="name" value={name} onChange={(event) => {
                        setName(event.target.value)
                    }}></input>
                </div>
                <div>
                    <label htmlFor="price">Basket Price</label>
                    <input id="price" value={price} onChange={(event) => {
                        setPrice(event.target.value)
                    }}></input>
                </div>
                <div>
                <label htmlFor="description">Basket Description</label>
                <input id="desription" value={description} onChange={(event) => {
                    setDescription(event.target.value)
                }}></input>
                </div>
                <button type="submit">Edit Basket Details</button>
            </form>
            {
                (Object.keys(editBasket).length) ?
                    editBasket.occasions.map((basket, i) => {
                        return (
                            <Baskets
                                occasions={occasions} deleteOccasions={deleteOccasions}
                                setUnauthorizedUserError={setUnauthorizedUserError} setSuccessfulMessage={setSuccessfulMessage}
                                getBasket={getBasket} key={i}
                            />
                        )
                    }) :
                    null
            }
            {
                (duplicateBasket) ?
                    <p>Basket Already Exists in Occasions</p> :
                    null
            }
        </div>  
)}
export default EditBasket;