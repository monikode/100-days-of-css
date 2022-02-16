$(".center").bind("click", function () {
	$(this).removeClass("pause");
	$(this).addClass("move");
});

$(".center").on("animationiteration", function () {
	$(this).addClass("pause");
});
