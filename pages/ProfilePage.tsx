import PhotoBlock from '../components/PhotoBlock'

export default function ProfilePage()
{
    const img = 'https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/10-intelligent-dog-breeds/golden-retriever-tongue-out.jpg?h=430&w=710&hash=7FEB820D235A44B76B271060E03572C7'
    const photos = [img, img, img, img, img, img]

    return(
        <div>
            <h1>ProfilePage</h1>
            <PhotoBlock photos={photos}/>
        </div>
    )
}