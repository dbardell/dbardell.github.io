
import * as classes from "/classes.js";
import * as platforms from "/platforms.js"
import * as projectiles from "/projectiles.js"

let timeL
let timeR
let timeU
let timeD
let timeJ


var isKeyDown={
  "KeyW":false,
  "KeyS":false,
  "KeyA":false,
  "KeyD":false,
  "ArrowUp":false,
  "ArrowDown":false,
  "ArrowLeft":false,
  "ArrowRight":false,
  up:false,
  down:false,
  left:false,
  right:false
}

var isJumping=false
var isFalling=false
var isPlatformed=false
var dropDown=false

//0=player moves,everything else stationary
//1=manual sidescroller- everything else moves w/ keys
// 2=auto sidescroller- moves by time


var gamemode=2
var left1=0
// var classes.gamemode2.level=0
// var classes.gamemode2.progress=0

document.addEventListener("keydown",function (event){
  // console.log(event.code);
  if (!isKeyDown[event.code]){
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        if (!isKeyDown.up){
          isKeyDown.up=true
          goUp();
        }
        break;
      case "KeyS":
      case "ArrowDown":
        if (!isKeyDown.down){
          isKeyDown.down=true
          goDown();
        }
        break;
      case "KeyA":
      case "ArrowLeft":
        if (!isKeyDown.left){
          isKeyDown.left=true
          goLeft();
        }
        break;
      case "KeyD":
      case "ArrowRight":
        if (!isKeyDown.right){
          isKeyDown.right=true
          goRight();
        }
        break;
      case "Space":
        if (gamemode==0){
          gamemode=2
          classes.gamemode2.level=1
          classes.gamemode2.progress=0
          left1=0
          platforms.nextSection(100)
          platforms.changeProbabilities(classes.gamemode2.level,classes.gamemode2.progress)
        }else if(gamemode==2){
          goRight()
        }
        // projectiles.playerProjectile()
        break
    }
  isKeyDown[event.code]=true}
})

document.addEventListener("keyup",function(event){
  if (isKeyDown[event.code]){
    switch(event.code){
      case "KeyW":
      case "ArrowUp":
        if (isKeyDown.up){
          isKeyDown.up=false
        }
        break;
      case "KeyS":
      case "ArrowDown":
        if (isKeyDown.down){
          clearInterval(timeD)
          isKeyDown.down=false
          dropDown=false
        }
        break;
      case "KeyA":
      case "ArrowLeft":
        if (isKeyDown.left){
          clearInterval(timeL)
          isKeyDown.left=false
          // if (isKeyDown.right){
          //   goRight()
          // }
        }
        break;
      case "KeyD":
      case "ArrowRight":
        if (isKeyDown.right){
          clearInterval(timeR)
          isKeyDown.right=false
          // if (isKeyDown.left){
          //   goLeft()
          // }
        }
        break;}
    isKeyDown[event.code]=false;
}})

function changeX(id, num){
  classes.objects[id].left=classes.objects[id].left+num
  document.getElementById(id).style.left=classes.objects[id].left+"%"
}

function changeY(id,num){
  classes.objects[id].bottom=classes.objects[id].bottom+num
  document.getElementById(id).style.bottom=classes.objects[id].bottom+"%"
}

function changeX1(num){
  // num=num*10
  left1=left1+num
  for (let key in classes.objects.platforms){
    // console.log(classes.objects.platforms[key]);
    if (key!="floor"){
      classes.objects.platforms[key].left=classes.objects.platforms[key].left+num
      document.getElementById(key).style.left=classes.objects.platforms[key].left+"%"
    }
  }
  for (let key in classes.objects.barriers){
    classes.objects.barriers[key].left=classes.objects.barriers[key].left+num
    document.getElementById(key).style.left=classes.objects.barriers[key].left+"%"
  }
}

