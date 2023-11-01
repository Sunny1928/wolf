
import {MessageGod,MessageMe,MessageOthers} from "./components/Message.js"
import {VoteWolf,VoteDay,VoteSave,VoteData, DialogueWolf} from "./components/Vote.js"
import {PlayerSelector} from "./components/PlayerSelector.js"
import {AddAgent} from "./components/AddAgent.js"
import {AgentInfo} from "./components/AgentInfo.js"
import {PlayerItem} from "./components/Player.js"
import * as workerTimers from 'https://cdn.jsdelivr.net/npm/worker-timers@7.0.75/+esm' 

import * as API from './api.js'

const PRE_WORK_TIME = 5 
const UPDATE_TIME = 1000
const GAP = 2 
const ROOM = 'TESTROOM'



var addAgent = () => {
        
    let item = new AddAgent()
    item.classList.add("col-start-1","col-end-13","rounded-lg")

    let chatRoom = $("#chatRoom")
    chatRoom.append(item)
    chatRoom.parent().scrollTop(chatRoom.prop('scrollHeight'));

}

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
    
    // let font_color = (parseInt(color.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff'
    
    // $(`.bg-color-${id}`).css("color", font_color);
    // $(`.bg-color-${id}`).css("background-color", color);

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

var SelectPlayer = (data) => {
        
    let item = new PlayerSelector(data)
    item.classList.add("col-start-1","col-end-13","rounded-lg")
    
    let playerSelector = $("#playerSelector")
    playerSelector.empty()
    playerSelector.append(item)

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
    var players_info = {}
    var roles = ['民','神']

    var wolf_vote_shown = 0


    let stage_name = '' // 1-1-vote1
    var stage_now = '' // vote1
    var stage_former = ''
    var data_former = ''



    var refreshRoomId = -1
    var refreshGameId = -1
    var timerId = -1
    var game_over = 0

    // var room_state = "ready"


    // get players info

    var getPlayerInfo = () => {
        API.get_game_room_info(room_name, function(game_room_info){
            players_info = game_room_info['player']
            SelectPlayer(players_info)
        })
    }


    
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


        if(refreshRoomId!=-1) workerTimers.clearInterval(refreshRoomId)
        if(refreshGameId!=-1) workerTimers.clearInterval(refreshGameId)
        

        if(room_name != ''){
            API.quit_room(room_name, user_name)
        }



        $("#findARoomPage").hide();
        $("#settingGamePage").hide();
        $("#gamePage").hide();
        $("#initialPage").show();
        $("#startBtns").hide()
        $("#user_name").val('')

        // change bar title
        $('bar-item #room').text('找遊戲房間!')


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

        $('test-bar-item #room').text(room_name)

        // let chatRoom = $("#chatRoom")
        // chatRoom.empty()

        $("#stage_description").hide() 
        $("#timer").hide() 
        
       

        game_over = 0

        refreshRoomId =  workerTimers.setInterval(updateRoom, UPDATE_TIME);

    }




    // update room
    var updateRoom = () =>{
        
        API.get_a_room(room_name, function(data){
            if(data == null) {
                return
            }

            if(JSON.stringify(data) === JSON.stringify(room_data)) {
                
                console.log("same room")

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
                    $('#chatRoom').empty()

                    $('#room_cant_start').show()
                    $('#room_cant_start').text('人數不夠，還不能開始遊戲')
                    $('#startGameBtn').hide()

                    addAgent()
                }
                    
                let playerCol = $("#playerCol")
                playerCol.empty()
        
                let id = 0
                room_data.room_user.forEach(player => {
                    
                    let item = new PlayerItem(user_name, id, player, 1)
                    playerCol.append(item)
        
                    setColor(id, room_data.user_color[id])

                    id++
        
                });
        
                // let chatRoom = $("#chatRoom")
                // chatRoom.empty()
            }

            if(room_data.room_state == "started"){

                $('#startGameBtn').hide()
                $('#room_cant_start').hide()
                $("button[id^='backBtn']").hide()
                $("button[id^='settingRoleBtn']").hide()
                $("#stage_description").show() 
                $('#timer').show()
                if(refreshRoomId!=-1) workerTimers.clearInterval(refreshRoomId)

                // update player without delete button
                let playerCol = $("#playerCol")
                playerCol.empty()
        
                let id = 0
                room_data.room_user.forEach(player => {
                    
                    let item = new PlayerItem(user_name, id, player)
                    playerCol.append(item)
        
                    setColor(id, room_data.user_color[id])

                    id++
        
                });

                // empty chat room
                let chatRoom = $("#chatRoom")
                chatRoom.empty()

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

                refreshGameId =  workerTimers.setInterval(updateGame, UPDATE_TIME);
            }
        })
    }



    // cound time
    var countDown = (description, time) => {

        let timeLeft = time-GAP;
        let elem = document.getElementById('timer');

        if(timerId != -1 ) workerTimers.clearInterval(timerId);


        timerId = workerTimers.setInterval(countdown, 1000);
        $( "#stage_description" ).text(description) 
        
        function countdown() {

          if (timeLeft == -1) {

            workerTimers.clearInterval(timerId);
            timerId = -1
            
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

        let restartTimerId = workerTimers.setInterval(countdown, 1000);
        $( "#stage_description" ).text(description) 
        
        function countdown() {

          if (timeLeft == -1) {

            intoGame(room_name)

            if(restartTimerId!=-1) workerTimers.clearInterval(restartTimerId);
            restartTimerId = -1
    
          } else {
            elem.innerHTML = timeLeft + 's';
            timeLeft--;
          }
        }
    
    }





    // update game
    var updateGame = () => { 

        API.get_all_game_info(room_name, function(data){

            
            

            // game is over
            if(data == "err") {
                if(refreshGameId!=-1) workerTimers.clearInterval(refreshGameId);
                return
            }


            if(JSON.stringify(data) === JSON.stringify(data_former)){
            // if(data.stage_description === data_former.stage_description && JSON.stringify(data.announcement) === JSON.stringify(data_former.announcement)) {
            // if(data.stage_description === data_former.stage_description) {
            // if(data === data_former) {
                
                console.log("same game")

            }else{

                console.log(data)


                $("#sendMessageBtn").hide();

            

                // check vote info
               if(data.empty === 1 && Object.keys(data.vote_info).length !== 0){
                    // console.log(data.stage.split('-')[2])
                    if(data.stage.split('-')[2] == 'werewolf'){
                        let data_wolf_vote = JSON.parse(JSON.stringify(data))
                
                        for(let i of data_wolf_vote.information[0].target){
                            let voter = ''

                            for(let j in data_wolf_vote.vote_info){
                                if(data_wolf_vote.vote_info[j] == i) voter+= `${room_data.room_user[j]} `
                            }

                
                            $("#vote-text-"+data.stage+"-"+i).text(voter)
                        }

                        return

                    }else{

                        let data_vote_info = JSON.parse(JSON.stringify(data_former))

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

                            // give up vote
                            let voter = ''
                            let voter_num = 0
                            for(let j in data.vote_info){
                                if(data.vote_info[j] === -1) {
                                    voter+= `${room_data.room_user[j]} `
                                    voter_num+=1
                                }
                            }
                            $("#vote-result-text-"+stage_now+"--1").text(voter)
                            $("#vote-num-text-"+stage_now+"--1").text(voter_num)

                        }
                    }


                }

                $(':radio:not(:checked)').attr('disabled', true);



                
                countDown(data.stage_description.split('#')[0], data.timer)

                data_former = data

                stage_now = data.stage
                stage_name = stage_now.split('-')[2]


                // first stage get the role
                if(stage_now == 'check_role'){

                    get_user_role()
                    getPlayerInfo()
                }


                // check agent info
                // if(JSON.stringify(data['agent_info']) !== JSON.stringify(data_former['agent_info'])){
                    let agentCol = $("#agentCol")
                    agentCol.empty()
                    for (const [key, value] of Object.entries(data['agent_info'])) {
                        let item = new AgentInfo(key, value)
                        agentCol.append(item)
                    }

                // }
                



                // check announcement and show
                if(data.announcement.length!=0){

                    // console.log("announcement")



                    for(let i of data.announcement){

                        let item = JSON.parse(JSON.stringify(i))


                        // console.log(item.operation)

                        if(item.operation == 'chat') {


                            // show chat content
                            item.room_user = room_data.room_user
                            displayMessageOthers(item, room_data.user_color[item.user])

                            
                    
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

                    if(refreshGameId!=-1) workerTimers.clearInterval(refreshGameId);
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

                $("#game").css("background-color", "#333");


                // check user is alive and has information and show
                if(data.information.length!=0){

                    // console.log("information")
                    
                    // change background color
                    $("#game").css("background-color", "rgb(117, 149, 172)");


                    for(let i of data.information){

                        let item = JSON.parse(JSON.stringify(i))

                        // wolf vote info immediately
                        

                        if(item['user'].length != 0) {
                            // console.log("Here")
                            user_name = players_info[item['user'][0]]['user_name']
                        }

                        if(item.operation == 'dialogue') {

                            if(data.information.length==2 && user_role=='hunter' && stage_name=='hunter'){

                            }else{
                                $("#sendMessageBtn").show();
                            }


                        }else{

                            let show_data = JSON.parse(JSON.stringify(data))

                            show_data.room_user = room_data.room_user
                            show_data.information[0] = item

                            if(stage_name == "werewolf"){

                                if(wolf_vote_shown == 0){ 
                                    wolf_vote_shown = 1
                                    voteWolf(show_data)
                                }



                            }else if(stage_name == "werewolf_dialogue"){
                                // console.log("players")
                                // console.log(players)
                                // console.log(show_data)
                                dialogueWolf(players, roles, show_data)

                            }else if(stage_name == "witch" && item.description == "女巫救人"){
                                
                                // antidote
                                show_data.information[0].description = room_data.room_user[item.target[0]]+" 死了，請問你要救嗎？"
                                voteSave(show_data)
                                break
        
                                
                            }else{
                                wolf_vote_shown = 0
                                voteDay(show_data)
                                
                            }

                        }

                    }
                }





                

                stage_former = stage_now
                
            }
            
            
    

        });
        
    }


    var sendMessage = () => {

        const message = $('#messageInput').val()
        if (message === "") return


        let id = $(this).attr('id')
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
                // displayMessageMe(user_id, `${message}`, room_data.user_color[user_id])
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

    }
    

   
    // test
    // user_name ='b'
    // user_name ='a'
    // user_name ='pinyu'
    // user_name ='sunny'

    // user_name ='yui'
    // room_name = ROOM
    // get_user_role()
    // intoGame(room_name)
    // getPlayerInfo()
    // $("#initialPage").hide();
    // $("#findARoomPage").show();
    // API.get_all_rooms()

    // $("#gamePage").hide();
    // $("#settingGamePage").show();



    
    





    // button


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
    $("#playerSelector").change(function(){
        user_name = $(`select[name=playerName] option`).filter(':selected').val()
        console.log(user_name)
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
        }else if(who == 2){
            chat='無發言'
        }else if(who == 3){
            chat='我想自刀'
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


    ////// add & delete agent

    // delete player
    $("#playerCol").on("click", ".deletePlayer",function () {
        var player_name = $(this).attr('id');
        // console.log(player_name)
        if(player_name.includes("Agent")){
            API.delete_agent(room_name, player_name, handleData=>{
                if(handleData=='OK'){
                    displayMessageGod(`成功刪除${player_name}，請等待五秒`)
                }else{
                    displayMessageGod(handleData.Error)
                }
            })
        }else{
            API.quit_room(room_name, player_name)
        }

    });


    // add Player button
    $("#chatRoom").on("click", ".addPlayer",function () {

        API.join_a_room(1, "Player"+Math.floor(Math.random() * 999).toString().padEnd(3, '0'), room_name, "000000", handleData=>{


        })

    });

    // add Agent button
    $("#chatRoom").on("click", ".addIntelligentAgent",function () {
        let data = {
            "agent_type" : "intelligent_agent" ,
            "agent_name" : "iAgent" + Math.floor(Math.random() * 999).toString().padEnd(3, '0'),
            "room_name" : room_name ,
            "api_json" : "doc/secret/openai.key",
            "color" : "99f6e4 " ,
            "prompt_dir" : "doc/prompt/memory_stream/"
        }

        API.add_agent(room_name, data, handleData=>{
            if(handleData=='OK'){

            }else{
                displayMessageGod(handleData.Error)
            }
        })

    });

    $("#chatRoom").on("click", ".addMemmoryAgent",function () {
        let data = {
            "agent_type" : "memory_stream_agent" ,
            "agent_name" : "mAgent" + Math.floor(Math.random() * 999).toString().padEnd(3, '0'),
            "room_name" : room_name ,
            "api_json" : "doc/secret/openai.key",
            "color" : "fca5a5" ,
            "prompt_dir" : "doc/prompt/memory_stream/"
        }

        API.add_agent(room_name, data, handleData=>{
            if(handleData=='OK'){

            }else{
                displayMessageGod(handleData.Error)
            }
        })

    });



    // send message
    $("#sendMessageBtn").on( "click", function() {
        
        sendMessage()

    });



    // ENTER key and then send message
    $('#messageInput').keypress(function (e) {
        let key = e.which;
        if(key == 13){
            if($("#sendMessageBtn").is(":visible")) sendMessage()
         }
    });   






    

    


    // INTO GAME BTNS

    // when user name change the buttons will show up
    $( "#user_name" ).on( "change", function() {

        if($('#user_name').val()){
            
            $("#startBtns").show()
            $("#page_front").addClass("goUp")
            user_name = $('#user_name').val() +':'+ Math.floor(Math.random() * 999).toString().padEnd(3, '0')

        }else{
            
            $("#startBtns").hide()

        }
        
    });

    // build a room button
    $("#settingGamePageBtn").click(function () {

        API.build_a_room(user_name, user_color, function(data){
            room_name = data.room_name
            intoGame(room_name)
        });

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

        API.join_a_room(1, user_name, room_name, user_color, handleData=>{

            if(handleData == 'OK'){
                intoGame(room_name)
            }   

        })
    
    });

    // reset Game Button
    $("button[id^='resetGameBtn']").click(function () {
      
        API.reset_game()
        location.reload()
    });


    // SETTING GAME

    

    // show setting room page
    $("button[id^='settingRoleBtn']").click(function () {
      
        $("#gamePage").hide()
        $("#settingGamePage").show()
        $("#settingRoleBtn").hide()
    });

    // set room roles btn
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

                $("#initialPage").hide();
                $("#findARoomPage").hide();
                $("#settingGamePage").hide();
                $("#gamePage").show();
                $('#settingGameError').text('')

                API.get_a_room(room_name, function(data){
                    if(data == null) {
                        return
                    }

                    // room leader
                    if(user_name == data.room_leader){

                        $("#operation_time_input").val(data.game_setting.operation_time)
                        $("#dialogue_time_input").val(data.game_setting.dialogue_time)
                        $("#predictor_input").val(data.game_setting.seer)
                        $("#witch_input").val(data.game_setting.witch)
                        $("#villager_input").val(data.game_setting.village)
                        $("#wolf_input").val(data.game_setting.werewolf)
                        $("#hunter_input").val(data.game_setting.hunter)
                    }
                })


            }else{

                $('#settingGameError').text(handleData.responseJSON.Error)

            }
        })
    
    });





    // GAME BTNS

    

    // start game button call api
    $("#startGameBtn").click(function () {

        API.start_game(room_name)

    });

    // show skip stage btn
    $("button[id^='skipStageBtn']").click(function () {
        
        API.skipStage(user_name, room_name, handleData =>{
            if(handleData=='OK'){
                displayMessageGod("SKIP STAGE: "+handleData)
    
            }else{
                displayMessageGod("SKIP STAGE: "+handleData.responseJSON.Error)
            }
        })
      
        
    });





    // BACK TO MAIN PAGE

    // button for back to main page
    $("button[id^='backBtn']").click(function () {
      
        quit_game();

    });

    // button for back to main page
    $("button[id^='backToGameBtn']").click(function () {
      
        $("#settingGamePage").hide()
        $("#gamePage").show();

    });

    
    


    // DEFAULTS

    // css: add classes
    $('body').find('*').filter(function(){
        return /^message-/i.test(this.nodeName);
    }).addClass("col-start-1 col-end-13 rounded-lg");

    $('body').addClass("col-start-1 col-end-13 rounded-lg");


});



