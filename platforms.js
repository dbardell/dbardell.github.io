
import * as classes from "/classes.js";
import * as queue from "/queue.js";
import * as graph from "/graph.js"

let count=0

// function createPlatform(width,left,bottom){
//   // console.log(bottom);
//   classes.objects.platforms["platform"+count]=new classes.Platforms(width,left,bottom)
// // console.log(classes.objects.platforms["platform"+count].bottom);
//   let height=classes.objects.platforms["platform"+count].height
//   document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='platform"+count+"' class='platforms'></div>")
//   document.getElementById("platform"+count+"").style.left=left+"%"
//   document.getElementById("platform"+count+"").style.bottom=bottom+"%"
//   document.getElementById("platform"+count+"").style.height=height+"%"
//   document.getElementById("platform"+count+"").style.width=width+"%"
//   count++
// }
//
// function createBarrier(left,bottom){
//   classes.objects.barriers["barrier"+count]=new classes.Barriers(left,bottom)
//
//   document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='barrier"+count+"' class='barriers' ><img class='fire' src='sprites/fire/fire.gif'></div>")
//   document.getElementById("barrier"+count+"").style.left=left+"%"
//   document.getElementById("barrier"+count+"").style.bottom=bottom+"%"
//   document.getElementById("barrier"+count+"").style.height=classes.objects.barriers["barrier"+count].height+"%"
//   document.getElementById("barrier"+count+"").style.width=classes.objects.barriers["barrier"+count].width+"%"
//   count++
// }

function createPlatform(width,left,bottom,id){
  // console.log(bottom);
  classes.objects.platforms["platform"+count]=new classes.Platforms(width,left,bottom)
// console.log(classes.objects.platforms["platform"+count].bottom);
  let height=classes.objects.platforms["platform"+count].height
  document.getElementById(id).insertAdjacentHTML("beforeend","<div id='platform"+count+"' class='platforms'></div>")
  document.getElementById("platform"+count+"").style.left=left+"%"
  document.getElementById("platform"+count+"").style.bottom=bottom+"%"
  document.getElementById("platform"+count+"").style.height=height+"%"
  document.getElementById("platform"+count+"").style.width=width+"%"
  count++
}

function createBarrier(left,bottom,id){
  classes.objects.barriers["barrier"+count]=new classes.Barriers(left,bottom)

  document.getElementById(id).insertAdjacentHTML("beforeend","<div id='barrier"+count+"' class='barriers' ><img class='fire' src='sprites/fire/fire.gif'></div>")
  document.getElementById("barrier"+count+"").style.left=left+"%"
  document.getElementById("barrier"+count+"").style.bottom=bottom+"%"
  document.getElementById("barrier"+count+"").style.height=classes.objects.barriers["barrier"+count].height+"%"
  document.getElementById("barrier"+count+"").style.width=classes.objects.barriers["barrier"+count].width+"%"
  count++
}

function createSection2(section,currentLeft){
  let currentPlatform
  let id="section"+count
  document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='section"+count+"' class='sections'></div>")
  for (let i=0;i<section[0].length;i++){
    currentPlatform=section[0][i]
    createPlatform(currentPlatform[0],currentPlatform[1]+currentLeft,currentPlatform[2],id)
  }
  if (section[1]==undefined){
    return
  }
  for (let i=0;i<section[1].length;i++){
    currentPlatform=section[1][i]
    console.log(currentPlatform[0]);
    createBarrier(currentPlatform[0]+currentLeft,currentPlatform[1],id)
  }
}

function createSection(node,currentLeft){
  let currentPlatform
  let id="section"+count
  document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='section"+count+"' class='sections'></div>")
  for (let i=0;i<node.platforms.length;i++){
    currentPlatform=node.platforms[i]
    createPlatform(currentPlatform[0],currentPlatform[1]+currentLeft,currentPlatform[2],id)
  }
  if (node.barriers!=undefined){
    for (let i=0;i<node.barriers.length;i++){
      currentPlatform=node.barriers[i]
      // console.log(currentPlatform[0]);
      createBarrier(currentPlatform[0]+currentLeft,currentPlatform[1],id)
    }
  }
  // setTimeout(function(){document.getElementById("platforms").insertAdjacentHTML("beforeend","</div>")},100)
  // document.getElementById("platforms").insertAdjacentHTML("beforeend","</div>")
}

// function createNode(difficulty,platforms,barriers){
//   sectionGraph.createNode(difficulty,platforms,barriers)
//   let revPlatforms=platforms
//   let revBarriers=barriers
//   for (let i=0;i<platforms.length;i++){
//     revPlatforms[i][2]=100-platforms[i][2]-platforms[i][1]
//   }
//   if (barriers!=undefined){
//     for (let i=0;i<barriers.length;i++){
//       revBarriers[i][2]=100-barriers[i][2]-10
//     }
//   }
//   if (revPlatforms!=platforms){
//
//   }
// }

function createNode(difficulty,platforms,barriers){
  sectionGraph.createNode(difficulty,platforms,barriers)
}

