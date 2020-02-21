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


 var CircularTimer = function(el) {

	var self = this;

	self.SECONDS_MULTIPLIER = 10;
	self.BASE_LENGTH = {
		"days": 365,
		"hours": 24,
		"minutes": 60,
		"seconds": 60
	};

	self.daysCircle         = el.querySelector('.circular-timer__item.days');
	self.hoursCircle        = el.querySelector('.circular-timer__item.hours');
	self.minutesCircle      = el.querySelector('.circular-timer__item.minutes');
	self.secondsCircle      = el.querySelector('.circular-timer__item.seconds');
	self.RADIUS             = +self.daysCircle.querySelector('circle').getAttribute('r');
	self.CIRCUMFERENCE      = 2 * Math.PI * self.RADIUS;
	self.countDownDate      = new Date(el.getAttribute('data-date')).getTime();

	self.distance           = self.countDownDate - new Date().getTime();


	self.setDashArray = function () {
		el.querySelectorAll('circle.progress').forEach(function(el){
			el.style.strokeDasharray = self.CIRCUMFERENCE
		});
	}

	self.getDistanceData = function(seconds_multiplier) {
		return {
			"days": Math.floor(self.distance / (1000 * 60 * 60 * 24)),
			"hours": Math.floor((self.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			"minutes": Math.floor((self.distance % (1000 * 60 * 60)) / (1000 * 60)),
			"seconds": (self.distance % (1000 * 60) / 1000) * self.SECONDS_MULTIPLIER
		}
	}

	self.drawProgress  = function (element, type, length, multiply) {
		var multi = multiply ? multiply : 1;
		var progress = length / ( self.BASE_LENGTH[type] * multi );
		var dashoffset = self.CIRCUMFERENCE * (1 - progress);

		element.querySelector('.circular-timer__item .value').textContent = Math.floor(length / multi);
		element.querySelector('.progress').style.strokeDashoffset = dashoffset;
	};


	self.countdown = function(){
		var computedData = self.getDistanceData();

		if ( computedData.seconds <= 0 && computedData.minutes <= 0 && computedData.hours <= 0 && computedData.days <= 0 )
		{
			self.stopCountdown();
			self.setZero();
			return;
		}

		self.drawProgress(self.secondsCircle, "seconds", computedData.seconds, self.SECONDS_MULTIPLIER);
		self.drawProgress(self.minutesCircle, "minutes", computedData.minutes);
		self.drawProgress(self.hoursCircle, "hours", computedData.hours);
		self.drawProgress(self.daysCircle, "days", computedData.days);

		self.distance -= (1000 / self.SECONDS_MULTIPLIER);
	};


	self.stopCountdown = function(){
		clearInterval(self.startCountdown);
	};

	self.setZero = function () {
		self.drawProgress(self.secondsCircle, "seconds", 0);
		self.drawProgress(self.minutesCircle, "minutes", 0);
		self.drawProgress(self.hoursCircle, "hours", 0);
		self.drawProgress(self.daysCircle, "days", 0);
	}

	self.setDashArray();
	self.startCountdown = setInterval(self.countdown, 1000 / self.SECONDS_MULTIPLIER);

	};

	var introTimer = new CircularTimer( document.querySelector('.circular-timer') );

	
	
	


