const form = document.querySelector('#weatherForm');
const cityInput = document.querySelector('#cityInput');
const result = document.querySelector('#result');

// Yukarıdaki kodda html kodlarını tanımladım.  form , cityInput ve resultDiv olarak

form.addEventListener('submit', (event) => {
    // Form elementine bir olay dinleyicisi eklemek için kullanılır.Submit olayı form gönderildiğinde tetiklenir.
	event.preventDefault(); //sayfanın yenilenmesini önlemek için event.preventDefault() kullanılır.

	const city = cityInput.value;
    // kullanıcının girdiği şehir adını alır. Yani value sunu.
	const url = `http://api.weatherapi.com/v1/current.json?key=c820bae4f65047388c1164528231005&q=${city}&aqi=no`;
   //hava durumu API'sine gönderilecek istek URL'sini oluşturmak için kullanılır. city değişkeni, kullanıcının girdiği şehir adını içerir.
   
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const location = data.location.name;
			const temperature = data.current.temp_c;
			//fetch() metodunu kullanılarak response.json() ile verileri işler ve değişkenlere atar

			result.innerHTML = `
				<p>${location}'da hava durumu:</p>
				<p>Sıcaklık: ${temperature} &#8451;</p>
				
			`;
            //result'ın innerHTML özelliğini kullanarak hava durumu bilgilerini HTML olarak görüntüler.
			
		})
		.catch(error => {
			result.textContent = 'Hava durumu bilgisi alınamadı.';  //result.textContent özelliği, içeriğin değiştirilmesi 
			console.error(error);
		});
		cityInput.value = "";
});