function changeX2(){
  let speed
  function nextSection(){
    if (left1%100==0){
      platforms.nextSection(200)
      classes.gamemode2.progress++
      console.log(classes.gamemode2.progress);
    }
  }
  switch (classes.gamemode2.level) {
    case 0:
      if (classes.gamemode2.progress>=30&&left1%100==0){
        platforms.endSections(0)
        gamemode=1
        left1=0
        clearInterval(timeR)
      }else{
        nextSection()
      }
      if (classes.gamemode2.progress<=10){
        speed=0.25
        platforms.changeProbabilities(classes.gamemode2.level,classes.gamemode2.progress)
      }else if (classes.gamemode2.progress<=20) {
        speed=0.5
        platforms.changeProbabilities(classes.gamemode2.level,classes.gamemode2.progress)
      }else/* if (classes.gamemode2.progress<=20) */{
        speed=1
        platforms.changeProbabilities(classes.gamemode2.level,classes.gamemode2.progress)
      }
      break;
  case 1:
    if (classes.gamemode2.progress>=30&&left1%100==0){
      platforms.endSections(1)
      gamemode=1
      left1=0
      clearInterval(timeR)
    }else{
      nextSection()
    }
    if (classes.gamemode2.progress<=15){
      speed=1
      platforms.changeProbabilities(classes.gamemode2.level,classes.gamemode2.progress)
    }else/* if (classes.gamemode2.progress<=20) */{
      speed=2
      platforms.changeProbabilities(classes.gamemode2.level,classes.gamemode2.progress)
    }
    break;

}

  // speed=speed*10
  changeX1(-speed)
}

function changeSprite(element){
  let spritesPath="sprites/"
  let knightPath="knight/"
  let direction=classes.objects["player"].direction
  if (!isJumping&&!isFalling){
    classes.objects[element].spriteNum=(classes.objects[element].spriteNum+1)%2
    classes.objects[element].sprite=classes.sprites[element].floored[direction][classes.objects[element].spriteNum]
    document.getElementById(element).src=spritesPath+knightPath+classes.objects[element].sprite
  }else if (isJumping) {
    classes.objects[element].sprite=classes.sprites[element].jumping[direction]
    document.getElementById(element).src=spritesPath+knightPath+classes.objects[element].sprite
  }else if(isFalling){
    classes.objects[element].sprite=classes.sprites[element].falling[direction]
    document.getElementById(element).src=spritesPath+knightPath+classes.objects[element].sprite
  }
}

// function goUp(){
//   if (!isJumping&&!isFalling){
//     isJumping=true
//     timeJ=0
//     let count=0
//     timeU=setTimeout(frame,timeJ)
//     function frame(){
//       //JumpMaxHeight=30
//       //MiniJumpMaxHeight=15
//       if (count==30||(count>15&&(!isKeyDown["KeyW"]&&!isKeyDown["ArrowUp"]))){
//         clearTimeout(timeU)
//         falling()
//         if (isKeyDown["KeyS"]||isKeyDown["ArrowDown"]){
//           goDown()
//         }
//       }else{
//         count++
//         timeJ=timeJ+1
//         changeY("player",1)
//         timeU=setTimeout(frame,timeJ)
//       }
//     }
//   }
// }

function goUp(){
  if (!isJumping&&!isFalling){
    isJumping=true
    timeJ=0
    isPlatformed=false
    dropDown=false
    let count=0
    timeU=setTimeout(frame,timeJ)
    changeSprite("player")
    classes.objects["player"].currentPlatform=classes.objects.platforms["floor"]//null
    function frame(){
      //JumpMaxHeight=30
      //MiniJumpMaxHeight=15
      if (count==30||(count>17&&(!isKeyDown["KeyW"]&&!isKeyDown["ArrowUp"]))){
        clearTimeout(timeU)
        falling()
        if (isKeyDown["KeyS"]||isKeyDown["ArrowDown"]){
          goDown()
        }
      }else{
        count++
        timeJ=timeJ+1
        changeY("player",1)
        checkCollision.barriers()
        timeU=setTimeout(frame,timeJ)
      }
    }
  }
}

