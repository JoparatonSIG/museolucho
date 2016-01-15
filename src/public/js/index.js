$(document).ready(function() {
	$("#fecha_calendario").change(function(){
		$("#ajax_calendar").removeClass("hide");
		$.get("ajax.get_agenda.php", {i:0, f:$(this).val()}, function(response){
			$("#ajax_calendar").addClass("hide");
			$("#eventos_calendario").html($(response).find("#eventos").html());
			nCantidadEventosAgenda = parseInt($(response).find("#cantidad").html());
			if($(".li_agenda").length >= nCantidadEventosAgenda ) {
				$("#btnCargarMasEventos").hide();
			} else {
				$("#btnCargarMasEventos").show();
			}
		});
	});

	$("#btnCargarMasEventos").click(function(){
		$("#ajax_calendar").removeClass("hide");
		$.get("ajax.get_agenda.php", {i:$(".li_agenda").length, f:$("#fecha_calendario").val()}, function(response){
			$("#ajax_calendar").addClass("hide");
			$("#eventos_calendario_ul").append($(response).find(".events").html());
			nCantidadEventosAgenda = parseInt($(response).find("#cantidad").html());
			if($(".li_agenda").length >= nCantidadEventosAgenda ) {
				$("#btnCargarMasEventos").hide();
			} else {
				$("#btnCargarMasEventos").show();
			}
		});
	});
});
