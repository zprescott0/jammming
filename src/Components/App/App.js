//import logo from './logo.svg';
import './App.css';
import { ReactComment } from '../Other/HTMLComment';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';


//Was first thing in header:
//<img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults />
          <ReactComment text='Add a Playlist component' />
        </div>
      </div>
    </div>
  );
}

export default App;
