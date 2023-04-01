import React from 'react';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, IconButton, Tooltip } from '@mui/material';
import styles from './TicketsDrawer.module.css';

export default function TicketsDrawer() {

    const userTickets = useSelector((state) => state.confirmedTickets);
    
    const [toggle, setToggle] = useState(false);

    const toggleDrawer = () => {
        setToggle(!toggle);
    };
    

    return (
        <div className={styles.container}> 

            <Tooltip placement="right-start">
                <IconButton onClick={toggleDrawer}>
                    <i className='fa-solid fa-heart-circle-exclamation'></i>
                </IconButton>
            </Tooltip>

            {/* <Drawer
                open={toggle}
                onClose={toggleDrawer()}
            >
                <Box
                    sx={{ width: 350 }}
                    role="presentation"
                    onClick={toggleDrawer()}
                    onKeyDown={toggleDrawer()}
                >
                    <List>
                    {userTickets.map((item, index) => (
                        <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Box>

            </Drawer> */}
        </div>
    )
}
