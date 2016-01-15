var miembros = {
	init:function() {
		miembros.down();
		$('.miembros').parent().find('.up').hide();
	},
	
	down:function(){

		$('.miembros').parent().find('.down').bind('click',function(e){

			// que enlace he clickado
			$linkUl = $(this).attr('href');

			// cuanto mide el li para desplegar y cuantos hay
			$heightUl = $($linkUl).find('li').innerHeight();
			$cuantosLi = $($linkUl).find('li').length;

			$heightUl2 = $heightUl * $cuantosLi;

			// animamos el despliegue
			$($linkUl).animate({
				height: '' + $heightUl2 + 'px'
			},500);

			$($linkUl).addClass('sel');
			$(this).hide();
			$(this).parent().find('.up').show();

			miembros.up();

			e.preventDefault();

		});
	},

	up:function(){

		$('.miembros').parent().find('.up').bind('click',function(e){

			// que enlace he clickado
			$linkUl = $(this).attr('href');

			$($linkUl).animate({
				height: '3em'
			},500);

			$($linkUl).addClass('sel');
			$(this).hide();
			$(this).parent().find('.down').show();

			miembros.down();

			e.preventDefault();

		});

	}
}

var citas = {
	init:function(){
		$('.cita').hide();

		citas.show();
	},

	show:function(){
		$('.citar').bind('click',function(e){

			$(this).parent().find('.cita').slideToggle();

			e.preventDefault();
		});

		citas.close();
	},

	close:function(){
		$('.cita [href="#close"]').bind('click',function(e){

			$(this).parent().slideToggle();

			e.preventDefault();
		});
	}
}

var investigacion = {
	init:function() {
		investigacion.down();
		$('.investigacion .up').hide();
	},
	
	down:function(){

		$('.investigacion .down').bind('click',function(e){

			// que enlace he clickado
			$linkUl = $(this).attr('href');

			// animamos el despliegue
			$($linkUl).slideDown();

			$($linkUl).addClass('sel');
			$(this).hide();
			$(this).parent().find('.up').show();

			investigacion.up();

			e.preventDefault();

		});
	},

	up:function(){

		$('.investigacion .up').bind('click',function(e){

			// que enlace he clickado
			$linkUl = $(this).attr('href');

			$($linkUl).slideUp();

			$($linkUl).addClass('sel');
			$(this).hide();
			$(this).parent().find('.down').show();

			investigacion.down();

			e.preventDefault();

		});

	}
}

var menu = {
	init:function(){

		$('body').on('click', function (e) {
		    if (!$('li.dropdown').is(e.target) && $('li.dropdown').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
		        $('li.dropdown').removeClass('open');
		    }
		});

	}
}

