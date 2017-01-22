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

function goEnd() {
    ChangeUrl('page', 'end.html');
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
var distance;

function calculateDistance(hotel) {
    var hotelPos =  {
        "lat":parseFloat(hotel.latitude),
        "lon":parseFloat(hotel.longitude)
    }
    var originPos = getOrigenCoor(origin);


    distance = getDistanceFromLatLonInKm(hotelPos.lat,hotelPos.lon,originPos.lat,originPos.lon)//getDistance(hotelPos,originPos);

}


function printHotel(hotel) {
    console.debug(hotel)
    var hotelRoms = hotel.rooms;

    setMap(parseFloat(hotel.longitude),parseFloat(hotel.latitude));
    calculateDistance(hotel)

    var $nameHotelH = $('#nameHotel');
    $nameHotelH.append(hotel.name)

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


function printCabify() {
    var $htmlList = $('#infoCabify');

    var simulation = false
    if(parseInt(persons) == 1) {
        persons = 4
        simulation = true
    }

    //1km 0,15 Kg CO2
    var co2 = 0.15
    $htmlList.append('<h3>¿Cual es tu huella ecológica en  '+distance.toString().substring(0,5)+' kms?</h3>');
    if (simulation)
        $htmlList.append('<h3>Personas del viaje: 1</h3>');
    else
        $htmlList.append('<h3>Personas del viaje: '+persons+'</h3>');

    $htmlList.append('<h5>CO2 1 persona tipo coche lite: '+(distance*co2).toString().substring(0,5)+' Kg CO<sub>2</sub></h5>');
    $htmlList.append('<h5>CO2 1 persona tipo coche executive: '+((distance*co2)*1.20).toString().substring(0,5)+' Kg CO<sub>2</sub></h5>');
    $htmlList.append('<h5>CO2 1 persona tipo coche eléctrico: 0 Kg CO<sub>2</sub></h5>');

    if(simulation) {
        $htmlList.append('<h3>¡¡Comparte tu coche!! - ¿Si fuerais 4 personas?</h3>');
    }
        $htmlList.append('<h5>Coche compartido '+persons+' tipo lite: '+((distance*co2)/parseInt(persons)).toString().substring(0,5)+' Kg CO<sub>2</sub></h5>');
        $htmlList.append('<h5>Coche compartido '+persons+' tipo executive: '+(((distance*co2)/parseInt(persons))*1.20).toString().substring(0,5)+' Kg CO<sub>2</sub></h5>');
        $htmlList.append('<h5>Coche compartido '+persons+' tipo eléctrico: 0 Kg CO<sub>2</sub></h5>');

    if(!simulation) {
        $htmlList.append('<h5>Cada viajero un coche tipo lite: '+(((distance*co2))*parseInt(persons)).toString().substring(0,5)+' Kg CO<sub>2</sub></h5>');
        $htmlList.append('<h5>Cada viajero un coche tipo executive: '+((((distance*co2))*parseInt(persons))*1.20).toString().substring(0,5)+' Kg CO<sub>2</sub></h5>');
        $htmlList.append('<h5>Cada viajero un coche tipo eléctrico: 0 Kg CO<sub>2</sub></h5>');
    }



    $htmlList.append('<ul>');
    if (cars.length > 0) {
        for (e = 0; e < cars.length; e++) {
            if (cars[e].vehicle_type.name.indexOf("Lite") > 0 || cars[e].vehicle_type.name.indexOf("Executive") > 0) {
                $htmlList.append('<li><img width="20" height="20" src='+cars[e].vehicle_type.icons.regular+'> - ' + cars[e].vehicle_type.name + ' <input type="radio"></li>');
                $htmlList.append('<li>tipo:' + cars[e].vehicle_type.name + '</li>');
                $htmlList.append('<li>' + cars[e].vehicle_type.description + '</li>');
                $htmlList.append('<li>Precio:' + cars[e].price_formatted + '</li>');
            }
        }
    } else {
        $htmlList.append('<li>Coches: 0</li>');
    }
    $htmlList.append('</ul>');

}


function getOrigenCoor(nameOrigin) {
    /*
     Aeropuerto T2; 40.4695137;-3.5702567
     Estación de Atocha; 40.406438; -3.690668
     Estación Chamartín; 40.471719; -3.682684
     40.488019, -3.585858
     <option>Aeropuerto de Barajas</option>
     <option>Estación de Chamartin</option>
     <option>Estación de Atocha</option>
     */
    if (nameOrigin.indexOf("Aeropuerto de Barajas") > 0) {
        return {
            "lat":40.488019,
            "lon":-3.585858
        }
    } else if (nameOrigin.indexOf("Estación de Chamartin") > 0) {
        return {
            "lat":40.471719,
            "lat":-3.682684
        }
    } else {
        //Estación de Atocha
        return {
            "lat":40.406438,
            "lon":-3.690668
        }
    }
}
function setMap(lon,lat) {
    console.log(lat)
    console.log(lon)



    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map',
        view: new ol.View({
            center: ol.proj.transform([lon, lat],'EPSG:4326', 'EPSG:3857'),
            zoom: 15
        })
    });
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
            printHotel(hoteles.hotels.hotels[i]);
            printCabify()
        }
    }
}

var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lon - p1.lon);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return (d*10)*1.30;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}