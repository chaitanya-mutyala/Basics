const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdown){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected"
        }
        else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);

    })
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    UpdateExchangerate();
    

});
const UpdateExchangerate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amountval=amount.value;
    if(amountval === "" || amountval < 0){
        amountval=1;
        amount.value=1;
    }
    let url=`${base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data= await response.json();
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    msg.innerText=`${amountval} ${fromcurr.value} = ${amountval*rate} ${tocurr.value}`;
    

}
window.addEventListener("load",()=>{
    UpdateExchangerate();
})