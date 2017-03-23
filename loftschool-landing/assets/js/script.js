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
	orderButton = document.querySelector(".order-section__order-button"),
	modalBoxes = document.querySelectorAll(".modal");
	

reviewButton.forEach(function(item){
	item.addEventListener("click", function(){
		var button = this,
			reviewText = button.previousElementSibling,
			reviewName = reviewText.previousElementSibling,
			reviewTextCopy = reviewText.cloneNode(true),
			reviewNameCopy = reviewName.cloneNode(true),
			fragment = document.createDocumentFragment(),
			modalBox = modalBoxes[0],
			modalContent =  modalBox.firstElementChild,
			modalExit = modalContent.firstElementChild;

		modalBox.classList.add("modal_active");
		scrollEnabled = false;

		fragment.appendChild(reviewNameCopy);
		fragment.appendChild(reviewTextCopy);
		fragment.firstElementChild.classList.add("modal__title");
		fragment.lastElementChild.classList.add("modal__text");
		modalContent.appendChild(fragment);

		modalAddListener(modalExit, modalContent, modalBox, reviewNameCopy, reviewTextCopy);
		modalAddListener(modalBox, modalContent, modalBox, reviewNameCopy, reviewTextCopy);
	});
});

var formComplete;

orderButton.addEventListener("click", function(e){
	var button = this,
		fragment = document.createDocumentFragment(),
		orderComplete = document.createElement("h4"),
		modalBox = modalBoxes[1],
		modalContent =  modalBox.firstElementChild,
		modalExit = modalContent.firstElementChild;

	setTimeout(function(){
		var orderCompleteText = formComplete ? document.createTextNode("Заказ оформлен") : document.createTextNode("Произошла ошибка");
	
		modalBox.classList.add("modal_active");
		scrollEnabled = false;

		orderComplete.appendChild(orderCompleteText);
		fragment.appendChild(orderComplete);
		fragment.firstElementChild.classList.add("modal__text");
		fragment.firstElementChild.classList.add("modal__text_order");

		modalContent.appendChild(fragment);

		if(!formComplete)
			modalContent.lastElementChild.style.color="red";

		modalAddListener(modalExit, modalContent, modalBox, orderComplete);
		modalAddListener(modalBox, modalContent, modalBox, orderComplete);
	}, 500);
	
});

function modalAddListener(elem, content, box, name, text){
	elem.onclick = function(e){
		e.preventDefault();
		setTimeout(function(){
			content.removeChild(name);
			if(text){
				content.removeChild(text);
			}
		}, 400);
		box.classList.remove("modal_active");
		scrollEnabled = true;

		elem.onclick = null;
	};

	content.addEventListener("click", function(e){
			e.stopPropagation();
	});
}



$('#order-form').on('submit', function(e){
	e.preventDefault();

		var $form = $(this),
		$formData = $form.serialize();

		$.ajax({
			url: 'assets/php/form.php', //Адресс куда пойдет запрос. Обрабатываем в form.php
			type: "POST",
			data: $formData,
			success: function(data){ // В первый аргумент попадет ответ СЕРВЕРА
				data = JSON.parse(data);
				data.status ? formComplete = true : formComplete = false;
			}
		});
});




//Slider

var arrowArray = document.querySelectorAll(".arrow-slider"),
	burgerSlider = document.querySelector(".burger-slider__list"),
	burgerSliderItems = document.querySelectorAll(".burger-slider__item"),
	burgerSliderItemWidth = burgerSliderItems[0].clientWidth,
	slidesCount = burgerSliderItems.length + 1,
	slideToAmount = 0,
	currentSlideNumber = 1,
	lastSlidePosition = -1 * burgerSliderItemWidth * (slidesCount - 1);

if(burgerSliderItems){
	var firstSlideClone = burgerSliderItems[0].cloneNode(true);
	burgerSliderItems = Array.prototype.slice.call(burgerSliderItems);
	burgerSliderItems.push(firstSlideClone);
	burgerSlider.appendChild(firstSlideClone);
}

burgerSlider.style.width = burgerSliderItemWidth * slidesCount + "px"; //Set List width that contains all slides 


arrowArray.forEach(function(item){
	sliderDirection(item); //Set arriw's direction
});

function sliderDirection(arrow){  //Set arriw's direction
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
			slideToAmount -= burgerSliderItemWidth, //Amount to scroll in order to show next slide
			moveSlides(slideToAmount)
		) : (
			currentSlideNumber--,
			slideToAmount += burgerSliderItemWidth, //Amount to scroll in order to show next slide
			moveSlides(slideToAmount)
			);
}

