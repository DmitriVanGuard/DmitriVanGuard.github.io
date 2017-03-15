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
	})
});


// team section
var teamTrigger = document.querySelectorAll(".acco__trigger"),
	personBlocksArray = document.querySelectorAll(".acco__item");

teamTrigger.forEach(function(item){
	item.addEventListener("click", function(e){
		e.preventDefault();
		var element = this,
			elementTriangle = element.firstElementChild,
			elementSibling = element.nextElementSibling,
			elementSiblingContent = elementSibling.firstElementChild;
			
		if(element.classList.contains("acco__trigger_active")){
			elementSibling.style.height = 0;
			// elementTriangle.style.transform = "rotateX(0deg)"
			element.classList.remove("acco__trigger_active");
		}else{
			personBlocksArray.forEach(function(item){
				item.lastElementChild.style.height = 0;
				item.firstElementChild.classList.remove("acco__trigger_active");
			});

			// elementTriangle.style.transform = "rotateX(0deg)"
			elementSibling.style.height = elementSiblingContent.clientHeight + "px";
			element.classList.add("acco__trigger_active");
		}
		// descBlock.style.width = descBlockText.clientWidth + "px";
	})
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

		modalBox.classList.toggle("modal_active")

		window.onwheel = window.ontouchmove = function(e){e.preventDefault()};

		fragment.appendChild(reviewNameCopy);
		fragment.appendChild(reviewTextCopy);
		fragment.firstElementChild.classList.add("modal__title")
		fragment.lastElementChild.classList.add("modal__text")
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
			setTimeout(function(){modalContent.removeChild(name)}, 400);
			setTimeout(function(){modalContent.removeChild(text)}, 400);
			modalBox.classList.remove("modal_active");
			window.onwheel = window.ontouchmove = null;
		};
}

//Slider

var arrowArray = document.querySelectorAll(".arrow-slider"),
	burgerSlider = document.querySelector(".burger-slider__list"),
	burgerSliderItems = document.querySelectorAll(".burger-slider__item"),
	slidesCount = burgerSliderItems.length,
	width = 0,
	currentSlideNumber = 1;

	if(slidesCount > 1){
		firstSlideClone = burgerSliderItems[0].cloneNode(true);
		burgerSlider.appendChild(firstSlideClone);
		slidesCount++;
	}


arrowArray.forEach(function(item){
	sliderDirection(item);
});

function sliderDirection(arrow){
	var slideToShow;
	if(arrow.classList.contains('arrow-slider__right')){
		arrow.addEventListener("click", function(){
			
			currentSlide(true);
			// console.log("right", width);
		});
	}else{
		arrow.addEventListener("click", function(){
			currentSlide(false);
			// console.log("left", width);
		});
	}
}

function currentSlide(change){
	change ? (
			currentSlideNumber++,
			width -= 940,
			moveSlides(width)
		) : (
			currentSlideNumber--,
			width += 940,
			moveSlides(width)
			);
	console.log(currentSlideNumber);
}

function moveSlides(amount){
	if(currentSlideNumber > slidesCount){
		burgerSlider.classList.add("burger-slider__list_moving");
		width = amount= -940;
		currentSlideNumber = 2;
		burgerSlider.style.transform = "translateX(" + 0 + "px)";
		setTimeout(function(){
			burgerSlider.classList.remove("burger-slider__list_moving");
		}, 40);
	}
	console.log(amount);

	
	setTimeout(function(){
		burgerSlider.style.transform = "translateX(" + amount + "px)";
	}, 50);
}
