document.addEventListener('keydown', playSound);

function playSound(event) {
    const key = event.code.replace('Key', '');
    let sound = "";
    let baseURL = "sounds/";
    let asciiCharacter = key.charCodeAt(0);
    
    if (key==="A")
    {
        sound="clap.wav";
    }
    else if()
}
