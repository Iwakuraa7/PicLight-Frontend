import React from 'react'
import PhotoBlock from '../components/PhotoBlock'
import styles from '../styles/ProfilePage.module.css'

export default function ProfilePage()
{
    const img = 'https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/10-intelligent-dog-breeds/golden-retriever-tongue-out.jpg?h=430&w=710&hash=7FEB820D235A44B76B271060E03572C7'
    const imgObj = { id: 1, url: img }
    const photos = [imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj, imgObj]

    return(
        <div className={styles['profilePageMain']}>
            <h1>ProfilePage</h1>
            <div className={styles['photoBlocksBox']}>
                <PhotoBlock photos={photos} year={2021}/>
                <PhotoBlock photos={photos} year={2022}/>
                <PhotoBlock photos={photos} year={2023}/>
                <PhotoBlock photos={photos} year={2024}/>
            </div>
        </div>
    )
}