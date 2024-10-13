import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import './Loading.css';

function AuthorDetector() {
  const [inputText, setInputText] = useState(""); 
  const [matchedAuthor, setMatchedAuthor] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleMatchAuthor = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8080/api/authors/analyze", {
        text: inputText, 
      });
      setMatchedAuthor(response.data.message);
      setInputText(""); 
    } catch (err) {
      setError("Yazar eşleşmesi sırasında bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Cümleyi Gir ve Yazarı Bul</h2>   
        <input
          type="text"
          placeholder="Cümle Giriniz"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={loading}
        />      
        <button onClick={handleMatchAuthor} disabled={loading}>
          Yazarı Bul
        </button>
        {loading && <div className="spinner"></div>} 
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {matchedAuthor && <p>Yazar: {matchedAuthor}</p>}
      </div>
    </div>
  );
}

export default AuthorDetector;
