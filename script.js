
import {MessageGod,MessageMe,MessageOthers} from "./components/Message.js"
import {VoteWolf,VoteDay,VoteSave,VoteData, DialogueWolf} from "./components/Vote.js"
import {PlayerItem} from "./components/Player.js"

import * as API from './api.js'

const PRE_WORK_TIME = 5 
const GAP = 2 
const ROOM = 'TESTROOM'




// get random color and set color into class and session
var randomColor = () => {

    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }

    var rand = Math.floor(Math.random()* 360);
    var color = "hsl(" + rand + ", 100%, 75%)"; 
    color = hslToHex(rand, 100, 75)

    $(".colorpad").css("background-color", color);
    // console.log(hslToHex(rand, 100, 75))
    return color

}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
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

var dialogueWolf = (players, roles, data) => {
        
    let item = new DialogueWolf(players, roles, data)
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

    $('#timer').hide()
    $("#sendMessageBtn").hide()
    $("button[id^='settingRoleBtn']").hide()
    $("button[id^='startGameBtn']").hide()




    var user_name = ''
    var user_id = -1
    var user_role = ''
    var user_state = '' 
    var user_color = randomColor()


    
    var room_name = ''
    var room_data = {}
    var players = []
    var roles = ['民','神']



    let stage_name = '' // 1-1-vote1
    var stage_now = '' // vote1
    var stage_former = ''
    var data_former = ''



    var refreshRoomId = -1
    var refreshGameId = -1
    var timerId = -1
    var game_over = 0




    
    // get user role
    var get_user_role = () =>{
        API.get_a_role(user_name, room_name, function(data){
    
            user_role = data.game_info.user_role
            user_state = data.game_info.user_state
            user_id = data.player_id
            displayMessageGod("你的角色是"+user_role)

            // console.log(data.game_info.teamate)

            if(data.game_info.teamate.length!=0){
                let str ='你的夥伴 '
                data.game_info.teamate.forEach(e=>{
                    str = str + room_data.room_user[e] + ' '
                })
    
                displayMessageGod(str)
            }
            
    
        });
    }



    // reset all the game data
    var quit_game = () => {

        clearInterval(refreshRoomId)
        clearInterval(refreshGameId)

        API.quit_room(room_name, user_name)


        $("#findARoomPage").hide();
        $("#settingGamePage").hide();
        $("#gamePage").hide();
        $("#initialPage").show();
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

        $('bar-item #room').text(room_name)

        // let chatRoom = $("#chatRoom")
        // chatRoom.empty()

        $("#stage_description").hide() 
        $("#timer").hide() 
        
       

        game_over = 0

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

                // room leader
                if(user_name == room_data.room_leader){
                    $("button[id^='settingRoleBtn']").show()

                    $("#operation_time_input").val(room_data.game_setting.operation_time)
                    $("#dialogue_time_input").val(room_data.game_setting.dialogue_time)
                    $("#predictor_input").val(room_data.game_setting.seer)
                    $("#witch_input").val(room_data.game_setting.witch)
                    $("#villager_input").val(room_data.game_setting.village)
                    $("#wolf_input").val(room_data.game_setting.werewolf)
                    $("#hunter_input").val(room_data.game_setting.hunter)


                    
                }

                // if player num == the need, show start game button
                if(room_data.game_setting.player_num == room_data.room_user.length){
                    $('#room_cant_start').text('等待房主開始')
                    
                    // room leader
                    if(user_name == room_data.room_leader){
                        $('#room_cant_start').hide()
                        $('#startGameBtn').show()
                    }

                }else{

                    $('#room_cant_start').show()
                    $('#room_cant_start').text('人數不夠，還不能開始遊戲')
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
                $('#room_cant_start').hide()
                $("button[id^='backBtn']").hide()
                $("button[id^='settingRoleBtn']").hide()
                $("#stage_description").show() 
                $('#timer').show()
                clearInterval(refreshRoomId)

                // append players
                for(let i=0; i<room_data.game_setting.player_num; i++){
                    players.push(i);
                }

                // append roles
                if(room_data.game_setting.witch == 1){
                    roles.push('女巫')
                }
                if(room_data.game_setting.seer == 1){
                    roles.push('預言家')
                }
                if(room_data.game_setting.hunter == 1){
                    roles.push('獵人')
                }


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

    // cound time and restart room
    var countDownAndRestart = (description, time) => {

        let timeLeft = time-GAP;
        let elem = document.getElementById('timer');
        let restartTimerId = setInterval(countdown, 1000);
        $( "#stage_description" ).text(description) 
        
        function countdown() {

          if (timeLeft == -1) {

            intoGame(room_name)

            clearTimeout(restartTimerId);

    
          } else {
            elem.innerHTML = timeLeft + 's';
            timeLeft--;
          }
        }
    
    }



    // update game
    var updateGame = () => { 

        API.get_info(user_name, room_name, function(data){

            if(data == "err") {
                clearTimeout(refreshGameId);
                return
            }


            // if(JSON.stringify(data)=== JSON.stringify(data_former)){
            if(data.stage_description === data_former.stage_description && data.information.length=== data_former.information.length) {
                
                // console.log("same game")

            }else{
                $("#sendMessageBtn").hide();

                clearTimeout(timerId);

                $(':radio:not(:checked)').attr('disabled', true);


                console.log(data)

                

                // check vote info
               if(data.empty === 2 && Object.keys(data.vote_info).length !== 0){

                    

                    let data_vote_info = data_former
                    // console.log(data_vote_info)

                    data_vote_info.room_user = room_data.room_user

                    if(data_vote_info.information.length!=0){
                        voteData(data_vote_info)

                        for(let i of data_vote_info.information[0].target){
                            let voter = ''
                            let voter_num = 0

                            for(let j in data.vote_info){
                                if(data.vote_info[j] == i) {
                                    voter+= `${room_data.room_user[j]} `
                                    voter_num+=1
                                }
                            }

                
                            $("#vote-result-text-"+stage_now+"-"+i).text(voter)
                            $("#vote-num-text-"+stage_now+"-"+i).text(voter_num)
                        }
                    }
                    


                }




                
                countDown(data.stage_description, data.timer)

                data_former = data
                stage_now = data.stage
                stage_name = stage_now.split('-')[2]


                // first stage get the role
                if(stage_now == 'check_role'){

                    get_user_role()
                }



                // check announcement and show
                if(data.announcement.length!=0){

                    // console.log("announcement")



                    for(let item of data.announcement){

                        // console.log(item.operation)

                        if(item.operation == 'chat') {

                            if(item.user != user_id) {

                                // show chat content
                                item.room_user = room_data.room_user
                                displayMessageOthers(item, room_data.user_color[item.user])
                            }

                            
                    
                        }else if(item.operation == 'game_over'){
                            game_over = item
                            game_over.timer = data.timer

                        }else if(item.operation == 'died') {

                            // delete players
                            let player_index = players.indexOf(item.user[0])
                            if (player_index > -1) { 
                                players.splice(player_index, 1);
                            }
                            
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



                //
                if(game_over){

                    clearInterval(refreshGameId);
                    countDownAndRestart(game_over.description, game_over.timer)
                    $("button[id^='backBtn']").show()
                    displayMessageGod(game_over.description)

                }

                
                // console.log("stage name")
                // console.log(stage_name)
                // console.log("user info")
                // console.log(user_name)
                // console.log(user_id)
                // console.log(user_role)
                // console.log(user_state)
                // console.log("room data")
                // console.log(room_data)


                // check user is alive and has information and show
                if(data.information.length!=0){

                    // console.log("information")

                    for(let item of data.information){


                        if(item.operation == 'dialogue') {

                            if(data.information.length==2 && user_role=='hunter' && stage_name=='hunter'){

                            }else{
                                $("#sendMessageBtn").show();
                            }


                        }else{

                            let show_data = data
                            show_data.room_user = room_data.room_user
                            show_data.information[0] = item
                        

                            if(user_role == 'werewolf' && stage_name == "werewolf"){

                                voteWolf(show_data)

                            }else if(user_role == 'werewolf' && stage_name == "werewolf_dialogue"){
                                // console.log("players")
                                // console.log(players)
                                // console.log(show_data)
                                dialogueWolf(players, roles, show_data)

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
            
            // wolf vote info immediately
            // if(data.empty == 1){

                
            //     for(let i of data.information[0].target){
            //         let voter = ''

            //         for(let j in data.vote_info){
            //             if(data.vote_info[j] == i) voter+= `${room_data.room_user[j]} `
            //         }

        
            //         $("#vote-text-"+stage_now+"-"+i).text(voter)
            //     }

            // }
    

        });
        
    }
    

   
    // test
    // user_name ='b'
    // user_name ='sunny'
    // room_name = ROOM
    // updateRoom()
    // get_user_role()
    // intoGame(room_name)
    // $("#initialPage").hide();
    // $("#findARoomPage").show();
    // API.get_all_rooms()

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
                API.skipStage(user_name, room_name, handleData =>{
                    if(handleData=='OK'){
                        // displayMessageGod("SKIP STAGE: "+handleData)
            
                    }else{
                        displayMessageGod("SKIP STAGE: "+handleData.responseJSON.Error)
                    }
                })

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
            // console.log(handleData)
            // console.log(data.stage_name)
            if(handleData=='OK'){
                $(`#error-${data.stage_name}`).text(handleData)
                if(user_role == 'hunter' && stage_name == "hunter"){
                    $(`#${id}`).hide()
                    $(':radio:not(:checked)').attr('disabled', true);
                    $("#sendMessageBtn").show();
                }
            }else{
                $(`#error-${data.stage_name}`).text(handleData.responseJSON.Error)
            }
        })
    });





    // dialogue wolf button
    $("#chatRoom").on("click", ".dialogueWolfBtn",function () {


        let id = $(this).attr('id')
        let who = $(`input[name="${id}"]:checked`).val()
        let chat = ''
        if(who == 0){
            chat='我同意'+$(`select[name=player1-${id}] option`).filter(':selected').val()
        }else if(who == 1){
            chat='我想刀'+$(`select[name=player2-${id}] option`).filter(':selected').val()+'因為他是'+$(`select[name=role-${id}] option`).filter(':selected').val()
        }else{
            chat='無發言'
        }
        let data = {
            "stage_name" : id,
            "operation": "werewolf_dialogue",
            "target" : [],
            "chat" : chat,
            "position" : [1,2]
        }

        // console.log(chat)

        API.operation(user_name, room_name, data, handleData=>{
            // console.log(handleData)
            // console.log(data.stage_name)
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

            let info =  Object.assign({}, data_former)
            info.information =  data_former.information.slice()


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
            if(handleData == 'OK'){
                intoGame(room_name)
                $('#settingGameError').text('')
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
        API.skipStage(user_name, room_name, handleData =>{
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



