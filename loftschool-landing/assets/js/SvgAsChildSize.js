(function(){

	window.addEventListener("load", svgAsChild);
	
	function svgAsChild(){
		var svgArray = document.getElementsByTagName('svg');

		if(navigator.userAgent.search("Firefox") > -1){
			for(var i = 0; i < svgArray.length; i++){
			var svgChildElement = svgArray[i].firstElementChild;
			svgChildElementWidth = svgChildElement.getBoundingClientRect().width;
			svgChildElementHeight = svgChildElement.getBoundingClientRect().height;
			console.log(svgChildElement.width);

			svgArray[i].style.width = svgChildElementWidth + "px";
			svgArray[i].style.height = svgChildElementHeight + "px";
			}
		}else{
			for(var i = 0; i < svgArray.length; i++){
			var svgChildElement = svgArray[i].firstElementChild;
			svgChildElementWidth = svgChildElement.getBoundingClientRect().width;
			svgChildElementHeight = svgChildElement.getBoundingClientRect().height;
			console.log(svgChildElement.width);

			svgArray[i].style.width = svgChildElementWidth/2 + "px";
			svgArray[i].style.height = svgChildElementHeight/2 + "px";
			}
		}
		
	}

})();


