'use strict';

function Column(id, name) {
  	var self = this;
  	this.id = id;
  	this.name = name || 'No name given';
  	this.element = generateTemplate('column-template', {
  	 	name: this.name,
  	  	id: this.id
  	});
  	this.element.querySelector('.column').addEventListener('click', function(event) {
		if (event.target.classList.contains('btn-delete')) {
			self.removeColumn();
		}
		if (event.target.classList.contains('add-card')) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			if (cardName) {
  				var data = {name: cardName, bootcamp_kanban_column_id: self.id}
				fetch(baseUrl + '/card', {
  					method: 'POST',
  					headers: myHeaders,
  					body: JSON.stringify(data)
  				})
  				.then(function(res) {
  					return res.json();
  				})
  				.then(function(resp) {
  					var card = new Card(resp.id, cardName, self.id);
  					self.addCard(card);
				});
			}	
		}
		if (event.target.classList.contains('rename-column')) {
			self.renameColumn();
		}
	});
}

Column.prototype = {
    addCard: function(card) {
		if (card) {
			this.element.querySelector('ul').appendChild(card.element);
		}
    },
    removeColumn: function() {
  		var self = this;
  		fetch(baseUrl + '/column/' + self.id, { 
			method: 'DELETE',
			headers: myHeaders 
		})
    	.then(function(resp) {
      		return resp.json();
    	})
    	.then(function(resp) {
      		self.element.parentNode.removeChild(self.element);
    	});
	},
	renameColumn: function() {
		var self = this;
		var newName = prompt("Enter new name of the column: ");
		event.preventDefault();
		if (newName) {
  			var data = {name: newName};
			fetch(baseUrl + '/column/' + self.id, {
				method: 'PUT',
				headers: myHeaders,
				body: JSON.stringify(data)
  			})
  			.then(function(resp) {
  				return resp.json();
  			})
  			.then(function(resp) {
				self.name = newName;
				self.element.querySelector('.column-title').innerText = self.name;
			});
		}
	}
}