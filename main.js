const axios = require('axios');
axios.get('http://localhost:80/api/message')
.then((response) => {
    console.table(response.data.chunk);
});