
class Objects{
  constructor(width,height,left,bottom){
    this.width=width
    this.height=height
    this.left=left
    this.bottom=bottom
  }
}

class Players extends Objects{
  constructor(left,bottom,width,height,sprite){
    super(width,height,left,bottom)
    // this.left=left
    // this.bottom=bottom
    // this.width=width
    // this.height=height
    this.sprite=sprite
    this.spriteNum=0
    this.direction="right"
    this.currentPlatform="floor"
    this.health=this.totalHealth=10
    this.damaged=false
  }
  damage(num){
    // console.log(this.damaged);
    // if (this.damaged==false){
      this.health=this.health-num
      document.getElementById("health").style.width=this.health/this.totalHealth*100+"%"
      this.damaged=true
      if (this.health<=0){
        this.death()
      }
      // setTimeout(function(){this.damaged=false;console.log(objects["player"].damaged);},2000)
    // }
  }
  death(){
    document.getElementById("deathscreen").style.visibility="visible"
  }
}

class Platforms extends Objects{
  constructor(width,left,bottom,height=10) {
    // this.width=width
    // this.height=10
    // this.left=left
    // this.bottom=bottom
    // console.log(bottom);
    super(width,height, left, bottom);
    // console.log(this.height);
    // this.bottom=bottom
    // this.height=10
  }
}


class Barriers extends Objects{
  constructor(left,bottom,width=10,height=20) {
    super(width,height, left, bottom)
  }
}

class Projectiles extends Objects{
  constructor(left,bottom,width=5,height=5) {
    super(width,height, left, bottom)
  }
}
// class Barriers extends Objects{
//   constructor(width,left,bottom,height=10) {
//     // this.width=width
//     // this.height=10
//     // this.left=left
//     // this.bottom=bottom
//     // console.log(bottom);
//     super(width,height, left, bottom)
//     // console.log(this.height);
//     // this.bottom=bottom
//     // this.height=10
//   }
// }

// let bar= new Barriers(10,10)
// console.log(bar);

let sprites={
  "player":{
    floored:{
      "left":["knightL.png","knightL2.png"],
      "right":["knightR.png","knightR2.png"]
    },
    jumping:{
      "left":"knightJumpL.png",
      "right":"knightJumpR.png"
    },
    falling:{
      "left":"knightFallL.png",
      "right":"knightFallR.png"
    }
  }
}

let player= new Players(10,10,10,15/9*16,sprites["player"].floored.left[0])

// document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='test' class='platforms'></div>")
// document.getElementById("test").style.left="50%"
// document.getElementById("test").style.bottom="20%"
// document.getElementById("test").style.height="10%"
// document.getElementById("test").style.width="50%"
//
// document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='test1' class='platforms'></div>")
// document.getElementById("test1").style.left="50%"
// document.getElementById("test1").style.bottom="40%"
// document.getElementById("test1").style.height="10%"
// document.getElementById("test1").style.width="50%"

//w,h,l,b
let floor=new Objects(1/0,10,0,0)
// let platform=new Platforms(50,10,50,20)
// let platform1=new Platforms(50,10,50,40)

let objects={
  "player":player,
  "health":new Object(100,100,0,0),
  platforms:{
    "floor":floor,
    // "platform":platform,
    // "platform1":platform1,
  },
  barriers:{

  },
  projectiles:{
    player:{

    },
    enemy:{

    }
  }
}

// let gamemodeLevels={
//   2:{
//     //levels
//     0:{
//       //section progress
//       5:{
//         speed:0.5,
//
//       }
//
//     },
//
//   }
//
// }


let gamemode2={
  level:0,
  progress:0
}




export {player,objects, sprites,Platforms,Barriers,gamemode2, Projectiles}
