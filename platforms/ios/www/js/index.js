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

		var newsPage = 2;
		var hostname = 'http://api.brillamexico.org/';
		FastClick.attach(document.body);
		loadNews(1);
		openFB.init({appId: '605895716209070'});

		//preloads for navigator
		loadDataFacebook(855665064499720);

		openFB.getLoginStatus(function(loginStatus){
			if(loginStatus.status === 'unknown'){
				index = 'perfil';
				redirectAction(index);
			}else{
				index = 'perfil';
				redirectAction(index);
			}
		});

	/*//Configs twitter
		var APP_KEY = "GmdbD9T3jaf5fcC2Bfc1R6YqmZM";
		 
		// COnfiguramos Oauth
		OAuth.initialize(APP_KEY);
		 
		$('[data-action]').on('click', function (e) {
			var $self = $(this);
			var action = $self.data('action');
			doAction(action);
		});
		var doAction = function (action) {
			if (action === "linkTwitter") {
				linkTwitter();
			}
		}
		 
		function linkTwitter () {
			OAuth.popup('twitter').done(function(result) {
				console.log(result);
				result.me().done(function(data) {
					var fbid = $('.drawermenu').attr('data-fbid');
					var twit = $.ajax({
						url: hostname + 'user/twitter/'+fbid,
						method: 'POST',
						data: {
							twid: data.id
						}
					});
					twit.done(function(){
						addLogroTwitter(fbid);
						$('.outputTwitterID').text('Conectado a twitter');
					});
				});
			});
		}*/

		height = $(window).height();

		$('.content, .content2').height(height - 72);
		$('.content-trans').height(height);
		$('.drawercontent').height(height);

		/********************************************
			SWIPER SLIDER
		*********************************************/
		var mySwiper1 = new Swiper ('.swiper-container1', {
			direction: 'horizontal',
			loop: true,
			pagination: '.swiper-pagination1',
		});

		var mySwiper2 = new Swiper ('.swiper-container2', {
			direction: 'horizontal',
			loop: true,
			pagination: '.swiper-pagination2',
		});

		var mySwiper3 = new Swiper ('.swiper-container3', {
			direction: 'horizontal',
			loop: true,
			pagination: '.swiper-pagination3',
		});

		/********************************************
			ACTIONS
		*********************************************/

		$('.login_ciudad').click(function(){
			video = document.getElementById('video');
			video.play();
		});

		$('.action').click(function(){
			action = $(this).data('action');
			redirectAction(action);
		});

		$('.action-fieldaction').click(function(){
			action = $(this).data('action');
			redirectAction(action);
		});

		$('.action-send').click(function(){
			username = $('input[name="username"]').val();
			if(username == ''){
				doBounce($('input[name="username"]'), 3, '10px', 100);
			}else{
				action = $(this).data('action');
				redirectAction(action);
				$('.un-h').text(username);
			}
		});

		$('.save').click(function(){
			var fbid = $('.drawermenu').attr('data-fbid');
			var nombre = $('input[name="nombre"]').val();
			var biografia = $('input[name="biografia"]').val();
			var update = $.ajax({
				url: hostname + 'user/edit/'+fbid,
				method: 'POST',
				data: {
					name: nombre,
					bio: biografia
				}
			});

			update.done(function(data){
				loadDataFacebook(fbid);
				addLogroPerfil(fbid);
			});
		});

		$('.tabs a').click(function(event) {
			event.preventDefault();
			var action = $(this).attr('href');
			$('.tab').hide();
			$(action).fadeIn();

			$('.tabs a').removeClass('active');
			$(this).addClass('active');
		});

		$('.si').click(function(){
			var fbid = $('.drawermenu').attr('data-fbid');
			deleteUser(fbid);
		});

		$('.logIn').click(function(){
			$(this).text('Conectando...');
			setTimeout(function(){
				$('.logIn').text('Iniciar Sesión con Facebook');
			}, 3000);
			login();
		});

		$('.logOut').click(function(){
			//vaciar datas
			$('.drawermenu').attr('data-fbid', '').attr('data-fieldaction_id', '');
			openFB.logout(function(){
				redirectAction('registro1');
			});
		});

		$('.menu').click(function(){
			$('.drawermenu').animate({
				marginLeft: 0,
			}, 200);
			$('.cortina').fadeIn(300);
		});

		$('.cortina').on('click', function(){
			$('.drawermenu').animate({
				marginLeft: -280,
			}, 500);
			$(this).fadeOut(500);
		});

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

		$('.new-share').click(function(){
			var fbid = $('.drawermenu').attr('data-fbid');
			var url = $(this).attr('data-url');
			window.plugins.socialsharing.share('Les comparto esto', null, null, url, function(){
				shares = $.ajax({
					url: hostname + 'share/'+fbid,
					method: 'POST',
					data:{
						share: 'share'
					}
				});

				shares.done(function(){
					alert('compartido');
				});
			});
		});

		$('div.logro-section').click(function(){
			$(this).css({
				zIndex: -200,
			});
		});

		$('.viewselfie-share').click(function(){
			var url = $(this).attr('data-url');
			window.plugins.socialsharing.share('Les comparto esto', null, null, url);
		});

		$('.more-news').click(function(){
			loadNews(newsPage);
			$(this).text('Cargando...');
			newsPage++;
		});

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
	}
};

app.initialize();