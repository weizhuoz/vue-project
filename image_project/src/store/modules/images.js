import api from "../../api/imgur";
import { router } from "../../main";

const state = {
    iamges:[]
};

const getters = {
    allImages : state => state.iamges
};

const actions = {
    async fetchImages({rootState , commit}){
        const { token } = rootState.auth;
        const response = await api.fetchImages(token);
        commit('setImages',response.data.data);
    },
    async uploadImages({rootState},images){
      // Get the access token
        const {token} = rootState.auth;
      // Call our API module to do the upload
        await api.uploadImages(images,token);
      // Redirect our user to ImageList
        router.push("/");
    }
};

const mutations = {
    setImages : (state, images) => {
        state.iamges = images;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};