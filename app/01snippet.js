$("#textA").bind('copy', function() {
    $('span').text('copy behaviour detected!')
});	
$("#textA").bind('paste', function() {
    $('span').text('paste behaviour detected!')
});	
$("#textA").bind('cut', function() {
    $('span').text('cut behaviour detected!')
});
$(document).ready(function() {
 
	$("#textA").bind({
		copy : function(){
			$('span').text('copy behaviour detected!');
		},
		paste : function(){
			$('span').text('paste behaviour detected!');
		},
		cut : function(){
			$('span').text('cut behaviour detected!');
		}
	});
 
});	
