'use strict';

function Card(id, name, bootcamp_kanban_column_id) {
	var self = this;
    this.id = id;
	this.name = name || 'No name given';
	this.parentId = bootcamp_kanban_column_id;
    this.element = generateTemplate('card-template', { 
    	description: this.name
    }, 'li');
    this.element.querySelector('.card').addEventListener('click', function (event) {
    	event.stopPropagation();
      	if (event.target.classList.contains('btn-delete')) {
        	self.removeCard();
		  }
		if (event.target.classList.contains('rename-card')) {
			self.renameCard();
		}
	});
	this.element.querySelector('.card').parentElement.addEventListener('dragend', function (event) {
		self.changeColumn();
	});
}

Card.prototype = {
	removeCard: function() {
    	var self = this;
		fetch(baseUrl + '/card/' + self.id, {
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
	renameCard: function() {
		var self = this;
		var newName = prompt("Enter new name of the card: ");
		event.preventDefault();
		if (newName) {
  			var data = {name: newName, bootcamp_kanban_column_id: self.parentId};
			fetch(baseUrl + '/card/' + self.id, {
				method: 'PUT',
				headers: myHeaders,
				body: JSON.stringify(data)
  			})
  			.then(function(resp) {
  				return resp.json();
  			})
  			.then(function(resp) {
				self.name = newName;
				self.element.querySelector('.card-description').innerText = self.name;
			});
		}
	},
	changeColumn: function() {
		var self = this;
		var newParentId = self.element.parentElement.id;
  		var data = {name: self.name, bootcamp_kanban_column_id: newParentId};
		fetch(baseUrl + '/card/' + self.id, {
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify(data)
  		})
  		.then(function(resp) {
  			return resp.json();
  		})
  		.then(function(resp) {
				self.parentId = newParentId;
		});
	}
}