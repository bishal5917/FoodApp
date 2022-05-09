import { Server } from "socket.io"

const io = new Server({
    cors: {
        //this means our react application from port 3000
        //can reach our socket server
        origin: "http://localhost:3000",
    },
})

//creating array for online users
let onlineUsers = []

//function for creating new users
const addUser = (name, socketId) => {
    //pushing users into array if there is new user
    !onlineUsers.some((user) => user.name === name)
        && onlineUsers.push({ name, socketId })
}

//function for removing users
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
}

//function for getting users
const getUser = (name) => {
    return onlineUsers.find((user) => user.name === name)
}


io.on("connection", (socket) => {

    //sending event to every user we use io.emit
    // io.emit("testEvent", "Hello Event from Server")

    //taking event from client we use socket.on
    socket.on('newUser', (name) => {
        addUser(name, socket.id)
        // console.log(onlineUsers)
    })

    socket.on('sendNotification', ({ sender, receiver }) => {
        const foundOne = onlineUsers.find(({ name }) => name === receiver)
        const socket_id = foundOne?.socketId
        // console.log(socket_id)
        io.to(socket_id).emit('getNotification', {
            sender
        })
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
});


io.listen('3050')