
import {MessageGod,MessageMe,MessageOthers} from "./components/Message.js"
import {VoteWolf,VoteDay,VoteSave, VoteData} from "./components/Vote.js"
import {PlayerItem} from "./components/Player.js"

import * as API from './api.js'

const PRE_WORK_TIME = 5 
const GAP = 2 
const ROOM = 'TESTROOM'




// get random color and set color into class and session
var randomColor = () => {

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    $(".colorpad").css("background-color", color);
    return color

}

var setColor = (id, color) => {
    
    let font_color = (parseInt(color.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff'
    
    $(`.bg-color-${id}`).css("color", font_color);
    $(`.bg-color-${id}`).css("background-color", color);

}


var displayMessageGod = (message) => {
        
    let item = new MessageGod(message)
    item.classList.add("col-start-1","col-end-13","rounded-lg")

    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}

var displayMessageMe = (id, message, color) => {
        

    let item = new MessageMe(id, message)
    item.classList.add("col-start-1","col-end-13","rounded-lg")
    
    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    setColor(id, color)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}

var displayMessageOthers = (message, color) => {
        

    let item = new MessageOthers(message)
    item.classList.add("col-start-1","col-end-13","rounded-lg")
    
    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    setColor(message.user, color)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}

var voteWolf = (data) => {
        
    let item = new VoteWolf(data)
    item.classList.add("col-start-1","col-end-13","rounded-lg")
    
    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}

var voteDay = (data) => {
        

    let item = new VoteDay(data)
    item.classList.add("col-start-1","col-end-13","rounded-lg")
    
    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}

var voteSave = (data) => {
        

    let item = new VoteSave(data)
    item.classList.add("col-start-1","col-end-13","rounded-lg")
    
    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}

var voteData = (data) => {
        

    let item = new VoteData(data)
    item.classList.add("col-start-1","col-end-13","rounded-lg")
    
    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}












// document start
$(document).ready(function () {
    
    // init: show main page
    $("#initialPage").show();
    $("#startBtns").hide()
    $("#findARoomPage").hide();
    $("#settingGamePage").hide();
    $("#gamePage").hide();

    $('#startGameBtn').hide()
    $('#timer').hide()
    $("#sendMessageBtn").hide()
    $("#settingRoleBtn").hide()

    

    // user_name save in session
    // var user_name = 'sunny'
    // var user_name = 'pinyu'
    // var user_name = 'c'
    // var user_name = 'yui'
    // var user_name = 'a'
    // sessionStorage.setItem("user_name", user_name);
    var user_name = ''
    var user_id = -1
    var user_role = ''
    var user_state = '' 
    var user_color = randomColor()

    // var room_name = ROOM
    var room_name = ''
    var room_data = {}

    

    // countDown(30)

    let stage_name = '' // 1-1-vote1
    var stage_now = '' // vote1
    var stage_former = ''
    var data_former = ''


    var refreshRoomId = -1
    var refreshGameId = -1
    var timerId = -1


    
    


    // get user role
    var get_user_role = () =>{
        API.get_a_role(user_name, room_name, function(data){
    
            user_role = data.game_info.user_role
            user_state = data.game_info.user_state
            user_id = data.player_id
            displayMessageGod("你的角色是"+user_role)
            let str ='你的夥伴 '

            console.log(data.game_info.teamate)
            data.game_info.teamate.forEach(e=>{
                str = str + room_data.room_user[e] + ' '
                
            })

            displayMessageGod(str)
    
        });
    }



    // reset all the game data
    var quit_game = () => {

        clearInterval(refreshRoomId)
        clearInterval(refreshGameId)

        $("#findARoomPage").hide();
        $("#settingGamePage").hide();
        $("#gamePage").hide();
        $("#initialPage").show();
        $("#settingRoleBtn").hide()
        $("#startBtns").hide()
        $("#user_name").val('')

        user_name = ''
        user_id = -1
        user_role = ''
        user_color = randomColor()

        room_name = ''
        room_data = {}

        stage_name = '' // 1-1-vote1
        stage_now = '' // vote1
        stage_former = ''
        data_former = ''

        let playerCol = $("#playerCol")
        playerCol.empty()
        let chatRoom = $("#chatRoom")
        chatRoom.empty()
    }




    // go into the game and get the info
    var intoGame = (room_name) => {
        
        $("#initialPage").hide();
        $("#findARoomPage").hide();
        $("#settingGamePage").hide();
        $("#gamePage").show();
        $("#settingRoleBtn").show()

        $('bar-item #room').text(room_name)
        
        refreshRoomId =  setInterval(updateRoom, 1000);

    }




    // update room
    var updateRoom = () =>{
        
        API.get_a_room(room_name, function(data){
            if(data == null) {
                return
            }


            if(JSON.stringify(data) === JSON.stringify(room_data)) {
                
                // console.log("same room")

            }else{

                room_data = data
                // console.log(room_data)

                // if player num == the need, show start game button
                if(room_data.game_setting.player_num == room_data.room_user.length){
                    $('#room_cant_start').hide()
                    $('#startGameBtn').show()
                }else{
                    $('#room_cant_start').show()
                    $('#startGameBtn').hide()
                }
                    
                let playerCol = $("#playerCol")
                playerCol.empty()
        
                let id = 0
                room_data.room_user.forEach(player => {
                    
                    let item = new PlayerItem(id, 'alive', player)
                    playerCol.append(item)
        
                    setColor(id, room_data.user_color[id])

                    id++
        
                });
        
                let chatRoom = $("#chatRoom")
                // chatRoom.empty()
            }

            if(room_data.room_state == "started"){

                $('#startGameBtn').hide()
                $("button[id^='backBtn']").hide()
                $("button[id^='settingRoleBtn']").hide()
                $('#timer').show()
                clearInterval(refreshRoomId)
                refreshGameId =  setInterval(updateGame, 1000);
                
            }
        })
    }



    // cound time
    var countDown = (description, time) => {
    

        let timeLeft = time-GAP;
        let elem = document.getElementById('timer');
        timerId = setInterval(countdown, 1000);
        $( "#stage_description" ).text(description) 
        
        function countdown() {
          if (timeLeft == -1) {
    
            clearTimeout(timerId);
    
          } else {
            elem.innerHTML = timeLeft + 's';
            timeLeft--;
          }
        }
    
    }





    // update game
    var updateGame = () => { 

        API.get_info(user_name, room_name, function(data){

            if(data == null) {
                // console.log("null")
                return
            }


            // if(JSON.stringify(data)=== JSON.stringify(data_former) ) {
            if(data.stage_description === data_former.stage_description ) {
                
                // console.log("same game")

            }else{
                $("#sendMessageBtn").hide();

                console.log(data)
                clearTimeout(timerId);

                $(':radio:not(:checked)').attr('disabled', true);

                

                // check vote info
               if(data.empty === 2 && Object.keys(data.vote_info).length !== 0){

                    
                    // console.log(data.empty)
                    console.log("data_former")

                    let data_vote_info = data_former
                    console.log(data_vote_info)

                    data_vote_info.room_user = room_data.room_user

                    if(data_vote_info.information.length!=0){
                        voteData(data_vote_info)

                        for(let i of data_vote_info.information[0].target){
                            let voter = ''

                            for(let j in data.vote_info){
                                if(data.vote_info[j] == i) voter+= `${room_data.room_user[j]} `
                            }

                
                            $("#vote-result-text-"+stage_now+"-"+i).text(voter)
                        }
                    }
                    


                }






                
                countDown(data.stage_description, data.timer)

                data_former = data
                stage_now = data.stage
                stage_name = stage_now.split('-')[2]
                // console.log(stage_name)
                // console.log(user_id)
                // console.log(user_role)


                // first stage get the role
                if(stage_now == 'check_role'){

                    get_user_role()
                }



                // check announcement and show
                if(data.announcement.length!=0){

                    // console.log("announcement")



                    for(let item of data.announcement){

                        console.log(item)

                        if(item.operation == 'chat') {
                            console.log(item.user)
                            console.log(user_id)
                            if(item.user == user_id) return

                            // show chat content
                            item.room_user = room_data.room_user
                            displayMessageOthers(item, room_data.user_color[item.user])
                    
                        }else if(item.operation == 'game_over'){
                            $("button[id^='backBtn']").show()
                            displayMessageGod(item.description)
                            clearInterval(refreshGameId);
                            // quit_game()

                        }else if(item.operation == 'died') {
                            
                            // change pleyer state
                            $(`#player-state-${item.user[0]}`).text('died')
                            $(`#player-${item.user[0]}`).addClass('opacity-25')
                            displayMessageGod(item.description)

                            if(item.user[0] === user_id) {

                                user_state = 'died'

                                // show all the role information
                                // API.get_game_room_info(room_name, function(data){
                                //     let message =''
                                //     for(let i in data.player){
                                //         message += `${data.player[i].user_name}: ${data.player[i].user_role}<br>`
                                //     }
                                //     displayMessageGod(message)
                                // })
                            }
                        
                        }else {

                            displayMessageGod(item.description)
                        }

                    }
                }

                // disappear vote button
                if(stage_former != '') $(`#${stage_former}`).css("display", "none")

                
                console.log("user info")
                console.log(user_name)
                console.log(user_id)
                console.log(user_role)
                console.log(user_state)


                // check user is alive and has information and show
                if(data.information.length!=0){

                    // console.log("information")

                    for(let item of data.information){


                        if(item.operation == 'dialogue') {

                            $("#sendMessageBtn").show();

                        }else{

                            let show_data = data
                            show_data.room_user = room_data.room_user
                            show_data.information[0] = item
                        

                            if(user_role == 'werewolf' && stage_name == "werewolf"){

                                voteWolf(show_data)

                            }else if(user_role == 'witch' && stage_name == "witch" && item.description == "女巫救人"){
                                
                                // antidote
                                show_data.information[0].description = room_data.room_user[item.target[0]]+" 死了，請問你要救嗎？"
                                voteSave(show_data)
                                break
        
                                
                            }else{

                                voteDay(show_data)
                            }

                        }

                    }
                }





                

                stage_former = stage_now
                
            }

            if(data.empty == 1){

                
                for(let i of data.information[0].target){
                    let voter = ''

                    for(let j in data.vote_info){
                        if(data.vote_info[j] == i) voter+= `${room_data.room_user[j]} `
                    }

        
                    $("#vote-text-"+stage_now+"-"+i).text(voter)
                }

            }
    

        });
        
    }
    

   
    // test
    // user_name ='a'
    // room_name = ROOM
    
    // get_user_role()
    // intoGame(room_name)
    // $("#gamePage").hide();
    // $("#settingGamePage").show();
    





    // button


    // send message
    $("#sendMessageBtn").on( "click", function() {
        
        const message = $('#messageInput').val()
        
        if (message === "") return


        let id = $(this).attr('id')
        let stage = id.split('-')[2]
        let who = $(`input[name="vote-${id}"]:checked`).val()
        let data = {
            "stage_name" : stage_now,
            "operation": "dialogue",
            "target" : who,
            "chat" : message,
            "position" : null
        }
        
        API.operation(user_name, room_name, data, handleData=>{
            if(handleData=='OK'){
                $("#messageInput").val('')
                displayMessageMe(user_id, `${message}`, room_data.user_color[user_id])

            }else{
                displayMessageGod(handleData.responseJSON.Error)
            }
        })


    });





    // vote button
    $("#chatRoom").on("click", ".voteBtn",function () {


        let id = $(this).attr('id')
        let who = $(`input[name="vote-${id}"]:checked`).val()
        let data = {
            "stage_name" : id,
            "operation": "vote_or_not",
            "target" : who,
            "chat" : "",
            "position" : [1,2]
        }

        
        if(stage_name == 'witch'){
            data.chat = "poison"
        }else if(stage_name == 'seer' || stage_name == 'werewolf'){
            data.operation = "vote"
        }

        API.operation(user_name, room_name, data, handleData=>{
            console.log(handleData)
            console.log(data.stage_name)
            if(handleData=='OK'){
                $(`#error-${data.stage_name}`).text(handleData)
            }else{
                $(`#error-${data.stage_name}`).text(handleData.responseJSON.Error)
            }
        })
    });





    // witch save button
    $("#chatRoom").on("click", ".voteSaveBtn",function () {
        let id = $(this).attr('id')
        let state = $(`input[name="save-vote-${id}"]:checked`).val()
        let data = {
            "stage_name" : id,
            "operation": "vote_or_not",
            "target" : data_former.information[0].target,
            "chat" : "save",
            "position" : [1,2]
        }

        if(state == 'poison'){
            
            $(`#${id}`).hide()
            $(':radio:not(:checked)').attr('disabled', true);

            let info = data_former
            if(info.information.length == 1) return
            if(info.information.length == 2) info.information.shift()
            
            info.room_user = room_data.room_user

            // show poison
            voteDay(info)

        }else{
            API.operation(user_name, room_name, data, handleData=>{
                if(handleData=='OK'){
                    $(`#error-${data.stage_name}`).text(handleData)
                    $(`#${id}`).hide()
                    $(':radio:not(:checked)').attr('disabled', true);

                }else{
                    $(`#error-save-${data.stage_name}`).text(handleData.responseJSON.Error)
                }
            })
        }


    });






    // when user name change the buttons will show up
    $( "#user_name" ).on( "change", function() {

        if($('#user_name').val()){
            $("#startBtns").show()
            $("#page_front").addClass("goUp")
            user_name = $('#user_name').val()
            // sessionStorage.setItem("user_name", $('#user_name').val());
        }else{
            $("#startBtns").hide()
        }
        
    });

    



    // find a room button
    $("#findARoomBtn").on("click", function () {

        $("#initialPage").hide();
        $("#findARoomPage").show();

        API.get_all_rooms()

    });
 



    // join a specific room by button 
    $("#roomCol").on("click", "room-item #joinBtn",function () {
        
        room_name = $(this).parent().children().children()[0].innerText

        API.join_a_room(user_name, room_name, user_color, handleData=>{
            if(handleData == 'OK'){
                intoGame(room_name)
            }
        })
    
    });


    // show setting room page
    // $("#confirmRoomBtn").hide()
    $("button[id^='confirmRoomBtn']").click(function () {
      
        let settingData = {
            "player_num": parseInt($("#hunter_input").val())+parseInt($("#wolf_input").val())+parseInt($("#villager_input").val())+parseInt($("#predictor_input").val())+parseInt($("#witch_input").val()),    
            "operation_time" : parseInt($("#operation_time_input").val()),
            "dialogue_time" : parseInt($("#dialogue_time_input").val()),
            "seer" : parseInt($("#predictor_input").val()),
            "witch" : parseInt($("#witch_input").val()),
            "village" : parseInt($("#villager_input").val()),
            "werewolf" : parseInt($("#wolf_input").val()),
            "hunter" : parseInt($("#hunter_input").val())
        }

        
    
        API.setGame(room_name, settingData, handleData=>{
            console.log(handleData)
            if(handleData == 'OK'){
                intoGame(room_name)
                $("#operation_time_input").val('')
                $("#dialogue_time_input").val('')
                $("#predictor_input").val('')
                $("#witch_input").val('')
                $("#villager_input").val('')
                $("#wolf_input").val('')
                $("#hunter_input").val('')
            }else{
                $('#settingGameError').text(handleData.responseJSON.Error)
            }
        })
    
    });

    




    // build a room button
    $("#settingGamePageBtn").click(function () {

        API.build_a_room(user_name, user_color, function(data){
            room_name = data.room_name
            intoGame(room_name)
        });

    });




    // start game button call api
    $("#startGameBtn").click(function () {

        API.start_game(room_name)

    });




    // button for back to main page
    $("button[id^='backBtn']").click(function () {
      
        quit_game();

    });

    // button for back to main page
    $("button[id^='backToGameBtn']").click(function () {
      
        $("#settingGamePage").hide()
        $("#gamePage").show();

    });

    
    // show setting room page
    $("button[id^='settingRoleBtn']").click(function () {
      
        $("#gamePage").hide()
        $("#settingGamePage").show()
        $("#settingRoleBtn").hide()
    });

    // show setting room page
    $("button[id^='skipStageBtn']").click(function () {
        API.skipStage(room_name, handleData =>{
            if(handleData=='OK'){
                displayMessageGod("SKIP STAGE: "+handleData)
    
            }else{
                displayMessageGod("SKIP STAGE: "+handleData.responseJSON.Error)
            }
        })
      
        
    });

    
    





    // css: add classes
    $('body').find('*').filter(function(){
        return /^message-/i.test(this.nodeName);
    }).addClass("col-start-1 col-end-13 rounded-lg");

    $('body').addClass("col-start-1 col-end-13 rounded-lg");


});