var newsletter = {
	init:function(){

		$sender = $('.progress-button button');

		newsletter.send();
	},
	send:function(){

	    $sender.click(function(e){

	    	if($('#emailLogin').val() == '' ){
	    		// cuando clickas empieza la animacion carga
		        $(this).parent().addClass('loading');

		        // avanzar el relleno del cargar
		        $('.progress-circle path').animate({strokeDashoffset:'0'},750,

		            // al terminar la animacion lanzamos si ok o si error
		            function(){
		                $(this).parent().parent().removeClass('loading');

		                // para error
		                $(this).parent().parent().addClass('error');
		                $(this).parent().parent().removeClass('success');
		                $('.cross path').animate({strokeDashoffset:'0'},300);
		            }
		        );
	    	}
	    	else{
	    		// cuando clickas empieza la animacion carga
		        $(this).parent().addClass('loading');

		        // avanzar el relleno del cargar
		        $('.progress-circle path').animate({strokeDashoffset:'0'},750,

		            // al terminar la animacion lanzamos si ok o si error
		            function(){
		                $(this).parent().parent().removeClass('loading');

		                // para ok
		                $(this).parent().parent().addClass('success');
		                $(this).parent().parent().removeClass('error');
		                $('.checkmark path').animate({strokeDashoffset:'0'},300);

		            }
		        );
	    	}

	        e.preventDefault();
	    });
	},
	ok:function(){

		// cuando clickas empieza la animacion carga
        $(this).parent().addClass('loading');
        // avanzar el relleno del cargar
        $('.progress-circle path').animate({strokeDashoffset:'0'},750,

            // al terminar la animacion lanzamos si ok o si error
            function(){
                $(this).parent().parent().removeClass('loading');

                // para ok
                $(this).parent().parent().addClass('success');
                $(this).parent().parent().removeClass('error');
                $('.checkmark path').animate({strokeDashoffset:'0'},300);

            }
        );
	},
	error:function(){
		// cuando clickas empieza la animacion carga
        $(this).parent().addClass('loading');

        // avanzar el relleno del cargar
        $('.progress-circle path').animate({strokeDashoffset:'0'},750,

            // al terminar la animacion lanzamos si ok o si error
            function(){
                $(this).parent().parent().removeClass('loading');

                // para error
                $(this).parent().parent().addClass('error');
                $(this).parent().parent().removeClass('success');
                $('.cross path').animate({strokeDashoffset:'0'},300);
            }
        );
	}
}

var accordion = {
	init:function(){
		var obj = $('.sesion .hidden');

		obj.hide();

		accordion.toggle();
	},
	toggle:function(){
		$('.sesion .down').on('click',function(){

			$(this).parent().find('.toggle').removeClass('hidden').slideToggle();
		});
	}
}

var contacto = {
	init:function(){
		url = window.location.href;
		url = url.split('?');

		if(url[1] == 'sel=tienda'){
			$('#id_departamento option[value="7"]').attr("selected",true);
		}
	}
}

//script para la barra de cookies
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/";
	document.cookie=c_name + "=" + c_value;
}


function getIdioma(){
	var idioma='';
	$.post("/ajax-get-idioma.php", {
		}, function(respo){
			idioma = respo;
		});
	return idioma;
}

function traducirPalabra(palabra){
    var traduccion = null;
	$.ajax({
        'async': false,
        'type': "POST",
        'global': false,
        'dataType': 'html',
        'url': "/ajax.traducir-palabra.php",
        'data': { 'p': palabra },
        'success': function (data) {
            traduccion = data;
        }
    });
    return traduccion;
}

