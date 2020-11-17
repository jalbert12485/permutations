let setElements;
let subsetSize;

document.querySelector("#submitbutton").addEventListener("click",function(e){
    e.preventDefault();
    setElements=Number(document.querySelector("#set").value);
    subsetSize=Number(document.querySelector("#subset").value);
    let countType=document.querySelector("#count-type").value;

    switch(countType){
        case "repeat":
            if(!repeats(setElements,subsetSize)){
                document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: Not Possible`;
                document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: Not Possible`;  
            }else{
            document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: ${repeats(setElements,subsetSize)}=\\(${setElements}^{${subsetSize}}\\)`;
            document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: ${JSON.stringify(randomRepeat(setElements,subsetSize))}`;}
            break;
        case "permutation":
            if(!permutations(setElements,subsetSize)){
                document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: Not Possible`;
                document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: Not Possible`;  
            }else{
            document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: ${permutations(setElements,subsetSize)}=\\(\\frac{${setElements}!}{${subsetSize}!}\\)`;
            document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: ${JSON.stringify(randomPermutation(setElements,subsetSize))}`;}
            break;        
        case "combination":
            if(!combinations(setElements,subsetSize)){
                document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: Not Possible`;
                document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: Not Possible`;  
            }else{
            document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: ${combinations(setElements,subsetSize)}=\\(\\frac{${setElements}!}{${subsetSize}!${setElements-subsetSize}!}\\)`;
            document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: ${JSON.stringify(randomCombination(setElements,subsetSize))}`;}
            break;     
        case "multiset":
            if(!multisets(setElements,subsetSize)){
                document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: Not Possible`;
                document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: Not Possible`;  
            }else{
            document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: ${multisets(setElements,subsetSize)}=\\(\\binom{${setElements+subsetSize-1}}{${setElements-1}}\\)`;
            document.querySelector("#rand-ex").innerHTML=`Total Number of Possibilities: ${JSON.stringify(randomMultiset(setElements,subsetSize))}`;
            if(setElements==0){
                document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: ${multisets(setElements,subsetSize)}`;
            }}
            break;   

    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

})

function repeats(n,k){
    n=Number(n);
    k=Number(k);
    if( !Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0){
        return false;
    }
    if(n ==0 && k==0){
        return 1;
    }
    return n ** k;
}


function factorial(n){
    n=Number(n);
    if( !(Number.isInteger(n) && n >= 0) ){
        return false;
    }
    let fact=1;
    if(n>0){
    for(let i=1; i <n+1; i++){
        fact=fact*i;
    }}
    return fact;

}

function permutations(n,k){
    n=Number(n);
    k=Number(k);
    if(factorial(n) && factorial(k) && n>=k){
        return (factorial(n))/(factorial(n-k));
    }else{ return false;}
}

function combinations(n,k){
    n=Number(n);
    k=Number(k);
    if(permutations(n,k)){
        return permutations(n,k)/factorial(k);
    }else{ return false;}
}

function multisets(n,k){
    n=Number(n);
    k=Number(k);
    if(!(factorial(n) && factorial(k))){
        return false;
    }
    if(n==0){
        return 1;
    }
    return combinations(n+k-1,n-1);    
}


function randomPermutation(n,k){
    n=Number(n);
    k=Number(k);
    if(!(permutations(n,k))){
        return false;
    }
    let array=[];
    let answer=[];
    for(let i=0; i<n; i++){
        array.push(i+1);
    }
    for(let i=0; i<k; i++){
        let j=Math.floor(Math.random()*(n-i));
        answer.push(array[j]);
        array.splice(j,1);
    }
    return answer;
    
}

function sortAscending(array){
    for(let i=0; i< array.length; i++){
        if (!Number.isInteger(array[i])){
            return false;
        }
    }
    let answer=[];
    for(let i=0; i< array.length; i++){
             answer[i]=array[i];
        for(let j=i; j< array.length; j++){
            if(array[j]< answer[i]){
                let a=answer[i];
                let b=array[j];
                answer[i]=b;
                array[j]=a;
            }
        }
    }
    return answer;

}

function randomCombination(n,k){
    n=Number(n);
    k=Number(k);
    if(!(permutations(n,k))){
        return false;
    }
    return sortAscending(randomPermutation(n,k));
}

function randomRepeat(n,k){
    n=Number(n);
    k=Number(k);
    if( !Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0){
        return false;
    }
    let array=[];
    if(n==0 && k==0){
        return array;
    }
    if(n==0){
        for(let i=0; i< k; i++){
            array.push("");
        }
    }else{
    if(k>0){
    for(let i=0; i < k; i++){
        let rand=Math.floor(Math.random()*n)+1;
        array.push(rand);
    }}}
    return array;
}

function randomMultiset(n,k){
    n=Number(n);
    k=Number(k);
    if(!randomRepeat(n,k)){
        return false;
    }
    if(n==0){
        return randomRepeat(n,k);
    }
    return sortAscending(randomRepeat(n,k));
}