function createNodet(difficulty,platforms,barriers){
  createSection2([platforms,barriers],0)
}

function nextSection(currentLeft){
  let currentNode=sectionGraph.currentNode
  let connectedNodes=[]
  for (let i=0;i<currentNode.connectedNodes.length;i++){
    // console.log(currentNode.connectedNodes[i][1]);
    for (let j=0;j<currentNode.connectedNodes[i][1];j++){
      connectedNodes.push(currentNode.connectedNodes[i][0])
    }
  }
  // console.log(connectedNodes);
  let nextNode=connectedNodes[Math.floor(Math.random()*connectedNodes.length)]
  // console.log(nextNode);
  sectionGraph.currentNode=nextNode
  // console.log("11");
  // console.log(sectionQueue.queue);
  // console.log(sectionQueue.queue[sectionQueue.front]);
  // console.log(sectionQueue.queue[sectionQueue.back]);
  // console.log(document.getElementById(sectionQueue.queue[sectionQueue.front]));
  dequeueRemoveSection()
  // console.log("22");
  // console.log(sectionQueue.queue);
  sectionQueue.enqueue("section"+count)
  // console.log("33");
  // console.log(sectionQueue.queue[sectionQueue.front]);
  // console.log(sectionQueue.queue[sectionQueue.back]);
  // console.log(sectionQueue.front);
  // console.log(sectionQueue.back );
  console.log(sectionQueue.queue);

  createSection(nextNode,currentLeft)
  console.log(document.getElementById("platforms"));
}

function dequeueRemoveSection(){
  if (sectionQueue.isFull()){
    // console.log(21);
    // console.log("Full");
    let sectionChildren=document.getElementById(sectionQueue.queue[sectionQueue.front]).children
    document.getElementById(sectionQueue.queue[sectionQueue.front]).remove()
    let childId
    for (let i=0;i<sectionChildren.length;i++){
      childId=sectionChildren[i].id
      if (childId[0]=="p"){
        delete classes.objects.platforms[childId]
      }else if(childId[0]=="b"){
        delete classes.objects.barriers[childId]
      }
    }
    sectionQueue.dequeue()
    // console.log(sectionQueue.queue[sectionQueue.front]);
    // console.log(sectionQueue.queue[sectionQueue.back]);
  }
}

function endSections(level){
  dequeueRemoveSection()
  sectionQueue.enqueue("section"+count)
  let plats
  let otherObj
  switch (level) {
    case 0:
      plats=[[m,0,bot],[s,40,bot],[m,70,bot],[m,0,mid],[s,40,mid],[m,70,mid],[m,0,top],[s,40,top],[m,70,top]]
      break;
    case 1:
      plats=[[m,0,bot],[m,70,bot],[m,0,mid],[m,70,mid],[m,0,top],[s,40,top],[m,70,top]]
  }
  let id="section"+count
  console.log(id);
  document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='section"+count+"' class='sections'></div>")
  let currentPlatform
  console.log(plats);
  for (let i=0;i<plats.length;i++){
    currentPlatform=plats[i]
    createPlatform(currentPlatform[0],currentPlatform[1]+200,currentPlatform[2],id)
  }
}

function startSections(level) {
  dequeueRemoveSection()
  sectionQueue.enqueue("section"+count)
  let plats
  switch (level) {
    case 1:
      plats=[[m,0,bot],[s,40,bot],[m,70,bot],[m,0,mid],[s,40,mid],[m,70,mid],[m,0,top],[s,40,top],[m,70,top]]
      break;
  }
  let id="section"+count
  console.log(id);
  document.getElementById("platforms").insertAdjacentHTML("beforeend","<div id='section"+count+"' class='sections'></div>")
  let currentPlatform
  console.log(plats);
  for (let i=0;i<plats.length;i++){
    currentPlatform=plats[i]
    createPlatform(currentPlatform[0],currentPlatform[1]+200,currentPlatform[2],id)
  }
}

function changeProbabilities(level,progress){
  sectionGraph.changeProbabilities(level,progress)
  sectionGraph.setNodes()
}


// createPlatform(50,10,50,20)
// createPlatform(50,10,50,40)
// createPlatform(50,10,50,60)

// [[20,10,0,20],[20,10,30,40],[40,10,60,60],[20,10,80,20],[20,10,80,40]]

let top=60
let mid=40
let bot=20
let floor=0

let xs=10
let s=20
let m=30
let l=40
let xl=60
let xxl=80
let xxxl=100

let easy=5
let medium=4
let hard=3

let templates=[
  [[[s,0,bot],[s,30,mid],[l,60,top],[s,80,bot],[s,80,mid]],[]],
  [[[s,0,bot],[s,30,mid],[l,60,top],[s,80,bot],[s,80,mid]],[[80,mid]]],
  [[[m,0,bot],[s,40,bot],[m,70,bot],[m,0,mid],[s,40,mid],[m,70,mid],[m,0,top],[s,40,top],[m,70,top]]],
]

