import React, { useState } from "react";
import "./App.css";
import './Loading.css';
import { useAuthors } from "./contexts/authorContext";


function AuthorAdd() {
  const [authorName, setAuthorName] = useState("");
  const [authorText, setAuthorText] = useState("");
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const { setAuthors } = useAuthors();

  const addAuthorOrPost = (authorName, authorText) => {
    setAuthors((prevAuthors) => {
      const existingAuthorIndex = prevAuthors.findIndex(author => author.name === authorName);

      if (existingAuthorIndex !== -1) {
        const updatedAuthors = [...prevAuthors];
        updatedAuthors[existingAuthorIndex].posts = [
          ...updatedAuthors[existingAuthorIndex].posts, 
          authorText
        ];
        return updatedAuthors;
      } else {
        const newAuthor = { name: authorName, posts: [authorText] };
        return [...prevAuthors, newAuthor];
      }
    });
  };

  const handleAuthorSubmit = async () => {

    if (!authorName || !authorText) {
        setMessage("Lütfen tüm alanları doldurun."); 
        return; 
      };
      setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: authorName, posts: [{ content: authorText }] }),
      });
      if (response.ok) {
        setMessage("Yazar ve metin başarıyla eklendi.");
        addAuthorOrPost(authorName, authorText);
        setAuthorName("");
        setAuthorText("");
      } else {
        setMessage("Yazar eklenirken bir hata oluştu.");
      }
    } catch (error) {
      setMessage("Bağlantı hatası: " + error.message);
    }finally {
        setLoading(false);
      }
  };
  return (
    <div className="App">
      <h1>Yazar ve Kelime Analizi</h1>
      <div>
        <h2>Yazar Ekle</h2>
        <input
          type="text"
          placeholder="Yazar İsmi"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <textarea
          placeholder="Yazarın Metni"
          value={authorText}
          onChange={(e) => setAuthorText(e.target.value)}
        ></textarea>
        <button 
        onClick={handleAuthorSubmit}
        disabled={loading}
        >
        {loading ? "Yükleniyor..." : "Yazar Ekle"}
        </button>
        {loading && <div className="spinner"></div>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default AuthorAdd;
