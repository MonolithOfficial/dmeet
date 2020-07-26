const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const newPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

const videoInstance = document.createElement('video')
videoInstance.muted = true

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStrem(videoInstance, stream)
})

newPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

socket.on('user-connected', userId => {
    console.log('User connected', userId)
})


function addVideoStrem(video, stream){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play
    })
    videoGrid.append(video)
}