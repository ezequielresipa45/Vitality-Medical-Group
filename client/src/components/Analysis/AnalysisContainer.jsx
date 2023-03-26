import React from 'react';
import { useState , useEffect , useLayoutEffect , useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Analysis from './Analysis';
import styles from './Analysis.module.css';

import { getSpecialities , getAnalysis , filterAnalysis } from '../../redux/actions';

const INITIAL_PAGE = 0;
const ITEMS = 5;

export default function AnalysisContainer() {

    const dispatch = useDispatch();

    const ref = useRef(null);

    const sortRef = useRef(null);
    
    const filterRef = useRef(null);

    const specilities = useSelector((state) => state.specilities);

    const allAnalysis = useSelector((state) => state.analysis);

    const filteredAnalysis = useSelector((state) => state.filteredAnalysis);

    //const ordered = useSelector((state) => state.orderedAnalysis);
    
    const [analysis, setAnalysis] = useState(allAnalysis);

    const [isLoading, setIsLoading] = useState(false);

    let orderedAnalysis = [];

    const INITIAL_ITEMS = [...analysis].splice(INITIAL_PAGE, ITEMS);
    const [itemsPage, setItemsPage] = useState(INITIAL_ITEMS);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

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

        setItemsPage(INITIAL_ITEMS);
        setCurrentPage(INITIAL_PAGE);
        
    }, [ analysis ]);    
    
    useEffect(() => {

        filteredAnalysis.length ? setAnalysis(filteredAnalysis) : setAnalysis(allAnalysis);
        //setItemsPage(INITIAL_ITEMS);
        //setCurrentPage(INITIAL_PAGE);
        
    }, [ filteredAnalysis ]);
    
    const nextHandler = () => {
        const totalElements = recipes.length;
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
    };

    const handleFilter = (value) => {

        //dispatch(filterRecipes(value));

        //setRecipes(filtered);

        sortRef.current.options.selectedIndex = 0;
        filterRef.current.options.selectedIndex = 0;

        //console.log(value);
    };

    const handleOrder = (e) => {

        if(e.target.name === 'orderByTitle') {
            e.target.value === 'upward' 
                ? orderedAnalysis = [...analysis].sort((itemA, itemB) => itemB.title.localeCompare(itemA.title))
                : orderedAnalysis = [...analysis].sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))
            sortRef.current.options.selectedIndex = 0;
            return setAnalysis([...orderedAnalysis]);
        
        };

        /* if(e.target.name === 'orderByScore') {
            e.target.value === 'upward' 
                ? orderedRecipes = [...recipes].sort((itemA, itemB) => itemA.health_score - itemB.health_score)
                : orderedRecipes = [...recipes].sort((itemA, itemB) => itemB.health_score - itemA.health_score)
            sortTitleRef.current.options.selectedIndex = 0;
            return setRecipes([...orderedRecipes]);
            
        }; */
    };

    return (
        <>
            <div className={styles.container}>

                <div className={styles.div_description}>
                    <h1>Servicios analíticos y de diagnostico</h1>

                    <p>Prestamos servicios analíticos y de diagnostico con asesoramiento de profesionales altamente capacitados. Contamos con equipos de ultima tecnología que nos permiten brindar resultados confiables y de precisión, para estudiar, diagnosticar, prevenir y tratar las diferentes afecciones.</p>
                </div>


                <div className={styles.div_container}>

                    <div className={styles.filter}>

                        <h3> Especialidades </h3>

                        <select name='specilities' onChange={(e) => handleFilter(e.target.value)}>

                            <option defaultValue={null} >Todos</option>

                            {specilities?.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}

                        </select>

                        <h3> Ordenar </h3>

                        <select ref={sortRef} name='orderByTitle' onChange={(e) => handleOrder(e)}>

                            <option defaultValue={null} >Order...</option>
                            <option value={'upward'} >Upward</option>
                            <option value={'downward'} >Downward</option>
                            
                        </select>

                        {/* <h3> Order by score </h3>

                        <select ref={sortScoreRef} name='orderByScore' onChange={(e) => handleOrder(e)}>

                            <option defaultValue={null} >Order...</option>
                            <option value={'upward'} >Upward</option>
                            <option value={'downward'} >Downward</option>
                            
                        </select> */}

                    </div>

                    <div className={styles.analysis_container}>
                        {/* <button className= { currentPage !== INITIAL_PAGE ? style.pageButton : style.noButton } onClick={currentPage !== INITIAL_PAGE ? () => prevHandler() : null } >
                            <i className='fas fa-chevron-left'></i>
                        </button> */}
                        {itemsPage.map((item, index) => (
                            <Analysis
                                key={index}
                                title={item.title}
                                description={item.description}
                                speciality={item.speciality}
                            />
                        ))}
                        
                        {/* <button className= {style.pageButton} onClick={() => nextHandler()}>
                            <i className='fas fa-chevron-right'></i>
                        </button> */}
                    </div>

                    <div className={styles.div_controllers}>

                        <button className= { currentPage !== INITIAL_PAGE ? styles.pageButton : styles.noButton } onClick={currentPage !== INITIAL_PAGE ? () => prevHandler() : null } >
                                {/* <i className='fas fa-chevron-left'></i> */}{'<'}
                        </button>

                        {/* <button className= {style.pageButton} >{currentPage + 1}</button> */}

                        {PAGES.map((item, index) => <button key={index} className= {currentPage+1 === item ? styles.pageActive : styles.pageButton} onClick={() => onClickPageHandler(item)}> {item} </button>)}

                        <button className= {currentPage +1 !== PAGES.length ? styles.pageButton : styles.noButton } onClick={() => nextHandler()}>
                                {/* <i className='fas fa-chevron-right'></i> */}{'>'}
                        </button>

                    </div>

                </div>

            </div>



        </>
    )
};