// createSection2(templates[2],0)
// createSection(templates[0],100)

function pickPlatform(left) {
  return Math.floor(Math.random()*templates.length)
}

let sectionGraph=new graph.Graph()

createNode(hard,[[s,0,bot],[s,30,mid],[l,60,top],[s,80,bot],[s,80,mid]],[])
createNode(hard,[[s,0,bot],[s,30,mid],[l,60,top],[s,80,bot],[s,80,mid]],[[80,mid]])
createNode(easy,[[m,0,bot],[s,40,bot],[m,70,bot],[m,0,mid],[s,40,mid],[m,70,mid],[m,0,top],[s,40,top],[m,70,top]])
createNode(medium,[[m,0,bot],[m,70,bot],[m,0,mid],[s,40,mid],[m,70,mid],[m,0,top],[m,70,top]])
createNode(hard,[[m,0,bot],[m,70,bot],[s,40,mid],[m,0,top],[m,70,top]])
createNode(hard,[[m,0,bot],[m,70,bot],[s,40,mid],[m,0,top],[m,70,top]],[[45,mid]])
createNode(easy,[[xxxl,0,bot],[xxxl,0,mid],[xxxl,0,top]])
createNode(medium,[[m,0,bot],[m,30,mid],[m,60,top]])
createNode(medium,[[m,0,bot],[m,30,mid],[m,60,top]],[[70,top]])
createNode(medium,[[m,0,bot],[m,0,mid],[m,40,mid],[m,40,top],[s,80,mid],[s,80,top]])
createNode(medium,[[m,0,bot],[m,0,mid],[m,40,mid],[m,40,top],[s,80,mid],[s,80,top]],[[70,floor]])
createNode(easy,[[xxxl,0,bot],[xxxl,0,mid],[xxxl,0,top]],[[80,top],[80,floor]])
createNode(easy,[[xxxl,0,bot],[xxxl,0,mid],[xxxl,0,top]],[[80,bot],[80,mid]])
createNode(medium,[[m,10,bot],[s,40,mid],[m,60,bot]],[[45,floor]])
createNode(medium,[[m,10,bot],[s,40,mid],[m,60,bot]])
createNode(medium,[[m,10,bot],[s,40,mid],[m,60,bot],[s,40,top]])
createNode(medium,[[m,10,bot],[s,40,mid],[m,60,bot],[s,40,top]],[[45,floor]])
createNode(easy,[[xxxl,0,bot]])
createNode(easy,[[xxxl,0,bot],[xxxl,0,mid]])
createNode(easy,[[xxxl,0,bot],[xxxl,0,mid],[xxxl,0,top]],[[80,mid]])
createNode(easy,[[m,0,bot],[m,70,bot],[m,0,mid],[s,40,mid],[m,70,mid],[m,0,top],[s,40,top],[m,70,top]],[[45,floor]])
createNode(medium,[[m,0,top],[m,30,mid],[m,60,bot]])
createNode(medium,[[m,0,top],[m,30,mid],[m,60,bot]],[[70,bot]])
createNode(medium,[[m,0,bot],[m,0,mid],[m,40,mid],[m,40,top],[s,80,mid],[s,80,top]],[[85,mid]])
createNode(hard,[[s,40,bot],[m,0,mid],[s,40,mid],[m,70,mid],[s,40,top]])
createNode(hard,[[s,40,bot],[m,0,mid],[s,40,mid],[m,70,mid],[s,40,top]],[[45,top]])
createNode(hard,[[m,0,bot],[s,40,bot],[s,40,mid],[s,40,top],[m,70,top]])
createNode(hard,[[m,0,top],[s,40,bot],[s,40,mid],[s,40,top],[m,70,bot]])
createNode(medium,[[m,10,bot],[s,40,mid],[m,60,bot],[s,40,top]],[[45,floor],[45,top]])
createNode(easy,[[xxxl,0,bot]],[[80,floor]])

function start(){
  sectionGraph.changeProbabilities(0,0)
  sectionGraph.setNodes()
  sectionGraph.currentNode=sectionGraph.nodes[0]
  sectionQueue.enqueue("section"+count)
  createSection(sectionGraph.currentNode,0)
  nextSection(100)
  nextSection(200)
}

let sectionQueue=new queue.Queue()

start()


function restart(){
  dequeueRemoveSection()

}

let x=0
console.log(x);
setTimeout(function(){x=1;console.log(x);},100)
console.log(x);




// nextSection(100)
// nextSection(100)
// nextSection(100)
// nextSection(100)
console.log(sectionGraph.nodes);
// nextSection(100)

// console.log(sectionGraph.nodes[0]);
// createSection(sectionGraph.nodes[0],0)


let levelSections=[]



//w,h,l,b
// createPlatform(20,10,0,20)
// createPlatform(20,10,30,40)
// createPlatform(40,10,60,60)
// createPlatform(20,10,80,20)
// createPlatform(20,10,80,40)

export {nextSection,changeProbabilities,endSections,startSections}
