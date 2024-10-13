import './App.css';
import AuthorAdd from './AuthorAdd';
import AuthorDetector from './AuthorDetector';
import AuthorList from './AuthorList';
import { AuthorProvider } from './contexts/authorContext';

function App() {
  return (
    <AuthorProvider>
    <div className="App">
      <AuthorAdd />
      <AuthorDetector />
      <AuthorList />
    </div>
    </AuthorProvider>
  );
}

export default App;
