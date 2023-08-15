document.addEventListener("DOMContentLoaded", function() {
      const firstButton = document.querySelector(".firstButton button");
      const originalColor = getComputedStyle(firstButton).backgroundColor;
  
      firstButton.addEventListener("click", function() {
        firstButton.style.backgroundColor = "#69affa";
  
        setTimeout(function() {
          firstButton.style.backgroundColor = originalColor;
        }, 300); // 400 milliseconds delay to revert to the original color
      });
    });
  

document.addEventListener("DOMContentLoaded", function() {
  const addButton = document.getElementById("addButton");
  const courseDropdowns = document.querySelectorAll(".courseNumber");
  const yearDropdown = document.querySelector(".honours-year");
  const infoShowDiv = document.querySelector(".info-show ul");

  let calculateBtnAdded = false; // Flag to track if Calculate button has been added
  let securedCgpaDisplayed = false; // Flag to track if CGPA result is displayed
  let previousCreditValues = []; // Store previous credit values to compare changes

  addButton.addEventListener("click", function() {
    if (yearDropdown.value === "") {
      alert("Select a year !");
      return;
    }

    const selectedCourseCount = Array.from(courseDropdowns)
      .map(dropdown => parseInt(dropdown.value))
      .filter(count => count > 0)
      .length;

    if (selectedCourseCount < 1) {
      alert("Select at least one course option !");
      return;
    }

    infoShowDiv.innerHTML = "";
    const selectedYearValue = parseInt(yearDropdown.value);
    const courseList = [];

    courseDropdowns.forEach((dropdown) => {
      const courseCount = parseInt(dropdown.value);
      const creditCategory = dropdown.closest(".creditInput").querySelector("h4").textContent.split(" ")[0];
      for (let i = 0; i < courseCount; i++) {
        courseList.push(creditCategory);
      }
    });

    let currentNumber = selectedYearValue * 100 + 1;
    const newLi = document.createElement("li");

    const coursesH3 = document.createElement("h3");
    coursesH3.textContent = "Courses";
    newLi.appendChild(coursesH3);

    const creditsH3 = document.createElement("h3");
    creditsH3.textContent = "Credits";
    newLi.appendChild(creditsH3);

    const obtainedH3 = document.createElement("h3");
    obtainedH3.textContent = "Obtained Point";
    newLi.appendChild(obtainedH3);

    infoShowDiv.appendChild(newLi);

    for (const creditCategory of courseList) {
      const paddedIndex = currentNumber.toString().padStart(3, "0");
      const li = document.createElement("li");
      const h3 = document.createElement("h3");
      h3.textContent = paddedIndex;
      li.appendChild(h3);

      const courseNumberH3 = document.createElement("h3");
      courseNumberH3.textContent = creditCategory;
      li.appendChild(courseNumberH3);

      if (creditCategory === "4" || creditCategory === "3" || creditCategory === "2") {
        const selectElement = document.createElement("select");
        // Add options to selectElement here
        const options = [
          { grade: "Select Grade...", value: "", disabled: true },
          { grade: "A+", value: 4.00},
          { grade: "A", value: 3.75},
          { grade: "A-", value: 3.50},
          { grade: "B+", value: 3.25},
          { grade: "B", value: 3.00},
          { grade: "B-", value: 2.75},
          { grade: "C+", value: 2.50},
          { grade: "C", value: 2.25},
          { grade: "D", value: 2.00},
          { grade: "F", value: 0.00}
        ];

        options.forEach((option, index) => {
          const optionElement = document.createElement("option");

          if (option.value !== "") {
            const formattedValue = parseFloat(option.value).toFixed(2);
            optionElement.textContent = `${formattedValue} (${option.grade})`;
          } else {
            optionElement.textContent = option.grade;
          }

          optionElement.value = option.value.toString();

          if (index === 0) {
            optionElement.disabled = true;
            optionElement.selected = true;
          };

          selectElement.appendChild(optionElement);
        });

        li.appendChild(selectElement);
      }

      infoShowDiv.appendChild(li);
      currentNumber++;
    }

    if (!calculateBtnAdded) {
      const calculateBtn = document.createElement("button");
      calculateBtn.id = "calculateBtn";
      calculateBtn.textContent = "Calculate";
      infoShowDiv.parentNode.insertBefore(calculateBtn, infoShowDiv.nextSibling);
      calculateBtnAdded = true;
      
      
   calculateBtn.addEventListener("click", function() {
    const originalColor = getComputedStyle(calculateBtn).backgroundColor;
    calculateBtn.style.backgroundColor = "#d16b82b3";
  
    setTimeout(function() {
      calculateBtn.style.backgroundColor = originalColor;
    }, 300);
  
  // Check if any select element doesn't have a selected option
  let missingSelection = false;

  infoShowDiv.querySelectorAll("li").forEach((li) => {
    const selectElement = li.querySelector("select");
    if (selectElement && selectElement.value === "") {
      missingSelection = true;
      selectElement.style.borderColor = "red"; // Highlight the missing selection
    }
  });

  if (missingSelection) {
    alert("Select a grade for every course !");
    return;
  }

  // Reset the border color of select elements
  infoShowDiv.querySelectorAll("li select").forEach((select) => {
    select.style.borderColor = "";
  });

  
    // Recalculate the secured CGPA
    let totalCreditSecured = 0;
    let totalCredit = 0;
  
    infoShowDiv.querySelectorAll("li").forEach((li) => {
      const selectElement = li.querySelector("select");
      if (selectElement) {
        const selectedValue = parseFloat(selectElement.value);
        const creditCategory = parseFloat(li.querySelector("h3:nth-child(2)").textContent);
        totalCreditSecured += selectedValue * creditCategory;
        totalCredit += creditCategory;
      }
    });
  
    securedCgpa = (totalCreditSecured / totalCredit).toFixed(2);
  
    const resultH1 = document.querySelector(".result-h1-div h1");
      resultH1.textContent = `CGPA : ${securedCgpa}`;
    });
   }
  });
});