$(document).ready(function () {
	

    if($('.contactForm').length != 0){

    	contacto.init();
    }

	//barra cookies
	jQuery('.ca_close').click(function(c){
		jQuery(this).parent().fadeOut('slow', function(c){
		
		});
	});

	function readCookie(name) {
		
		
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
		return null;
	}



	var $ca_banner = jQuery('#ca_banner');
	var $ca_infoplus = jQuery('.infoplus');
	var $ca_info = jQuery('#ca_info');
	var $ca_info_close = jQuery('.ca_info_close');
	var $ca_infoaccept = jQuery('.accept');

	var cookieaccept = readCookie('cookieaccept');
	if(!(cookieaccept == "yes")){

		jQuery(".bt-menu ul").css("top", "135px");
		jQuery(".bt-menu-trigger").css("top", "110px");
		jQuery(".bt-menu").css("top", "94px");
		
		//$ca_banner.delay(1000).slideDown('fast'); 
		$ca_banner.slideDown('slow'); 
		$ca_infoplus.click(function(){
			$ca_info.fadeIn("fast");
		});
		$ca_info_close.click(function(){
			$ca_info.fadeOut("slow");
		});
		$ca_infoaccept.click(function(){
			jQuery(".bt-menu ul, .bt-menu-trigger, .bt-menu").removeAttr("style");
			setCookie("cookieaccept","yes",365);
			setCookie("cookieaccept_real","yes",365);
			jQuery.post('http://www.suggiero.com/regulacion-de-cookies-y-la-nueva-ley-de-cookies-de-la-ue.html', 'set_cookie=1', function(){});
			$ca_banner.slideUp('slow');
			$ca_info.fadeOut("slow");
		});
	} 




    //newsletter de la home
    $(".progress-button button").bind('click', function (e) {
        var email = $("#emailLogin").val();
        var condiciones = $("#recordar").is(':checked');
        var error = false;
        var url = ($(this).closest('form').data('ajax') != 'undefined') ? $(this).closest('form').data('ajax') : '/ajax.altanewsletter.php';

        //validamos en js antes de enviar
        //validamos email
        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!expr.test(email)) {
            error = true;
            $("#emailLogin").addClass('error');
        }
        else{

            $("#emailLogin").removeClass('error');
        }

        //validamos condiciones igual a true
        if (condiciones == false) {
            error = true;
            $("#recordar").addClass('error');
        }
        else{

            $("#recordar").removeClass('error');
        }

        // si alguna de las anteriores es cierta salgo
        if (!error) {
            $('.progress-button div').addClass('sp-3balls').parent().css('height', '40px');;
            //hacemos la llamada ajax        
            $.post(url, {
                email: email,
                condiciones: condiciones,
                home: true
            }, function (respo) {
                
                switch (respo) {
                    case "32":
                        //32-> error validacion mail y condiciones
                        newsletter.error();
						break;
                    case "3":
                        //3-> error validacion mail
                        newsletter.error();
						break;
                    case "2":
                        //2->error validacion condiciones
						newsletter.error();
						break;
                    case "1":
                        //ok
                        newsletter.ok();
						break;
                    case "0":
                        //no-ok
                        newsletter.error();
						break;
                    default:
                    	break;
                }
                $('.suscripcion-newsletter').show();
            });
        }       
        e.preventDefault();
    });


	if($('.miembros').length != 0 ) {
		miembros.init();
	}

	if($('.investigacion').length != 0 ) {
		investigacion.init();
	}

	if($('.citar').length != 0 ) {
		citas.init();
	}

	if($('.navbar').length != 0 ) {
		menu.init();
	}


	// touch event for sliders
	if($('.carousel').length){

		$(".carousel").swiperight(function() {
			$(this).carousel('prev');
		});
		$(".carousel").swipeleft(function() {
			$(this).carousel('next');
		});

		$('.obrasComentadas .carousel').each(function(){
	        $(this).carousel({
	            interval: false
	        });
	    });

		//Modificado para que se mueva
		$('.homeSlider').each(function(){
	        $(this).carousel({
	            interval: 4500,
	            pause: 'hover'
	        });
	    });

		//Modificado para que se mueva
		$('.relatedContent').each(function(){
	        $(this).carousel({
	            interval: false,
	            pause: 'hover'
	        });
	    });

	    $('.column').each(function(){
	        $(this).carousel({
	            interval: false,
	            pause: 'hover'
	        });
	    });
 

	    $('#revista').each(function(){
	        $(this).carousel({
	            interval: false,
	            pause: 'hover'
	        });
	    });


	    
	}

	// Add slideDown animation to dropdown
	$('.dropdown').on('show.bs.dropdown', function(e){
	  $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	});

	// Add slideUp animation to dropdown
	$('.dropdown').on('hide.bs.dropdown', function(e){
	  $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	});

	/*$('#myNavbar').affix({
      offset: {
        top: $('.navbar').height()
      }
	});*/	

	if ($('.lightbox').length != 0){

		// Initialize popup as usual
		$('.lightbox').magnificPopup({ 
		  type: 'image',
		  closeOnContentClick: true,
		  mainClass: 'mfp-img-mobile', // this class is for CSS animation below

			image: {
				verticalFit: true
			}

		});
	}


	if ($('select#amigos').length != 0){
        $('select#amigos').change(function(){

        	$( "select#amigos option:selected" ).each(function() {
				$destino = $(this).attr('value'); 
			});            

            $(this).parent().parent().attr('action',$destino + '.php');

            $('form#amigos').submit();
        });
    }


	if ($('input#otraDir').length != 0){
        $('input#otraDir').change(function(){

        	$(this).parent().parent().find('.extra').slideToggle();

        });
    }

	if ($('input#registrarmeMuseo').length != 0){
        $('input#registrarmeMuseo').change(function(){

        	$(this).parent().parent().find('.extra').slideToggle();

        });
    }

    if($('.sesion').length != 0){

    	accordion.init();
    }

	if ($('select').length != 0) { 
		$('select:not(.nocustom)').customSelect();
	}
	
	$('.popup.inline').magnificPopup({
	  	type:'inline',
	  	midClick: true
	});

});

