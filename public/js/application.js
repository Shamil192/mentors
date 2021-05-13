const filterForm = document.filterForm;
const allMentors = document.querySelector("#allMentors");

if (filterForm) {
  filterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    allMentors.innerHTML = ""
    const select = document.querySelector("select")
    if (select.options[select.selectedIndex] && select.options[select.selectedIndex].text !== 'Выберите компетенции') {
      const skill = select.options[select.selectedIndex].text
      const responseSkill = await fetch("/mentor/showall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: skill,
        }),
      });
      const resultRes = await responseSkill.json();
      
      allMentors.innerHTML = "";
      resultRes
        .forEach((element) => {
          allMentors.innerHTML += `<li>
        <div> 
          <p>Ментор: ${element.name}</p>
          <p>Опыт работы: ${element.experience}</p>
          <p>Стоимость занятий: ${element.payPerHour} руб/ч</p>
          <p>${element.competencies}</p>
        </div>
      </li>`;
        });
    }
    // console.log(event.target);

    const checkCost = document.querySelector("#costSort");
    const checkExperience = document.querySelector("#experianceSort");
    const response = await fetch("/mentor/showall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: 1,
      }),
    });
    const resultResponse = await response.json();
    if (!checkCost.checked && !checkExperience.checked) {
      const newResult = [...resultResponse];
    }
    if (checkExperience.checked && checkCost.checked) {
      const newResult = [...resultResponse];
      allMentors.innerHTML = "";
      newResult
        .sort((a, b) => a.experience - b.experience && a.payPerHour - b.payPerHour)
        .forEach((element) => {
          allMentors.innerHTML += `<li>
        <div> 
          <p>Ментор: ${element.name}</p>
          <p>Опыт работы: ${element.experience}</p>
          <p>Стоимость занятий: ${element.payPerHour} руб/ч</p>
          <p>${element.competencies}</p>
        </div>
      </li>`;
        });
    }
    if (checkCost.checked) {
      const newResult = [...resultResponse];
      allMentors.innerHTML = "";
      newResult
        .sort((a, b) => a.payPerHour - b.payPerHour)
        .forEach((element) => {
          allMentors.innerHTML += `<li>
      <div> 
        <p>Ментор: ${element.name}</p>
        <p>Опыт работы: ${element.experience}</p>
        <p>Стоимость занятий: ${element.payPerHour} руб/ч</p>
        <p>${element.competencies}</p>
      </div>
    </li>`;
        });
    }
    if (checkExperience.checked) {
      const newResult = [...resultResponse];
      allMentors.innerHTML = "";
      newResult
        .sort((a, b) => a.experience - b.experience)
        .forEach((element) => {
          allMentors.innerHTML += `<li>
        <div> 
          <p>Ментор: ${element.name}</p>
          <p>Опыт работы: ${element.experience}</p>
          <p>Стоимость занятий: ${element.payPerHour} руб/ч</p>
          <p>${element.competencies}</p>
        </div>
      </li>`;
        });
    }
  });
}
