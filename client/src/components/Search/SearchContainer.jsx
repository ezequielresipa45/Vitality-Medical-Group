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

    const specialities = useSelector((state) => state.specialities);

    const analysis = useSelector((state) => state.analysis);

    const doctors = useSelector((state) => state.doctors);

    const [search, setSearch] = useState('');

    const [searchResults , setSearchResults] = useState([]);

    const [filterType, setFilterType] = useState('');

    const [filterSpeciality, setFilterSpeciality] = useState('');

    const [results, setResults] = useState([...searchResults]);

    const [filteredTypeResults, setFilteredTypeResults] = useState([]);

    const [filteredSpecialityResults, setFilteredSpecialityResults] = useState([]);


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

        let analysisResults = [...analysis.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))];
        let doctorsResults = [...doctors.filter((item) => item.full_name.toLowerCase().includes(value.toLowerCase()))];
        
        if(analysisResults.length && doctorsResults.length) setSearchResults(analysisResults.concat(doctorsResults));
        else if (analysisResults.length || doctorsResults.length) analysisResults.length 
            ? setSearchResults(analysisResults) 
            : setSearchResults(doctorsResults);
        else setSearchResults([]);

    };

    console.log(results);

    useEffect(() => {
        handleSearch(search);
    }, [search]);

    useEffect(() => {
        setResults([...searchResults]);
    }, [searchResults]);

    const handleFilter = (results) => {

        if(filterType === 'Todos') {
            results;
        };

        if(filterType === 'Médico') {
            results = results.filter((item) => item.full_name);
        };
        
        if(filterType === 'Análisis') {
            results = results.filter((item) => item.title);
        };

        if(filterSpeciality !== 'Todos') {
            results = results.filter((item) => item.speciality?.toLowerCase() === filterSpeciality.toLowerCase() || item.specialities && item.specialities[0].speciality?.toLowerCase() === filterSpeciality.toLowerCase());
        }
        else {
            results;
        };

        return setResults(results);
    };

    useEffect(() => {
        searchResults.length && handleFilter([...searchResults]);
    }, [filterType , filterSpeciality]);

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

                    <option defaultValue={null} >Todos</option>
                    <option value='Médico'>Médicos</option>
                    <option value='Análisis'>Análisis</option>

                </select>

                <p>Especialidades </p>

                <select name='specilities' onChange={(e) => setFilterSpeciality(e.target.value)}>

                    <option defaultValue={null} >Todos</option>

                    {specialities?.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}

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
                            title = {item.title || item.full_name}
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
