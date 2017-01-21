/**
 * Created by Indizenadm on 21/01/2017.
 */


function getHotel() {
    console.log(hoteles.hotels.total);
    console.log(cars.length)
    //console.log(minube.length)


    var $select = $('#hotel');

    var $cabify = 	$('#cabify');


    //$select.find('option').remove();

    $select.append('<option value="Senator Gran Via">Senator Gran Via</option>');
    $select.append('<option value="Petit Palace Tres Cruces">Petit Palace Tres Cruces</option>');
    $select.append('<option value="Vincci Via 66">Vincci Via 66</option>');
    $select.append('<option value="Hotel Santo Domingo">Hotel Santo Domingo</option>');
        for(i=0;i<hoteles.hotels.hotels.length;i++) {
            $select.append('<option value=' + hoteles.hotels.hotels[i].name+ '>' + hoteles.hotels.hotels[i].name + '</option>');
        }

    for(i=0;i<cars.length;i++) {
        $cabify.append(document.createTextNode(cars[i].total_price+'<br>'));
    }
}

function ChangeUrl(page, url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Page: page, Url: url };
        history.pushState(obj, obj.Page, obj.Url);
    } else {
        alert("Browser does not support HTML5.");
    }
}

function nextPage() {
    var hotelSelect =$('#hotel').find('option:selected').text();
    var originSelect =$('#origin').find('option:selected').text();
    var roomsSelect =$('#rooms').find('option:selected').text();
    var personsSelect =$('#persons').find('option:selected').text();
    document.cookie = "hotel="+hotelSelect;
    document.cookie = "origin="+originSelect;
    document.cookie = "rooms="+roomsSelect;
    document.cookie = "persons="+personsSelect;
    ChangeUrl('page', 'cars.html');
}

function getCookie() {
    console.log(document.cookie)
}


function nextPageResult() {
    var personsSelect =$('#persons').find('option:selected').text();
    var typecarSelect =$('#typecar').find('option:selected').text();
    var useSelect =$('#use').find('option:selected').text();
    document.cookie = "persons="+personsSelect;
    document.cookie = "typecar="+typecarSelect;
    document.cookie = "use="+useSelect;
    ChangeUrl('page', 'result.html');

}

var person;
var typecar;
var use;
var hotel;
var origin;
var rooms;
var persons;

function initResult() {
    person = $.cookie('persons');
    typecar = $.cookie('typecar');
    use = $.cookie('use');
    hotel = $.cookie('hotel');
    origin = $.cookie('origin');
    rooms = $.cookie('rooms');
    persons = $.cookie('persons');
}