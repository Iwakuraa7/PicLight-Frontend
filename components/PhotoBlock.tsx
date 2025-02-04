import styles from '../styles/PhotoBlock.module.css'

export default function PhotoBlock(props: string[])
{
    return(
        <div className={styles['mainPhotosBox']}>
            {props.photos.map((photo: string) => (
                <div className={styles['photoBox']}>
                    <img src={photo}/>
                </div>    
            ))}
        </div>
    )
}