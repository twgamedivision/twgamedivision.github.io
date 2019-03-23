var myGamePiece;
var item;
var item_interact = false;

function startGame() {
    myGamePiece = new component(20, 20, "white", screen.width/2, screen.height/2);
    item = new component(10, 10, "red", screen.width/2 + 100, screen.height/2);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speedx = 0;
    this.speedy = 0;
    this.x = x;
    this.y = y; 
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();    
    }
    this.newPos = function() {
        var offset = 5

        this.x += this.speedx;
        this.y += this.speedy;
        if(this.x >= screen.width){
            this.x = offset;
        }
        if(this.y >= screen.height){
            this.y = offset;
        }
        if(this.x <= 0){
            this.x = screen.width - offset;
        }
        if(this.y <= 0){
            this.y = screen.height - offset;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedx = 0;
    myGamePiece.speedy = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedx = -2; myGamePiece.speedy = 0;}
    else if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedx = 2; myGamePiece.speedy = 0;}
    else if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedy= -2; myGamePiece.speedx = 0;}
    else if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedy= 2; myGamePiece.speedx = 0;}
    else if (myGameArea.keys && myGameArea.keys[32]) {myGamePiece.width= 25; myGamePiece.height = 25; 
        if(item_interact == false && Math.abs(myGamePiece.x - item.x) < 5 && Math.abs(myGamePiece.y - item.y) < 5){
            item_interact = true
            window.alert("Is Curiosity Worth Dying For?");
        }
    }
    else {myGamePiece.speedy= 0; myGamePiece.speedx = 0; myGamePiece.width= 20; myGamePiece.height = 20;}
    myGamePiece.newPos();
    if(item_interact == false){
        item.update();
    }
    myGamePiece.update();
}