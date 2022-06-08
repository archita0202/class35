var ball;
var database,position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    console.log(database)
    ball = createSprite(250,250,10,10);
    
    ball.shapeColor = "red";

    var ballposition = database.ref("ball/position");
    ballposition.on("value",readPosition,showError)
}
function readPosition(data){
//read ball position from database
var position=data.val()
console.log(position.x)
console.log(position.y)

ball.x=position.x
ball.y=position.y

}
 
function showError(){
    console.log("error")
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
database.ref("ball/position").set({
    x:ball.x+x,
    y:ball.y+y
})


}

