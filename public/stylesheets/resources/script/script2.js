// Variables or IDs of Username and Passwords Inputs:
var fulllname = document.getElementById('fullname');
var emailaddress = document.getElementById('emailaddress');
var password = document.getElementById('password');
var passwordC = document.getElementById('passwordC');
/*----------------------------------------------------------------------------------*/
// Variable or ID of submit Btn (Login Button which submits data to server).
var submitBtn = document.getElementById('submitBtn');
/*----------------------------------------------------------------------------------*/
// Variables of html div elements which has class of 'input-div validate-input'.
var allInputs = document.getElementsByClassName('input-div validate-input');
var fullnameValidate = document.getElementsByClassName('input-div validate-input')[0];
var emailaddressValidate = document.getElementsByClassName('input-div validate-input')[1];
var passwordValidate = document.getElementsByClassName('input-div validate-input')[2];
var passwordCValidate = document.getElementsByClassName('input-div validate-input')[3];
/*----------------------------------------------------------------------------------*/
// Variables of submitted emailaddress value and passwod value from inputs;
var submittedFullname;
var submittedEmailaddress;
var submittedPassword;
var submittedPaswordC;
/*----------------------------------------------------------------------------------*/

function submitFunc(){
    // If user entered blank spaces before or after in emailaddress or password inputs; Solution is trim();
	submittedFullname = fullname.value.trim();
    submittedEmailaddress = emailaddress.value.trim();
    submittedPassword = password.value.trim();
	submittedPaswordC = passwordC.value.trim();
    
    // If emailaddressaddress input was submitted blank then JS will apply the alert-validate style/class.
    if(submittedFullname == ""){
        fullnameValidate.className = 'input-div alert-validate';
    }
    
    // If password input was submitted blank then JS will apply the alert-validate style/class.
    if(submittedEmailaddress == ""){
        emailaddressValidate.className = 'input-div alert-validate';
    }

    if(submittedPassword == ""){
        passwordValidate.className = 'input-div alert-validate';
    }

    if(submittedPaswordC == ""){
        passwordCValidate.className = 'input-div alert-validate';
    }

    if (submittedPaswordC != submittedPassword) {
        password.className = 'input-div alert-validate';
    }
    
  /*  if(password.length == 8){
    password.style.display = 'none';
    console.log(password);
	}*/

};
/*----------------------------------------------------------------------------------*/
// The Log/Submit button event listener.
passwordC.onchange = submitFunc;
submitBtn.onclick = submitFunc;
	
/*Below is the functionality of how alert will be gone when the user click any/current input.*/	
// Focus:
for(var i = 0; i < allInputs.length; i++){
	allInputs[i].onclick = function(){
		this.className = 'input-div validate-input';
	};
};


/////////////////////////////////////////////////////////////////////////////////////////////////
										// Sign Up Form JS 
/////////////////////////////////////////////////////////////////////////////////////////////////










