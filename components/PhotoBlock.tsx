import styles from '../styles/PhotoBlock.module.css'
import PhotoBlockProps from '../src/types/PhotoBlockProps';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import photo from "../src/types/photo";

export default function PhotoBlock({ username, year }: PhotoBlockProps) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [photos, setPhotos] = useState<photo[]>([]);

    const handleClick = () => {
        navigate(`/account/${username}/${year}`)
    }

    useEffect(() => {
        const fetchUserPhotos = async () => {
            const response = await fetch(`http://localhost:5122/api/photo/account/${username}/${year}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = await response.json();

            setPhotos(data.photos);
            console.log(data);
        }

        fetchUserPhotos();
    }, [])

    return(
        <div onClick={() => handleClick()} className={styles['mainPhotoBlock']}>
            <h2>{year}</h2>
            <div className={styles['mainPhotosBox']}>
                {photos.map((photo: photo) => (
                    <div key={photo.id} className={styles['photoBox']}>
                        <img src={photo.url} alt={`${photo.id}`}/>
                    </div>    
                ))}
            </div>            
        </div>
    )
}