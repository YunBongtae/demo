
/* zone 움직이기 */
var mapEdit,mapMadeElem= $('#graph');
var zoneStyleData = {
	on: { 'stroke-opacity' : '0.3', 'stroke-width' :'2', 'fill' :'rgb(0,129,198)', 'fill-opacity' :'0.2','data-on':'true' ,'data-bool':'true'},
	off: { 'stroke-opacity' : '0.3', 'stroke-width' :'2', 'fill' :'rgb(0,0,0)', 'fill-opacity' :'0.1' ,'data-on':'false','data-bool':'false'},
	edit:	{ 'stroke-opacity' : '1', 'stroke-width' :'2', 'fill' :'rgb(0,129,198)', 'fill-opacity' :'0.2','data-on':'true' },
}
   
mapEdit = mapMadeElem.kendoSvgModify().data('kendoSvgModify');
$('button[data-action="made"]').on('click',function(){
	var length = $('#svgMap').find('g').length
	mapEdit.svgNewMade('newBox'+length);
	$('#svgMap g').last().find('polygon').attr('data-id','newBox'+length);
	$('#svgMap g').last().find('polygon').attr('data-name','groupNew'+length);
	$('#svgMap g').last().addClass('editOption');
	$('.zoneNameText[data-name="groupnewBox'+length+'"]').html('ZONE'+length);
});
$('#svgMap').on('click','g',function(){
	var dataBool = $(this).find('polygon').attr('data-bool');
	mapEdit.svgModifyEnd($('.editOption').find('polygon'));
	$('#svgMap').find('.editOption').removeClass('editOption').find('polygon').attr(zoneStyleData.off)
	$(this).addClass('editOption');  
	mapEdit.svgModifyStart($('.editOption').find('polygon'));
	if(dataBool){
		$(this).find('polygon').attr(zoneStyleData.edit);
	}else{
		$(this).find('polygon').attr(zoneStyleData.off);
	}
});
$('button[data-action="end"]').on('click',function(){
	$('#svgMap g').remove();
	$('#svgMap .zoneNameText').remove();
});




