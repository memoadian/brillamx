	var hostname = 'http://api.brillamexico.org/';

	function actionPerfil(){
		$('.actionperfil').click(function(){
			$('#selfies-list').empty();
			userFbid = $(this).data('id');
			loadUser(userFbid);

			action = $(this).data('action');
			redirectAction(action);
		});
	}

	function disabledPhoto(number){
		$('.eng-'+number).css({
			background: '#929292',
		}).find('.button-circle').remove();

		$('.eng-'+number+' .preselfie-desc').after('<p class="button-circle"><img src="img/ic_checked.png"></p>');
	}

	function doBounce(element, times, distance, speed) {
		for(i = 0; i < times; i++) {
			element.animate({marginTop: '-='+distance},speed).animate({marginTop: '+='+distance},speed);
		}
	}

	function goSelfie(){
		$('.goselfie').click(function(){
			picture = $(this).data('picture');
			userfbid = $(this).data('userfbid');
			username = $(this).data('username');
			idselfie = $(this).data('idselfie');
			description = $(this).data('desc');
			back = $(this).data('back');

			$('.viewselfie-img img').attr('src', '');
			$('.viewselfie-profile').attr('src', '');

			$('.viewselfie-img img').attr('src', hostname + '/pictures/'+picture);
			$('.viewselfie-profile').attr('src', 'http://graph.facebook.com/'+userfbid+'/picture?type=large');
			$('.viewselfie-name').text(username);
			$('.viewselfie-desc').text(description);
			$('.viewselfie-share').attr('data-url', hostname + '/selfie/'+idselfie);

			action = $(this).data('action');
			redirectAction(action);
		});
	}

	function redirectAction(action){
		backgroundBody = $('.'+action).data('body');
		navbarStatus = $('.'+action).data('navbar');
		title = $('.'+action).attr('data-title');
		back = $('.'+action).data('back');
		backtion = $('.'+action).attr('data-backtion');
		edit = $('.'+action).attr('data-edit');
		rightbutton = $('.'+action).attr('data-rightbutton');

		$('.title').text(title);

		if(action != 'perfil'){
			$('section').hide();
		}else{
			$('section').css({
				visibility: 'hidden'
			});
		}

		$('.'+action).fadeIn();
		$('.'+action).css({
			visibility: 'visible',
			opacity: 1,
			zIndex: 0,
		});

		$('body').css('background', backgroundBody);

		if(rightbutton == 'none'){
			$('.button-right').hide();
		}else{
			$('.button-right').show();
		}

		if(edit == 'true'){
			$('.edit').show();
		}else{
			$('.edit').hide();
		}

		if(back == true){
			$('.back').show().attr('data-action', backtion);
		}else{
			$('.back').hide();
		}

		if(navbarStatus == 'si'){
			$('.navbar').css('display','block');
		}else{
			$('.navbar').css('display','none');
		}

		$('.drawermenu').animate({
			marginLeft: -280,
		}, 500, function(){

		});

		$('.cortina').fadeOut(500);
	}

	function updateCompromisos(fbid){
		var compromisos = $.ajax({
			url: hostname + '/user/selfies/'+fbid,
			method: 'GET',
			dataType: 'json'
		});

		compromisos.done(function( data ) {
			if(data.error){

			}else{
				$.each(data, function(index, value){
					disabledPhoto(value.engagement_id);
				});
			}
		});
	}


	/********************************************
		CÁMARA
	*********************************************/

	function takePicture() {
		navigator.camera.getPicture(function(imageURI) {
			var largeImage = document.getElementById('largeImage');
			largeImage.style.display = 'block';
			largeImage.src = imageURI;
			redirectAction('share');
		}, function(err) {
			redirectAction('perfil');
		},{
			quality : 49,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 512,
			targetHeight: 512,
			correctOrientation: true
		});
	}

	function uploadPhoto() {
		fbid = $('.drawermenu').data('fbid');
		engagement_id = $('.share').attr('data-compromiso');
		var fail, ft, options, params, success;

		success = function(response) {
			redirectAction('perfil');
			var points = $.ajax({
				url: hostname + '/user/points/'+fbid,
				method: 'POST',
				data: {points: 10}
			});
			$.getJSON(hostname + '/user/selfies/'+fbid, function(data) {
				photos = data.length;
				points = data[0].user.points;
				if(photos > 0){
					$('.photos').text(photos);
					$('#points-perfil').text(points);
					$('.selfies-list').empty();
					$.each(data, function(index, value){
						var template = $('#selfies').html();
						var html = Mustache.to_html(template, value);
						$('.selfies-list').append(html);
					});
				}
				goSelfie();
			});
			updateCompromisos(fbid);
			addLogroCompromisos(fbid);
			$('.share-button').text('COMPARTIR');
		};

		fail = function(error) {
			redirectAction('perfil');
		};

		var sourceImage = $('#largeImage');
		imageURI = sourceImage.attr('src');

		options = new FileUploadOptions();
		options.fileKey = 'picture';
		options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
		options.mimeType = 'text/plain';

		textoPhoto = $('.share-text').val();
		params = {
			description: textoPhoto,
			engagement_id: engagement_id,
		};

		options.params = params;

		ft = new FileTransfer();
		ft.onprogress = function(progressEvent) {
			if (progressEvent.lengthComputable) {
				var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
				if(perc < 100){
					$('.share-button').text(perc + '%');
				}else{
					$('.share-button').text('PROCESANDO...');
					setTimeout(function(){

					}, 60000);
				}
			} else {
				loadingStatus.increment();
			}
		};
		ft.upload(imageURI, hostname + '/user/selfie/' + fbid, success, fail, options);
	}

	/********************************************
		FACEBOOK
	*********************************************/

	function login() {
		openFB.login(
		function(response) {
			if (response.status === 'connected') {
				getInfo();
			} else {
				navigator.notification.alert('Facebook login fallido', '', 'Alerta', 'ok');
			}
		},
		{scope: 'email, publish_actions, public_profile'});
	}

	function getInfo() {
		openFB.api({
			path: '/me',
			success: function(data) {
				fieldaction_id = $('.registro3').attr('data-fieldelected');
				name = $('.un-h').text();
				if(fieldaction_id != '' && name != ''){
					registerFacebook(data.id, 0, name, data.email, fieldaction_id, data.gender, 0);
					updateCompromisos(data.id);
				}else{
					loadDataFacebook(data.id);
					updateCompromisos(data.id);
				}
			},
			error: errorHandler});
	}

	function errorHandler(error){
		alert('Error al conectar con facebook');
		redirectAction('registro1');
	}

	/********************************************
		TEMPLATES
	*********************************************/

	function loadDataFacebook(fbid){
		var load = $.ajax({
			url: hostname + '/user/'+fbid,
			method: 'GET',
			dataType: 'json'
		});

		load.done(function( data ){
			if(data.error){
				alert('Esta cuenta no existe');
				redirectAction('registro1');
			}else{
				foto = 'http://graph.facebook.com/'+fbid+'/picture?type=large';
				$('.foto').attr('src', foto);

				achievement = data.achievement.length;
				fieldaction_id = data.fieldaction_id;

				$('.name, .perfil-name').text(data.name);
				$('.points').text(data.points);
				$('.achievement').text(achievement);
				$('.perfil-status').text(data.bio);

				$('input[name="biografia"]').val(data.bio);
				$('input[name="nombre"]').val(data.name);

				if(data.twid != 0){
					$('.outputTwitterID').text('Conectado a twitter');
				}

				$('.drawermenu').attr('data-fbid', fbid).attr('data-fieldaction', data.fieldaction_id);

				if(fieldaction_id == 1){
					$('.camera-button').attr('data-action', 'preselfie-jovenes');
				}else if(fieldaction_id == 2){
					$('.camera-button').attr('data-action', 'preselfie-emprendedores');
				}else{
					$('.camera-button').attr('data-action', 'preselfie-empresarios');
				}

				addLogroCompromisos(fbid);
				addLogroRegistro(fbid);
				getActivity();
				fillPerfil(fbid);
				redirectAction('perfil');
			}
		});
	}

	function registerFacebook(fbid, twid, name, email, fieldaction_id, gender, age){
		var register = $.ajax({
			url: hostname + '/user/register',
			method: 'POST',
			data:{
				fbid: fbid,
				twid: twid,
				name: name,
				email: email,
				fieldaction_id: fieldaction_id,
				gender: gender,
				age: age
			}
		});

		register.done(function( data ){
			foto = 'http://graph.facebook.com/'+fbid+'/picture?type=large';
			$('.foto').attr('src', foto);

			var request = $.ajax({
				url: hostname + '/user/'+fbid,
				method: 'GET',
				dataType: 'json'
			});

			request.done(function( data ) {
				achievement = data.achievement.length;
				fieldaction_id = data.fieldaction_id;

				$('.name, .perfil-name').text(data.name);
				$('.points').text(data.points);
				$('.achievement').text(achievement);
				$('.perfil-status').text(data.bio);

				$('.drawermenu').attr('data-fbid', fbid).attr('data-fieldaction', data.fieldaction_id);

				if(fieldaction_id == 1){
					$('.camera-button').attr('data-action', 'preselfie-jovenes');
				}else if(fieldaction_id == 2){
					$('.camera-button').attr('data-action', 'preselfie-emprendedores');
				}else{
					$('.camera-button').attr('data-action', 'preselfie-empresarios');
				}

				addLogroRegistro(fbid);
				fillPerfil(fbid);
				getActivity();
				redirectAction('registro-foto');
			});
		});
	}

	/***************************************
		LOGROS
	****************************************/

	function addLogroRegistro(fbid){
		var load = $.ajax({
			url: hostname + '/user/'+fbid,
			method: 'GET',
			dataType: 'json'
		});

		load.done(function( data ){
			var ids = [];
			$.each(data.achievement, function(i, v){
				ids.push(v.id);
			});
			if ($.inArray('1', ids) > -1){
				//alert('Tiene el logro 1');
			}else{
				var add = $.ajax({
					url: hostname + '/user/logro/'+fbid,
					method: 'POST',
					data:{
						logro: 1,
					},
					dataType: 'json'
				});

				add.done(function(){
					$('#nuevo-usuario').css({
						display: 'block',
						zIndex: 200,
					});
					loadDataFacebook(fbid);
				});
			}
		});
	}

	function addLogroCompromisos(fbid){
		var load = $.ajax({
			url: hostname + '/user/'+fbid,
			method: 'GET',
			dataType: 'json'
		});

		load.done(function( data ){
			var ids = [];
			$.each(data.achievement, function(i, v){
				ids.push(v.id);
			});
			if ($.inArray('3', ids) > -1){

				if ($.inArray('4', ids) > -1){

				}else{
					var load = $.ajax({
						url: hostname + '/user/selfies/'+fbid,
						method: 'GET',
						dataType: 'json'
					});

					load.done(function( data ){
						if(data.length >= 10){
							var add = $.ajax({
								url: hostname + '/user/logro/'+fbid,
								method: 'POST',
								data:{
									logro: 4
								},
								dataType: 'json'
							});

							add.done(function(){
								$('#super-comprometido').css({
									display: 'block',
									zIndex: 200,
								});
								loadDataFacebook(fbid);
							});
						}
					});
				}
			}else{
				var load = $.ajax({
					url: hostname + '/user/selfies/'+fbid,
					method: 'GET',
					dataType: 'json'
				});

				load.done(function( data ){
					if(data.length >= 5){
						var add = $.ajax({
							url: hostname + '/user/logro/'+fbid,
							method: 'POST',
							data: {
								logro: 3
							},
							dataType: 'json'
						});

						add.done(function(){
							$('#don-compromisos').css({
								display: 'block',
								zIndex: 200,
							});
							loadDataFacebook(fbid);
						});
					}
				});
			}
		});
	}

	function addLogroTwitter(fbid){
		var load = $.ajax({
			url: hostname + '/user/'+fbid,
			method: 'GET',
			dataType: 'json'
		});

		load.done(function( data ){
			var ids = [];
			$.each(data.achievement, function(i, v){
				ids.push(v.id);
			});
			if ($.inArray('6', ids) > -1){
				//alert('Tiene el logro 60000');
			}else{
				var add = $.ajax({
					url: hostname + '/user/logro/'+fbid,
					method: 'POST',
					data:{
						logro: 6,
					},
					dataType: 'json'
				});

				add.done(function(){
					$('#amante-twitter').css({
						display: 'block',
						zIndex: 200,
					});
					loadDataFacebook(fbid);
				});
			}
		});
	}

	function addLogroShare(fbid){
		var load = $.ajax({
			url: hostname + '/user/'+fbid,
			method: 'GET',
			dataType: 'json'
		});

		load.done(function( data ){
			var ids = [];
			$.each(data.achievement, function(i, v){
				ids.push(v.id);
			});
			if ($.inArray('5', ids) > -1){
				//alert('Tiene el logro 5');
			}else{
				if(data.shares > 5){
					var add = $.ajax({
						url: hostname + '/user/logro/'+fbid,
						method: 'POST',
						data:{
							logro: 5,
						},
						dataType: 'json'
					});

					add.done(function(){
						$('#viralizador').css({
							display: 'block',
							zIndex: 200,
						});
						loadDataFacebook(fbid);
					});
				}
			}
		});
	}

	function addLogroPerfil(fbid){
		var load = $.ajax({
			url: hostname + '/user/'+fbid,
			method: 'GET',
			dataType: 'json'
		});

		load.done(function( data ){
			var ids = [];
			$.each(data.achievement, function(i, v){
				ids.push(v.id);
			});
			if ($.inArray('2', ids) > -1){
				//alert('Tiene el logro 1');
			}else{
				var add = $.ajax({
					url: hostname + '/user/logro/'+fbid,
					method: 'POST',
					data:{
						logro: 2,
					},
					dataType: 'json'
				});

				add.done(function(){
					$('#perfil-completo').css({
						display: 'block',
						zIndex: 200,
					});
					loadDataFacebook(fbid);
				});
			}
		});
	}

	function getActivity(){
		fieldaction = $('.drawermenu').data('fieldaction');

		$.getJSON(hostname + '/users/leaderboard/'+fieldaction, function(json) {
			$('#listUsersLeaderboard').empty();
			$.each(json, function(index, value){
				user = value;
				user.index = ++index;

				var template = $('#listusers').html();
				Mustache.parse(template);
				var rendered = Mustache.render(template, user);
				$('#listUsersLeaderboard').append(rendered);
			});
			actionPerfil();
		});

		$.getJSON(hostname + '/users/leaders', function(json) {
			$('#listUserLeaders').empty();
			$.each(json, function(index, value){
				user = value;
				user.index = ++index;

				var template = $('#listusers').html();
				Mustache.parse(template);
				var rendered = Mustache.render(template, user);
				$('#listUserLeaders').append(rendered);
			});
			actionPerfil();
		});

		$.getJSON(hostname + '/users/selfie', function(json) {
			$('#listSelfies').empty();
			$.each(json, function(index, value){
				selfie = value;
				var template = $('#selfie-single').html();
				Mustache.parse(template);
				var rendered = Mustache.render(template, selfie);
				$('#listSelfies').append(rendered);
			});
			goSelfie();
		});
	}

	function loadUser(userFbid){
		$('#perfil-data ul').empty();
		
		$('.perfil-ciudad-de img').attr('src', '');
		$('.perfil-ciudad-de img').attr('src', 'http://graph.facebook.com/'+userFbid+'/picture?type=large');

		$.getJSON(hostname + '/user/'+userFbid, function(data) {
			var template = $('#perfilde').html();
			var html = Mustache.to_html(template, data);
			$('#perfil-data ul').html(html);
			$('.perfil-name-de').text(data.name);
			$('.title').text('Perfil de '+data.name);
			$('.perfilde').attr('data-title', 'Perfil de '+data.name);
			$('.perfil-bio').text(data.bio);
		});

		$.getJSON(hostname + '/user/selfies/'+userFbid, function(data) {
			photos = data.length;
			username = $('.perfilde').attr('data-username');
			$('#selfies-list').empty();
			if(photos > 0){
				$.each(data, function(index, value){
					var template = $('#perfildephotos').html();
					var html = Mustache.to_html(template, value);
					$('#selfies-list').append(html);
				});
				goSelfie();
				tePonesPorQueTePones(photos);
			}
		});

		$.getJSON(hostname + '/user/'+userFbid, function(data) {
			$('#logros-otros').empty();
			$.each(data.achievement, function(index, value){
				var template = $('#listlogros').html();
				var html = Mustache.to_html(template, value);
				$('#logros-otros').append(html);
			});
		});
	}

	function tePonesPorQueTePones(photos){
		photos = parseInt(photos);
		text =  parseInt($('.photos-otro').text());
		$('.photos-otro').text(photos);
		if( text == photos ){

		}else{
			setTimeout(function(){
				tePonesPorQueTePones(photos)
			}, 500);
		}
	}

	function deleteUser(fbid){
		var Delete = $.ajax({
			url: hostname + '/user/delete/'+fbid,
			method: 'POST',
		});

		Delete.done(function( data ){
			alert('Has borrado tu cuenta con éxito');
		});
	}

	function fillPerfil(fbid){
		$.getJSON(hostname + '/user/selfies/'+fbid, function(data) {
			photos = data.length;
			if(photos > 0){
				$('.photos').text(photos);
				$('.selfies-list').empty();
				$.each(data, function(index, value){
					var template = $('#selfies').html();
					var html = Mustache.to_html(template, value);
					$('.selfies-list').append(html);
				});
			}
			goSelfie();
		});

		$.getJSON(hostname + '/user/'+fbid, function(data) {
			$('#logros').html('');
			$.each(data.achievement, function(index, value){
				var template = $('#listlogros').html();
				var html = Mustache.to_html(template, value);
				$('#logros').append(html);
			});
		});
	}

	/*****************************************
		NOTICIAS
	*****************************************/
	function clickNew(){
		$('.news-view-more').click(function(){
			id = $(this).data('id');
			loadNew(id);

			action = $(this).data('action');
			redirectAction(action);
		});
	}

	function loadNews(index){
		$.getJSON(hostname + 'wordpress/notas/' + index, function(data) {
			if(data && data != ''){
				$.each(data, function(index, value){
					var template = $('#news').html();
					var html = Mustache.to_html(template, value);
					$('.news').append(html);
				});
			}
			$('.more-news').text('Mas noticias...');
			clickNew();
		});
	}

	function loadNew(newId){
		$('.new').empty();
		$.getJSON(hostname + 'wordpress/nota/' + newId, function(data) {
			$('.facebook').attr('data-url', 'http://brillamexico.org/?p='+data.id);
			$('.twitter').attr('data-url', 'http://brillamexico.org/?p='+data.id);
			var template = $('#new').html();
			var html = Mustache.to_html(template, data);
			$('.new').html(html);
			$('.new-text a').on('click', function(e){
				e.preventDefault();
			});
		});
	}

	//dom finish