const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";



const dropdownSelects=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

let msg=document.querySelector(".msg");






for(let select of dropdownSelects){
    for(let currCode in countryList){
        
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        
        select.append(newOption);
    }
    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let code=element.value;
    let countryCode=countryList[code];
    
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    
    element.parentElement.querySelector("img").src=newSrc;
    
};


async function updateExchangeRate(){
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    
    if(amountVal==="" || amountVal<1){
        amount.value="1";
        amountVal=1;
    }
    
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    
    let toCurrKey=toCurr.value.toLowerCase();
    let fromCurrKey=fromCurr.value.toLowerCase();
    
    let rate=data[fromCurrKey][toCurrKey];
    
    msg.innerText=`${amountVal} ${fromCurr.value} = ${amountVal*rate} ${toCurr.value}`;
    
}

window.addEventListener("load",()=>{
    updateExchangeRate();
});

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    
    updateExchangeRate();
    
});