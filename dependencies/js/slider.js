// Simple slider for ArcTouch Test
// Vinicius Coelho

// Easy targeting
var initialSlide = $('.slide')[0];
var wrapper = $('.slider-wrapper');
var pagination = $('.paginator');
var actualPag = 1;

// How long and how many
var slideWidth = $('.slider').width();
$('.slide').css('width',slideWidth);
var slideCount = $('.slide').length;

// Infinite slider magic
var clone = $(initialSlide).clone().appendTo($(wrapper));
$(clone).css('margin-right', -(slideWidth));

// Set width for wrapper
$(wrapper).width(slideWidth * (slideCount + 1));

// Move wrapper to meet next slider
function nextSlide(actualPos,arbitraryPag) {
	$(wrapper).css('margin-left',(actualPos - slideWidth));
	paginate(arbitraryPag);
}

// Send wrapper to beginning
function resetSlide() {
	$(wrapper).css('margin-left', 0);
	paginate();
}

// Show current page
function paginate(arbitraryPag) {

	// If user selected a specific page
	if(arbitraryPag != null) {
		actualPag = arbitraryPag;
	}

	if(actualPag < slideCount) {
		$(pagination).removeClass('active');
		$(pagination).eq(actualPag).addClass('active');
		actualPag++;
	}
	else {
		$(pagination).removeClass('active');
		$(pagination).eq(0).addClass('active');
		actualPag = 0;
	}
}

function navigate(pos) {
	actualPos = slideWidth -(slideWidth * pos);
	nextSlide(actualPos, pos);
}

// Trigger slider movement
function slide() {
	var actualPos = parseInt($(wrapper).css('margin-left')); //Actual position

	if(actualPos > -(slideWidth * slideCount)){
		nextSlide(actualPos);
	}
	else {
		resetSlide();
		nextSlide(0);
	}
}

// Binding

$('body').on('click', '.paginator', function() {
	var pos = $(this).index();
	navigate(pos);
});


