import {RoomItem} from "./components/Room.js"

// const api_url = 'api/'
const api_url = 'http://localhost:8001/api/'


// api


// get all rooms info
export var get_all_rooms = () => {
    
    $.ajax({
        type:'GET',
        url: `${api_url}room`,
        success: function(info){
            
            let dev = $("#roomCol")
            dev.empty()

            Object.keys(info).forEach(key => {
                let rooms = new RoomItem(info[key])
                dev.append(rooms)
            });

            if(dev.children().length==0){
                dev.append("<p class='m-3 text-xs text-grey-300 text-center'>There is no room built yet!</p>")
            }
        },
        error: function(err){
            console.log('error')
        }
    })
}



// build a room and go into the game
export var build_a_room = (user_name, color, handleData) => {
    
    // const user_name = sessionStorage.getItem("user_name");
    // console.log(user_name)

    $.ajax({
        type:'GET',
        url: `${api_url}create_room/${user_name}/${color.slice(-6)}`,
        success: function(info){
            // console.log(info)

            handleData(info)

        },
        error: function(err){
            console.log(err);
            // alert(err.responseJSON.Error);
            // alert(err.responseJSON.Error);
        }
    })
}



// join a room and go into the game
export var join_a_room = (user_name, room_name, color, handleData) => {
    
    // const user_name = sessionStorage.getItem("user_name");

    $.ajax({
        type:'GET',
        url: `${api_url}join_room/${room_name}/${user_name}/${color.slice(-6)}`,
        success: function(info){
            handleData = info
            sessionStorage.setItem("user_token", info.user_token);

            // handleData(info)
        },
        error: function(err){
            // alert(err);
            handleData = err
            alert(err.responseJSON.Error);
        }
    })
}



// get the room info
export var get_a_room = (room_name, handleData) => {

    
    $.ajax({
        type:'GET',
        url: `${api_url}room/${room_name}`,
        success: function(info){
            
            handleData(info)
        },
        error: function(err){
            // alert(err.responseJSON.Error);
            console.log(err)
        }
    })
}









//// start the game



// start the game
export var start_game = (room_name) => {

    const user_token = sessionStorage.getItem("user_token");
    // console.log(user_token)

    $.ajax({
        type:'GET',
        url: `${api_url}start_game/${room_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            
        },
        error: function(err){
        }
    })
} 



// get the role
export var get_a_role = (user_name, room_name, handleData) => {

    // user_name = sessionStorage.getItem("user_name");
    const user_token = sessionStorage.getItem("user_token");
    // console.log(user_name)
    // console.log(user_token)

    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}/role/${user_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            handleData(info)
            
        },
        error: function(err){
            // alert(err.responseJSON.Error);
            console.log("err")
        }
    })
} 



// get the info
export var get_info = (user_name, room_name, handleData) => {

    // const user_name = sessionStorage.getItem("user_name");
    // user_name = sessionStorage.getItem("user_name");
    const user_token = sessionStorage.getItem("user_token");
    // console.log(user_name)
    // console.log(user_token)

    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}/information/${user_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            // console.log(info)
            handleData(info)
        },
        error: function(err){
            // alert(err.responseJSON.Error);
            console.log("err")
        }
    })
} 

// get game room information
export var get_game_room_info = (room_name, handleData) => {

    const user_token = sessionStorage.getItem("user_token");
    // console.log(user_name)
    // console.log(user_token)

    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            // console.log(info)
            handleData(info)
        },
        error: function(err){
            // alert(err.responseJSON.Error);
            console.log("err")
        }
    })
} 


// operation
export var operation = (user_name, room_name, data, handleData) => {

    // user_name = sessionStorage.getItem("user_name");
    const user_token = sessionStorage.getItem("user_token");
    // console.log(user_name)
    // console.log(room_name)
    // console.log(user_token)


    data.target = parseInt(data.target)
    // console.log(data)

    
    $.ajax({
        contentType: "application/json;charset=utf-8",
        type:'POST',
        url: `${api_url}game/${room_name}/operation/${user_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        data: JSON.stringify(data),
        success: function(info){
            console.log("sucess")
            handleData(info)
            // console.log(info)
        },
        error: function(err){
            // console.log(err.responseJSON.Error);
            console.log("err")
            handleData(err)


            // console.log(err)
        }
    })
} 


// operation
export var setGame = (room_name, data, handleData) => {

    const user_token = sessionStorage.getItem("user_token");

    // console.log("setGame")
    // console.log(data)
    
    $.ajax({
        contentType: "application/json;charset=utf-8",
        type:'POST',
        url: `${api_url}room/${room_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        data: JSON.stringify(data),
        success: function(info){
            // console.log("sucess")
            handleData(info)
            
        },
        error: function(err){
            // console.log("err")
            // console.log(err.responseJSON.Error)
            handleData(err)

        }
    })
}



// skip stage
export var skipStage = (room_name, handleData) => {

    const user_token = sessionStorage.getItem("user_token");
    // console.log(user_name)
    // console.log(user_token)

    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}/skip/1-0-werewolf`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            // console.log(info)
            handleData(info)
        },
        error: function(err){
            // alert(err.responseJSON.Error);
            handleData(err)
            // console.log("err")
        }
    })
} 