import styles from '../styles/PhotoBlock.module.css'
import PhotoBlockProps from '../src/types/PhotoBlockProps';
import { useNavigate } from 'react-router-dom';

export default function PhotoBlock({ photos, year }: PhotoBlockProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/account/${year}`)
    }

    return(
        <div onClick={() => handleClick()} className={styles['mainPhotoBlock']}>
            <h2>{year}</h2>
            <div className={styles['mainPhotosBox']}>
                {photos.map((photo: {id: number, url: string}) => (
                    <div key={photo.id} className={styles['photoBox']}>
                        <img src={photo.url} alt={`${photo.id}`}/>
                    </div>    
                ))}
            </div>            
        </div>
    )
}