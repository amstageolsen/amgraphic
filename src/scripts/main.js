$(document).ready(function() {

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
			var menuIndex =	pages.indexOf('menu')+1;// indexOf return a 0-index and the onLeave function returns a 1-index. So we add one to make it work.

			// If we scroll past the menu
			// We want to sticky it so that we always can see it.
			if(nextIndex == menuIndex) {
				$('.main-menu').removeClass('sticky hidden');
			}

			if(nextIndex < menuIndex) {
				$('.main-menu').addClass('hidden');
			}

			if(nextIndex > menuIndex) {
				$('.main-menu').addClass('sticky');
			}
		}
	});
});
