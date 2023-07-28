import {io} from "socket.io-client" 
import {RoomItem} from "./components/Room"


$(document).ready(function () {
   
    const socket = io("http://localhost:3000")


    // listen on socket: send to server or receive from server



    // connect
    socket.on("connect", () => {
        
        // console.log(`You connect with id: ${socket.id}`)
        displayMessage(`You connect with id: ${socket.id}`, 'god')
    })



    // receive message
    socket.on("receive-message", message => {
        
        // console.log(message)
        displayMessage(`${message}`, 'others')
    })



    // send message
    $("#sendMessageBtn").on( "click", function() {
        
        const message = $('#messageInput').val()
        const room = $('bar-item #room').eq(2).text()
        
        // console.log(room)
        if (message === "") return

        socket.emit("send-message", message, room)
        displayMessage(`${message}`, 'me')
    });



    // build a room
    $("#buildRoomBtn").on( "click", function() {
        
        // var room = "Room "+$('#roomInput').val()
        var room = $('#roomInput').val()
        
        // console.log(room)
        if (room === "") return
        room = `Room ${room}`
        socket.emit("join-room", room, message => {
            displayMessage(message, 'god')
            
            $('bar-item #room').eq(2).text(room)
            $("#buildARoomPage").hide();
            $("#playGame").show();
        })
    });



    // find a room button
    $("#findARoomBtn").on("click", function () {

        $("#initialPage").hide();
        $("#findARoomPage").show();

        socket.emit("all-room-info", room, message => {
            var dev = $("#roomCol")
            dev.empty()

            message.forEach(element => {
                if(!element.includes('Room')) return
                var rooms = new RoomItem(element)
                dev.append(rooms)
            });

            if(dev.children().length==0){
                dev.append("<p class='m-3 text-xs text-grey-300 text-center'>There is no room built yet!</p>")
            }
        })

    });
 
    

    


    function displayMessage(message, who){
        
        var div = $("#chatRoom");
        div.append(`<message-${who} class=" col-start-1 col-end-13 rounded-lg">${message}</message-${who}>`)
        div.parent().scrollTop(div.prop('scrollHeight'));
    }



    





    // init: show main page
    $("#initialPage").show();
    $("#findARoomPage").hide();
    $("#buildARoomPage").hide();
    $("#playGame").hide();



    // show build a room page
    $("#buildARoomBtn").click(function () {
      $("#initialPage").hide();
      $("#buildARoomPage").show();
    });



    // button for back to main page
    $("button[id^='backBtn']").click(function () {
      $("#findARoomPage").hide();
      $("#buildARoomPage").hide();
      $("#playGame").hide();
      $("#initialPage").show();
    });



    // join a room button to 
    $("#roomCol").on("click", "room-item #joinBtn",function () {
        const room = $(this).parent().children()[0].innerText
        
        $("#findARoomPage").hide();
        $("#playGame").show();
        $('bar-item #room').eq(2).text(room)
    });
    


    // css: add classes
    $('body').find('*').filter(function(){
        return /^message-/i.test(this.nodeName);
    }).addClass("col-start-1 col-end-13 rounded-lg");


});




