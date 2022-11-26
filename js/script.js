//event listeners 
document.querySelector("#zip").addEventListener("change",  displayCity);
document.querySelector("#state").addEventListener("change",  displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event){
  validateForm(event);
});
document.querySelector("#password1").addEventListener("click", displaySuggestedPassword);

//function
displayStates();

//displaying city from web API after entering a zip code
async function displayCity()
{
    //alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;
    let url =`https://cst336.herokuapp.com/projects/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    if(zipCode != data.zip)
    {
        document.querySelector("#zipNotFound").innerHTML = "Zip code does not exist";
    }
    else
    {
        document.querySelector("#zipNotFound").innerHTML = "";
    }
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;   
}
async function displayCounties()
{
    let state = document.querySelector("#state").value;
    let url = `https://cst336.herokuapp.com/projects/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json(); 
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for(let i of data)
    {
        countyList.innerHTML += `<option> ${i.county} </option>`;
    }
}
async function displayStates()
{
    let stateList = document.querySelector("#state");
    let url = `https://cst336.herokuapp.com/projects/api/state_abbrAPI.php`;
    let response = await fetch(url);
    let data = await response.json(); 
  
    for(let i of data)
    {
        stateList.innerHTML += `<option value=${i.usps}> ${i.state} </option>`;
    }
}
async function checkUsername()
{
  let username = document.querySelector("#username").value;
  let url = `https://cst336.herokuapp.com/projects/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();
  let usernameError = document.querySelector("#usernameError");
  if(data.available)
  {
    usernameError.innerHTML = "Username available!";
    usernameError.style.color = "green";
  }
  else
  {
    usernameError.innerHTML = "Username not available!";
    usernameError.style.color = "red";
  }
}
function validateForm(e)
{
    let isValid = true;
    let username = document.querySelector("#username").value;
   if(username.length == 0)
   {
      document.querySelector("#usernameError").innerHTML = "Username Required!";
      isValid = false;
   }
    let password1 = document.querySelector("#password1").value;
    let password2 = document.querySelector("#password2").value;
     if(password1.length < 6)
    {
         document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters long!";
         document.querySelector("#passwordError").style.color = "red";
         isValid = false;
    }
    
    if(password1 != password2)
    {
        document.querySelector("#passwordError").innerHTML = "Password does not match!";
        document.querySelector("#passwordError").style.color = "red";
        isValid =  false;
    } 
   
    if(!isValid)
    {
       e.preventDefault();
    }
    
}
async function displaySuggestedPassword()
{
     let url= `https://webspace.csumb.edu/~lara4594/ajax/suggestedPwd.php?length=8`;
     let response = await fetch(url);
     let data = await response.json();
    // My url link is not working for me because I am in a different country
     document.querySelector("#suggestedpassword").innerHTML = `${data.password}`;
    
}
