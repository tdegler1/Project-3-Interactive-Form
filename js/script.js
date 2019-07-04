// JavaScript Document


/*** MAIN ***/

/* Add error messages to input fields and initialize hidden. */
$("#name").prev().append('<p class="errorMsgName">Name field cannot be blank</p>');
$(".errorMsgName").hide();
$("#mail").prev().append('<p class="errorMsgEmail">Please enter a valid email address</p>');
$(".errorMsgEmail").hide();
$("fieldset.activities legend").append('<p class="errorMsgActivity">Please select at least one activity</p>');
$(".errorMsgActivity").hide();
$("#cc-num").prev().append('<p class="errorMsgCCNum">Please enter a valid credit card number<br><br></p>');
$(".errorMsgCCNum").hide();
$("#zip").prev().append('<p class="errorMsgZip">Please enter a 5-digit zip code</p>');
$(".errorMsgZip").hide();
$("#cvv").prev().append('<p class="errorMsgCVV">Please enter a 3-digit CVV number</p>');
$(".errorMsgCVV").hide();

/* Put the cursor on the first input field in the form (Name). */
$("#name").focus();	

/* Job Role Section */
	$("#other-title").hide(); //Initially hide the "Other" job role input field.

	/* Show the user input field if "Other" is selected for Job Role. Hide the input field if another job role is selected. */
	$("#title").change(function(){
		const selectedJobRole = $(this).val();
		//console.log(selectedJobRole);
		//if selected option = "other" then show the Other input field.
		if (selectedJobRole==="other") {
			$("#other-title").show();
		} else {
			$("#other-title").hide(); 
		}
	}); 
// END Job Role section

/* T-Shirt Section */
	// "Color" menu is hidden until a T-Shirt design is selected. (Exceeds requirement)
	//$("#color").prepend("<option selected='selected'>Please select a T-shirt theme</option>");
	$("#color").hide();
	$("label[for='color']").hide();

	// When the "Design" menu is clicked: 
	$("#design").change(function () {
		$("label[for='color']").show();
		$("#color").show();
	  // Show  color options for "JS Puns" design if selected.
	  if ($("#design").val() === "js puns") {
		// show the three 'js puns' options
		$('#color option[value="cornflowerblue"]').show();
		$('#color option[value="darkslategrey"]').show();
		$('#color option[value="gold"]').show();
		// hide the three "heart js" options in the "Color" menu
		$('#color option[value="tomato"]').hide();
		$('#color option[value="steelblue"]').hide();
		$('#color option[value="dimgrey"]').hide();
		// default color
		$("#color").val("cornflowerblue");
	  }
	  // Show  color options for "I Heart JS" design if selected.
	  else if ($("#design").val() === "heart js") {
		// show the three "heart js" options in the "Color" menu
		$('#color option[value="tomato"]').show();
		$('#color option[value="steelblue"]').show();
		$('#color option[value="dimgrey"]').show();
		// hide the three "js puns" options in the "Color" menu
		$('#color option[value="cornflowerblue"]').hide();
		$('#color option[value="darkslategrey"]').hide();
		$('#color option[value="gold"]').hide();
		// default color
		$("#color").val("tomato");
	  }
	}); 
// END T-Shirt Section

/* Activities Section */

/* Create a DOM element (span), store it in a global variable "totalCostSpan" and append it to the `.activity` section. */
const $totalCostSpan = $('<span></span>'); 
$(".activities").append($totalCostSpan);
let totalCost = 0; // global variable to store total activity cost 

// When an Activities checkbox is selected: 
	$('[type="checkbox"]').change(function () {
		const selectedCheckbox = $(this); 	// the checkbox input element.
		const selectedActivity = $(this).parent();	// the label element.
		const activityText = selectedActivity.text();	// the text string in the label element.
//		console.log(activityText);
		const getDollarSign = activityText.indexOf('$');	// Find the "$" character in the text string.
		const activityCost = activityText.slice(getDollarSign + 1, activityText.length);	// get the text immediately following the dollar sign to the end of the text string (which is the numerical cost)
		const cost = parseInt(activityCost);
		/* If the box is checked, add the activity's cost to the total cost and display at the bottom of the section. If the box is unchecked, subtract the amount from the total and display it. */
		if (selectedCheckbox.is(':checked')) {
            totalCost += cost;
			$totalCostSpan.html("Total: $" + totalCost);
        } else {
            totalCost -= cost;
            $totalCostSpan.html("Total: $" + totalCost);
        }
		/* Now get the string that includes the day and time of the activity that was checked. */
		const getEmDash = activityText.indexOf('—');
		const getComma = activityText.indexOf(',');
		const dayTime = activityText.slice(getEmDash + 1, getComma);
//		console.log(dayTime);
		// Look for other activities with same day and time 
        const checkboxes = $('[type="checkbox"]');
        for (let i = 0; i < checkboxes.length; i++) {
            const eachCheckboxText = checkboxes.eq(i).parent().text();
            if (eachCheckboxText.includes(dayTime) && eachCheckboxText !== activityText) {
				// if selected activity checkbox is checked, disable any conflicting activities and grey out the unavailable activity.
                if (selectedCheckbox.is(':checked')) {
                    checkboxes.eq(i).attr("disabled", true);
					checkboxes.eq(i).parent().addClass('conflict');
                } else {
				// if selected activity checkbox is unchecked, enable any conflicting activities and restore style to available.
                    checkboxes.eq(i).attr("disabled", false);
					checkboxes.eq(i).parent().removeClass('conflict');
                }
            }
		}
	});	
