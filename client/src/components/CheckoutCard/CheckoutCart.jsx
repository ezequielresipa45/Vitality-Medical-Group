import styled from "./CheckoutCart.module.css"
import axios from "axios"

// Importaciones Mercado Pago
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from "react"
import CartList from "./Details/CartList"
import CheckoutButton from "./CheckoutButton"


const { VITE_PUBLIC_KEY } = import.meta.env



const CheckoutCart = () => {

    let PREFERENCE = ""
    initMercadoPago(VITE_PUBLIC_KEY); // Inicializacion mercado Pago

    const pagoPrueba = {
        medical: [
            {
                id: 10,
                title: "Medico general",
                description: "dolor de pelo",
                quantity: 1,
                price: 150
            }
        ],
        plan: [{            
            id: 1,
            title: "Plan 1",
            description: "Te cubre lo que quieras",
            picture_url: "",
            quantity: 1,
            price: 200
        }],
        analisys: [
            {
                id: 1,
                name: "Vacuna antitenatica",
                speciality: "Otorrinolaringologia",
                quantity: 1,
                price: 100,
            },
            {
                id: 2,
                name: "Prueba de la burbuja",
                speciality: "Psicologia",
                quantity: 1,
                price: 150,
            },
            {
                id: 3,
                name: "Prueba de los azotes",
                speciality: "Medicina general",
                quantity: 1,
                price: 200,
            },
        ]

    }

    const [preferenceId , setPreferenceId ] = useState(null)


    const pagarhandler = async () => {
        PREFERENCE = await axios.post("http://localhost:3001/mercadoPago/v2", pagoPrueba)
        console.log(PREFERENCE)
        setPreferenceId(PREFERENCE?.data?.mpresult.body.id)
    }
    
    return (
        <div className={styled.checkoutCartContainer}>
            <h1>Soy el carrito</h1>
            <CartList />
            <button onClick={pagarhandler}>Pagar</button>
           <CheckoutButton preferenceId={preferenceId}/>
        </div>
    )
}

export default CheckoutCart