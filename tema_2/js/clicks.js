


function checkforwin(){
	var wincode = 0;
	var winx;
	for(var y = 0; y <= 2; y++){
		var check = 0;
		for(var x = 0; x<=1; x++){
			console.log('comparing states of ' + '#c'+x+'r'+y + ' AND ' + '#c'+(x+1)+'r'+y);
			console.log($('#c'+x+'r'+y).attr('state'));
			console.log($('#c'+(x+1)+'r'+y).attr('state'));

			if($('#c'+x+'r'+y).attr('state') !== $('#c'+(x+1)+'r'+y).attr('state') || $('#c'+x+'r'+y).attr('state') === "0" || $('#c'+(x+1)+'r'+y).attr('state') === "0"){
				check = 1;
			}
		}
		if($('#c'+0+'r'+y).attr('state')==="1") {
			winx = 1;
		}
		else{ 
			winx = 0;
		} 
		if(check === 0){
			console.log("GAME OVER");
			return {
				wincode : wincode,
				winx : winx
			};
		}
		wincode++;
	}
	for(var x = 0; x <= 2; x++){
		var check = 0;
		for(var y = 0; y<=1; y++){
			console.log('comparing states of '+'#c'+x+'r'+y+' AND '+'#c'+x+'r'+(y+1));
			console.log($('#c'+x+'r'+y).attr('state'));
			console.log($('#c'+x+'r'+(y+1)).attr('state'));

			if($('#c'+x+'r'+y).attr('state') !== $('#c'+x+'r'+(y+1)).attr('state') || $('#c'+x+'r'+y).attr('state') === "0" || $('#c'+x+'r'+(y+1)).attr('state') === "0"){
				check = 1;
			}
		}
		if($('#c'+x+'r'+0).attr('state')==="1") {
			winx = 1;
		}
		else{ 
			winx = 0;
		} 
		if(check === 0){
			console.log("GAME OVER");
			return {
				wincode : wincode,
				winx : winx
			};
		}
		wincode++;
	}

	//diagonala principala win
	var check = 0;
	for(var x = 0; x<=1; x++){
		console.log('comparing states of ' + '#c'+x+'r'+x + ' AND ' + '#c'+(x+1)+'r'+(x+1));
		console.log($('#c'+x+'r'+x).attr('state'));
		console.log($('#c'+(x+1)+'r'+(x+1)).attr('state'));

		if($('#c'+x+'r'+x).attr('state') !== $('#c'+(x+1)+'r'+(x+1)).attr('state') || $('#c'+x+'r'+x).attr('state') === "0" || $('#c'+(x+1)+'r'+(x+1)).attr('state') === "0"){
			check = 1;
		}
	}
	if($('#c'+0+'r'+0).attr('state')==="1") {
		winx = 1;
	}
	else{ 
		winx = 0;
	} 
	if(check === 0){
		console.log("GAME OVER");
		return {
			wincode : wincode,
			winx : winx
		};
	}
	wincode++;

	//diagonala secundara win
	var check = 0;
	for(var x = 0; x<=1; x++){
		console.log('comparing states of ' + '#c'+x+'r'+(2-x) + ' AND ' + '#c'+(x+1)+'r'+((2-x)-1));
		console.log($('#c'+x+'r'+(2-x)).attr('state'));
		console.log($('#c'+(x+1)+'r'+((2-x)-1)).attr('state'));

		if($('#c'+x+'r'+(2-x)).attr('state') !== $('#c'+(x+1)+'r'+((2-x)-1)).attr('state') || $('#c'+x+'r'+(2-x)).attr('state') === "0" || $('#c'+(x+1)+'r'+((2-x)-1)).attr('state') === "0"){
			check = 1;
		}
	}
	if($('#c'+0+'r'+2).attr('state')==="1") {
		winx = 1;
	}
	else{ 
		winx = 0;
	} 
	if(check === 0){
		console.log("GAME OVER");
		return {
			wincode : wincode,
			winx : winx
		};
	}
	wincode++;
	console.log("NOT A WIN");
	var cnt = 0;
	for(var x = 0; x <= 2; x++){
		for(var y = 0; y <= 2; y++){
			if($('#c'+x+'r'+y).attr('state')==="0")cnt++;
		}
	}
	if(cnt === 0){
		return {wincode: 69}; //DRAW
	}
	else{
		return {wincode : -1}; //GAME CONTINUES
	}
}

