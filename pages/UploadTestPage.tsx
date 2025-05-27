import { useState } from "react";

export default function UploadTestPage() {
    const JWT = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml3YWt5cmFAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Iml3YWt1cmEiLCJuYW1laWQiOiIzYjk0N2M5Yy1hZTFmLTRiY2UtOWQxNy05NTA4ZWY3ZWZhNjciLCJuYmYiOjE3NDgxODIxNDIsImV4cCI6MTc0ODQ0MTM0MiwiaWF0IjoxNzQ4MTgyMTQyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNDkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNDkifQ.MEzZky4CLk242AwqqplGXnQMcwjP_KnN8ZlzNL1Dj0L0ojK1d3lmY87Tcro5t_t9YF3226GRoPtQsdo1KQEQgQ";
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name.replace(/\.[^/.]+$/, ""));

        var response = await fetch("http://localhost:5122/api/photo/upload/2024", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + JWT
            },
            body: formData,
        });

        var data = await response.json();
        console.log(data);
    };

    return(
    <div>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={() => handleUpload()}>Upload</button>
    </div>
    );
}