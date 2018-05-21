$(document).ready(function() {
	$('body').imagesLoaded(function () {
		var pages = [
			'frontpage',
			'menu',
			'graphic-design',
			'typography',
			'graphic-image-processing',
			'graphic-production-processes',
			'contact-me',
		];

		$('#pages').fullpage({
			anchors: pages,
			scrollingSpeed: 1000,
			sectionSelector: '.page',
			dragAndMove: true,
			onLeave: function (index, nextIndex, direction) {
				var menuIndex =	pages.indexOf('menu') + 1;// indexOf return a 0-index and the onLeave function returns a 1-index. So we add one to make it work.

				// If we scroll past the menu
				// We want to sticky it so that we always can see it.
				if(nextIndex == menuIndex) {
					$('.main-menu').removeClass('sticky hidden');
				}

				if(nextIndex < menuIndex) {
					$('.main-menu').addClass('hidden');
				}

				if(nextIndex > menuIndex) {
					$('.main-menu').addClass('sticky').removeClass('hidden');
				}
				if(nextIndex == pages.indexOf('contact-me') + 1) {
					$('.page-footer-link').addClass('hidden');
				} else {
					$('.page-footer-link').removeClass('hidden');
				}

				// Reset left scroll
				$('.page-scroll').css({
					transform: 'translate(-' + 0 + 'px, 0)'
				}).data('scrollAmount', 0);
			}
		});

		// Reset scroll on menu click
		$('.main-menu a').on('click', function () {
			// Reset left scroll
			$('.page-scroll').css({
				transform: 'translate(-' + 0 + 'px, 0)'
			}).data('scrollAmount', 0);
		})

		$('.page-scroll-wrapper').each(function(){
			var scrollWidth = 0;

			$(this).find('.page__section').each(function() {
				scrollWidth += $(this).outerWidth();
			});

			$(this).find('.page-scroll').css('width', scrollWidth);

			var maxScrollWidth = scrollWidth - $( document ).outerWidth(true) + 200; // Add menu size

			var rightScrollMult = 0;
			var leftScrollMult = 0;

			$( '.page__scroll-arrow__right' ).mousemove(function( event ) {
				var offset = $(this).offset();
				var x = event.pageX - offset.left;

				rightScrollMult = x / 25;
			});

			$( '.page__scroll-arrow__left' ).mousemove(function( event ) {
				var offset = $(this).offset();
				var x = event.pageX - offset.left;

				leftScrollMult = (50 - x) / 25;
			});

			$(this).find('.page__scroll-arrow__right').on('mouseover', function(e) {
				var $scrollZone = $(this);
				var $scrollElement = $(this).parent().find('.page-scroll');
				var scrollAmount = $scrollElement.data('scrollAmount') || 0;

				this.iid = setInterval(function() {
					//console.log('SCROLL right amount', 5 * (rightScrollMult + 1));
					if (maxScrollWidth > scrollAmount) {
						scrollAmount += 3 * (rightScrollMult + 1);
					}
					var offset = $scrollZone.offset();

					var x = e.pageX - offset.left;

					$scrollElement.data('scrollAmount', scrollAmount);
					$scrollElement.css({
						transform: 'translate3d(-' + scrollAmount + 'px, 0, 0)'
					});
				}.bind(this), 5);
			}).on('mouseout', function() {
				this.iid && clearInterval(this.iid);
			});

			$(this).find('.page__scroll-arrow__left').on('mouseover', function() {
				var $scrollElement = $(this).parent().find('.page-scroll');
				var scrollAmount = $scrollElement.data('scrollAmount') || 0;

				this.iid = setInterval(function() {
					//console.log('SCROLL left amount', leftScrollMult, 5 * (leftScrollMult + 1));

					if (scrollAmount > 0) {
						scrollAmount -= 3 * (leftScrollMult + 1);;
					}

					$scrollElement.data('scrollAmount', scrollAmount);
					$scrollElement.css({
						transform: 'translate3d(-' + scrollAmount + 'px, 0, 0)'
					});
				}.bind(this), 5);
			}).on('mouseout', function() {
				this.iid && clearInterval(this.iid);
			});
		});
	});
});
