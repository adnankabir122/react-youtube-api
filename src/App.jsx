import axios from "axios";
import { useEffect, useState } from "react";
const API_KEY = "AIzaSyCypRNo9MFQe4AsK5rwKTceRXfYUzZSh90";
const PLAYLIST_ID = "PLgH5QX0i9K3ruhkxHelhyahHEOH_82bGx";

// const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=50`;
const url2 = new URL(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=50`)
console.log(url2.searchParams.get('list'))

function App() {
  const [videoData, setVideoData] = useState([]);
  const [playlistid, setPlaylistId] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = new URL();
    console.log(url)
  }
  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems`,
        {
          params: {
            part: "snippet",
            playlistId: PLAYLIST_ID,
            key: API_KEY,
            maxResults: 50, // Set your desired max results per page
          },
        }
      );
      const videoItems = response.data.items;
      setVideoData(videoItems);
    };

    fetchPlaylistVideos();
  }, []);
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };
  const closeVideoWindow = () => {
    setSelectedVideo(null);
  };
  return (
    <>
      <h1>No of videos:{videoData.length}</h1>
      <form style={{marginBottom:'20px'}}>
        <input type="text" placeholder="Paste Your Playlist link" onChange={(e) => setPlaylistUrl(e.target.value)}/> <br /> <br />
        <button type="submit">Fetch</button>
      </form>

      <div style={{ display: "flex" }}>
        <div className="video-list">
          {videoData.map((video) => (
            <div key={video.id} className="video-item">
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                onClick={() => handleVideoClick(video)}
              />
            </div>
          ))}
        </div>
        {selectedVideo && (
          <div className="video-window" style={{ marginLeft: "20px" }}>
            <div className="video-container">
              <iframe
                title={selectedVideo.snippet.title}
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}`}
                allowFullScreen
              ></iframe>
            </div>
            <button onClick={closeVideoWindow}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
