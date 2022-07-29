import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "new playlist",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this); 
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track)
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks
    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState({playlistTracks: tracks})
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
    
  }

  
  

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/> 
          <div className="App-playlist">
            {/*passing the searchResults & playlistTracks that we get to the component 
              SearchResults and Playlist so we can use it */ }
            <SearchResults searchResults = {this.state.searchResults}
                           onAdd = {this.addTrack}/> 
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove = {this.removeTrack}
                      onNameChange = {this.updatePlaylistName}
                      onSave = {this.savePlaylist}
                      />
          </div>
        </div>
      </div>
    ); 
  }
}

export default App;
