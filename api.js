import {RoomItem} from "./components/Room.js"

// const api_url = 'api/'
const api_url = window.location.protocol + '//' + window.location.host+'/api/'
// const api_url = 'http://localhost:8001/api/'

// const api_url = 'http://192.168.1.132:8001/api/'

// Room API


// get all rooms info
export var get_all_rooms = () => {
    
    $.ajax({
        type:'GET',
        url: `${api_url}room`,
        success: function(info){
            
            let dev = $("#roomCol")
            dev.empty()

            console.log(info)

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
    

    $.ajax({
        type:'GET',
        url: `${api_url}create_room/${user_name}/${color.slice(-6)}`,
        success: function(info){
            
            sessionStorage.setItem("user_token", info.user_token);

            handleData(info)

        },
        error: function(err){
            console.log(err);
        }
    })
}



// join a room and go into the game
export var join_a_room = (test=0, user_name, room_name, color, handleData) => {
    
    // const user_name = sessionStorage.getItem("user_name");

    $.ajax({
        type:'GET',
        url: `${api_url}join_room/${room_name}/${user_name}/${color.slice(-6)}`,
        success: function(info){
            if(test) sessionStorage.setItem("user_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBMTA5NTVQWVNZIiwicm9vbV9uYW1lIjoiQTEwOTU1UFlTWSIsImxlYWRlciI6dHJ1ZSwiaWF0IjoxNjkxNjU0NTcxLCJleHAiOjE3MDAyOTQ1NzF9._6lU40QFRogdrjozyZIF8wVVJetoFUcuxeekJaQ_c6U");
            else sessionStorage.setItem("user_token", info.user_token);
            
            handleData('OK')

        },
        error: function(err){
            // alert(err);
            handleData(err)
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
            handleData(err)

            console.log(err)
        }
    })
}

export var quit_room = (room_name, user_name) => {
    const user_token = sessionStorage.getItem("user_token");
    
    $.ajax({
        type:'GET',
        url: `${api_url}quit_room/${room_name}/${user_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            // console.log("success")
        },
        error: function(err){
            console.log(err)
        }
    })

}

export var quit_agent = (room_name, user_name) => {
    const user_token = sessionStorage.getItem("user_token");
    
    $.ajax({
        type:'GET',
        url: `${api_url}quit_room/${room_name}/${user_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            console.log("success")
            
            // handleData(info)
        },
        error: function(err){
            // alert(err.responseJSON.Error);
            console.log(err)
        }
    })

}







//// Game API

// reset game
export var reset_game = () => {


    $.ajax({
        type:'GET',
        url: `${api_url}reset`,
        success: function(info){
            
        },
        error: function(err){
            
        }
    })
} 



// add agent
export var add_agent = (room_name, data, handleData) => {

    // user_name = sessionStorage.getItem("user_name");
    const user_token = sessionStorage.getItem("user_token");

    $.ajax({
        contentType: "application/json;charset=utf-8",
        type:'POST',
        url: `${api_url}agent/${room_name}/a`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        data: JSON.stringify(data),
        success: function(info){

            handleData(info)
        },
        error: function(err){

            handleData(err)
        }
    })
} 





// start the game
export var start_game = (room_name) => {

    const user_token = sessionStorage.getItem("user_token");

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

    const user_token = sessionStorage.getItem("user_token");

    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}/information/${user_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            handleData(info)
        },
        error: function(err){

            handleData("err")
        }
    })
} 

// get game room information
export var get_game_room_info = (room_name, handleData) => {

    const user_token = sessionStorage.getItem("user_token");

    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            handleData(info)
        },
        error: function(err){

            console.log("err")
        }
    })
} 


// operation
export var operation = (user_name, room_name, data, handleData) => {

    // user_name = sessionStorage.getItem("user_name");
    const user_token = sessionStorage.getItem("user_token");


    data.target = parseInt(data.target)

    
    $.ajax({
        contentType: "application/json;charset=utf-8",
        type:'POST',
        url: `${api_url}game/${room_name}/operation/${user_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        data: JSON.stringify(data),
        success: function(info){

            handleData(info)
        },
        error: function(err){


            // console.log("err")
            handleData(err)
        }
    })
} 


// operation
export var setGame = (room_name, data, handleData) => {

    const user_token = sessionStorage.getItem("user_token");

    
    $.ajax({
        contentType: "application/json;charset=utf-8",
        type:'POST',
        url: `${api_url}room/${room_name}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        data: JSON.stringify(data),
        success: function(info){

            handleData(info)
        },
        error: function(err){

            handleData(err)
        }
    })
}



// skip stage
export var skipStage = (name, room_name, handleData) => {

    const user_token = sessionStorage.getItem("user_token");
    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}/skip/1-0-werewolf/${name}`,
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


// get all game info

export var get_all_game_info = (room_name, handleData) => {

    const user_token = sessionStorage.getItem("user_token");
    
    $.ajax({
        type:'GET',
        url: `${api_url}game/${room_name}/information`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        },
        success: function(info){
            
            handleData(info)
        },
        error: function(err){

            handleData("err")
        }
    })
} 