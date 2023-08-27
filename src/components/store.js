import { createStore, action, computed, thunk } from 'easy-peasy';

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    editPostTitle: [],
    setEditPostTitle: action((state, payload) => {
        state.editPostTitle = payload;
    }),
    editPostBody: [],
    setEditPostBody: action((state, payload) => {
        state.editPostBody = payload;
    }),
    postTitle: [],
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    postBody: [],
    setPostBody: action((state, payload) => {
        state.postBody = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find((post) => post.id.toString() === id);
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {
            const newList = [...posts, newPost];
            localStorage.setItem('notes', JSON.stringify(newList));
            actions.setPosts(newList);
            actions.setPostBody('');
            actions.setPostTitle('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const { posts } = helpers.getState();
        try {
            const filteredPosts = posts.filter(
                (post) => post.id.toString() !== id
            );
            localStorage.setItem('notes', JSON.stringify(filteredPosts));
            actions.setPosts(filteredPosts);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = updatedPost;
        try {
            const updatedPosts = posts.map((post) =>
                post.id === id ? updatedPost : post
            );
            localStorage.setItem('notes', JSON.stringify(updatedPosts));
            actions.setPosts(updatedPosts);
            actions.setEditPostBody('');
            actions.setEditPostTitle('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
});
