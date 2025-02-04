import styles from '../styles/NavBox.module.css'

export default function NavBox(props: {src: string})
{
    return(
        <div className={styles['navBox']}>
            <img className={styles['accImgRes']} src={props.src}></img>
        </div>
    )
}