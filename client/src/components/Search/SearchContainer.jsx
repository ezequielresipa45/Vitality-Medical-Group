import React from 'react';
import { useState , useEffect , useLayoutEffect , useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import { useAuth0 } from '@auth0/auth0-react'; 
import { getSpecialities , getAnalysis, getDoctors  } from '../../redux/actions';
import SearchBar from './SearchBar';

import styles from './Search.module.css';
import SearchResults from './SearchResults';

const INITIAL_PAGE = 0;
const ITEMS = 3;


export default function SearchContainer() {
    
    const dispatch = useDispatch();

    const location = useLocation();

    const navigate = useNavigate();

    const orderRef = useRef();

    const specialities = useSelector((state) => state.specialities);

    const analysis = useSelector((state) => state.analysis);

    const doctors = useSelector((state) => state.doctors);

    const [search, setSearch] = useState('');

    const [searchResults , setSearchResults] = useState([]);

    const [filterType, setFilterType] = useState('');

    const [filterSpeciality, setFilterSpeciality] = useState('');

    const [orderValue, setOrderValue] = useState('');

    const [results, setResults] = useState([...searchResults]);

    const INITIAL_ITEMS = [...results].splice(INITIAL_PAGE, ITEMS);
    const [itemsPage, setItemsPage] = useState(INITIAL_ITEMS);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

    useLayoutEffect(() => {
        dispatch(getSpecialities());
        dispatch(getAnalysis());
        dispatch(getDoctors());
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    //console.log(`Buscar: ${search}`);

    const handleSearch = (value) => {
        if(!value) return setSearchResults([]);

        let analysisResults = [...analysis.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))];
        let doctorsResults = [...doctors.filter((item) => item.full_name.toLowerCase().includes(value.toLowerCase()))];

        const results = analysisResults.concat(doctorsResults);

        results.length && handleFilter([...results]);
        orderRef.current.options.selectedIndex = 0;
        console.log(results);
    };

    const handleFilter = (array) => {
        let results = [...array];

        if(filterType === 'Médicos') {
            results = array.filter((item) => item.full_name);
            setSearchResults([...results]);
        }
        else if(filterType === 'Análisis') {
            results = array.filter((item) => item.name);
            setSearchResults([...results]);
        }
        else {
            setSearchResults([...results]);
        };
        
        if(filterSpeciality.length) {
            if(filterType === 'Médicos') {
                results = array.filter((item) => item.specialities && item.specialities[0].speciality?.toLowerCase() === filterSpeciality.toLowerCase());
                setSearchResults([...results]);
            }
            else if(filterType === 'Análisis') {
                results = array.filter((item) => item.speciality?.toLowerCase() === filterSpeciality.toLowerCase());
                setSearchResults([...results]);
            }
            else {
                results = array.filter((item) => item.speciality?.toLowerCase() === filterSpeciality.toLowerCase() || item.specialities && item.specialities[0].speciality?.toLowerCase() === filterSpeciality.toLowerCase());
                setSearchResults([...results]);
            };
        }
        else {
            setSearchResults([...results]);
        };
        //console.log(results);
    };

    const handleOrder = (array) => {
        let orderedResults = [...array];
        orderValue === 'upward' 
            ? orderedResults = [...array].sort((itemA, itemB) => itemB.name?.localeCompare(itemA.name || itemA.full_name) || itemB.full_name?.localeCompare(itemA.full_name || itemA.name))
            : orderedResults = [...array].sort((itemA, itemB) => itemA.name?.localeCompare(itemB.name || itemB.full_name) || itemA.full_name?.localeCompare(itemB.full_name || itemB.name));
        return setSearchResults([...orderedResults]);
    };

    const nextHandler = () => {
        const totalElements = results.length;
        const nextPage = currentPage + 1;
        const indexNextPage = nextPage * ITEMS;
        
        if(indexNextPage >= totalElements) {
            setItemsPage(INITIAL_ITEMS);
            setCurrentPage(INITIAL_PAGE);
            //ref.current.scrollIntoView();
            return;
        };

        setItemsPage([...results].splice(indexNextPage, ITEMS));
        setCurrentPage(nextPage);
        //ref.current.scrollIntoView();
    };

    const prevHandler = () => {
        const prevPage = currentPage -1;
        const indexPrevPage = prevPage * ITEMS;
        
        setItemsPage([...results].splice(indexPrevPage, ITEMS));
        setCurrentPage(prevPage);
        //ref.current.scrollIntoView();
    };

    useEffect(() => {
        handleSearch(search);
    }, [ search, filterType , filterSpeciality ]);
    
    useEffect(() => {
        handleOrder(searchResults);
    }, [ orderValue ]);
    
    useEffect(() => {
        setResults([...searchResults]);
    }, [searchResults]);

    useEffect(() => {
        setItemsPage(INITIAL_ITEMS);
        setCurrentPage(INITIAL_PAGE);   
    }, [ results ]);

    return (
    
        <div className={styles.container}> 
            
            <SearchBar 
                search = {search}
                handleChange = {handleChange}    
            />

            <div className={styles.filters_div}>

                <p>Tipo de Busqueda</p>

                <select name='type' onChange={(e) => setFilterType(e.target.value)}>

                    <option value={''}>Todos</option>
                    <option value='Médicos'>Médicos</option>
                    <option value='Análisis'>Análisis</option>

                </select>

                <p>Especialidades </p>

                <select name='specilities' onChange={(e) => setFilterSpeciality(e.target.value)}>

                    <option value={''}>Todos</option>
                    {specialities?.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}

                </select>

                <p>Orden alfabetico</p>

                <select ref={orderRef} name='order' onChange={(e) => setOrderValue(e.target.value)}>

                    <option value={''}>Orden...</option>
                    <option value={'upward'} >Ascendente</option>
                    <option value={'downward'} >Descendente</option>
                    
                </select>
            
            </div>
            
            {!results.length && search.length > 0 && 
            
            <p style={{alignSelf: 'center', color:'var(--secondary)'}}>No se encontraron resultados</p>
            
            }

            {results.length > 0 && 

            <div className={styles.results_container}>
                    
                <button className= { currentPage !== INITIAL_PAGE ? styles.pageButton : styles.noButton } onClick={currentPage !== INITIAL_PAGE ? () => prevHandler() : null } >
                        <i className='fas fa-chevron-left'></i>
                </button>
            
                    {itemsPage.map((item, index) => (
                        <SearchResults
                            key = {index}
                            speciality = {item.speciality || item.specialities[0].speciality[0].toUpperCase() + item.specialities[0].speciality.slice(1)}
                            title = {item.name || item.full_name}
                            type = {item.full_name ? 'Médico' : 'Análisis'}
                        />
                    ))}

                <button className= {currentPage +1 !== Math.ceil(results.length / ITEMS) ? styles.pageButton : styles.noButton} onClick={() => nextHandler()}>
                    <i className='fas fa-chevron-right'></i>
                </button>

            </div>}
            
        </div>

    
    );
};
