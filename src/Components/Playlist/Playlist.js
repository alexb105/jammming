import React from "react";
import "./PlayList.css";
import {TrackList} from "../TrackList/TrackList";


export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }

    render(){
        return (<div className="Playlist">
        <input onChnage={this.handleNameChange} defaultValue={'New Playlist'}/>
        <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>)
    }
}

