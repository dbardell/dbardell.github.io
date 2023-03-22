
// let queue=[null, null, null]
//
// let front=0
// let back=0
//
// function enqueue(data){
//   if(front==back){
//
//   }else{
//     back=(back+1)%queue.length
//     queue[back]=data
//   }
// }
//
// function dequeue(){
//   if (queue[front]==null){
//     // queue is empty
//   }
//   else{
//     front=(front+1)%queue.length
//   }
// }

class Queue{
  constructor(){
    this.queue=[null, null, null, null]
    this.front=-1
    this.back=-1
  }
  enqueue(data){
    if(this.isFull()){
      //queue full
    }else{
      if (this.front==-1){
        this.front++
      }
      this.back=(this.back+1)%this.queue.length
      this.queue[this.back]=data
    }
  }

  dequeue(){
    if (this.isEmpty()){
      // queue is empty
    }
    else{
      this.front=(this.front+1)%this.queue.length
    }
  }
  isEmpty(){
    // if ((this.front+1)%this.queue.length>this.back&&0==1){
    if (this.front==-1){
      return true
    }
  }
  isFull(){
    if(this.front==(this.back+1)%this.queue.length){
      return true
    }
  }
}



export{Queue}
