import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styles from '../styles/UserPhotosPage.module.css'
import { jwtDecode } from "jwt-decode";

export default function UserPhotos() {
    const token = localStorage.getItem("token");
    const { year } = useParams<{ year: string }>();
    const { username } = useParams<{ username: string }>();
    const [photos, setPhotos] = useState<{ id: number, url: string, year: number, title: string }[]>([]);
    const [currPhoto, setCurrPhoto] = useState<{ visible: boolean, url: string } | null>(null);
    const [files, setFiles] = useState<FileList | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, id: number } | null>(null);

    // Check if current user is admin
    useEffect(() => {
      if(token !== null) {
        var userInfo = jwtDecode(token);

        if (userInfo.given_name != username) {
          setIsAdmin(false);
        }        
      } 
    }, [])

    // Refresh photos
    const fetchData = async () => {
      const response = await fetch(`http://16.170.221.10/api/photo/account/${username}/${year}`, {
          headers: {
              "Authorization": "Bearer " + token
          },
      });
      const data = await response.json();
      console.log(data);
      setPhotos(data.photos);
    };    

    // Upload photos to DB and S3
    const handleUpload = async () => {
        if(!files) return;

        for(var i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);
            formData.append("title", files[i].name.replace(/\.[^/.]+$/, ""));

            var response = await fetch(`http://16.170.221.10/api/photo/upload/${year}`, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: formData,
            });

            var data = await response.json();
            console.log(data);
            await fetchData();
        }

        setFiles(null);
    };    

    // Delete photo
    const handleDelete = async () => {
        if(!contextMenu) return;
        const response = await fetch("http://16.170.221.10/api/photo/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contextMenu.id)
        })

        const result = await response.json();
        console.log(result.message);
        setContextMenu(null);
        await fetchData();        
    }    

    // Pass x and y, id to the menu
    const handleContextMenu = (e, id: number) => {
        if (isAdmin) {
          e.preventDefault();
          setContextMenu({
              x: e.pageX,
              y: e.pageY,
              id: id
          });
        }
    };

    const showPhoto = (photoUrl: string) => {
        setCurrPhoto({ visible: true, url: photoUrl})
    }

    useEffect(() => {
      fetchData();
    }, [year]);        

    return(
        <div className={styles['main-box']} onClick={() => setContextMenu(null)}>
            <h2>{year}</h2>
            <div className={styles['photos-box']}>
                {photos.map((photo: {id: number, url: string}) => (
                    <div
                        onContextMenu={(e) => handleContextMenu(e, photo.id)}
                        onClick={() => showPhoto(photo.url)}                  
                        className={styles['photo-block']}
                        key={photo.id}
                    >
                        <img src={photo.url} alt={`photo #${photo.id}`} data-id={photo.id}/>
                    </div>    
                ))}
            </div>
            {isAdmin && ( 
              <div>
                <input type="file" multiple onChange={e => setFiles(e.target.files)}/>
                <button onClick={() => handleUpload()}>Upload</button>
            </div>
            )}

            {currPhoto && (
              <div
                className={styles['overlay']}
                onClick={() => setCurrPhoto(null)} // clicking the overlay closes photo
              >
                <div
                  className={styles['currPhoto']}
                  onClick={e => e.stopPropagation()} // clicking image itself doesn't close
                >
                  <img src={currPhoto.url} />
                </div>
              </div>
            )}

            {contextMenu && (
              <div
                className={styles['context-menu']}
                onClick={e => e.stopPropagation()} // stop propagation inside menu
                style={{ top: contextMenu.y, left: contextMenu.x, position: 'absolute' }}
              >
                <div
                  className={styles['context-menu-item']}
                  onClick={() => handleDelete()}
                >
                  Delete
                </div>
              </div>
            )}                       
        </div>
    )
}
