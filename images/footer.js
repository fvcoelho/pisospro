(function () {
	$(document).ready( function () {
		var $accordion = $('.accordion');
		// Events
		$('.sub-menu', $accordion).on('accordion:toggle', function () {
			$('.sub-menu', $accordion).height(0);
			
			if ( !$(this).hasClass("opened") ) {
				$(this)
				.height( $( '.sub-menu--content', this ).outerHeight( true ) + 48 );
				
				$('.sub-menu, .has-sub-menu').removeClass( "opened" );

				$(this)
				.addClass( "opened" )
				.parent()
				.addClass( "opened" );
			} else {
				$(this)
				.removeClass( "opened" )
				.parent()
				.removeClass( "opened" );
			}
		});

		// Listeners
		$( '.has-sub-menu', $accordion ).on( 'click', function () {
			$( '.sub-menu', this ).trigger( "accordion:toggle" );
		} );
	} );

} )(jQuery)