function moveSlides(amount){
	if(currentSlideNumber > slidesCount){
		infinitySlide(0, -1 * burgerSliderItemWidth);
	}
	else if(currentSlideNumber === 0){
		infinitySlide(lastSlidePosition, lastSlidePosition + burgerSliderItemWidth);
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
	burgerSlider.classList.add("burger-slider__list_moving"); // This class disable transition for transform
	slideToAmount = nextSlide; //Amount to scroll in order to show next slide
	currentSlideNumber = Math.abs(nextSlide) / burgerSliderItemWidth + 1; //Calculate slide number that will be shown after hidden animation
	burgerSlider.style.transform = "translate3d(" + hiddenTranslate + "px, 0, 0)"; // Without animation change slide to first or last(last is clone of first);
	setTimeout(function(){
		burgerSlider.classList.remove("burger-slider__list_moving");
		burgerSlider.style.transform = "translate3d( " + nextSlide + "px, 0, 0)"; // Activate animation and slide to the second slide or one before last
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
	scrollEnabled = true,
	fixedLinksArray = document.querySelectorAll(".fixed-list__item"),
	startY,  // For mobiles
	endY = 0,
	yDelta;

	window.addEventListener("resize", function(){
		if(window.innerHeight > 650){
			sectionHeight = window.innerHeight;
		}else{
			sectionHeight = 650
		}
		var sectionTopOffset = sectionArray[currentSection - 1].offsetTop;
		newSlidePosition = sectionTopOffset * -1;
		onePageScroll(false);
	});

	document.body.addEventListener("click", function(e){ //Scroll to chosen section
			var target = e.target;

			if(target.getAttribute("data-href")){
				var href = target.getAttribute("data-href");
				linkToSection(sectionList[href]);
			}
		});
	window.addEventListener("wheel", function(e){
		if(e.deltaY > 0 && scrollEnabled && currentSection != sectionCount){
			whereToScroll("scrollDown");
		}
		else if(e.deltaY < 0 && scrollEnabled && currentSection != 1){
			whereToScroll("scrollUp");
		}

	});

	//For mobiles
	window.addEventListener("touchstart", function(e){
	    startY = e.touches[0].pageY;
	});
	window.addEventListener("touchmove", function(e){
		e.preventDefault();
	    endY = e.touches[0].pageY;
	});
	window.addEventListener("touchend", function(e){
		yDelta = endY - startY;
	    if(yDelta <= -50 && scrollEnabled && currentSection != sectionCount && endY != 0 ){
	    	whereToScroll("scrollDown");
	    }
	    else if(yDelta >= 50 && scrollEnabled && currentSection != 1 && endY != 0 ){
	    	whereToScroll("scrollUp");
	    }
	});

	function whereToScroll(direction){
		if(direction === "scrollDown"){
			currentSection++;
			newSlidePosition -= sectionHeight;
		}
		else if(direction === "scrollUp"){
			currentSection--;
			newSlidePosition += sectionHeight;
		}
			endY = 0; // In order to disable scroll when user just click on a page
			scrollEnabled = false;
			onePageScroll(true);
	}

	function onePageScroll(trigger){
		mainWrapper.style.transform="translate3d(0, "+ newSlidePosition +"px, 0px)";
		removeFixedListActive();   //Remove active circle from fixed nav list
		fixedLinksArray[currentSection - 1].classList.add("fixed-list__item_active");

		if(currentSection === 8 || currentSection === 2){  //Change fixed nav list color to black
			fixedLinksArray.forEach(function(item){
				item.classList.add("fixed-list__item_black");
			});
			fixedLinksArray[currentSection - 1].firstElementChild.classList.add("fixed-list__link_black")
		}

		if(!trigger) return;  //To trigger timer when it needed
		setTimeout(function(){
			scrollEnabled = true;
		}, 1700);
	}
	
	function linkToSection(num){
		currentSection = num + 1;
		newSlidePosition = num * sectionHeight * -1;
		onePageScroll();
	}
	function removeFixedListActive(){
		fixedLinksArray.forEach(function(item){
			item.classList.remove("fixed-list__item_active");
			item.classList.remove("fixed-list__item_black");
			item.firstElementChild.classList.remove("fixed-list__link_black");
		});
	}
})();

