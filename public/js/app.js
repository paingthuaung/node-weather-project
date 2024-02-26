const weatherForm = document.querySelector('form');
const search      = document.querySelector('input');
const messageOne  = document.querySelector('#message-1');
const messageTwo  = document.querySelector('#message-2');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent ='';

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = location+','+data.region+','+data.country;
            messageTwo.textContent = 'The weather condition in '+location+' is '+data.condition+
                                      '.Temperature is '+data.temp+' degree in '
                                      +location+' but feelLike '+data.feelLike+' degree';
        }
    });
});
});