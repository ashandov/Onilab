document.addEventListener("DOMContentLoaded", function() {



});
timeend= new Date();
// IE и FF по разному отрабатывают getYear()
timeend= new Date(2020,5,28);
// для задания обратного отсчета до определенной даты укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ);
// Для задания даты с точностью до времени укажите дату в формате:
// timeend= new Date(ГОД, МЕСЯЦ-1, ДЕНЬ, ЧАСЫ-1, МИНУТЫ);
function time() {
	today = new Date();
	today = Math.floor((timeend-today)/1000);
	tsec=today%60; today=Math.floor(today/60); if(tsec<10)tsec='0'+tsec;
	tmin=today%60; today=Math.floor(today/60); if(tmin<10)tmin='0'+tmin;
	thour=today%24; today=Math.floor(today/24);
	var days =document.getElementsByClassName('counter__days')[0];
	days.innerHTML=today;
	var hours =document.getElementsByClassName('counter__hours')[0];
	hours.innerHTML=thour;
	var minutes =document.getElementsByClassName('counter__minutes')[0];
	minutes.innerHTML=tmin;
	var seconds =document.getElementsByClassName('counter__seconds')[0];
	seconds.innerHTML=tsec;
	window.setTimeout("time()",1000);
 }
time();