function updateturnshow(){
		if(($("#board").attr('turn')==="1" && $("#board").attr('is-p1-x')==="0")||($("#board").attr('turn')==="0" && $("#board").attr('is-p1-x')==="1")){
			$("#showturn").text($("div.player1 p").text() + '\'s turn - ' + ($("#board").attr('turn')==="0"?"X":"0"));
		}
		else{
			$("#showturn").text($("div.player2 p").text() + '\'s turn - ' + ($("#board").attr('turn')==="0"?"X":"0"));
		}
}

function onclicksquare(){
	console.log("Turn before click " + $("#board").attr('turn'));
	if($("#board").attr('turn') === "0"){
		$(this).attr('src', '../media/tic_tac_toe_x.jpg');
		$(this).attr('state', "1");
		$("#board").attr('turn', "1");
		$(this).unbind("click");
	} else if($("#board").attr('turn') === "1"){
		$(this).attr('src', '../media/tic_tac_toe_0.png');
		$(this).attr('state', "2");
		$("#board").attr('turn', "0");
		$(this).unbind("click");
	}
	console.log("Turn after click " + $("#board").attr('turn'));
	var res = checkforwin();
	if(res.wincode===-1){
		updateturnshow();
	}
	else{
		if(res.wincode === 69){
			$("#showturn").text('It\'s a tie!'); 			
		}
		else{
			if(($("#board").attr('turn')==="1" && $("#board").attr('is-p1-x')==="1")||($("#board").attr('turn')==="0" && $("#board").attr('is-p1-x')==="0")){
				$("#showturn").text($("div.player1 p").text() + ' won! - '  + ($("#board").attr('turn')==="0"?"0":"X"));
				var score = Number($('#score_p1').text()) + 1;
				$('#score_p1').text(score);
			}
			else{
				$("#showturn").text($("div.player2 p").text() + ' won! - '  + ($("#board").attr('turn')==="0"?"0":"X"));
				var score = Number($('#score_p2').text()) + 1;
				$('#score_p2').text(score);
			}
			$('div img.square').each(function() {
				$(this).unbind("click");
			});
		}
		if($("#board").attr('is-p1-x') === "1") $("#board").attr('is-p1-x', "0");
		else 									$("#board").attr('is-p1-x', "1");

		$('.reset_game_btn').attr('src', '../media/play_again_btn.png');
	}
}

console.log("test");
$("#board").attr('turn', "0");
$("#board").attr('is-p1-x', "1");
$('div img.square').each(function() {
    $(this).attr('src', '../media/tic_tac_toe_blank.png');
    $(this).attr('state', "0");
    $(this).click(onclicksquare);
});

$('.reset_game_btn').click(function(){
	$('.reset_game_btn').attr('src', '../media/reset_game_btn.png');
	$("#board").attr('turn', "0");
	$('div img.square').each(function() {
    	$(this).attr('src', '../media/tic_tac_toe_blank.png');
		$(this).attr('state', "0");
		$(this).click(onclicksquare);
	});
	updateturnshow();
});
$('.reset_score_btn').click(function(){
	$('#score_p2').text("0");
	$('#score_p1').text("0");
});
updateturnshow();


$('body').on('click', '[data-editable]', function(){
  
  var $el = $(this);
              
  var $input = $('<input/>').val( $el.text() );
  var classs = $input.attr('class');
  $el.replaceWith( $input );
  $input.attr('class', classs);
  
  var save = function(){
    var $p = $('<p data-editable />').text( $input.val() );
    $input.replaceWith( $p );
    $p.attr('class', classs);
    updateturnshow();
  };
  
  /**
    We're defining the callback with `one`, because we know that
    the element will be gone just after that, and we don't want 
    any callbacks leftovers take memory. 
    Next time `p` turns into `input` this single callback 
    will be applied again.
  */
  $input.one('blur', save).focus();
  
});
