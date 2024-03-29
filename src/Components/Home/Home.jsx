import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom'
import { dataStarWars } from '../../data'
import PeopleCard from '../PeopleCard/PeopleCard'

function Home() {
    const [data, setData] = useState([])
    const [dataWorld, setDataHomeWorld] = useState([])
    const [loading, setLoading] = useState(true)

    let urlPeople = 'https://swapi.dev/api/people/'
    // let urlHomeWorld = 'https://swapi.dev/api/planets/';

    const axiosPromise = async (url, setdata) => {
        try {
            const response = await axios.get(url)
            setdata(response.data.results)
            //console.log(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        axiosPromise(urlPeople, setData)
        // axiosPromise(urlHomeWorld, setDataHomeWorld);
    }, [])

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                {loading ? (
                    <p>Chargement en cours...</p>
                ) : (
                    <div>
                        <h2>De nos jours grâce à l'API Star Wars...</h2>
                        <div className="div-people">
                            <ul className="ul-people">
                                {data.map((element, index) => {
                                    const matchingStarWarsCharacter =
                                        dataStarWars.find(
                                            (char) => char.name === element.name
                                        )
                                    const id = element.url
                                        .split('/')
                                        .filter(Boolean)
                                        .pop()

                                    return (
                                        <Link
                                            to={`/people/${id}`}
                                            key={index}
                                            onClick={handleClick}
                                        >
                                            <li className="li-name">
                                                <p>{element.name}</p>
                                                {matchingStarWarsCharacter && (
                                                    <img
                                                        className="people-img"
                                                        src={
                                                            matchingStarWarsCharacter.picture
                                                        }
                                                        alt={element.name}
                                                    />
                                                )}
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )}
            </header>
        </div>
    )
}

export default Home
