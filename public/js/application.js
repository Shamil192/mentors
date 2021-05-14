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
    const defaultOptionText = 'Все наставники'
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
            allMentors.innerHTML += `<div class="shadow p-3 mb-5 bg-white rounded">
          <div class="card-content card mb-3 mx-3">
            <div class="main-blocks-wrapper-mentors-content row g-0">
              <div class="col-md-4 mentors-block-img">
                <img class="imgStyle" height="150" width="300" src="${element.img}" />
              </div>
              <div class="col-md-8 wrapper-mentors-content">
                <div class="card-body mentors-content">
              <a href="/mentor/${element._id}"
                  <h5 class="card-title">${element.name}</h5> </a>
                  <h2 class="card-title">${element.payPerHour} руб/ч</h2>
                  <h2 class="card-title">${element.experience} года</h2>
                  <p
                    class="card-text"
                  >blablablablablablablablablablablablablablablablablablablabla</p>
                  <p class="card-text"><small
                      class="text-muted"
                    >${element.competencies}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
          });
      }
      if (checkCost.checked) {
        allMentors.innerHTML = "";
        resultRes
          .sort((a, b) => a.payPerHour - b.payPerHour)
          .forEach((element) => {
            allMentors.innerHTML += `<div class="shadow p-3 mb-5 bg-white rounded">
            <div class="card-content card mb-3 mx-3">
              <div class="main-blocks-wrapper-mentors-content row g-0">
                <div class="col-md-4 mentors-block-img">
                  <img class="imgStyle" height="150" width="300" src="${element.img}" />
                </div>
                <div class="col-md-8 wrapper-mentors-content">
                  <div class="card-body mentors-content">
               <a href="/mentor/${element._id}"
               
                    <h5 class="card-title">${element.name}</h5></a>
                    <h2 class="card-title">${element.payPerHour} руб/ч</h2>
                    <h2 class="card-title">${element.experience} года</h2>
                    <p
                      class="card-text"
                    >blablablablablablablablablablablablablablablablablablablabla</p>
                    <p class="card-text"><small
                        class="text-muted"
                      >${element.competencies}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
          });
      }
      if (checkExperience.checked) {
        allMentors.innerHTML = "";
        resultRes
          .sort((a, b) => a.experience - b.experience)
          .forEach((element) => {
            allMentors.innerHTML += `<div class="shadow p-3 mb-5 bg-white rounded">
            <div class="card-content card mb-3 mx-3">
              <div class="main-blocks-wrapper-mentors-content row g-0">
                <div class="col-md-4 mentors-block-img">
                  <img class="imgStyle" height="150" width="300" src="${element.img}" />
                </div>
                <div class="col-md-8 wrapper-mentors-content">
                  <div class="card-body mentors-content">
             <a href="/mentor/${element._id}"
                    <h5 class="card-title">${element.name}</h5></a>
                    <h2 class="card-title">${element.payPerHour} руб/ч</h2>
                    <h2 class="card-title">${element.experience} года</h2>
                    <p
                      class="card-text"
                    >blablablablablablablablablablablablablablablablablablablabla</p>
                    <p class="card-text"><small
                        class="text-muted"
                      >${element.competencies}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
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
            allMentors.innerHTML += `<div class="shadow p-3 mb-5 bg-white rounded">
            <div class="card-content card mb-3 mx-3">
              <div class="main-blocks-wrapper-mentors-content row g-0">
                <div class="col-md-4 mentors-block-img">
                  <img class="imgStyle" height="150" width="300" src="${element.img}" />
                </div>
                <div class="col-md-8 wrapper-mentors-content">
                  <div class="card-body mentors-content">
             <a href="/mentor/${element._id}"
                    <h5 class="card-title">${element.name}</h5></a>
                    <h2 class="card-title">${element.payPerHour} руб/ч</h2>
                    <h2 class="card-title">${element.experience} года</h2>
                    <p
                      class="card-text"
                    >blablablablablablablablablablablablablablablablablablablabla</p>
                    <p class="card-text"><small
                        class="text-muted"
                      >${element.competencies}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
          });
      }
      if (checkCost.checked) {
        allMentors.innerHTML = "";
        radioFilter
          .sort((a, b) => a.payPerHour - b.payPerHour)
          .forEach((element) => {
            allMentors.innerHTML += `<div class="shadow p-3 mb-5 bg-white rounded">
              <div class="card-content card mb-3 mx-3">
                <div class="main-blocks-wrapper-mentors-content row g-0">
                  <div class="col-md-4 mentors-block-img">
                    <img class="imgStyle" height="150" width="300" src="${element.img}" />
                  </div>
                  <div class="col-md-8 wrapper-mentors-content">
                    <div class="card-body mentors-content">
               <a href="/mentor/${element._id}"
                      <h5 class="card-title">${element.name}</h5></a>
                      <h2 class="card-title">${element.payPerHour} руб/ч</h2>
                      <h2 class="card-title">${element.experience} года</h2>
                      <p
                        class="card-text"
                      >blablablablablablablablablablablablablablablablablablablabla</p>
                      <p class="card-text"><small
                          class="text-muted"
                        >${element.competencies}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
          });
      }
      if (checkExperience.checked) {
        allMentors.innerHTML = "";
        radioFilter
          .sort((a, b) => a.experience - b.experience)
          .forEach((element) => {
            allMentors.innerHTML += `<div class="shadow p-3 mb-5 bg-white rounded">
              <div class="card-content card mb-3 mx-3">
                <div class="main-blocks-wrapper-mentors-content row g-0">
                  <div class="col-md-4 mentors-block-img">
                    <img class="imgStyle" height="150" width="300" src="${element.img}" />
                  </div>
                  <div class="col-md-8 wrapper-mentors-content">
                    <div class="card-body mentors-content">
               <a href="/mentor/${element._id}"
                      <h5 class="card-title">${element.name}</h5></a>
                      <h2 class="card-title">${element.payPerHour} руб/ч</h2>
                      <h2 class="card-title">${element.experience} года</h2>
                      <p
                        class="card-text"
                      >blablablablablablablablablablablablablablablablablablablabla</p>
                      <p class="card-text"><small
                          class="text-muted"
                        >${element.competencies}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
          });
      }
    }
  });
}
