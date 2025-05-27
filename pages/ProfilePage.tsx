import React from 'react'
import PhotoBlock from '../components/PhotoBlock'
import styles from '../styles/ProfilePage.module.css'

export default function ProfilePage()
{
    const img = 'https://s3-piclight.s3.amazonaws.com/uploads/3b947c9c-ae1f-4bce-9d17-9508ef7efa67/b893f21e-78ee-4b57-86aa-1d6a0ecb07b7.jpg'
    const imgObj = { id: 1, url: img }
    const photos = [imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj]

    return(
        <div className={styles['profilePageMain']}>
            <h1>ProfilePage</h1>
            <div className={styles['photoBlocksBox']}>
                <PhotoBlock photos={photos} year={2024}/>
                <PhotoBlock photos={photos} year={2023}/>
                <PhotoBlock photos={photos} year={2022}/>
                <PhotoBlock photos={photos} year={2021}/>
            </div>
        </div>
    )
}