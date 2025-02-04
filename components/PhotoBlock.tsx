import styles from '../styles/PhotoBlock.module.css'

interface Photo {
    id: number;
    url: string;
}

interface PhotoBlockProps {
    photos: Photo[];
    year: number;
}

export default function PhotoBlock({ photos, year }: PhotoBlockProps)
{
    return(
        <div className={styles['mainPhotoBlock']}>
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