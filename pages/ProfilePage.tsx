import React from 'react'
import PhotoBlock from '../components/PhotoBlock'
import styles from '../styles/ProfilePage.module.css'
import { useParams } from "react-router-dom"

export default function ProfilePage() {
    const { username } = useParams<{ username: string | undefined }>();

    return(
        <div className={styles['profilePageMain']}>
            <h1>ProfilePage</h1>
            <div className={styles['photoBlocksBox']}>
                <PhotoBlock username={username} year={2024}/>
                <PhotoBlock username={username} year={2023}/>
                <PhotoBlock username={username} year={2022}/>
                <PhotoBlock username={username} year={2021}/>   
            </div>
        </div>
    )
}   