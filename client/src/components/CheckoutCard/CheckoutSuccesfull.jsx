import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckoutCart.module.css";
import { deleteConfirmedTickets, postConfirmedTickets, resetConfirmedTickets } from "../../redux/actions";


const CheckoutSuccessfull = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    const userId = useSelector((state) => state.user.id);

    const tickets = useSelector((state) => state.confirmedTickets);

    const userTickets = useSelector((state) => state.confirmedTickets.filter((item) => item.user === userId));

    const [queries, setQueries] = useState(null);

    const [isPaid, setIsPaid] = useState(false);

    const [inProcess, setInProcess] = useState(true);

    const paidTickets = userTickets.map((item) => {
            return {
                title: item.ticket.title,
                observations: item.ticket.observations,
                idAnalysis: item.ticket.code,
                idPatient: item.patient,
                date: item.ticket.date,
                hour: item.ticket.schedule,
                price: item.ticket.price
            };
    });

    const paidPlan = null;
    
    const queryHandler = () => {
        let feedback = {};
        for (const entry of searchParams.entries()) {
            feedback = {...feedback, [entry[0]]: entry[1]};
        };
        setQueries(feedback);
    };

    const payment = {
        user: userId,
        planId: paidPlan ? paidPlan.id : null,
        ticketsIds: paidTickets ? paidTickets.map((item) => item.idAnalysis) : null,
        description: paidTickets ? 'Pago de análisis clínicos' : 'Pago de plan médico',
        price: 666,
        code: queries?.collection_id,
        paymentId: queries?.payment_id,
        status: queries?.status,
        date: new Date()
    };

    console.log(paidTickets);

    console.log(payment);

    const handleConfirmTickets = async () => {
        inProcess && await axios.post('/payment/createPaymentAnalysis', payment)
            .then((res) => {
                console.log(res.data);
                setIsPaid(true);
                setInProcess(false);
            })
            //.then(() => dispatch(resetConfirmedTickets(userId)))
            .catch((err) => console.log(err));

        isPaid && await paidTickets.map((item) => axios.post('/ticketAnalysis/createTicketAnalisys', item)
            .then((res) => {
                console.log(res.data);
                dispatch(deleteConfirmedTickets({user: userId, id: item.id}));
            })
            .catch((err) => console.log(err))
        );
    };

    const paymentProcessing = async () => {
        if(queries?.status === "approved") {
            await handleConfirmTickets();
            console.log('Ok');
        };
    };

    useEffect(() => {
        queryHandler();
    }, [searchParams]);

    useEffect(() => {
        inProcess && payment?.ticketsIds.length && paymentProcessing();
    }, [queries, userTickets]);

    useEffect(() => {
        isPaid && localStorage.setItem('confirmedItems', JSON.stringify(tickets));
    }, [tickets]);

    return (
        <div className={styles.container_succesfull}>
            {inProcess && <h1>Procesando el pago...</h1>}
            {!inProcess && isPaid ? <h1>Pago realizado con éxito</h1> : <h1>Ha ocurrido un error en el pago</h1>}
            <button onClick={() => navigate('/')}>Pagina Principal</button>
            <button onClick={() => navigate('/paciente')}>Perfil</button>
        </div>
    );
};

export default CheckoutSuccessfull;