chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

		console.log('hello');
		
		//variables
		var up_btn = null;
		var down_btn = null;
		var budget = 1;
		var last_trade_status = true;
		var amount_losed = 0;
		var current_budget = 1;




		//start looking for the up and down buttons
		var look_for_buttons = setInterval(()=>{
    		if(document.querySelector('#root > div > div.page.app__page > main > div.page__sidebar > div.sidebar-section.sidebar-section--dark.sidebar-section--large > div > div.section-deal__put > div.section-deal__success > button')){
        		
				clearInterval(look_for_buttons);
        		console.log('buttons founded');
				up_btn = document.querySelector('#root > div > div.page.app__page > main > div.page__sidebar > div.sidebar-section.sidebar-section--dark.sidebar-section--large > div > div.section-deal__put > div.section-deal__success > button');
				down_btn = document.querySelector('#root > div > div.page.app__page > main > div.page__sidebar > div.sidebar-section.sidebar-section--dark.sidebar-section--large > div > div.section-deal__put > div.section-deal__danger > button');
				set_budget();
				click_up_down();
				check_trade();
				trade();
				
			}
    		else{
        		console.log('page not yet loaded!');
    		}
		},1000);






		//function click on random button
		function click_up_down(){
			if(Math.floor(Math.random() * 2)){
				up_btn.click();
			}
			else{
				down_btn.click();
			}
		}



		//function budget
		function set_budget(){
			if(last_trade_status){
				budget = 1;
				amount_losed = 0;
				console.log('amount losed : 0');
				console.log('budget : 1');
			}
			else{
				amount_losed = amount_losed + budget;
				budget = (amount_losed/0.8) + 1;

				budget = parseInt(budget);

				console.log('amount losed : ' + amount_losed);
				console.log('budget : ' + budget);
			}

			//set the budget
			if(current_budget > budget){
				//click on minus
				for(i = 0;i<current_budget - budget;i++){
					console.log('minus clicked');
					document.querySelector('#root > div > div.page.app__page > main > div.page__sidebar > div.sidebar-section.sidebar-section--dark.sidebar-section--large > div > div.section-deal__form > div.section-deal__investment.section-deal__input-black > div > label > button:nth-child(2)').click();
				}
				var i = 0;                  
				function myLoop() {         
  				setTimeout(function() {   
    				console.log('minus clicked');
					document.querySelector('#root > div > div.page.app__page > main > div.page__sidebar > div.sidebar-section.sidebar-section--dark.sidebar-section--large > div > div.section-deal__form > div.section-deal__investment.section-deal__input-black > div > label > button:nth-child(2)').click();  
    				i++;                    
    				if (i <= current_budget - budget) {           
      					myLoop();             
    				}                       
  					}, 100)
				}
				myLoop();
				current_budget = budget;
			}
			else if(current_budget < budget){
				//click on plus
				for(i = 0;i<budget - current_budget;i++){
					console.log('plus clicked');
					document.querySelector('#root > div > div.page.app__page > main > div.page__sidebar > div.sidebar-section.sidebar-section--dark.sidebar-section--large > div > div.section-deal__form > div.section-deal__investment.section-deal__input-black > div > label > button:nth-child(4)').click();
				}
				
				current_budget = budget;
			}
		}


		//function check if last trade is a win or lose
		function check_trade(){
			
				
				setTimeout(()=>{
					if(document.querySelectorAll('.trades-list-item')[0].querySelector('.trades-list-item__delta-right').getAttribute('class').includes('up')){
						last_trade_status = true;
						console.log(last_trade_status);
					}
					else{
						last_trade_status = false;
						console.log(last_trade_status);
					}
				},70000);
			
		}


		//function trade
		function trade(){
			setInterval(()=>{
				setTimeout(set_budget,1000);
				setTimeout(click_up_down,1000);
				check_trade();
			},75000);
		}
		
		

		
		// ----------------------------------------------------------
		

	}
	}, 10);
});