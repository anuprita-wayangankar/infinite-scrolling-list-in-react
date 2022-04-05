import React, { useEffect, useState } from 'react';
import { getData } from "../../api/user"
import { getCookieTocken, removeUserTokenFromCookie } from "../../utility/helperMethods"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Home.css'

const Home = () => {
    const [isLazyLoading, setLazyLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([]);
    let currentOffset = 0;

    const loadData = () => {
        if(currentOffset == 0) setIsLoading(true);
        setLazyLoading(true)
        getData(currentOffset).then(result => {
            setUsers((users) => [...users, ...result]);
            currentOffset += 10;
            setLazyLoading(false)
            setIsLoading(false)
        }).catch(error => {
            console.log("error : ", error)
            setLazyLoading(false)
            setIsLoading(false)
        })
    };

    const handleScroll = (e) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
            e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight) {
            loadData();
        }
    };

    const logoutHandler = (e) => {
        removeUserTokenFromCookie();
        window.location.href = "/";
    }

    useEffect(() => {
        if (getCookieTocken("userToken") !== "") {
            loadData();
            window.addEventListener("scroll", handleScroll);
        }
        else {
            window.location.href = "/"
        }
    }, []);

    return (
        <div className='home-wrapper'>
            <div><button type="button" className="btn btn-primary" onClick={(e) => logoutHandler()}>Logout</button>
            </div><br />
            <h1></h1>
            {isLoading ? <Skeleton count={3} /> : <div>
                <div className="container" style={{ minHeight: "900px" }}>
                    {users.map((p, i) => {
                        return (
                            <div
                                key={i}
                                className="place-items-center"
                            >
                                <div><img src={p.thumbnailUrl} alt={p.title}></img></div>
                                <div>{i + 1}.{p.title}</div>
                            </div>
                        );
                    })}
                </div>
                {isLazyLoading && <span className='loader'>Loading...</span>}
            </div>}
        </div>
    )
}

export default Home;