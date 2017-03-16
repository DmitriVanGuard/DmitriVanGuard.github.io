(function(){



var accoTrigger = document.querySelectorAll(".menu-acco__trigger"),
	descBlocksArray = document.querySelectorAll(".menu-acco__description");

accoTrigger.forEach(function(item){
	item.addEventListener("click", function(e){
		e.preventDefault();
		var element = this,
			elementsParent = element.parentNode,
			descBlock = elementsParent.nextElementSibling,
			descBlockText = descBlock.firstElementChild;
			
		if(element.classList.contains("menu-acco__trigger_active")){
			descBlock.style.width = 0;
			element.classList.remove("menu-acco__trigger_active");
		}else{
			descBlocksArray.forEach(function(item){
				item.style.width = 0;
				item.previousElementSibling.firstElementChild.classList.remove("menu-acco__trigger_active");
			});

			descBlock.style.width = descBlockText.clientWidth + "px";
			element.classList.add("menu-acco__trigger_active");
		}
	});
});


// team section
var teamTrigger = document.querySelectorAll(".acco__trigger"),
	personBlocksArray = document.querySelectorAll(".acco__item");

teamTrigger.forEach(function(item){
	item.addEventListener("click", function(e){
		e.preventDefault();
		var element = this,
			elementSibling = element.nextElementSibling,
			elementSiblingContent = elementSibling.firstElementChild;
			
		if(element.classList.contains("acco__trigger_active")){
			elementSibling.style.height = 0;
			element.classList.remove("acco__trigger_active");
		}else{
			personBlocksArray.forEach(function(item){
				item.lastElementChild.style.height = 0;
				item.firstElementChild.classList.remove("acco__trigger_active");
			});

			elementSibling.style.height = elementSiblingContent.clientHeight + "px";
			element.classList.add("acco__trigger_active");
		}
	});
});



//Modal box
var reviewButton = document.querySelectorAll(".review-section__button"),
	modalBox = document.querySelector(".modal"),
	modalContent =  modalBox.firstElementChild,
	modalExit = modalContent.firstElementChild 	;

reviewButton.forEach(function(item){
	item.addEventListener("click", function(){
		var button = this,
			reviewText = button.previousElementSibling,
			reviewName = reviewText.previousElementSibling,
			reviewTextCopy = reviewText.cloneNode(true),
			reviewNameCopy = reviewName.cloneNode(true),
			fragment = document.createDocumentFragment();

		modalBox.classList.toggle("modal_active");

		scrollToggle = false;

		fragment.appendChild(reviewNameCopy);
		fragment.appendChild(reviewTextCopy);
		fragment.firstElementChild.classList.add("modal__title");
		fragment.lastElementChild.classList.add("modal__text");
		modalContent.appendChild(fragment);

		modalAddListener(modalExit, reviewNameCopy, reviewTextCopy);
		modalAddListener(modalBox, reviewNameCopy, reviewTextCopy);

		modalContent.addEventListener("click", function(e){
			e.stopPropagation();
		});

	});
});


function modalAddListener(elem, name, text){
	elem.onclick = function(e){
			e.preventDefault();
			setTimeout(function(){
				modalContent.removeChild(name);
				modalContent.removeChild(text);
			}, 400);
			modalBox.classList.remove("modal_active");
			scrollToggle = true;
		};
}

//Slider

var arrowArray = document.querySelectorAll(".arrow-slider"),
	burgerSlider = document.querySelector(".burger-slider__list"),
	burgerSliderItems = document.querySelectorAll(".burger-slider__item"),
	slidesCount = burgerSliderItems.length + 1,
	slideToAmount = 0,
	currentSlideNumber = 1,
	lastSlideOffset = -940 * (slidesCount - 1);

if(burgerSliderItems){
	var firstSlideClone = burgerSliderItems[0].cloneNode(true);
	burgerSliderItems = Array.prototype.slice.call(burgerSliderItems);
	burgerSliderItems.push(firstSlideClone);
	burgerSlider.appendChild(firstSlideClone);
}

burgerSlider.style.width = 940 * slidesCount + "px";


arrowArray.forEach(function(item){
	sliderDirection(item);
});

function sliderDirection(arrow){
	if(arrow.classList.contains('arrow-slider__right')){
		arrow.addEventListener("click", function(){
			currentSlide(true);
		});
	}else{
		arrow.addEventListener("click", function(){
			currentSlide(false);
		});
	}
}

function currentSlide(change){
	change ? (
			currentSlideNumber++,
			slideToAmount -= 940,
			moveSlides(slideToAmount)
		) : (
			currentSlideNumber--,
			slideToAmount += 940,
			moveSlides(slideToAmount)
			);
}

function moveSlides(amount){
	if(currentSlideNumber > slidesCount){
		infinitySlide(0, -940);
	}
	else if(currentSlideNumber === 0){
		infinitySlide(lastSlideOffset, lastSlideOffset + 940);
	}
	else{
		setTimeout(function(){burgerSlider.style.transform = "translate3d(" + amount + "px, 0, 0)";}, 40);
	}
	burgerSliderItems.forEach(function(item){
		item.classList.remove("burger-slider__item_active");
	});
	burgerSliderItems[currentSlideNumber - 1].classList.add("burger-slider__item_active");
}

function infinitySlide(hiddenTranslate, nextSlide){
	burgerSlider.classList.add("burger-slider__list_moving");
	slideToAmount = nextSlide;
	currentSlideNumber = Math.abs(nextSlide) / 940 + 1;
	burgerSlider.style.transform = "translate3d(" + hiddenTranslate + "px, 0, 0)";
	setTimeout(function(){
		burgerSlider.classList.remove("burger-slider__list_moving");
		burgerSlider.style.transform = "translate3d( " + nextSlide + "px, 0, 0)";
	}, 40);
}

//One Page scroll
	document.body.style.overflowY="hidden";

	var mainWrapper = document.querySelector(".main"),
	sectionArray = document.querySelectorAll("section"),
	sectionHeight = sectionArray[0].clientHeight,
	sectionCount = sectionArray.length,
	currentSection = 1,
	newSlidePosition = 0,
	scrollToggle = true,
	fixedLinksArray = document.querySelectorAll(".fixed-list__item");

	document.body.addEventListener("click", function(e){
			var target = e.target;

			if(target.getAttribute("data-href")){
				var href = target.getAttribute("data-href");
				linkToSection(sectionList[href]);
			}
		});
	window.addEventListener("wheel", function(e){
		if(e.deltaY > 0 && scrollToggle && currentSection != sectionCount){
			currentSection++;
			newSlidePosition -= sectionHeight;
			scrollToggle = false;
			onePageScroll();
		}
		else if(e.deltaY < 0 && scrollToggle && currentSection != 1){
			currentSection--;
			newSlidePosition += sectionHeight;
			scrollToggle = false;
			onePageScroll();
		}
	});
	function onePageScroll(){
		mainWrapper.style.transform="translate3d(0, "+ newSlidePosition +"px, 0px)";
		removeFixedListActive();
		fixedLinksArray[currentSection - 1].classList.add("fixed-list__item_active");
		setTimeout(function(){
			scrollToggle = true;
		}, 800);
	}
	
	function linkToSection(num){
		currentSection = num + 1;
		newSlidePosition = num * sectionHeight * -1;
		onePageScroll();
	}
	function removeFixedListActive(){
		fixedLinksArray.forEach(function(item){
			item.classList.remove("fixed-list__item_active");
		});
	}
})();

