const minecraftButtonAudio = new Audio()
minecraftButtonAudio.src = "media/sound.mp3"

function start() {
  minecraftButtonAudio.play()
  setTimeout(function() {
    window.location.href = "quiz.html"
  }, 300)
}

function nu() {
  minecraftButtonAudio.play()
  setTimeout(function() {
    window.location.href = "nu.html"
  }, 300)
}
