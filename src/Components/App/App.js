//import logo from './logo.svg';
import './App.css';
import { ReactComment } from '../Other/HTMLComment';


//Was first thing in header:
//<img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <ReactComment text='Add a Searchbar component' />
        <div className="App-playlist">
          <ReactComment text='Add a SearchResults component' />
          <ReactComment text='Add a Playlist component' />
        </div>
      </div>
    </div>
  );
}

export default App;
