function createLink() {

	var link = $('.linkInput').val();

	if(link != '' && link != null) {

		$.ajax({
			type: "POST",
			url: '/addLink',
			dataType: 'json',
			data:{link:link},
			success:function(response) {

				console.log(response);
				$('.linkInput').css('border', '1px solid #33C3F0');
				$('.linkInput').css('color', '#33C3F0');
				$('.linkInput').val('localhost:8080/' + response.id);

			}
		});

	}

}