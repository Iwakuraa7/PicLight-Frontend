import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function UserPhotos() {
    const JWT = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml3YWt5cmFAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Iml3YWt1cmEiLCJuYW1laWQiOiIzYjk0N2M5Yy1hZTFmLTRiY2UtOWQxNy05NTA4ZWY3ZWZhNjciLCJuYmYiOjE3NDgzMzIxMDcsImV4cCI6MTc0ODU5MTMwNywiaWF0IjoxNzQ4MzMyMTA3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNDkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNDkifQ.tZH1_TrgOxcTsZvkUP7MKppt8iISmXfPYahrSORWXuEs2tUyMuRRmUp0XNkFqoX6WKf7cU6nU_XqKCWkqIOV-w";
    const { year } = useParams<{ year: string }>();
    const [photos, setPhotos] = useState<{ id: number, url: string, year: number, title: string }[]>([]);
    const [file, setFile] = useState(null);

    const fetchData = async () => {
      const response = await fetch(`http://localhost:5122/api/photo/account/${year}`, {
          headers: {
              "Authorization": "Bearer " + JWT
          },
      });
      const data = await response.json();
      setPhotos(data.photos);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name.replace(/\.[^/.]+$/, ""));

        var response = await fetch(`http://localhost:5122/api/photo/upload/${year}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + JWT
            },
            body: formData,
        });

        var data = await response.json();
        console.log(data);
        await fetchData();
    };    

    useEffect(() => {
      fetchData();
    }, [year]);

    return(
        <div>
            <h2>{year}</h2>
            <div>
                {photos.map((photo: {id: number, url: string}) => (
                    <div key={photo.id}>
                        <img src={photo.url} alt={`photo #${photo.id}`}/>
                    </div>    
                ))}
            </div>
            <div>
                <input type="file" onChange={e => setFile(e.target.files[0])}/>
                <button onClick={() => handleUpload()}>Upload</button>
            </div>                        
        </div>
    )
}