// function falling(){
//   isFalling=true
//   timeU=setTimeout(frame,timeJ)
//   function frame(){
//     if (classes.player.bottom<=10){
//       if (classes.player.bottom<10){
//         //because of goDown to speed up falling bottom may become <10
//         classes.player.bottom=10
//       }
//       clearTimeout(timeU)
//       isJumping=false
//       isFalling=false
//       if (isKeyDown["ArrowUp"]||isKeyDown["KeyW"]){
//         goUp()
//       }
//     }else{
//       timeJ=timeJ-1
//       changeY("player",-1)
//       timeU=setTimeout(frame,timeJ)
//     }
//   }
// }

function falling(){
  isFalling=true
  isJumping=false
  timeU=setTimeout(frame,timeJ)
  changeSprite("player")
  function frame(){
    // console.log(checkCollision.platforms.down());
    if (classes.player.bottom<=10||(checkCollision.platforms.down()/*&&isPlatformed==true*/)){
      if (classes.player.bottom<10){
        //because of goDown to speed up falling bottom may become <10
        classes.player.bottom=10
        document.getElementById("player").style.bottom=classes.player.bottom+"%"
      }
      clearTimeout(timeU)
      isFalling=false
      changeSprite("player")
      if (isKeyDown["ArrowUp"]||isKeyDown["KeyW"]){
        goUp()
      }
    }else{
      timeJ=timeJ-1
      changeY("player",-1)
      checkCollision.barriers()
      timeU=setTimeout(frame,timeJ)
    }
  }
}

function goDown(){
  if (isFalling&&!dropDown){
    console.log("klvmn");
    timeD=setInterval(frame,10)
    function frame(){
      if (!isFalling){
        clearInterval(timeD)
      }else{
        changeY("player",-1)
      }
    }
  }
  else if(!isFalling&&isPlatformed){
    dropDown=true
    falling()
    setTimeout(function () {dropDown=false}, 100);
  }
}

function goLeft(){
  if (gamemode==0){
    timeL=setInterval(frame,25)
    classes.objects["player"].direction="left"
    setTimeout(checkDirection,100)
    function frame(){
        if (classes.objects["player"].left>=0){
          changeX("player",-0.5)
        }
      changeSprite("player")
      checkCollision.barriers()
      // console.log(checkCollision.platforms.left());
      // console.log(isJumping);
      // console.log(classes.objects["player"].currentPlatform);
       if (!checkCollision.platform.left(classes.objects["player"].currentPlatform)){
         // console.log("scdjvnb");
         classes.objects["player"].currentPlatform=classes.objects.platforms["floor"]
         falling()
       }
      // console.log(currentPlatform);
      // if (!isJumping){
      //   if (!checkCollision.platforms.left()){
      //     console.log("fdjgdbnf");
      //     falling()
      //   }
      // }
    }
  }
}

function goRight(){
  // if (!isKeyDown.left){
    timeR=setInterval(frame,25)
    classes.objects["player"].direction="right"
    setTimeout(checkDirection,100)
  // }
  function frame(){
    switch (gamemode){
      case 0:
        if (classes.objects["player"].left+classes.objects["player"].width<=100){
          changeX("player",0.5)
        }
        break;
      case 1:
        changeX1(-0.5)
        console.log(left1);
        if (left1<=-200){
          gamemode=0
        }
        break;
      case 2:
        changeX2()
        break;
      }
    changeSprite("player")
    checkCollision.barriers()
    // console.log(left1);
    // if (left1%100==0){
    //   platforms.nextSection(200)
    // }
    if (!checkCollision.platform.right(classes.objects["player"].currentPlatform)){
      // console.log("scdjvnb");
      classes.objects["player"].currentPlatform=classes.objects.platforms["floor"]
      falling()
    }

    // if (!isJumping){
    //   if (checkCollision.platforms.down()){
    //     console.log("fdjgdbnf");
    //     falling()
    //   }
    // }
  }
}

function auto(){

}

// goRight()




function checkDirection(){
  if (isKeyDown.left&&isKeyDown.right){
    setTimeout(checkDirection,100)
  }else if (isKeyDown.left){
    classes.objects["player"].direction="left"
  }else if (isKeyDown.right){
    classes.objects["player"].direction="right"
  }
}

