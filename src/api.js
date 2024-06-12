import axios from 'axios'


export const baseUrl = "http://127.0.0.1:8000"


export const createFilm = ({ auth, user, admin, filmDate, filmName, filmImage }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-film/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      release_date: filmDate,
      title: filmName,
      image: filmImage
    }
  }).then((response) => {return response})
}

export const createPoll = ({ auth, user, admin, title, choices, pollId }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-poll/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      title: title,
      choices: JSON.stringify(choices),
      id: pollId
    }
  })
}


export const createPost = ({ auth, user, admin, postMessage, postImage }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-post/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      content: postMessage,
      image: postImage
    }
  }).then((response) => {
    return response
  })
}


export const createUser = ({ username, password, firstName, lastName}) => {
    return axios({
      method: 'post',
      url: `${baseUrl}/create-user/`, 
      data: {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      }
    }).then(response => {
      console.log('CREATE USER: ', response)
      return response
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
}


export const createVote = ({ auth, user, selectedPoll, selectedOption }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-vote/`, 
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      profile: user,
      poll: selectedPoll,
      choice: selectedOption,
    }
  })
}


export const deleteFilm = ({ auth, user, admin, id }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-film/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      film: id
    }
  })
} 


export const deletePoll = ({ auth, user, admin, poll }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-poll/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      author: user,
      is_admin: admin,
      poll: poll
    }
  })
}


export const deletePost = ({ auth, user, admin, id }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-post/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      post: id
    }
  })
}


export const editFilm = ({ auth, user, admin, id, editFilmName, editDate, editFilmImage}) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/edit-film/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      film: id,
      title: editFilmName,
      release_date: editDate,
      image: editFilmImage,
    }
  })
}
          
          
export const editPost = ({ auth, user, admin, id, editMessage, editImage }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/edit-post/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      post: id,
      content: editMessage,
      image: editImage
    }
}).then(response => {console.log("EDIT POST RESPONSE: ", response)})
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


export const getFilms = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-films/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const getMenu = () => {
  return axios({
    method: 'get',
    url: `https://raw.githubusercontent.com/hpknollenberg/showtimes/main/menu.json`
  })
  .then(response => {console.log("MENU: ", response); return response})
}


export const getPolls = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-polls`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
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


export const getProfileVotes = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-votes/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const getShowtimes = () => {
  return axios({
    method: 'get',
    url: `https://raw.githubusercontent.com/hpknollenberg/showtimes/main/showtimes.json`
  })
  .then(response => {console.log("SHOWTIMES: ", response); return response})
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


export const updateLikes = ({ auth, post }) => {
  return axios({
    method: 'put',
    url:`${baseUrl}/update-likes/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      post
    }
  })
}