$(window).resize(function() {
	wwidth = $(window).width();
	if (wwidth < 1199) {
		$('select:not(.nocustom)').trigger('update');
	}
});


var arrWindows = new Array('');

function openPopup(strURL, intAncho, intAlto, bolShowBorders, bolScroll, strName){
    
    if (arrWindows.length == 1)
        openPopupWindow(strURL, intAncho, intAlto, bolShowBorders, bolScroll, strName, false);
    else{
        bolPopupFound = false;
        for (i = 1; i < arrWindows.length; i++){
            if (!arrWindows[i].closed){
                if (arrWindows[i].name == strName){
                    arrWindows[i].focus();
                    bolPopupFound = true;
                    break;
                }
            }
        }
        if (!bolPopupFound)
            openPopupWindow(strURL, intAncho, intAlto, bolShowBorders, bolScroll, strName, false);
    }
}

function openPopupWindow(strURL, intAncho, intAlto, bolShowBorders, bolScroll, strName, intIndex){
    strProperties = 'left=' + (screen.availWidth - intAncho) / 2 + ',top=' + (screen.availHeight - intAlto) / 2 + ',width=' + intAncho + ',height=' + intAlto + ',menubar=no,resizable=no,status=no';
    strProperties += (bolScroll) ? ',scrollbars=yes' : ',scrollbars=no';
    strProperties += (bolShowBorders) ? ',fullscreen=yes' : '';
    intWindow = (intIndex) ? intIndex : arrWindows.length;
    arrWindows[intWindow] = window.open(strURL, strName, strProperties);
    if (bolShowBorders){
        self.focus();
        setTimeout("arrWindows[" + intWindow + "].resizeTo(" + intAncho + "," + intAlto + ")", 50);
        setTimeout("arrWindows[" + intWindow + "].moveTo(" + (window.screen.width - intAncho) / 2 + ", " + (window.screen.height - intAlto) / 2 + ")", 50);
    }
    setTimeout("arrWindows[" + intWindow + "].focus()", 50);
}

function imprimir_comprobante() {
    openPopup("imprimir_comprobante_catalogo.php", 800, 600, false, true, "comprobante");
}
    
function imprimir_comprobante_pdf() {
    openPopup("imprimir_comprobante_catalogo_pdf.php", 800, 600, false, true, "comprobante");
}
$(document).ready(function(){ 


	 $('.stacktable').stacktable();

	$("input[placeholder]").each( function () {
		placeholder = $(this).attr("placeholder");
		placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
		$(this).attr("placeholder", placeholder);
	});

	$("textarea[placeholder]").each( function () {
		placeholder = $(this).attr("placeholder");
		placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
		$(this).attr("placeholder", placeholder);
	});
	$("textarea[placeholder]").each( function () {
		placeholder = $(this).attr("placeholder");
		placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
		$(this).attr("placeholder", placeholder);
	});
	
	$('select option[value="-1"]').each( function () {
		placeholder = $(this).text();
		placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
		$(this).text(placeholder);
	});
	$('form .customSelect .customSelectInner').each( function () {
		placeholder = $(this).text();
		placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
		$(this).text(placeholder);
	});
});
