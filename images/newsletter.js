(function () {

	// VARIABLES
	$newsletter = $('form[name=newsletter]')

	pintrk('track', 'pagevisit', {
		property: 'Athleta',
		lead_type: 'Newsletter'
	});

	$newsletter.on('submit', function (e) {
		e.preventDefault();
		//variables
		var $email = 	$('input[name="email"]', this);//input for e-mail
		var $button =	$('button[type=submit]', this);//submit button


		//validate email
		if($email !== '' && isEmail($email.val())){
		

			//if valid, make ajax call
			$.ajax({
				url: serverLocation +'api/newsletter',
				type: 'POST',
				dataType: 'json',
				data: {
					'_token'	: $('input[name=_token]').val(),
					'email'		: $email.val()
				},
				//before send
				beforeSend:function(){
					//call the disable function
					disable();
					//remove classes in the form, then add the load class
					$newsletter.removeClass('error success').addClass('loading');
				},
				//on success
				success : function(){
					//clear the input value
					$email.val('');
					//remove classes in the form, then add the success class
					$newsletter.removeClass('error load').addClass('success');
					//change the input placeholder
					$email.attr('placeholder',"Inscrição realizada com sucesso");
					//change the button text
					// $button.text("Obrigado");

					try {
						dataLayer.push({ event: "form-newsletter", eventCategory: "form", eventAction: "success" });
					} catch (error) {
						console.error("dataLayer error:", error);
					}

					try {
					  pintrk('track', 'signup', {lead_type: 'Newsletter'});
					}
					catch(err) {
					  console.log('Pinterest tracker not found');
					}

					//After 5s re-enable
					setTimeout(function(){
						reset();
					},5000);
				},
				'complete'	: function() {
					$button.removeClass("loading");
				}
			});
		}
		else
		{
			//else, validation error
			//remove classes in the form, then add the error class
			$newsletter.removeAttr('success load').addClass('error');

			//save the current value input in a temp var
			var tmpVal = null;
			tmpVal = $email.val();
			//clear the value
			$email.val('');
			//change the placeholder text
			$email.attr('placeholder',"E-mail Inválido");
			//change the button text
			// $button.text("Tente novamente");

			//off the focus function, then add the focus funcion
			$email.off('focus').on('focus',function(){
				$(this).val(tmpVal);
				reset();
			});


		}
		return false;
		//private functions

		//disable newsletter inputs
		function disable(){
			$email.attr('disabled', 'disabled');
			$button.attr('disabled', 'disabled').addClass("loading");
		}
		//re-enable newsletter
		function reset(){
			$email.removeAttr('disabled');
			$button.removeAttr('disabled').removeClass("loading");
			//reset all classess
			$newsletter.removeClass('success error load');
			//change the placeholder
			$email.attr('placeholder', "Receba nossa newsletter");
			//change the button text
			$button.text("Enviar");
		}
	});

} )(jQuery)
