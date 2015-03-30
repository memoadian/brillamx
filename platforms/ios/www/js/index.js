/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		$( document ).on( "mobileinit", function() {
			$.mobile.loader.prototype.options.disabled = true;
		});

		document.onselectstart = function(){
			return false;
		}

			//FastClick.attach(document.body);

			//status login
			/*openFB.getLoginStatus(function(loginStatus){
				if(loginStatus.status === 'unknown'){
					redirectAction('registro1');
				}else{
					index = '.perfil';

					$(index).fadeIn();
					$(index).css({
						opacity: 1,
						zIndex: 0,
					});

					backgroundBody = $(index).data('body');
					navbarStatus = $(index).data('navbar');

					$('body').css('background', backgroundBody);
					if(navbarStatus == 'si'){
						$('.navbar').css('display','block');
					}else{
						$('.navbar').css('display','none');
					}
				}
			});*/

			/********************************************
				BORRAR ESTO Y HABILITAR LO PRIMERO
			*********************************************/
/*			$('.drawermenu').data('fieldaction', 1);
			loadUser(16265420942320483);
			loadDataFacebook(16265420942320483);
			updateCompromisos(16265420942320483);*/

			index = '.registro1';

			fbid = $('.drawermenu').data('fbid');
			fieldaction_id = $('.drawermenu').data('fieldaction_id');

			$(index).fadeIn();
			$(index).css({
				opacity: 1,
				zIndex: 0,
			});

			backgroundBody = $(index).data('body');
			navbarStatus = $(index).data('navbar');

			$('body').css('background', backgroundBody);
			if(navbarStatus == 'si'){
				$('.navbar').css('display','block');
			}else{
				$('.navbar').css('display','none');
			}

			/********************************************
				BORRAR ESTO Y HABILITAR LO PRIMERO
			*********************************************/

			height = $(window).height();

			$('.content, .content2').height(height - 72);
			$('.content-trans').height(height);

			$('.drawercontent').height(height);

			$('.login_ciudad').click(function(){
				video = document.getElementById('video');
				video.play();
			});
			/********************************************
				SWIPER SLIDER
			*********************************************/
			var mySwiper = new Swiper ('.swiper-container1', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,

				// If we need pagination
				pagination: '.swiper-pagination1',
			});

			var mySwiper = new Swiper ('.swiper-container2', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,

				// If we need pagination
				pagination: '.swiper-pagination2',
			});

			var mySwiper = new Swiper ('.swiper-container3', {
				// Optional parameters
				direction: 'horizontal',
				loop: true,

				// If we need pagination
				pagination: '.swiper-pagination3',
			});

			function updateCompromisos(fbid){
				var compromisos = $.ajax({
					url: 'http://api.brillamexico.org/user/selfies/'+fbid,
					method: 'GET',
					dataType: 'json'
				});

				compromisos.done(function( data ) {
					$.each(data, function(index, value){
						disabledPhoto(value.engagement_id);
					});
				});
			}

			function disabledPhoto(number){
				$('.eng-'+number).css({
					background: '#929292',
				})
				.find('.button-circle').removeClass('action')
				.find('img').attr('src', 'img/ic_checked.png');
			}

			/********************************************
				ACTIONS
			*********************************************/

			$(document).on('click touchend', '.news-view-more ', function(){
				id = $(this).data('id');
				loadNew(id);
				action = $(this).data('action');
				backgroundBody = $('.'+action).data('body');
				navbarStatus = $('.'+action).data('navbar');
				title = $('.'+action).data('title');

				$('section').hide();
				$('.'+action).fadeIn();
				$('.'+action).css({
					opacity: 1,
					zIndex: 0,
				});

				$('body').css('background', backgroundBody);
				$('.title').text(title);

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
			});

			$('.action').click(function(){
				action = $(this).data('action');
				backgroundBody = $('.'+action).data('body');
				navbarStatus = $('.'+action).data('navbar');
				title = $('.'+action).data('title');
				back = $('.'+action).data('back');
				backtion = $('.'+action).attr('data-backtion');
				edit = $('.'+action).attr('data-edit');

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

				$('section').hide();
				$('.'+action).fadeIn();
				$('.'+action).css({
					opacity: 1,
					zIndex: 0,
				});

				$('body').css('background', backgroundBody);
				$('.title').text(title);

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
			});

			$('.tabs a').click(function(event) {
				event.preventDefault();
				var action = $(this).attr('href');
				$('.tab').hide();
				$(action).fadeIn();

				$('.tabs a').removeClass('active');
				$(this).addClass('active');
			});

			$('.action-fieldaction').click(function(){
				action = $(this).data('action');
				fieldaction = $(this).data('fieldaction');
				backgroundBody = $('.'+action).data('body');
				title = $('.'+action).data('title');

				$('.registro3').attr('data-fieldelected', fieldaction);

				$('section').hide();
				$('.'+action).fadeIn();

				$('body').css('background', backgroundBody);
				$('.title').text(title);
			});

			$('.action-send').click(function(){
				username = $('input[name="username"]').val();
				if(username == ''){
					doBounce($('input[name="username"]'), 3, '10px', 100);
				}else{
					action = $(this).data('action');
					backgroundBody = $('.'+action).data('body');
					$('section').hide();
					$('.'+action).fadeIn();
					$('body').css('background', backgroundBody);
					$('.un-h').text(username);
				}
			});

			$('.si').click(function(){
				var fbid = $('.drawermenu').attr('data-fbid');
				deleteUser(fbid);
			});

			function actionPerfil(){
				$('.actionperfil').click(function(){
					$('#selfies-list').empty();
					userFbid = $(this).data('id');
					loadUser(userFbid);

					action = $(this).data('action');
					backgroundBody = $('.'+action).data('body');
					navbarStatus = $('.'+action).data('navbar');
					title = $('.'+action).data('title');
					back = $('.'+action).data('back');
					backtion = $('.'+action).attr('data-backtion');
					edit = $('.'+action).attr('data-edit');

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

					$('section').hide();
					$('.'+action).fadeIn();
					$('body').css('background', backgroundBody);
					$('.title').text(title);

					if(navbarStatus == 'si'){
						$('.navbar').css('display','block');
					}else{
						$('.navbar').css('display','none');
					}
				});
			}

			function goSelfie(){
				$('.goselfie').click(function(){
					action = $(this).data('action');
					backgroundBody = $('.'+action).data('body');
					navbarStatus = $('.'+action).data('navbar');
					title = $('.'+action).data('title');
					picture = $(this).data('picture');
					userfbid = $(this).data('userfbid');
					username = $(this).data('username');
					description = $(this).data('desc');
					back = $('.'+action).data('back');
					backtion = $('.'+action).data('backtion');
					edit = $('.'+action).attr('data-edit');

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

					$('.viewselfie-img img').attr('src', '');
					$('.viewselfie-profile').attr('src', '');

					$('.viewselfie-img img').attr('src', 'http://api.brillamexico.org/pictures/'+picture);
					$('.viewselfie-profile').attr('src', 'http://graph.facebook.com/'+userfbid+'/picture?type=large');
					$('.viewselfie-name').text(username);
					$('.viewselfie-desc').text(description);

					$('section').hide();
					$('.'+action).fadeIn();

					$('body').css('background', backgroundBody);
					$('.title').text(title);

					if(navbarStatus == 'si'){
						$('.navbar').css('display','block');
					}else{
						$('.navbar').css('display','none');
					}
				});
			}

			function redirectAction(action){
				backgroundBody = $('.'+action).data('body');
				navbarStatus = $('.'+action).data('navbar');
				title = $('.'+action).data('title');
				edit = $('.'+action).attr('data-edit');

				if(edit == 'true'){
					$('.edit').show();
				}else{
					$('.edit').hide();
				}

				$('section').hide();
				$('.'+action).fadeIn();
				$('.'+action).css({
					opacity: 1,
					zIndex: 0,
				});

				$('body').css('background', backgroundBody);
				$('.title').text(title);

				if(navbarStatus == 'si'){
					$('.navbar').css('display','block');
				}else{
					$('.navbar').css('display','none');
				}
			}

			function doBounce(element, times, distance, speed) {
				for(i = 0; i < times; i++) {
					element.animate({marginTop: '-='+distance},speed).animate({marginTop: '+='+distance},speed);
				}
			}

			/********************************************
				DRAWER MENU
			*********************************************/
			Hammer(document.body).on('panright', function(e){
				drawer = $('section:visible').data('drawer');
				left = $('.drawermenu').css('margin-left').replace('px', '');
				if(drawer == 'si' && e.direction == 4 && e.center['x'] - left < 350){
					if(left < 0){
						$('.drawermenu').css({
							marginLeft: '+=4',
						});
					}
				}
			});

			Hammer(document.body).on('panleft', function(e){
				drawer = $('section:visible').data('drawer');
				if(drawer == 'si' && e.direction == 2){
					var left = $('.drawermenu').css('margin-left').replace('px', '');
					$('.drawermenu').css({
						marginLeft: '-=4',
					});
				}
			});

			Hammer(document.body).on('panend', function(e){
				drawer = $('section:visible').data('drawer');
				left = $('.drawermenu').css('margin-left').replace('px', '');

				if(drawer == 'si'){
					if(e.velocityX < -0.01 || e.velocityX > 0.01){
						if(e.direction == 4 && e.center['x'] - left < 450){
							$('.drawermenu').animate({
								marginLeft: 0,
							}, 200, function(){

							});
							$('.cortina').fadeIn(500);
						}else if(e.direction == 2){
							$('.drawermenu').animate({
								marginLeft: -280,
							}, 200, function(){

							});
							$('.cortina').fadeOut(500);
						}else{
							if(left < 0){
								if(left > -130){
									$('.drawermenu').animate({
										marginLeft: 0,
									}, 400, function(){

									});
								}else{
									$('.drawermenu').animate({
										marginLeft: -280,
									}, 400, function(){

									});
								}
							}
						}
					}else{
						if(left > -130){
							$('.drawermenu').animate({
								marginLeft: 0,
							}, 400, function(){

							});
						}else{
							$('.drawermenu').animate({
								marginLeft: -280,
							}, 400, function(){

							});
						}
					}
				}
			});

			$('.menu').click(function(){
				$('.drawermenu').animate({
					marginLeft: 0,
				}, 200, function(){

				});
				$('.cortina').fadeIn(300);
			});

			$('.cortina').on('click tap', function(){
				$('.drawermenu').animate({
					marginLeft: -280,
				}, 500, function(){

				});
				$(this).fadeOut(500);
			});

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
						url: 'http://api.brillamexico.org/user/points/'+fbid,
						method: 'POST',
						data: {points: 10}
					});
					$.getJSON('http://api.brillamexico.org/user/selfies/'+fbid, function(data) {
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
						updateCompromisos(fbid);
					});
					$('.share-button').text('COMPARTIR');
					goSelfie();
				};
				fail = function(error) {
					redirectAction('perfil');
				};

				var sourceImage = $('#largeImage');
				imageURI = sourceImage.attr("src");

				options = new FileUploadOptions();
				options.fileKey = "picture";
				options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
				options.mimeType = "text/plain";

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
						}
					} else {
						loadingStatus.increment();
					}
				};
				ft.upload(imageURI, "http://api.brillamexico.org/user/selfie/"+fbid, success, fail, options);
			}

			$('.share-button').click(function(){
				uploadPhoto();
			})

			$('.camera').click(function(){
				div = $(this).closest('div');
				string = div.attr('class');
				compromiso = string.match(/\d+/)[0];
				$('.share').attr('data-compromiso', compromiso);
				$('.loadCamara').show();
				setTimeout(function(){
					$('.loadCamara').hide();
				}, 10000);
				takePicture();
			});

			/********************************************
				FACEBOOK
			*********************************************/
			openFB.init({appId: '605895716209070'});

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
						console.log(JSON.stringify(data));
						//fbid, twid, name, email, fieldaction_id, gender, age
						//data.id
						//data.name
						//data.email
						//data.gender
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

			function errorHandler(error) {
				navigator.notification.alert(error.message, '', 'error', 'ok');
			}

			$('.logIn').click(function(){
				$(this).text('Conectando...');
				setTimeout(function(){
					$('.logIn').text('Iniciar Sesión con Facebook');
				}, 3000);
				login();
			});

			$('.logOut').click(function(){
				//vaciar datas
				$('.drawermenu').data('fbid', '').data('fieldaction_id', '');
				openFB.logout(function(){
					redirectAction('registro1');
				});
			});

			/********************************************
				TEMPLATES
			*********************************************/

			function loadDataFacebook(fbid){
				var load = $.ajax({
					url: 'http://api.brillamexico.org/user/'+fbid,
					method: 'GET',
					dataType: 'json'
				});

				load.done(function( data ){
					if(data.error){
						navigator.notification.alert('Esta cuenta no existe', null, "Alerta", "Cerrar");
					}else{
						foto = 'http://graph.facebook.com/'+fbid+'/picture?type=large';
						$('.foto').attr('src', foto);

						achievement = data.achievement.length;
						$('.name, .perfil-name').text(data.name);
						$('.points').text(data.points);
						$('.achievement').text(achievement);
						$('.perfil-status').text(data.bio);
						fieldaction_id = data.fieldaction_id;
						redirectAction('perfil');

						$.getJSON('http://api.brillamexico.org/user/selfies/'+fbid, function(data) {
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

						$.getJSON('http://api.brillamexico.org/user/'+fbid, function(data) {
							$.each(data.achievement, function(index, value){
								var template = $('#listlogros').html();
								var html = Mustache.to_html(template, value);
								$('#logros').append(html);
							});
						});

						$('.drawermenu').attr('data-fbid', fbid).attr('data-fieldaction', data.fieldaction_id);

						if(fieldaction_id == 1){
							$('.camera-button').attr('data-action', 'preselfie-jovenes');
						}else if(fieldaction_id == 2){
							$('.camera-button').attr('data-action', 'preselfie-emprendedores');
						}else{
							$('.camera-button').attr('data-action', 'preselfie-empresarios');
						}

						getActivity();
					}
				});
			}

			function registerFacebook(fbid, twid, name, email, fieldaction_id, gender, age){

				var register = $.ajax({
					url: 'http://api.brillamexico.org/user/register',
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
						url: 'http://api.brillamexico.org/user/'+fbid,
						method: 'GET',
						dataType: 'json'
					});

					request.done(function( data ) {
						achievement = data.achievement.length;
						$('.name, .perfil-name').text(data.name);
						$('.points').text(data.points);
						$('.achievement').text(achievement);
						fieldaction_id = data.fieldaction_id;
						redirectAction('perfil');

						$.getJSON('http://api.brillamexico.org/user/selfies/'+fbid, function(data) {
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

						$('.drawermenu').data('fbid', fbid).data('fieldaction', data.fieldaction_id);

						if(fieldaction_id == 1){
							$('.camera-button').attr('data-action', 'preselfie-jovenes');
						}else if(fieldaction_id == 2){
							$('.camera-button').attr('data-action', 'preselfie-emprendedores');
						}else{
							$('.camera-button').attr('data-action', 'preselfie-empresarios');
						}

						getActivity();
					});
				});
			}

			function getActivity(){
				var hostname = 'http://api.brillamexico.org';

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

			function loadNew(newId){
				$('.new').empty();
				$.getJSON('http://brillamexico.org/api.php?post='+newId, function(data) {
					var template = $('#new').html();
					var html = Mustache.to_html(template, data);
					$('.new').html(html);
					$('.new-text a').on('click', function(e){
						e.preventDefault();
					});
				});
			}

			function loadUser(userFbid){
				$('#perfil-data ul').empty();
				
				$('.perfil-ciudad-de img').attr('src', '');
				$('.perfil-ciudad-de img').attr('src', 'http://graph.facebook.com/'+userFbid+'/picture?type=large');

				$.getJSON('http://api.brillamexico.org/user/'+userFbid, function(data) {
					var template = $('#perfilde').html();
					var html = Mustache.to_html(template, data);
					$('#perfil-data ul').html(html);
					$('.perfil-name-de').text(data.name);
					$('.perfilde').attr('data-username', data.name);
					$('.perfil-bio').text(data.bio);
				});

				$.getJSON('http://api.brillamexico.org/user/selfies/'+userFbid, function(data) {
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
					}
					$('.title').text('Perfil de '+username);
					tePonesPorQueTePones(photos);
				});
			}

			function tePonesPorQueTePones(photos){
				if( $('.photos-otro').length ){
					$('.photos-otro').text(photos);
				}else{
					setTimeout(function(){
						tePonesPorQueTePones(photos)
					}, 500);
				}
			}

			function deleteUser(fbid){
				var Delete = $.ajax({
					url: 'http://api.brillamexico.org/user/delete/'+fbid,
					method: 'POST',
				});

				Delete.done(function( data ){
					alert(data.status);
				});
			}

			/*****************************************
				NOTICIAS
			*****************************************/
			var index = 2;
			$('.more-news').click(function(){
				loadNews(index);
				$(this).text('Cargando...');
				index++;
			});

			function loadNews(index){
				$.getJSON('http://brillamexico.org/api.php', { page: index }, function(data) {
					if(data && data != ''){
						$.each(data, function(index, value){
							var template = $('#news').html();
							var html = Mustache.to_html(template, value);
							$('.news').append(html);
						});
					}
					$('.more-news').text('Mas noticias...');
				});
			}

			$.getJSON('http://brillamexico.org/api.php', { page: 1 }, function(data) {
				$.each(data, function(index, value){
					var template = $('#news').html();
					var html = Mustache.to_html(template, value);
					$('.news').append(html);
				});
			});


			//dom finish
	}
};

app.initialize();