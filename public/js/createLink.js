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
				$('.linkInput').val('localhost:3000/' + response.id);

			}
		});

	}

}