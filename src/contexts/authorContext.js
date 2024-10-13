
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");  

  
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);  
      try {
        const response = await fetch("http://localhost:8080/api/authors/with-posts");
        if (response.ok) {
          const data = await response.json();
          setAuthors(data);  
        } else {
          setError("Yazarları getirirken bir hata oluştu.");
        }
      } catch (error) {
        setError("Bağlantı hatası: " + error.message);
      } finally {
        setLoading(false);  
      }
    };

    fetchAuthors();
  }, []);

  
  return (
    <AuthorContext.Provider value={{ authors, loading, error, setAuthors }}>
      {children} 
    </AuthorContext.Provider>
  );
};

export const useAuthors = () => {
  return useContext(AuthorContext); 
};
