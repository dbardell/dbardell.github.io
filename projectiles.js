
import * as classes from "/classes.js";
import * as move from "/move.js"

let count=0
let timeL

function playerProjectile(){
 classes.objects.projectiles.player["proj"+count]=new classes.Projectiles(classes.objects["player"].left+classes.objects["player"].width,classes.objects["player"].bottom+classes.objects["player"].height)
 document.getElementById("projectiles").insertAdjacentHTML("beforeend","<div class='projectile' id=proj"+count+"></div>")
 if (classes.objects["player"].direction=="left"){
   left("proj"+count)
 }else{
   right("proj"+count)
 }
 count++
}

function left(id){
  let i=0
  timeL=setInterval(frame,25)
  function frame(){
    if (i==40){
      removeProj()
    }else{
      move.changeX(id,1)
    }
    // checkCollision.barriers()
  }
}

function right(id){

}

function up(id){

}

function down(id){}

function removeProj(){

}

export {playerProjectile}
