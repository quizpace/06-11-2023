console.log('Hello nodejs..');

let sequential_id = 8

const users = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
    },
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "username": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",
    },
    {
      "id": 7,
      "name": "Kurtis Weissnat",
      "username": "Elwyn.Skiles",
      "email": "Telly.Hoeger@billy.biz",
    },
    {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "username": "Maxime_Nienow",
      "email": "Sherwood@rosamond.me",
    }]

function get() {
    return users;
}
function get_by_id(id) {
    // search and return from the json array the record with the given id
    // if not found return { }
    const the_users = users.filter(user => user.id === id)
    return the_users.length > 0 ? the_users[0] : { };
}
function post(user) {
    const new_user = { ...user, id: ++sequential_id }
    users.push(new_user)
    return new_user
}
function put(id, user) {
    // if id exists then replace all fields with the given user
    // if not -- insert this user (with the correct id)
    const filter_users = users.filter(user => user.id === id)
    if (filter_users.length == 0) {
        // not exist --> create and return
        return post(user)
    }
    // exist --> replace
    const index = users.indexOf(filter_users[0])
    // if the id does not exist, use the id parameter otherwise use the user's id
    users[index] = { id: id, ...user } // allow modify the id
}
function patch(id, user) {
    // if id exists then update only the fields given in the user
    // if not -- do nothing
    const filter_users = users.filter(user => user.id === id)
    if (filter_users.length == 0) {
        return;
    }
    // exist --> replace
    const index = users.indexOf(filter_users[0])
    // if the id does not exist, use the id parameter otherwise use the user's id
    users[index] = { ...users[index], ...user } // allow modify the id    
}
function delete_by_id(id) {
    // if id exists then remove it from the array
    const filter_users = users.filter(user => user.id === id)
    if (filter_users.length == 0) {
        return false;
    }
    const index = users.indexOf(filter_users[0])
    users.splice(index, 1)
    return true;
}
/*
console.log(get());
console.log(get(4));
post ( {
        "name": "Avi hameleh",
        "username": "avi_ham",
        "email": "avi_ham@gmail.com"})
put (10, {
        "name": "danny shovevani",
        "username": "dany_shov",
        "email": "dan_dan@gmail.com"})      
patch (10, {
        "name": "Avi cohen",
        "username": "avi_cohen",
        "email": "avi_cohen@gmail.com"})      
console.log(get());
delete_by_id(9)
console.log(get_by_id(9));
*/

/* DEMO CODE !! */
const express = require('express')
const body_parser = require('body-parser')

const app = express()
const port = 3000
app.use(body_parser.json())

app.get('/api/users', (request, response) => {
    response.json(get())
})
app.get('/api/users/:id', (request, response) => {
    const user_id = parseInt(request.params.id)
    const user = response.json(get_by_id(user_id))
    if (user) { 
        response.json(user)
    }
    else {
        response.status(404).json({ "error": `cannot find user with id ${user_id}`})
    }
})

app.listen(port, () => {
    console.log('Express server is running ....');
})