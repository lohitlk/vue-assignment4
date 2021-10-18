/* eslint-disable*/
import { createStore } from 'vuex'
// import { Content } from './content.js'
const store = createStore({
    state() {
        return {
            contentList: [],
            favList: [],
            loading: true
        }
    },
    getters: {
        getContentList(state) {
            return state.contentList.filter(ele => { if (ele && ele.image && ele.image.medium) { return ele } })
        },
        getFavList(state) {
            return state.favList
        },
        getContentListById: (state) => (id) => {
            return state.contentList.find(ele => ele.id.toString() === id.toString())
        },
        getLoading(state) {
            return state.loading
        }
    },
    mutations: {
        setInfo(state, payload) {
            state.info = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setContentList(state, payload) {
            state.contentList = payload
        },
        setFavList(state, payload) {
            state.favList = payload
        },
    },
    actions: {
        actInfo(context) {
            context.commit('setLoading', true, { root: true })
            return new Promise((resolve, reject) => {
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch("http://localhost:3000/data", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result._embedded) {
                            setTimeout(() => {
                                context.commit('setLoading', false, { root: true })
                                resolve(result)
                            }, 2000);
                        } else {
                            context.commit('setLoading', false, { root: true }); reject("Data not found!!");
                        }
                    })
                    .catch(error => {
                        context.commit('setLoading', false, { root: true }); reject("Data not found!!");
                    });
            })
        }
        // modules: {
        //     'content':Content
        // }
    }
})

export default store