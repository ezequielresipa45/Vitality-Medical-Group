import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteConfirmedTickets } from '../../redux/actions';
import { Drawer , IconButton, Tooltip , List , ListItem , ListItemButton, ListItemText , Box , Divider , Typography, Button} from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentIcon from '@mui/icons-material/Payment';
import styles from './TicketsDrawer.module.css';

export default function TicketsDrawer() {

    const dispatch = useDispatch();

    const userId = useSelector((state) => state.user.id);

    const userTickets = useSelector((state) => state.confirmedTickets.filter((item) => item.user === userId));
    
    const [toggle, setToggle] = useState(false);

    const toggleDrawer = () => {
        setToggle(!toggle);
    };
    
    const deleteHandler = (value) => {
        dispatch(deleteConfirmedTickets({user: userId, id: value}));
        localStorage.setItem('confirmedItems', JSON.stringify(userTickets));
    };
    
    useEffect(() => {
        toggle && localStorage.setItem('confirmedItems', JSON.stringify(userTickets));
    }, [userTickets]);

    return (
        <>
    
            <div className={styles.container}> 

                {userTickets.length > 0 &&
                
                <Tooltip placement="right-start">
                    <IconButton onClick={toggleDrawer}>
                        <MonitorHeartIcon sx={{ fontSize: 30 }} />
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
                            <Button sx={{ minWidth: 268 }} variant="outlined" endIcon={<PaymentIcon />}>Finalizar</Button>
                        </ListItem>
                    </List>
                </Box>

            </Drawer>
        </>
    )
}
