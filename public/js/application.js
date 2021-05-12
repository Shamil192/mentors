const filterForm = document.filterForm;
const allMentors = document.querySelector('#allMentors')

if (filterForm) {

  filterForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const response = await fetch('/mentor/showall',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.target.name.value
        }),
      });
    const resultResponse = await response.json();
    allMentors.innerHTML = '';
    resultResponse.forEach(element => {
      allMentors.innerHTML += `<li>
      <div> 
        <p>Ментор: ${element.name}</p>
        <p>Опыт работы: ${element.experience}</p>
        <p>Стоимость занятий: ${element.payPerHour} руб/ч</p>
      </div>
    </li>`
    });




  })
}
