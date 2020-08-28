'use strict';

function displayResults(responseJson){
//log response 
console.log(responseJson)
//empty any other search results
$('#js-results').empty()
$('#results-list').empty()
//find user
let user = responseJson[0].owner.login
//create user info and find number of repos
let userInfo =
  `<h3>User: <span class="user">${user}</span></h3>
   <h3><span class="user">Repos: ${responseJson.length}</span></h3>`
//append that info
$('#js-results').append(userInfo)
//loop through response
for(let i=0; i<responseJson.length; i++){
  console.log(i)
  console.log(responseJson[i].name)
  console.log(responseJson[i].html_url)
  console.log($('#js-results'))
  //append repo results to list
  $('#results-list').append(
    `<li><h4>${responseJson[i].name}</h4>
     <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        <p>${responseJson[i].description}</p>
      </li>
    `)
  }
  //show results
  $('#js-results').removeClass('hidden')
  $('#results-list').removeClass('hidden')
}

function getRepos(handle){
//create url
const url = `https://api.github.com/users/${handle}/repos`
console.log(url)
//fetch url; if the response is ok return response.json else throw an error
fetch(url)
  .then(response => {
   if(response.ok) {
    return response.json()
    }
    throw new Error(response.statusText) 
  })
  //call displayResults and set error message 
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
//watch for form submission and call getRepos
function watchForm(){
  $('form').submit(event =>{
    event.preventDefault();
    const username = $('#js-user-handle').val();
    getRepos(username);
    console.log(username);
  })
}

$(watchForm);