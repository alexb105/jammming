import React from 'react';
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar";
import { Playlist } from "../Playlist/Playlist";
import {SearchResults} from "../SearchResults/SearchResults";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        name: "jerry sorbae",
        artist: "nextings",
        album: "the only one",
        id: "1989"
      }, {
        name: "randy pitchford",
        artist: "saltly bommers",
        album: "beyond the border",
        id: "1564"
      }, {
        name: "mia latove",
        artist: "mia latove",
        album: "nobody like me",
        id: "4528"
      }],
      playlistName: "jerry sorbae",
      playlistTracks: [{
        name: "jerry sorbae",
        artist: "jerry sorbae",
        album: "sorbae selects from 2018-2020",
        id: "001"
      },
      {
        name: "jerry sorbae",
        artist: "jerry sorbae",
        album: "sorbae selects from 2018-2020",
        id: "002"
      },
      {
        name: "jerry sorbae",
        artist: "jerry sorbae",
        album: "sorbae selects from 2018-2020",
        id: "003"
      }]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term){
    console.log(term);
  }

  savePlaylist(){

  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack=>savedTrack.id === track.id)){
      return;
    }  
  }

  removeTrack(track){
    if(this.state.playlistTracks.find(savedTrack=>savedTrack.id === track.id)){
      return;
    }
  }

  render(){
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
       <SearchBar onSearch={this.search} />
      <div className="App-playlist">
         <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
         <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
      </div>
    </div>
  </div>
    );
  }
}

export default App;
