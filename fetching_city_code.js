// The main function. This is called from the timer.
function aktualnaPogoda() {
    kasuj()
    for (var i = 1; i <= 30; ++i) {
      var weatherData = getWeatherData(i)  // 1) this will execute the function getWeatherData and put the result in weatherData
      saveRecordInSheet(weatherData) //   11) We use the result to save it using saveRecordInSheet function.
    }
  }
  // This gets the date from the openweathermap api and parses it to a record.
  function getWeatherData(i) {
    //fetching city code
    var cell = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1].getRange('A'+i);
    SpreadsheetApp.setCurrentCell(cell);
    var currentCell = SpreadsheetApp.getCurrentCell().getValue();
    //pyta o pogode
    var url = "http://api.openweathermap.org/data/2.5/forecast?q="+currentCell+"&units=metric&lang=en&APPID=f04e219035cb5038a8360b9701ca0198" // 3)  The URL to call
    var response = UrlFetchApp.fetch(url, {   // 4) call the URL
      headers: {
      'Content-Type': 'application/json',  // 5) Make sure we use JSON as transport
      'Accept': 'application/json'
      }
    });
    //json
    var json = response.getContentText(); // 6) Get the content of the API call (this gets the response as TEXT(string)
    var data = JSON.parse(json); // 7) Parse the TEXT to JSON (make objects out of it)
    //aktualna
    var dzien0= data.list[2].dt_txt //data
    var city0 = data.city.name // 
    var id0 = data.city.id //
    var country0 = data.city.country
    //zwraca dane
    return [city0, country0, id0]
 }
  // Save a record in the spreadsheet
  function saveRecordInSheet(record) {
    var currentSheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    currentSheet.appendRow(record); 
  }
  function kasuj() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    spreadsheet.getRange('A2:X100').activate();
    spreadsheet.getActiveRangeList().clear({contentsOnly: true, skipFilteredRows: true});
  };
  
  