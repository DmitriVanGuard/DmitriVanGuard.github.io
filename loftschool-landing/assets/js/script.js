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
		fragment.appendChild(reviewNameCopy);
		fragment.appendChild(reviewTextCopy);
		fragment.firstElementChild.classList.add("modal__title")
		fragment.lastElementChild.classList.add("modal__text")
		modalContent.appendChild(fragment);

		modalBox.addEventListener("click", function(e){
			modalContent.removeChild(reviewTextCopy);
			modalContent.removeChild(reviewNameCopy);
			modalBox.classList.remove("modal_active");
		});

		modalContent.addEventListener("click", function(e){
			e.stopPropagation();
		});

		modalExit.addEventListener("click", function(e){
			e.preventDefault();
			modalContent.removeChild(reviewTextCopy);
			modalContent.removeChild(reviewNameCopy);
			modalBox.classList.remove("modal_active");
		});
	});
});

