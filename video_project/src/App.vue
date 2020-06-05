<template>
  <div id="app" class="container">
    <SearchBar @termChange="onTermChange"></SearchBar>
    <div class="row">
      <VideoDetail class="col-md-8" :video="selectedVideo" />
      <VideoList
        class="col-md-4"
        @videoSelect="onVideoSelect"
        v-bind:videos="videos"
      >
      </VideoList>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";

const API_KEY = "AIzaSyA35UAgj8JrSAx5yCZap4ZZIDQlbp550Nc";

export default {
  name: "App",
  components: {
    SearchBar: SearchBar,
    VideoList: VideoList,
    VideoDetail: VideoDetail
  },
  data() {
    return { videos: [], selectedVideo: null };
  },
  methods: {
    onVideoSelect(video) {
      this.selectedVideo = video;
    },
    onTermChange(searchTerm) {
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            key: API_KEY,
            type: "video",
            part: "snippet",
            q: searchTerm
          }
        })
        .then(response => {
          this.videos = response.data.items;
          console.log(this.videos);
        });
    }
  }
};
</script>
<style scoped>
.row {
  display: flex;
}
</style>
