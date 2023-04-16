import { useEffect, useState } from "react";
import styled from "./CheckoutCart.module.css"
import { useLocation, useSearchParams, useParams, useNavigate } from "react-router-dom"


const CheckoutSuccessfull = () => {

    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate()
    const [queries, setQueries] = useState(null)

    const queryHandler = () => {
        let arr = {}
        for (const entry of searchParams.entries()) {
            arr = {...arr, [entry[0]]: entry[1]}
          }
        setQueries(arr)
    }
    useEffect( () => {
        queryHandler()
    }, [])

    const homeHandler = () => {
        navigate("/")
    }


    return (
        <div className={styled.CheckoutSuccessfullContainer}>
            <h1>Pago realizado con exito</h1>
            <button onClick={homeHandler}>Regresar a la pagina principal</button>
        </div>
    )
}

export default CheckoutSuccessfull;