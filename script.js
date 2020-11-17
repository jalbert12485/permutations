let setElements;
let subsetSize;

document.querySelector("#submitbutton").addEventListener("click",function(e){
    e.preventDefault();
    setElements=document.querySelector("#set").value;
    subsetSize=document.querySelector("#subset").value;
    document.querySelector("#possibilities").innerHTML=`Total Number of Possibilities: ${repeats(setElements,subsetSize)}`;
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
    if(permutations(n,k)){
        return permutations(n,k)/factorial(k);
    }else{ return false;}
}

function multisets(n,k){
    if(!factorial(n) || !factorial(k)){
        return false;
    }
    if(n==0){
        return 1;
    }
    return combinations(n-1,n+k-1);    
}


function randomPermutation(n,k){
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
    if(!(permutations(n,k))){
        return false;
    }
    return sortAscending(randomPermutation(n,k));
}

function randomRepeat(n,k){
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
    if(!randomRepeat(n,k)){
        return false;
    }
    if(n==0){
        return randomRepeat(n,k);
    }
    return sortAscending(randomRepeat(n,k));
}