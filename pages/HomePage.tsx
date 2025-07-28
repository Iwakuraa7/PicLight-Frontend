import { useNavigate } from 'react-router-dom'
import NavBox from '../components/NavBox'
import styles from '../styles/HomePage.module.css'
import { useEffect, useState } from 'react'
import isTokenValid from '../src/methods/isTokenValid'
import refreshToken from '../src/methods/refreshToken';
import { jwtDecode } from 'jwt-decode'

export default function HomePage()
{
    const navigate = useNavigate();
    var token = localStorage.getItem("token");
    const [matchUsers, setMatchUsers] = useState<string[] | null>(null);
    const [searchVal, setSearchVal] = useState<string>("");
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if(!token || !isTokenValid(token) || token === null) {
            navigate("/signin")
        }
        else {
            setUserInfo(jwtDecode(token));
            refreshToken(token);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/signin")
    }

    const handleUserSearch = async (qu: string) => {
        setSearchVal(qu);
        if(qu === "" || qu === null) {
            setMatchUsers(null);
            return;
        };

        const response = await fetch(`http://13.48.143.44/api/account/${qu}`);
        const result = await response.json();

        if(result.succeeded) {
            setMatchUsers(result.users);
        }
    }

    function handleRedirection(username: string) {
        navigate(`/account/${username}`);
    }

    return (
        <div>
            <div className={styles['homePageMainBox']}>
                <div className={styles['centerBox']}>
                    <h1 style={{textAlign: "center"}}>PicLight</h1>
                    <div className={styles['inputBox']}>
                        <input type="text" placeholder="Searching for someone?" onChange={e => {handleUserSearch(e.target.value)}} value={searchVal}></input>
                        <div className={styles['searchImgBox']}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2vw" height="2vh" viewBox="0 0 50 50">
                                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className={styles['usersList']}>
                        {matchUsers && matchUsers.map((u, idx) => {
                            return (
                                <div onClick={() => handleRedirection(u)} className={styles['userBox']} key={idx}>
                                    @{u}
                                </div>
                            )
                        })}
                    </div>                                     
                </div>
                <div className={styles['navBoxes']}>
                    <div onClick={() => navigate(`/account/${userInfo.given_name}`)}>
                        <NavBox src='https://www.svgrepo.com/show/456992/account.svg'/>
                    </div>
                    <div onClick={() => logout()}>
                        <NavBox src='https://www.svgrepo.com/show/491227/exit.svg'/>
                    </div>
                </div>
            </div>       
        </div>
    )
}