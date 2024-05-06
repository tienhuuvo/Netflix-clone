import React, { useEffect, useRef, useState } from "preact/compat";
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'
import { Link } from "react-router-dom";

const TitleCardss = ({title, category}) => {
    const cardsRef = useRef();
    const [apiData, setApiData] = useState([])

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODUxZTBkZTdkM2U1ZDJkZGUyNTdkYmM2ODJiY2VjNSIsInN1YiI6IjY2MzIwMjMxYzM5MjY2MDEyNjZkMGQ0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESbmWi4LSXY1iaSHGAgDKLKnMfmGtidUzxbKwZTN8JM'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault()
        cardsRef.current.scrollLeft += event.deltaY
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])

    return(
        <>
            <div className="titlecards">
                <h2>{title?title:"Popular of Netflix"}</h2>
                <div className="card-list" ref={cardsRef}>
                    {apiData.map((card, index) => {
                        return <Link to={`/player/${card.id}`} className="card" key={index}>
                            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                            <p>{card.original_title}</p>
                        </Link>
                    })}
                </div>
            </div>
        </>
    )
}

export default TitleCardss