var checkCollision={
  platform:{
    down:function(key){
      // console.log(classes.objects["player"].bottom);
      // console.log(key.bottom+key.height);
      let playerObj=classes.objects["player"]
      // console.log(playerObj.bottom);
      // console.log(key.bottom+key.height);
      if (playerObj.bottom<=key.bottom+key.height&&playerObj.bottom>=key.bottom+key.height-2/*&&playerObj.left+(playerObj.width)/2>=key.left*/){
        return true
      }else{
        return false
      }
    },
    left:function(key){
      // console.log(classes.objects["player"].bottom);
      // console.log(key.bottom+key.height);
      let playerObj=classes.objects["player"]
      if (playerObj.left+(playerObj.width)/2>=key.left){
        return true
      }else{
        return false
      }
    },
    right:function(key){
      let playerObj=classes.objects["player"]
      // console.log(classes.objects["player"].left-(playerObj.width)/2);
      // console.log(key.left+key.width);
      if (playerObj.left+(playerObj.width)/2<=key.left+key.width){
        return true
      }else{
        return false
      }
    },
  },
  platforms:{
    down:function (){
      for (let key in classes.objects.platforms){
        // console.log(key);
        // return checkCollision.platform.down(classes.objects.platforms[key])&&checkCollision.platform.left(classes.objects.platforms[key])&&checkCollision.platform.right(classes.objects.platforms[key])
        if (checkCollision.platform.down(classes.objects.platforms[key])&&checkCollision.platform.left(classes.objects.platforms[key])&&checkCollision.platform.right(classes.objects.platforms[key])){
          if (!dropDown){
            classes.objects["player"].currentPlatform=classes.objects.platforms[key]
            classes.player.bottom=classes.objects.platforms[key].bottom+classes.objects.platforms[key].height
            document.getElementById("player").style.bottom=classes.player.bottom+"%"
            // setTimeout(function(){isPlatformed=true},10)
            isPlatformed=true
            // console.log(dropDown+"dr");
            return true
          }else return false
        }
      }/*isPlatformed=false;*/dropDown=false; return false
    },
    left:function (){
      for (let key in classes.objects.platforms){
        return checkCollision.platform.left(classes.objects.platforms[key])
      }
    },
    right:function (){
      for (let key in classes.objects.platforms){
        return checkCollision.platform.right(classes.objects.platforms[key])
      }
    },
  },
  barrier:{
    down:function(key){
      // console.log(classes.objects["player"].bottom);
      // console.log(key.bottom+key.height);
      let playerObj=classes.objects["player"]
      if (playerObj.bottom<=key.bottom+key.height/*&&playerObj.bottom>=key.bottom+key.height-2*/){
        return true
      }else{
        return false
      }
    },
    left:function(key){
      // console.log(classes.objects["player"].bottom);
      // console.log(key.bottom+key.height);
      let playerObj=classes.objects["player"]
      if (playerObj.left<=key.left+key.width){
        return true
      }else{
        return false
      }
    },
    right:function(key){
      let playerObj=classes.objects["player"]
      // console.log(classes.objects["player"].left-(playerObj.width)/2);
      // console.log(key.left+key.width);
      if (playerObj.left+(playerObj.width)>=key.left){
        return true
      }else{
        return false
      }
    },
    up:function(key){
      let playerObj=classes.objects["player"]
      if (playerObj.bottom/*playerObj.height*/>=key.bottom){
        return true
      }else{
        return false
      }
    },
  },
  barriers:function(){
    for(let key in classes.objects.barriers)
      if (checkCollision.barrier.left(classes.objects.barriers[key])&&checkCollision.barrier.right(classes.objects.barriers[key])&&checkCollision.barrier.down(classes.objects.barriers[key])&&checkCollision.barrier.up(classes.objects.barriers[key])&&checkCollision.barrier.left(classes.objects.barriers[key])&&classes.objects["player"].damaged==false){
        // console.log(classes.objects["player"].damaged)
        console.log(classes.objects["player"].health);
        classes.objects["player"].damage(1)
        setTimeout(function(){classes.objects["player"].damaged=false;console.log(classes.objects["player"].damaged);},2000)
        // setTimeout(function(){checkCollision.barriers();},1100)
      }

  }
}

export{changeX,changeY}
