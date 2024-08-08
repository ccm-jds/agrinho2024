
(function update() {
    $.getJSON( "https://api.weather.com/v2/pws/observations/current?stationId=IJANDA6&format=json&units=m&apiKey=2fa2cac154b640b1a2cac154b680b15f&numericPrecision=decimal")
    .done(function( json ) {
        //Atribuindo as informações da estação meteorológica
        $('#windgust').text(json.observations[0].metric.windGust);
        $('#windspeed').text(json.observations[0].metric.windSpeed);
        $('#temp').text(json.observations[0].metric.temp);
        $('#pressure').text(json.observations[0].metric.pressure);
        $('#heatindex').text(json.observations[0].metric.heatIndex);
        $('#dewpt').text(json.observations[0].metric.dewpt);
        $('#humidity').text(json.observations[0].humidity);
        $('#preciprate').text(json.observations[0].metric.precipRate);
        $('#preciptotal').text(json.observations[0].metric.precipTotal);
    })
    //Exibir mensagem no console em caso de erro
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    //Buscar dados a cada 30s
    }).then(function() {
        setTimeout(update, 30000);
    });
})(); 

//Gerar texto por a I.A 
function textIA(str) {

    $('#textIA>p').text('');
    $('#textIA').show();
    $('#textIA>div.spinner-border').show();
    var settings = {
        "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDdXcVm_3NQ4nhlQ41Vl8-m-9SGhiYhfPY",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "contents": [
            {
              "parts": [
                {
                  "text": str
                }
              ]
            }
          ]
        }),
      };
      
      $.ajax(settings)
        .done(function (response) {
            $('#textIA>p').text(response.candidates[0].content.parts[0].text);
            $('#textIA>div.spinner-border').hide();
        });
}

$('#cultivo').on('change', function(){
  if($('#cultivo').val() != 0) {
    textIA('A temperatura em Jandaia do Sul está ' + $('#temp').text() + '°C, a velocidade do vento ' + $('#windspeed').text() + ' km/h e a umidade ' + $('#humidity').text() + '. Descreva em apenas 100 palavras, qual a recomendação agronômica para o cultivo de ' + $('#cultivo').val() + ' nesta condição climática');
  } else {
    $('#textIA').hide();
    const toastIA = document.getElementById('toastIA')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastIA)
    toastBootstrap.show()
  }
});

