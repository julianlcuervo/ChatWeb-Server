alert("gol")
const socket = io('http://18.206.146.163:4000/');

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
var btn = document.getElementById('sende');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',function() {
    socket.emit('chat:message',{
        message:message.value,
        username:username.value
    })
    //console.log(username.value,message.value)
});

message.addEventListener('keypress',function(){
    socket.emit('chat:typing',username.value);
})

socket.on('chat:message', function(data){
    //console.log(data)
    actions.innerHTML = "";
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
})

socket.on('chat:typing',function (data){
    actions.innerHTML=`<p><em>${data} está escribiendo </em></p>`
})
