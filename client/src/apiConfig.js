

let apiUrl
const apiUrls = {
    //  production: 'https://seit-.herokuapp.com/api',

  production: 'https://mern-corner-blog.herokuapp.com/api',
  development: 'http://localhost:5000/api'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl   