//array.push(obj) adds obj to array
//array.splice(index, number of elements you're removing)
//possible bugs: more than one person with the same name, can't add people that have information missing (list will just print out undefined undefined undefinedm etc)


function add(first, last, phone, emailAddress){
data.push({
	firstName:first,
	lastName:last,
	phoneNum: phone,
	email: emailAddress
})
};


function remove(first, last){
for (var i=0; i<data.length; i++)
if (data[i].firstName==first && data[i].lastName==last){
var name=data[i].firstName+" "+data[i].lastName;
data.splice(i, 1);
return(name + " has been removed from your data");
}
};

function search(a, type, name){
switch(type){
	case "first name":
      for (var i=0; i<a.length; i++){ 
      if (a[i].firstName==name){
		  var person=a[i];
		  i=a.length;
      }
	  }
	  document.getElementById("text").innerHTML=person.firstName+" "+person.lastName+"<br/>"+person.phoneNum+"<br/>"+person.email;
     
  break;
  case "last name":
  for (var i=0; i<a.length; i++){ 
      if (a[i].lastName==name){
      return "";
      }
      else{
      return "Sorry, we can't find that name in your data";
      }
      break;
      }
  case "email":
  for (var i=0; i<a.length; i++){ 
      if (a[i].email==name){
      return "";
      }
      else{
      return "Sorry, we can't find that name in your data";
      }
      break;
      }
  case "phone number":
  for (var i=0; i<a.length; i++){ 
      if (a[i].phoneNum==name){
      return "";
      }
      else{
      return "Sorry, we can't find that name in your data";
      }
      break;
      }
  default:
  return "\""+type+"\" is not compatible";
}
};


function list(a){
	var display="";
	for (var i=0; i<a.length; i++){
		display+=a[i].firstName+" "+a[i].lastName+"<br/>"+ a[i].phoneNum+"<br/>"+a[i].email+"<br/>"+"-----------------<br/>";
	}
	document.getElementById("text").innerHTML=display;
}

//Runner-----------------------------------------------
//
//Displays contents of JSON file 
//add("George","Washington", "888", "america");
document.getElementById("show").onclick=function(){list(data);}
//Adds an entry to the json file 
document.getElementById('add').onclick=function(){add(document.getElementById('firstName').value, document.getElementById('lastName').value, document.getElementById('phoneNum').value, document.getElementById('email').value);}
document.getElementById('search').onclick=function(){search(data, "first name", document.getElementById("firstName").value); }