// END Activities Section

/* Payment Section */
	/* Add class selectors to paypal and bitcoin options. Just makes it easier to follow the code when we target these elements.  */
	$("#credit-card").next().addClass("paypal");
	$("#credit-card").next().next().addClass("bitcoin");
	$(".paypal").hide(); //Initially hide the Paypal payment option.
	$(".bitcoin").hide(); //Initially hide the Bitcoin payment option.
	/* When a Payment Method is selected, hide the other two components that are not selected. */
	$("#payment").change(function () {
		$('#payment option[value="select_method"]').hide();	// hide the "Select Payment Method"
		/* WHen Credit Card is selected, hide paypal and bitcoin sections. */
		if ($("#payment").val() === "credit card") {
			$("#credit-card").show();
			$(".paypal").hide();
			$(".bitcoin").hide();
		}
		/* When Paypal is selected, hide credit card and bitcoin sections. */
		else if ($("#payment").val() === "paypal") {
			$("#credit-card").hide();
			$(".paypal").show();
			$(".bitcoin").hide();
		}
		/* When Bitcoin is selected, hide paypal and credit card sections. */
		else if ($("#payment").val() === "bitcoin") {
			$("#credit-card").hide();
			$(".paypal").hide();
			$(".bitcoin").show();
		}
	});
// END Payment Section

/* Validation Section */
/* First, set up Regular Expressions (RegEx) as patterns to match against: */
const regexName = /^\S+$/;	 // Name field isn’t blank.
const regexEmail = /^[^@]+@[^@.]+\.[a-z]+$/i; // Email field contains validly formatted e-mail address.
const regexCreditCardNum = /^(\d){13,16}$/;	// Credit Card Number field is a 13 to 16-digit number
const regexCreditCardZip = /^(\d){5}$/;	// Credit Card zip code field is a 5-digit number
const regexCreditCardCVV = /^(\d){3}$/;	// Credit Card CVV valuie is a 3-digit number

/* Grab all the regular text input fields that need to be validated. Activities section is validated separately. */
const $name = $('#name');
const $email = $('#mail');
const $ccardnum = $('#cc-num');
const $ccardzip = $('#zip');
const $ccardcvv = $('#cvv');

/* For all fields with a text input field, this validates the value in the text field (string) with the proper regex format. The associated error message will show or hide, depending on if the input was invalid or valid. */
function checkIfValid (regex, field, errorMsg) {
	if (regex.test(field.val())===false) {
		$(errorMsg).show();
		return false;
	} else {
		$(errorMsg).hide();
		return true;
	}
}

/* For the Activities section, the checkboxes have to be examined to see if at least one box is checked.  Otherwise show the associated error message */
function checkIfValidActivity(errorMsg) {
    if ( $('input:checked').length === 0 ) {
		$(errorMsg).show();
    	return false;
    } else {
		$(errorMsg).hide();
    	return true;
    }
  }

/*** SUBMIT FORM ***/
$('button').click(function (e) {
// Validate input fields for proper format and that at least one Activity has been selected.
	let validName = checkIfValid ( regexName, $name, ".errorMsgName" );
	let validEmail = checkIfValid( regexEmail, $email, ".errorMsgEmail"  );
	let validActivity = checkIfValidActivity(".errorMsgActivity");
	let validCreditNumber = checkIfValid( regexCreditCardNum, $ccardnum, ".errorMsgCCNum" );
	let validCreditZip = checkIfValid( regexCreditCardZip, $ccardzip, ".errorMsgZip"  );
	let validCreditCVV = checkIfValid( regexCreditCardCVV, $ccardcvv, ".errorMsgCVV"  );

	// If credit card payment is selected, all fields must be correct.
	if ($("#payment").val() === "credit card" || $("#payment").val() === "select_method") {
		if (validName && validEmail && validActivity && validCreditNumber && validCreditZip && validCreditCVV){
		$('form').submit();
		alert('Thank you for registering!');
		} else {
//		alert('Sorry, please check your form entries');
		e.preventDefault();
		}
	} else {
	// credit card payment is not selected, so don't need to check those fields for correctness.
		if (validName && validEmail && validActivity){
		$('form').submit();
		alert('Thank you for registering!');
		} else {
//		alert('Sorry, please check your form entries');
		e.preventDefault();
		}
	}
})
// END Validation Section 

// Happy Dance!
