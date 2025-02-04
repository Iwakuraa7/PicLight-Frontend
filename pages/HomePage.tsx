import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import NavBox from '../components/NavBox'
import styles from '../styles/HomePage.module.css'

export default function HomePage()
{
    const navigate = useNavigate();

    return (
        <div className={styles['homePageMainBox']}>
            <div>
                <h1 style={{textAlign: "center"}}>PicLight</h1>
                <Input/>
            </div>
            <div className={styles['navBoxes']}>
                <div onClick={() => navigate('/account')}>
                    <NavBox src='https://www.svgrepo.com/show/456992/account.svg'/>
                </div>
                <NavBox src='https://www.svgrepo.com/show/456992/account.svg'/>
                <NavBox src='https://www.svgrepo.com/show/456992/account.svg'/>
                <NavBox src='https://www.svgrepo.com/show/456992/account.svg'/>
            </div>
        </div>
    )
}