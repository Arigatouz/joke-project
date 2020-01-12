// selecting button and adding eventlistner to it 
document.querySelector('.get-jokes').addEventListener('click' , loadJokes);

// loading jokes generator function throw api 
//http://www.icndb.com/api/
function loadJokes(e){
  // getting the valu of the number of jokes
  const numberOfJokes = document.getElementById('number').value
  // initialize the xmlhttprequest 
  const  xhr = new XMLHttpRequest();
  // getting the api link and making sure its aget request also remmber to add true to make sure its sync
  xhr.open('GET',`http://api.icndb.com/jokes/random/${numberOfJokes}`,true);
  // the onload function 
  xhr.onload = function(){
  //checking the status of the server
  if (this.status === 200) {
  // parsing information to a variable called respond so we can use it later
    const respond = JSON.parse(this.responseText) ;
  // making sure that type is success (this part from the api documentation)
    let output = '';
    //making sure that the respond type equal to success before we loop
    if (respond.type === 'success'){
     // the loop using forEach so we can loop throw the JSON object and get what we want 
      respond.value.forEach(function(joke){
        // creating our lis and putting our joke !....
        //one per each li and doing some style not the best practice 
        output += `<li style="font-size:20px;">${joke.joke}</li> <hr/>`

      });
    }
    //getting the ul we created in the html so we can show results (jokes)
    const ul= document.querySelector('.display-jokes')
    ul.innerHTML = output
  }
  
};
// preventing page from reloading all over so we can se result 
  e.preventDefault();
  xhr.send();
}
