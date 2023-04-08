import React from 'react';
import { useState , useEffect , useLayoutEffect , useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; 
import { getSpecialities , getAnalysis , filterAnalysis, postSelectedTickets, deleteSelectedTickets } from '../../redux/actions';
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Analysis from './Analysis';
import styles from './Analysis.module.css';

const INITIAL_PAGE = 0;
const ITEMS = 8;

export default function AnalysisContainer() {

    const location = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const ref = useRef(null);

    const sortRef = useRef(null);
    
    const filterRef = useRef(null);

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const specialities = useSelector((state) => state.specialities);

    const allAnalysis = useSelector((state) => state.analysis);

    const filteredAnalysis = useSelector((state) => state.filteredAnalysis);

    //const ordered = useSelector((state) => state.orderedAnalysis);

    const [isLoading, setIsLoading] = useState(false);

    const [isUser, setIsUser] = useState(false);
    
    const [analysis, setAnalysis] = useState([...allAnalysis].map((item, index) => {
        item.code = index;
        return item
    }));
    
    const INITIAL_ITEMS = [...analysis].splice(INITIAL_PAGE, ITEMS);
    const [itemsPage, setItemsPage] = useState(INITIAL_ITEMS);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    
    let orderedAnalysis = [];

    const TOTAL_PAGES = new Array(Math.ceil(analysis.length / ITEMS)).fill(0);
    
    const PAGES = TOTAL_PAGES.map((item, index) => {
        item = index + 1;
        return item;
    });

    useLayoutEffect(() => {
        dispatch(getSpecialities());
        dispatch(getAnalysis());
    }, []);

    useEffect(() => {
        setAnalysis(allAnalysis);
    }, [allAnalysis]);
    
    useEffect(() => {
        setItemsPage(INITIAL_ITEMS);
        setCurrentPage(INITIAL_PAGE);   
    }, [ analysis ]);    
    
    useEffect(() => {
        filteredAnalysis.length ? setAnalysis(filteredAnalysis) : setAnalysis(allAnalysis);    
    }, [ filteredAnalysis ]);
    
    const nextHandler = () => {
        const totalElements = analysis.length;
        const nextPage = currentPage + 1;
        const indexNextPage = nextPage * ITEMS;
        
        if(indexNextPage >= totalElements) {
            setItemsPage(INITIAL_ITEMS);
            setCurrentPage(INITIAL_PAGE);
            ref.current.scrollIntoView();
            return;
        };
        //console.log(nextPage);
        //console.log(indexNextPage);
        //console.log(totalElements);

        setItemsPage([...analysis].splice(indexNextPage, ITEMS));
        setCurrentPage(nextPage);
        ref.current.scrollIntoView();
    };
    const prevHandler = () => {
        const prevPage = currentPage -1;
        const indexPrevPage = prevPage * ITEMS;
        
        setItemsPage([...analysis].splice(indexPrevPage, ITEMS));
        setCurrentPage(prevPage);
        ref.current.scrollIntoView();
    };

    const onClickPageHandler = (item) => {
        const lastIndex = item * ITEMS;
        const firstIndex = lastIndex - ITEMS;
        
        setItemsPage([...analysis].slice(firstIndex, lastIndex));
        setCurrentPage(item-1);
        ref.current.scrollIntoView();
    };

    const handleFilter = (value) => {
        dispatch(filterAnalysis(value));

        sortRef.current.options.selectedIndex = 0;
        //console.log(value);
    };

    const handleOrder = (e) => {
        if(e.target.name === 'orderByTitle') {
            e.target.value === 'upward' 
                ? orderedAnalysis = [...analysis].sort((itemA, itemB) => itemB.title.localeCompare(itemA.title))
                : orderedAnalysis = [...analysis].sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))
            return setAnalysis([...orderedAnalysis]);
        };

        /* if(e.target.name === 'orderByPrice') {
            e.target.value === 'upward' 
                ? orderedRecipes = [...recipes].sort((itemA, itemB) => itemA.health_score - itemB.health_score)
                : orderedRecipes = [...recipes].sort((itemA, itemB) => itemB.health_score - itemA.health_score)
            sortTitleRef.current.options.selectedIndex = 0;
            return setRecipes([...orderedRecipes]);
        }; */
    };

    const handleClickTicket = (value) => {
        dispatch(postSelectedTickets({
            from: location.pathname,
            title: value.title,
            speciality: value.speciality,
            code: value.code,
            price: value.price
        }));
        
        localStorage.setItem('selectedItems' , JSON.stringify({
            from: location.pathname,
            title: value.title,
            speciality: value.speciality,
            code: value.code,
            price: value.price
        }));

        isAuthenticated ? navigate('/turnos') : setIsUser(true); // Aca hay que validar si el usuario esta logueado
    };

    const handleCloseModal = () => {
        setIsUser(false);
        dispatch(deleteSelectedTickets());
        localStorage.removeItem('selectedItems');
    };

    const onClickContinue = () => {
        isAuthenticated ? navigate('/turnos') : loginWithRedirect({ authorizationParams: { redirect_uri: `${window.location.origin}/turnos` } });
        //console.log(JSON.parse(localStorage.getItem('selectedItems')));
    };

    return (
        <>
            <div className={styles.container}>

                <div ref={ref} className={styles.div_container}>

                    <div className={styles.description}>
                        <h1>Servicios analíticos y de diagnostico</h1>

                        <p>Contamos con equipos de ultima tecnología que nos permiten brindar resultados confiables y de precisión para diagnosticar, prevenir y tratar las diferentes afecciones, con el asesoramiento de profesionales en salud altamente capacitados.</p>
                    </div>

                    <div className={styles.filter}>

                        <h3>Especialidades </h3>

                        <select name='specilities' onChange={(e) => handleFilter(e.target.value)}>

                            <option defaultValue={null} >Todos</option>

                            {specialities?.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}

                        </select>

                        <h3>Ordenar por nombre</h3>

                        <select ref={sortRef} name='orderByTitle' onChange={(e) => handleOrder(e)}>

                            <option defaultValue={null} >Orden</option>
                            <option value={'upward'} >Ascendente</option>
                            <option value={'downward'} >Descendente</option>
                            
                        </select>

                        {/* <h3>Ordenar por precio</h3>

                        <select ref={sortScoreRef} name='orderByPrice' onChange={(e) => handleOrder(e)}>

                            <option defaultValue={null} >Order...</option>
                            <option value={'upward'} >Upward</option>
                            <option value={'downward'} >Downward</option>
                            
                        </select> */}

                    </div>

                    <div className={styles.analysis_container}>
                        
                        {itemsPage.map((item, index) => (
                            <Analysis
                                key={index}
                                title={item.title}
                                description={item.description}
                                speciality={item.speciality}
                                image= {item.image}
                                price={index % 2 === 0 ? '$2000' : '$3000'}
                                code={item.code}
                                onClick={handleClickTicket}
                            />
                        ))}
                        
                    </div>

                    <div className={styles.div_controllers}>

                        <button className= { currentPage !== INITIAL_PAGE ? styles.pageButton : styles.noButton } onClick={currentPage !== INITIAL_PAGE ? () => prevHandler() : null } >
                            <i className='fas fa-chevron-left'></i>
                        </button>

                        {PAGES.map((item, index) => <button key={index} className= {currentPage+1 === item ? styles.pageActive : styles.pageButton} onClick={() => onClickPageHandler(item)}> {item} </button>)}

                        <button className= {currentPage +1 !== PAGES.length ? styles.pageButton : styles.noButton } onClick={() => nextHandler()}>
                            <i className='fas fa-chevron-right'></i>
                        </button>

                    </div>

                </div>

            </div>

            {isUser &&  
                <Dialog
                    open={isUser}
                    onClose={handleCloseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Debe iniciar sesión'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Para continuar el proceso de confirmación del turno debe iniciar sesión con su cuenta de usuario. Si no tiene, puede crearla para disfrutar de todos los beneficios que ofrecemos.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClickContinue} autoFocus>Continuar</Button>
                    </DialogActions>
                </Dialog>
            }

        </>
    )
};
