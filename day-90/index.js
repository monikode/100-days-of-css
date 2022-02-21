for (let i = 0; i < 20; i++) {
	$(".left")[0].innerHTML += "<div></div>";
	$(".right")[0].innerHTML += "<div></div>";
}

$(".frame").mousemove(function (e) {
	$(".left").css("width", (e.offsetX / $(".frame").width()) * 100 + "%");
	$(".right").css("width", 100 - (e.offsetX / $(".frame").width()) * 100 + "%");

	let y = (e.offsetY / $(".frame").height()) * 100;
	let middle = Math.round(y / 5);
	let start = middle - 2;
	let end = middle + 2;
	console.log(middle, start, end);
	let pa = 20;
	let acm = pa;
	$(".left div").css("margin-left", "-100%");
	$(".right div").css("margin-left", "100%");
	for (let i = start; i <= end; i++) {
		if (i >= 0) {
			$(".left div")
				.eq(i)
				.css("margin-left", -acm + "px");
			$(".right div")
				.eq(i)
				.css("margin-left", acm + "px");
				}
			if (i == middle) pa *= -1;
			acm += pa;
	
	}
});

$(".frame").mouseout(function (e) {
	$(".left div").css("margin-left", "-100%");
	$(".right div").css("margin-left", "100%");
});

$(".left div").css("margin-left", "-100%");
	$(".right div").css("margin-left", "100%");