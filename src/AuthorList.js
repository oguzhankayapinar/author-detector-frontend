import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useAuthors } from "./contexts/authorContext";  


function AuthorList() {
  const { authors, loading, error } = useAuthors(); 


  return (
    <div style={{ marginTop: "20px" }}>
    {loading && <div className="spinner"></div>}
    {error && <p>{error}</p>}
  
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Yazar Adı</TableCell>
            <TableCell>Yazarın Metinleri</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author, index) => (
            <TableRow key={index}>
              <TableCell>{author.name}</TableCell>
              <TableCell>
                {author.posts.map((post, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography key={i} variant="body2" color="text.secondary">
                      {post}
                    </Typography>
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>

  );
}

export default AuthorList; 

