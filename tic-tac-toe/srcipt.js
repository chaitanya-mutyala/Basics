let boxes=document.querySelectorAll(".game");
let reset1=document.querySelector("#reset");
let turno=true;
let array=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
let newgame=document.querySelector("#new");
let msgcontainer=document.querySelector("#msg");  
let msg=document.querySelector(".Winner");
boxes.forEach((box,i)=>{
    
    box.addEventListener("click",()=>{
        
        if(turno){
            box.innerText="O";
            turno=false;
            }
        else{
            box.innerText="X";
            turno=true;
            }
        box.disabled = true;
        check();
        
    });
});
const resetgame=()=>{
    enabledBoxes();
    msg.classList.add("hide")

}
const enabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const show=(p1)=>{
    msgcontainer.innerText=`Congo winner is ${p1}`;
    msgcontainer.style.color="yellow";
    msg.classList.remove("hide");
    disabledBoxes();

}
const check=()=>{
    for(let pattern of array){
        let p1=boxes[pattern[0]].innerText;
        let p2=boxes[pattern[1]].innerText;
        let p3=boxes[pattern[2]].innerText;
        if(p1 !="" && p2 !="" && p3 !=""){
            if(p1 === p2 && p1 === p3){
                show(p1);
            }
        }

    }
}
reset1.addEventListener("click",resetgame);
newgame.addEventListener("click",resetgame);