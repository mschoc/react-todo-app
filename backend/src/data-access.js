let data = {
	todos: [

	]
}

function get(entity) {
	readNotesInFile()
	return data[entity]
}

function getNextId() {
	let check = false;
	let freeId = 0;
	for(var ii = 1; ii < (data.todos.length)+2; ii++){
		for(var i = 0; i < (data.todos.length); i++){
			if(data.todos[i].id === ii){
				check=true;
				break;
			}else{

			}
		}
		if(check === false){
			freeId=ii
			console.log("free ID = " + freeId);
			break;
		}
		check=false;
	}
	return freeId
}

function writeNotesInFile(){
	var fs = require('fs');
	const JsonData = JSON.stringify(data)
	fs.writeFile("notes.txt", JsonData, function(err) {
		if (err) {
			console.log(err);
		}
	});
}

function readNotesInFile(){
	const fs=require('fs');
	let textData=fs.readFileSync('notes.txt', 'utf8');
	if(textData!==""){
		data =JSON.parse(textData);
	}
}

function find(entity, id) {
	return data[entity].find(e => e.id === id)
}

function insert(entity, row) {
	row.id = getNextId()
	//console.log(row);
	data[entity].push(row)
	writeNotesInFile()
	return data[entity].find(e => e.id === row.id)
}

function deleting(entity, row) {
	for (var i =0; i < data[entity].length; i++)
		if (data[entity][i].id === row.id) {
			data[entity].splice(i,1);
			break;
		}
	writeNotesInFile()
	return data[entity]
}

function update(entity, row) {
	for (var i = 0; i < data.todos.length; i++) {
		if (data.todos[i].id === row.id) {
			data.todos[i].title = row.title;
			data.todos[i].beschreibung = row.beschreibung;
			data.todos[i].prio = row.prio;
			data.todos[i].erledigenBis = row.erledigenBis;
			data.todos[i].erledigt = row.erledigt;
			break;
		}
	}
	writeNotesInFile()
	return data[entity].find(e => e.id === row.id)
}

module.exports = {
	get,
	getNextId,
	find,
	insert,
	deleting,
	update
}
