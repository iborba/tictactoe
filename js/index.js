var cleaner = document.querySelectorAll('a');
var quarters = document.querySelectorAll('td');
var pointer = "X";
var result = '';

NodeList.prototype.addEventListener = function(event, func) {
    this.forEach(function(content, item) {
       content.addEventListener(event, func);
    });
}

cleaner.addEventListener('click', function(){
	var x = document.getElementsByTagName("td");
	pointer = 'X';
	
	for (var i = 0; i < x.length; i++) {
		x[i].innerText = '';
		document.getElementById(i).style.background = '#fff';
		document.getElementById(i).style.border = '2px outset';
		document.getElementById(i).className = document.getElementById(i).className.replace(' winner', ' ');
		document.getElementById(i).className = document.getElementById(i).className.replace(' draw', ' ');
		result = '';
	}
});
quarters.addEventListener('mouseover', function(){
	if (this.innerText == '' && result == '') {
		this.style.background = pointer == 'X' ? '#6db2bd' : '#990000';
		this.style.border = '2px inset';
	}
});
quarters.addEventListener('mouseout', function(){
	if (this.innerText == '' && result == '') {
		this.style.background = '#fff';
		this.style.border = '2px outset';
	}
});

quarters.addEventListener('click', function(){
	var qtdX = 0;
	var qtdO = 0;
	var arrPossibilidades = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	var arrX = [];
	var arrO = [];
	var qtdRounds = 0;
	var winnerPosition = '';
	
	if (this.innerText == '' && result == '') {
		this.innerText = pointer;
		pointer = pointer == 'X' ? 'O' : 'X';
	}
	else
		return false;

	quarters.forEach(function(item, index){
		if (item.innerText == 'X')
			arrX.push(index);
		else if (item.innerText == 'O')
			arrO.push(index);
		
		if (item.innerText != '')
			qtdRounds += 1;
	});

	arrPossibilidades.forEach(function(val){
		for (var i = 0; i < 3; i+=3){
			if (document.getElementById(val[0]).innerText !== '')
				if (document.getElementById(val[0]).innerText == document.getElementById(val[1]).innerText)
					if (document.getElementById(val[0]).innerText == document.getElementById(val[2]).innerText){
						winnerPosition = ''.concat(val[0], val[1], val[2]);
						result = document.getElementById(val[0]).innerText.concat(' wins');
						return false;
					}
		}
	});
	
	if (result != '') {
		document.getElementById(winnerPosition[0]).style.background = 'green';
		document.getElementById(winnerPosition[1]).style.background = 'green';
		document.getElementById(winnerPosition[2]).style.background = 'green';
		return false;
	} else {
		if (qtdRounds == 9) {
			quarters.forEach(function(item, index){
				item.style.background = '#ccc';
			});
			
			return false;
		}
	}

	machinePlays(document.getElementsByTagName('td'));
});

function machinePlays(el){
	if (pointer == 'X') return false;
	
	if (el[0].innerText == '')
		el[0].innerText = 'O';
	else if (el[2].innerText == '')
		el[2].innerText = 'O';
	else if (el[6].innerText == '')
		el[6].innerText = 'O';
	else if (el[8].innerText == '')
		el[8].innerText = 'O';
	else if (el[4].innerText == '')
		el[4].innerText = 'O';
	else if (el[7].innerText == '')
		el[7].innerText = 'O';
	else if (el[1].innerText == '')
		el[1].innerText = 'O';
	else if (el[3].innerText == '')
		el[3].innerText = 'O';
	else if (el[5].innerText == '')
		el[5].innerText = 'O';
	
	pointer = pointer == 'X' ? 'O' : 'X';
}