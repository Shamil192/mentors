const filterForm = document.filterForm;
const allMentors = document.querySelector("#allMentors");


if (filterForm) {
  filterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // allMentors.innerHTML = ""
    const checkCost = document.querySelector("#costSort");
    const checkExperience = document.querySelector("#experianceSort");
    const select = document.querySelector("select")
    const selectOption = select.options[select.selectedIndex]
    const skill = select.options[select.selectedIndex].text
    const defaultOptionText = 'Выберите компетенции'
    if (selectOption && skill !== defaultOptionText) {
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
      if (!checkCost.checked && !checkExperience.checked) {
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
      if (checkCost.checked) {
        allMentors.innerHTML = "";
        resultRes
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
        allMentors.innerHTML = "";
        resultRes
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
    }
    if (selectOption && skill === defaultOptionText) {
      const response = await fetch("/mentor/showall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: 1,
        }),
      });
      const radioFilter = await response.json();
      if (!checkCost.checked && !checkExperience.checked) {
        allMentors.innerHTML = "";
        radioFilter
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
          allMentors.innerHTML = "";
          radioFilter
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
          allMentors.innerHTML = "";
          radioFilter
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
    }
  });
}
