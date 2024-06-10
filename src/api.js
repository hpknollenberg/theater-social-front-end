import axios from 'axios'


export const baseUrl = "http://127.0.0.1:8000"



export const createPost = ({ auth, user, postMessage, postImage }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-post/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      content: postMessage,
      image: postImage
    }
  }).then((response) => {
    return response
  })
}


export const createUser = ({ username, password, firstName, lastName }) => {
    return axios({
      method: 'post',
      url: `${baseUrl}/create-user/`, 
      data: {
        username,
        password: password,
        first_name: firstName,
        last_name: lastName
      }
    }).then(response => {
      console.log('CREATE USER: ', response)
      return response
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
  }


  export const editPost = ({ auth, user, id, editMessage, editImage }) => {
    return axios({
      method: 'put',
      url: `${baseUrl}/edit-post/`,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'multipart/form-data'
      },
      data: {
        author: user,
        post: id,
        content: editMessage,
        image: editImage
      }
  }).then(response => {console.log("EDIT POST RESPONSE: ", response)})
  }


  export const deletePost = ({ auth, user, id }) => {
    return axios({
      method: 'delete',
      url: `${baseUrl}/delete-post/`,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'multipart/form-data'
      },
      data: {
        author: user,
        post: id
      }
    })
  }


  export const fetchUser = ({ auth }) => {
    return axios({
      method: 'get',
      url: `${baseUrl}/profile/`, 
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    }).then(response => {
      return response
    })
    .catch(error => {
      console.log('FETCH USER ERROR: ', error)
      auth.setAccessToken([])
    })
  }


  export const getPosts = ({ auth }) => {
    return axios({
      method: 'get',
      url: `${baseUrl}/get-posts`,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
  }


  export const getToken = ({ auth, username, password }) => {
    return axios.post(`${baseUrl}/token/`, {
      username: username,
      password: password
    }).then(response => {
      auth.setAccessToken(response.data.access)
      return response
    })
    .catch(error => {
      console.log('ERROR: ', error)
      auth.setAccessToken([])
    })
  }