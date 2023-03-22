
class Graph{
  constructor(){
    this.nodes=[]
    this.currentNode=null
  }
  createNode(difficulty,platforms,barriers){
    let node=new Node(difficulty,platforms,barriers)
    this.nodes.push(node)
  }
  resetNodes(){
    for (let i=0;i<this.nodes.length;i++){
      for (let j=0;j<this.nodes.length;j++){
        this.nodes[i].addEdge(this.nodes[j],this.nodes[j].difficulty)
      }
    }
  }
  setNodes(){
    for (let i=0;i<this.nodes.length;i++){
      this.nodes[i].connectedNodes=[]
      for (let j=0;j<this.nodes.length;j++){
        this.nodes[i].addEdge(this.nodes[j],this.nodes[j].probability)
      }
    }
  }
  changeProbabilities(level,progress){
    let node
    for (let i=0;i<this.nodes.length;i++){
      node=this.nodes[i]
      // console.log(node.barriers.length);
      switch (level) {
        case 0:
          switch (progress) {
            case 0:
              if (node.difficulty==5&&node.barriers.length==0){
                node.probability=5
              }else{
                node.probability=0
              }
              break;
            case 5:
              if (node.difficulty==5&&node.barriers.length==0){
                node.probability=5
              }else if(node.difficulty==4&&node.barriers.length==0){
                node.probability=4
              }else{
                node.probability=0
              }
              break;
              case 15:
                if (node.difficulty==5&&node.barriers.length==0){
                  node.probability=5
                }else if(node.difficulty==4&&node.barriers.length==0){
                  node.probability=4
                }else if(node.difficulty==3&&node.barriers.length==0){
                  node.probability=3
                }else{
                  node.probability=0
                }
                break;
                case 25:
                  if (node.difficulty==5&&node.barriers.length==0){
                    node.probability=5
                  }else if(node.difficulty==4&&node.barriers.length==0){
                    node.probability=5
                  }else if(node.difficulty==3&&node.barriers.length==0){
                    node.probability=4
                  }else{
                    node.probability=0
                  }
                  break;

          }
          break;
        case 1:
          switch (progress) {
            case 0:
              if (node.difficulty<=3&&node.barriers.length==0){
                node.probability=5
              }else{
                node.probability=0
              }
              break;
            case 5:
              if (node.difficulty<=3&&node.barriers.length==0){
                node.probability=5
              }else if(node.difficulty==5&&node.barriers.length==1){
                node.probability=3
              }else{
                node.probability=0
              }
              break;
              case 10:
                if (node.difficulty<=3&&node.barriers.length==0){
                  node.probability=5
                }else if(node.difficulty==5&&node.barriers.length==1){
                  node.probability=4
                }else if(node.difficulty==4&&node.barriers.length==1){
                  node.probability=3
                }else{
                  node.probability=0
                }
                break;
                case 20:
                  if (node.difficulty<=3&&node.barriers.length==0){
                    node.probability=5
                  }else if(node.difficulty<=4&&node.barriers.length!=0){
                    node.probability=5
                  }else if(node.difficulty==3&&node.barriers.length!=0){
                    node.probability=3
                  }else{
                    node.probability=0
                  }
                  break;
                case 25:
                  node.probability=5
                  break;
                }
          break;

      }
      // console.log(this.nodes);
    }
  }
}

class Node{
  constructor(difficulty,platforms,barriers){
    // this.section=section
    this.difficulty=difficulty
    this.platforms=platforms
    if (barriers==undefined){
      this.barriers=[]
    }else{
      this.barriers=barriers
    }
    this.connectedNodes=[]
    this.probability=this.difficulty
  }
  addEdge(node,weight){
    this.connectedNodes.push([node,weight])
  }
  changeWeight(node,weight){
    let i=0
    let found=false
    do {
      if (this.connectedNodes[i][0]==node){
        this.connectedNodes[i][1]=weight
        found=true
      }
      i++
    } while (i<this.connectedNodes.length&&found==false);
    // for (let i = 0; i < this.connectedNodes.length; i++) {
    //   if (this.connectedNodes[i][0]==node){
    //      this.connectedNodes[i][1]=weight
    //      found=true
    //    }
    // }
  }
}


export {Graph, Node}
