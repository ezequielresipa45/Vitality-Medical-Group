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
        ticketId: paidTickets ? paidTickets.map((item) => item.id) : null,
        description: paidTickets ? 'Pago de análisis clínicos' : 'Pago de plan médico',
        price: 666,
        code: queries?.collection_id,
        paymentId: queries?.payment_id,
        status: queries?.status,
        date: new Date()
    };

    console.log(paidTickets);

    const handleConfirmTickets = async () => {
        const isPaid = await axios.post('/payment/createPaymentAnalysis', payment)
            .then((res) => {
                console.log(res.data);
                return true;
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
        paymentProcessing();
    }, [queries]);

    useEffect(() => {
        localStorage.setItem('confirmedItems', JSON.stringify(tickets));
    }, [tickets]);

    return (
        <div className={styles.container_succesfull}>
            {queries?.status === "approved" && <h1>Pago realizado con éxito</h1>}
            <button onClick={() => navigate('/')}>Pagina Principal</button>
            <button onClick={() => navigate('/paciente')}>Perfil</button>
        </div>
    );
};

export default CheckoutSuccessfull;