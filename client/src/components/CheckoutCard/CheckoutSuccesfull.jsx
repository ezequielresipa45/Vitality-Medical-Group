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
    const paidPlan = useSelector((state) => state.selectedPlan);

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
        if(isPaid) return;
        inProcess && await axios.post('/payment/createPaymentAnalysis', payment)
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

    const paymentProcessing = async () => {
        if(queries?.status === "approved") {
            setInit(true)
            await handleConfirmTickets();
            setInProcess(false);
            console.log('Ok');
        }
        else {
            setIsPaid(false);
            setInProcess(false);
        };
    };

    useEffect(() => {
        queryHandler();
    }, [searchParams]);

    /* useEffect(() => {
        inProcess && payment?.ticketsIds?.length && paymentProcessing();
        inProcess && payment?.planId && paymentProcessing();
    }, [queries, userTickets, paidPlan]); */

    useEffect(() => {
        !inProcess && isPaid && localStorage.setItem('confirmedItems', JSON.stringify(tickets));
    }, [tickets]);

    !init && inProcess && payment?.ticketsIds?.length && paymentProcessing();
    !init && inProcess && payment?.planId && paymentProcessing();

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