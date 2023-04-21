import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckoutCart.module.css";
import { deleteConfirmedTickets, getPaymentType, postConfirmedTickets, resetConfirmedTickets, selectPlan } from "../../redux/actions";


const CheckoutSuccessfull = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    //const payment_type = useSelector((state) => state.payment_type);
    const payment_type = localStorage.getItem('payment_type');

    const userId = useSelector((state) => state.user.id);
    const tickets = useSelector((state) => state.confirmedTickets);
    const userTickets = useSelector((state) => state.confirmedTickets.filter((item) => item.user === userId));
    //const plan = useSelector((state) => state.selectedPlan);
    const plan = JSON.parse(localStorage.getItem('selectedPlan'));
    //console.log((plan));

    const [queries, setQueries] = useState(null);
    const [init, setInit] = useState(false);
    const [inProcess, setInProcess] = useState(true);
    const [isPaid, setIsPaid] = useState(false);

    const queryHandler = () => {
        let feedback = {};
        for (const entry of searchParams.entries()) {
            feedback = {...feedback, [entry[0]]: entry[1]};
        };
        setQueries(feedback);
    };

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

    const paidPlan = {
        id: plan?.id,
        title: plan?.title,
        description: plan?.description,
        price: plan?.price,
    };

    const ticket_payment = {
        user: userId,
        ticketsIds: paidTickets.map((item) => item.idAnalysis),
        description: 'Pago de análisis clínicos',
        price: 666,
        code: queries?.collection_id,
        paymentId: queries?.payment_id,
        status: queries?.status,
        date: new Date()
    };

    const plan_payment = {
        user: userId,
        planId: paidPlan?.id,
        description: 'Pago de plan médico',
        price: 666,
        code: queries?.collection_id,
        paymentId: queries?.payment_id,
        status: queries?.status,
        date: new Date()
    };

    const handleConfirmTickets = async () => {
        if(isPaid) return;
        if(payment_type === 'ticket') {
            inProcess && await axios.post('/payment/createPaymentAnalysis', ticket_payment)
            .then((res) => {
                console.log(res.data);
                setIsPaid(true);
            })
            .then(() => {
                paidTickets.forEach(async (item) => {
                    await axios.post('/ticketAnalysis/createTicketAnalisys', item)
                        .then((res) => console.log(res.data))
                        .catch((err) => console.log(err));
                    dispatch(deleteConfirmedTickets({user: item.idPatient, id: item.idAnalysis}));
                });
            })
            //.then(() => dispatch(resetConfirmedTickets(userId)))
            .catch((err) => {
                console.log(err);
                setIsPaid(false);
            }); 
        };
        if(payment_type === 'plan') {
            inProcess && await axios.post('/payment/createPaymentPlan', plan_payment)
            .then((res) => {
                console.log(res.data);
                setIsPaid(true);
            })
            .catch((err) => {
                console.log(err);
                setIsPaid(false);
            }); 
        };
    };

    const paymentProcessing = async () => {
        if(queries?.status !== "approved") {
            setIsPaid(false);
            setInProcess(false);
            return;
        };
        console.log('init');
        setInit(true)
        await handleConfirmTickets();
        setInProcess(false);
        console.log('Ok');
    };

    useEffect(() => {
        queryHandler();
    }, [searchParams]);

    useEffect(() => {
        !inProcess && isPaid && localStorage.setItem('confirmedItems', JSON.stringify(tickets));
    }, [tickets]);

    !init && inProcess && ticket_payment?.ticketsIds?.length && paymentProcessing();
    !init && inProcess && plan_payment?.id && paymentProcessing();

    return (
        <div className={styles.container_succesfull}>
            {inProcess && 
                <div className={styles.div_item}>
                    <h1>Procesando el pago</h1>
                    <i className='fa-solid fa-spinner fa-spin' style={{color: '#639cc7', fontSize: '50px'}}></i>
                </div>    
                }
            {!inProcess && isPaid && 
                <div className={styles.div_item}>
                    <h1>Pago realizado con éxito </h1>
                    <i className='fa-regular fa-circle-check' style={{color: '#639cc7', fontSize: '80px'}}></i>
                </div> 
            } 
            {!inProcess && !isPaid &&
                <div className={styles.div_item}>
                    <h1>Ha ocurrido un error en el pago </h1>
                    <i className='fa-regular fa-circle-xmark' style={{color: '#639cc7', fontSize: '80px'}}></i>
                </div> 
            }
            <div className={styles.div_item}>
                <button onClick={() => navigate('/')}>Pagina Principal</button>
                <button onClick={() => navigate('/paciente')}>Perfil</button>
            </div>
        </div>
    );
};

export default CheckoutSuccessfull;