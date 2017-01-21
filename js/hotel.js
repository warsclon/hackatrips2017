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

    $select.append('<option value="Petit Palace Tres Cruces">Petit Palace Tres Cruces</option>');
    $select.append('<option value="Vincci Via 66">Vincci Via 66</option>');
    $select.append('<option value="Hotel Santo Domingo">Hotel Santo Domingo</option>');
    $select.append('<option value="Senator Gran Vía">Senator Gran Via</option>');
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
    var personsSelect =$('#rooms').find('option:selected').text();
    var breakfastSelect =$('#breakfast').find('option:selected').text();
    var priceSelect =$('#price').find('option:selected').text();
    document.cookie = "hotel="+hotelSelect;
    document.cookie = "origin="+originSelect;
    document.cookie = "persons="+personsSelect;
    document.cookie = "breakfast="+breakfastSelect;
    document.cookie = "price="+priceSelect;
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

var persons;
var typecar;
var use;
var hotel;
var origin;
var breakfast;
var price;

function printHotel(hotel) {
    console.debug(hotel)
    var hotelRoms = hotel.rooms;

    var $htmlList = $('#infoHotel');
    $htmlList.append('<ul>');
    $htmlList.append('<li>Zona:' + hotel.zoneName + '</li>');
    $htmlList.append('<li>Categoria:' + hotel.categoryName + '</li>');
    if (hotelRoms.length > 0) {
        for (e = 0; e < hotelRoms.length; e++) {
            $htmlList.append('<li>Habitacion:' + hotelRoms[e].name + '</li>');
            var rates = hotelRoms[e].rates;
            if(rates.length > 0) {
                for (r = 0; r < rates.length;r++) {
                    /*if(r == 0) {
                        $htmlList.append('<ul>');
                    }*/
                    $htmlList.append(' <li>Precio:' + rates[r].net + ' ('+rates[r].boardName+') - <input type="radio" ></li>');
                    /*if (r == rates.length) {
                        $htmlList.append('</ul>');
                    }*/
                }

            }
        }
    } else {
        $htmlList.append('<li>Habitaciones: 0</li>');
    }
    $htmlList.append('</ul>');
    //list roms

    /*
<ul>
    <li>Coffee</li>
    <li>Tea
    <ul>
    <li>Black tea</li>
    <li>Green tea</li>
    </ul>
    </li>
    <li>Milk</li>
    </ul>
        */
}


function initResult() {
    typecar = $.cookie('typecar');
    use = $.cookie('use');
    hotel = $.cookie('hotel');
    origin = $.cookie('origin');
    persons = $.cookie('persons');
    breakfast = $.cookie('breakfast');
    price = $.cookie('price');

    $('#originh').append(origin.trim());
    $('#hotelh').append(hotel.trim());


    for(i=0;i<hoteles.hotels.hotels.length;i++) {
        if(hoteles.hotels.hotels[i].name.indexOf(hotel) > -1) {
            printHotel(hoteles.hotels.hotels[i])
        }
    }
}