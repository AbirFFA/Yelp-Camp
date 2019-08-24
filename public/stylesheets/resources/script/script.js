// Variables or IDs of Username and Passwords Inputs:
var emailaddress = document.getElementById('emailaddress');
var password = document.getElementById('password');
/*----------------------------------------------------------------------------------*/
// Variable or ID of submit Btn (Login Button which submits data to server).
var submitBtn = document.getElementById('submitBtn');
/*----------------------------------------------------------------------------------*/
// Variables of html div elements which has class of 'input-div validate-input'.
var allInputs = document.getElementsByClassName('input-div validate-input');
var emailaddressValidate = document.getElementsByClassName('input-div validate-input')[0];
var passwordValidate = document.getElementsByClassName('input-div validate-input')[1];
/*----------------------------------------------------------------------------------*/
// Variables of submitted emailaddress value and passwod value from inputs;
var submittedUsername;
var submittedPassword;
/*----------------------------------------------------------------------------------*/


function submitFunc(){
    // If user entered blank spaces before or after in emailaddress or password inputs; Solution is trim();
	submittedUsername = emailaddress.value.trim();
	submittedPassword = password.value.trim();
    
    // If emailaddress input was submitted blank then JS will apply the alert-validate style/class.
    if(submittedUsername == ""){
        emailaddressValidate.className = 'input-div alert-validate';
    }
    
    // If password input was submitted blank then JS will apply the alert-validate style/class.
    if(submittedPassword == ""){
        passwordValidate.className = 'input-div alert-validate';
    }
    


}
/*----------------------------------------------------------------------------------*/
// The Log/Submit button event listener.
submitBtn.onclick = submitFunc;
	
/*Below is the functionality of how alert will be gone when the user click any/current input.*/	
// Focus:
for(var i = 0; i < allInputs.length; i++){
	allInputs[i].onclick = function(){
		this.className = 'input-div validate-input';
	};
}


/////////////////////////////////////////////////////////////////////////////////////////////////
										// Sign Up Form JS 
/////////////////////////////////////////////////////////////////////////////////////////////////