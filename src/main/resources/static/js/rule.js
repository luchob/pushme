$(function() {
	$("#btn_create_rule").click(function() {
		
		//todo - fix relative path!
		var ctnrid = $(this).data("ctnr-id");
		$("#new_rule").load("/rules-new?containerid=" + ctnrid, function() {
			  attachFormListener();
		});
	});
	
	//sets the id of the rule to be deleted
	$('.delete-rule').click(function() {
		var ruleId = $(this).data('rule-id');
		$('#delete-rule-id').val(ruleId);
	});
	
	$('#delete-rule-btn').click(function(){
		$('#delete-rule-form').submit();
	});
})

function attachFormListener()
{
	$('form').submit(function(event) {
		// Prevent the form from submitting via the browser
		event.preventDefault();
		var form = $(this);
		$.ajax({
			type : form.attr('method'),
			url : form.attr('action'),
			data : form.serialize()
		}).done(function(data) {
			var redirectUrl = $(data).data('redirect');
			if (redirectUrl)
		        window.location.href=redirectUrl;//redirect
		    else
		    	$("#new_rule").html(data);
				attachFormListener();//careful!
		}).fail(function(data) {
			$("#new_rule").html(data);
		});
	});
}