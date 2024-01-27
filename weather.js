// The main function. This is called from the timer.
function aktualnaPogodaWW() {
    kasuj()
    for (var i = 1; i <= 103; ++i) {
      var weatherData = getWeatherData(i)  // 1) this will execute the function getWeatherData and put the result in weatherData
      saveRecordInSheet(weatherData) //   11) We use the result to save it using saveRecordInSheet function.
    }
  }
  //
  function sprawdzPogodaWW() {
    var sprawdz = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange('W104');
    SpreadsheetApp.setCurrentCell(sprawdz);
    var sprawdzCell = SpreadsheetApp.getCurrentCell().getValue();
    if (sprawdzCell==""){
      aktualnaPogodaWW();

    }
  }
  // This gets the date from the openweathermap api and parses it to a record.
  function getWeatherData(i) {
    //pobiera kody miast
    var cell = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1].getRange('C'+i);
    SpreadsheetApp.setCurrentCell(cell);
    var currentCell = SpreadsheetApp.getCurrentCell().getValue();
    //pyta o pogode
    var url = "http://api.openweathermap.org/data/2.5/forecast?id="+currentCell+"&units=metric&lang=en&APPID=f04e219035cb5038a8360b9701ca0198" // 3)  The URL to call
    var response = UrlFetchApp.fetch(url, {   // 4) call the URL
      headers: {
      'Content-Type': 'application/json',  // 5) Make sure we use JSON as transport
      'Accept': 'application/json'
      }
    });
    //rozklada jsona
    var json = response.getContentText(); // 6) Get the content of the API call (this gets the response as TEXT(string)
    var data = JSON.parse(json); // 7) Parse the TEXT to JSON (make objects out of it)
    //aktualna
    var dzien0= data.list[2].dt_txt //data
    var city0 = data.city.name+", "+data.city.country // 
    var weather0 = data.list[2].weather[0].icon// 8)  Get the weather variable
    var description0 = data.list[2].weather[0].description
    var temperature0 = data.list[2].main.temp // 9) get the temperature variable
    //najutro
    var dzien1= data.list[10].dt_txt //data
    var city1 = data.city.name+", "+data.city.country // 
    var weather1 = data.list[10].weather[0].icon// 8)  Get the weather variable
    var description1 = data.list[10].weather[0].description
    var temperature1 = data.list[10].main.temp // 9) get the temperature variable
    //napojutrze
    var dzien2= data.list[18].dt_txt //data
    var city2 = data.city.name+", "+data.city.country //
    var weather2 = data.list[18].weather[0].icon// 8)  Get the weather variable
    var description2 = data.list[18].weather[0].description
    var temperature2 = data.list[18].main.temp // 9) get the temperature variable
    //nazadwadni
    var dzien3= data.list[26].dt_txt //data
    var city3 = data.city.name+", "+data.city.country //
    var weather3 = data.list[26].weather[0].icon// 8)  Get the weather variable
    var description3 = data.list[26].weather[0].description
    var temperature3 = data.list[26].main.temp // 9) get the temperature variable
    //zwraca dane
    return [dzien0, city0, weather0, temperature0, description0, " ", dzien1, city1, weather1, temperature1, description1, " ", dzien2, city2, weather2, temperature2, description2, " ", dzien3, city3, weather3, temperature3, description3] // 10) add the date and Return them (as a record)
  }
  // Save a record in the spreadsheet
  function saveRecordInSheet(record) {
    var currentSheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    currentSheet.appendRow(record); 
  }
  function kasuj() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    spreadsheet.getRange('A2:X300').activate();
    spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  };
  
  