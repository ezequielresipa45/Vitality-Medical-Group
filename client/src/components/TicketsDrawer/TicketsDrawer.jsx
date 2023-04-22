import React from 'react';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConfirmedTickets } from '../../redux/actions';
import { Drawer , IconButton, Tooltip , List , ListItem , ListItemButton, ListItemText , Box , Divider , Typography, Button} from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentIcon from '@mui/icons-material/Payment';
import styles from './TicketsDrawer.module.css';
import MPButton from '../MPButton/MPButton';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

export default function TicketsDrawer() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userId = useSelector((state) => state.user.id);

    const tickets = useSelector((state) => state.confirmedTickets);

    const userTickets = useSelector((state) => state.confirmedTickets.filter((item) => item.user === userId));
    
    const [toggle, setToggle] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const toggleDrawer = () => {
        setToggle(!toggle);
    };
    
    const deleteHandler = (value) => {
        dispatch(deleteConfirmedTickets({user: userId, id: value}));
        localStorage.setItem('confirmedItems', JSON.stringify(userTickets));
    };

    const paymentItems = {
        analisys: userTickets.map((item) => {
            return { 
                id: item.id,
                title: item.ticket.title,
                description: item.ticket.observations,
                quantity: 1,
                price: item.ticket.price
            };
        })
    };

    //console.log(paymentItems);

    const onClickContinue = async () => {
        setIsLoading(!isLoading);
        localStorage.setItem('payment_type', 'ticket');
        await axios.post('/mercadoPago/v2', paymentItems)
            .then((res) => window.location.replace(res.data?.mpresult?.body.init_point))
            .catch((err) => console.log(err));
        setIsLoading(!isLoading);
    };
    
    useEffect(() => {
        toggle && localStorage.setItem('confirmedItems', JSON.stringify(tickets));
    }, [tickets]);

    return (
        <>
    
            <div className={styles.container}> 

                {userTickets.length > 0 &&
                
                <Tooltip title='Lista de turnos'>
                    <IconButton onClick={toggleDrawer}>
                        {/* <MonitorHeartIcon sx={{ fontSize: 30 }} /> */}
                        <i className='fa-solid fa-heart-pulse' style={{ fontSize:30, color:'#767676', marginBlockStart:3 }}></i>
                        <div className={styles.badge}>
                            <p>{userTickets.length}</p>
                        </div>
                    </IconButton>
                </Tooltip>
                }

            </div>

            <Drawer
                anchor='right'
                open={toggle}
                onClose={toggleDrawer}
                disableScrollLock={true}
            >
                
                
                <Box
                    sx={{ width: 300 }}
                    role="presentation"
                    onKeyDown={toggleDrawer}
                >
                    <Typography variant="subtitle1" align='center' marginTop={3} marginBottom={3}><strong>Turnos pendientes de pago</strong></Typography>
                    <List sx={{ minHeight: 500 , marginBottom: 2}}>
                    {userTickets.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton >
                                <ListItemText primary={item.ticket.title} />
                                <IconButton onClick={() => deleteHandler(item.id)} >
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List >
                        <ListItem>
                            {/* <Button sx={{ minWidth: 268 }} variant="outlined" endIcon={<PaymentIcon />} onClick={onClickContinue}>Finalizar</Button> */}
                            <LoadingButton
                                onClick={onClickContinue}
                                loading={isLoading}
                                loadingPosition='end'
                                variant="outlined"
                                sx={{minWidth: 268}}
                                endIcon={<PaymentIcon />} 
                            >
                            Finalizar                    
                            </LoadingButton>
                        </ListItem>
                    </List>
                </Box>

            </Drawer>
        </>
    )
}
