import React from 'react';
import axios from 'axios';
import { useState , useEffect , useLayoutEffect , useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import News from './News2';
import styles from './News2.module.css';
import data from '../../services/news.json';

const DEFAULT_IMAGE = 'https://cdn.pixabay.com/photo/2015/05/24/06/13/medical-781422_1280.jpg';
const INITIAL_PAGE = 0;
const ITEMS = 3;

export default function ContainerNews() {

    const [news, setNews] = useState([]);

    const getNews = () => {

        /* const results = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=health&pageSize=100&apiKey=7ffa9b40912247c3b28531550fd10087')
            .then((res) => res.data.articles)
            .catch((err) => window.alert('Error: Get News')); */

        const results = data.articles;

        results && setNews(results);
    };
    
    useLayoutEffect(() => {

        getNews();

    }, []);

    const INITIAL_ITEMS = [...news].splice(INITIAL_PAGE, ITEMS);
    const [itemsPage, setItemsPage] = useState(INITIAL_ITEMS);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

    const nextHandler = () => {
        const totalElements = news.length;
        const nextPage = currentPage + 1;
        const indexNextPage = nextPage * ITEMS;
        
        if(indexNextPage >= totalElements) {
            setItemsPage(INITIAL_ITEMS);
            setCurrentPage(INITIAL_PAGE);
            return;
        };
        //console.log(nextPage);
        //console.log(indexNextPage);
        //console.log(totalElements);

        setItemsPage([...news].splice(indexNextPage, ITEMS));
        setCurrentPage(nextPage);
        
    };
    const prevHandler = () => {
        const prevPage = currentPage -1;
        const indexPrevPage = prevPage * ITEMS;
        
        setItemsPage([...news].splice(indexPrevPage, ITEMS));
        setCurrentPage(prevPage);
        
    };


    /* let infiniteLoop = setTimeout(() => {
        nextHandler();
    }, 3000 ); */

    useEffect(() => {

        setItemsPage(INITIAL_ITEMS);
        setCurrentPage(INITIAL_PAGE);
        
    }, [ news ]);

    return (

        <div className={styles.container} >

            <h2>Novedades internacionales</h2>

            <div className={styles.news_div}>

                {itemsPage && itemsPage.map((item, index) => (
                    <React.Fragment key={index}>

                        <News
                        title = {item.title}
                        description = {item.description}
                        image = {item.urlToImage ? item.urlToImage : DEFAULT_IMAGE}
                        url = {item.url}
                        date = {item.publishedAt.slice(0,10)}
                        />

                        {index !== itemsPage.length -1 && <hr />}  

                    </React.Fragment>
                ))}

            </div>

            <div>
                <button onClick={() => prevHandler()}><i className='fas fa-chevron-left'></i></button>

                <button onClick={() => nextHandler()}><i className='fas fa-chevron-right'></i></button>
            </div>

        </div>

    )
};
