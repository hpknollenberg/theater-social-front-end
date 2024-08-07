import axios from 'axios'


// export const baseUrl = "http://127.0.0.1:8000"
// export const baseUrl = "https://project-theater.fly.dev"

export const baseUrl = import.meta.env.VITE_BASE_URL
console.log(baseUrl)


export const createComment = ({auth, user, content, discussion}) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-comment/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      author: user,
      content: content,
      discussion: discussion
    }
  })
}


export const createDiscussion = ({auth, user, admin, title, description, image}) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-discussion/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      author: user,
      is_admin: admin,
      name: title,
      description: description,
      image: image
    }
  })
}


export const createEvent = ({ auth, admin, title, description, date, time, image }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-event/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      is_admin: admin,
      title: title,
      description: description,
      date: date,
      time: time,
      image: image
    }
  })
}


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


export const createMenuItem = ({ auth, admin, itemName, itemCategory, itemPrice }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-menu-item/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      is_admin: admin,
      name: itemName,
      category: itemCategory,
      price: itemPrice
    }
  })
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


export const createShowtime = ({ auth, admin, showtimes, date, film, id, timeIds}) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-showtime/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      is_admin: admin,
      showtimes: JSON.stringify(showtimes),
      date: date,
      film: film,
      id: id,
      time_ids: JSON.stringify(timeIds)
    }
  })
}


export const createThreadComment = ({auth, user, threadContent, comment}) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-thread-comment/`,
    headers: { 
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      author: user,
      content: threadContent,
      comment: comment
    }
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


export const deleteComment = ({ auth, user, comment}) => {
  return axios ({
    method: 'delete',
    url: `${baseUrl}/delete-comment/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      author: user,
      comment: comment
    }
  })
}


export const deleteDiscussion = ({ auth, user, admin, discussion }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-discussion/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      author: user,
      is_admin: admin,
      discussion: discussion
    }
  })
}


export const deleteEvent = ({ auth, admin, event}) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-event/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      is_admin: admin,
      event: event
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


export const deleteMenuItem = ({ auth, admin, deleteId }) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-menu-item/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      is_admin: admin,
      menu_item: deleteId
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


export const deleteShowtime = ({ auth, admin, id}) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-showtime/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      is_admin: admin,
      id: id,
    }
  })
}


export const deleteShowtimesDay = ({ auth, admin, day}) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-showtime-day/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      is_admin: admin,
      day: day
    }
  })
}


export const deleteThreadComment = ({auth, user, threadComment}) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}/delete-thread-comment/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      id: threadComment,
      author: user
    }
  })
}


export const editEvent = ({ auth, admin, id, editTitle, editDescription, editDate, editTime, editImage}) => {
    return axios({
      method: 'put',
      url: `${baseUrl}/edit-event/`,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'multipart/form-data'
      },
      data: {
        is_admin: admin,
        event: id,
        title: editTitle,
        description: editDescription,
        date: editDate,
        time: editTime,
        image: editImage
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


export const editMenuItem = ({auth, admin, editCategory, editName, editPrice, editId}) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/edit-menu-item/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      is_admin: admin,
      category: editCategory,
      name: editName,
      price: editPrice,
      menu_item: editId
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


export const getComments = ({ auth }) => {
  return axios({
    mehtod: 'get',
    url: `${baseUrl}/get-comments`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const getDiscussions = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-discussions`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const getEvents = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-events`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
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


export const getMenuItems = ({ auth }) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-menu-items/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
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


export const getShowtimes = ({auth}) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-showtimes/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
  .then(response => {console.log("SHOWTIMES: ", response); return response})
}


export const getThreadComments = ({auth}) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/get-thread-comments`,
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


export const updateCommentLikes = ({ auth, comment }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/update-comment-likes/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      comment
    }
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


export const updateRsvp = ({ auth, event }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/update-rsvp/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      event
    }
  })
}


export const updateThreadCommentLikes = ({ auth, threadComment }) => {
  return axios({
    method: 'put',
    url: `${baseUrl}/update-thread-comment-likes/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    },
    data: {
      thread_comment: threadComment
    }
  })
}