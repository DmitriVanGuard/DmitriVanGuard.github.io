// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val();
		$(this).val("");
		//create a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

var active = true;
$(".fa-plus").click(function(){
	if(active){
		$("ul").css('top', 'calc(100% - 53px)');
		$("input").css('visibilit', 'hidden');
		active = false;
	}else{
		$("ul").css('top', '100%');
		$("input").css('visibilit', 'normal');
		active = true;
	}
});