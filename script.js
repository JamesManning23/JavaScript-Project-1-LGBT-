// grabbing all the relevant elements usingthe DOM
const welcomePara = document.getElementById("paraOne");
const Startbutton = document.getElementById("button");
const creditPara = document.getElementById("paraTwo");
const symptomsPage = document.getElementById("containerTwo");

// import json symptom array
let symptomsArray = [];
fetch('./datasets/symptoms.json').then(function(resp) {
    return resp.json();
}).then(function(data) {
    symptomsArray = data;
});
// import illness index array
let illnessIndex = [];
fetch('./datasets/illness.json').then(function(resp) {
    return resp.json();
}).then(function(data) {
    illnessIndex = data;
});

// create a checklist function outside the sympton function as arrow functions cannot be hoisted.
// However, the function will be called in the symptom function when clicked./
const populateSymptomList = () => {
     
    // loops through each symptom array index to create a checkbox for each option and populate the checkboxes with the symptoms.
    for (let i = 0; i < symptomsArray.length; i++) {
        let divContainer = document.createElement("div");
        divContainer.setAttribute("class", "symptom");
        document.getElementById("symptomList").append(divContainer);

        let optionInput = document.createElement("input");
        optionInput.setAttribute("type", "checkbox");
        optionInput.setAttribute("id", "option" + i);
        optionInput.setAttribute("class", "optionInput");
        divContainer.append(optionInput);

        let optionLabel = document.createElement("label");
        optionLabel.innerText = symptomsArray[i];
        optionLabel.setAttribute("for", "option" + i);
        optionLabel.setAttribute("id", "optionLabel");
        divContainer.append(optionLabel);
    }
}
// this function is applied to the submit button.
const displaySymptomFunction = () => {
    // Removing all the beginning elements
    welcomePara.remove();
    creditPara.remove();
    button.remove();

    // Creating a heading that tells the user to select relevant symptoms 
    const headingTwo = document.createElement("h2");
    headingTwo.innerText = "Please Select Any Symptoms You Have Below";
    symptomsPage.appendChild(headingTwo); // Append the heading to symptoms page.
    headingTwo.setAttribute("id", "headingTwo");
   

    // creates another heading. 
    const headingThree = document.createElement("h3");
    headingThree.innerText = "This is a symptom checker for the 7 most prevelant STIs contracted by Gay and Bisexual Men";
    symptomsPage.appendChild(headingThree); // Append the heading to containerTwo
    headingThree.setAttribute("id", "headingThree");


    // create a symptom list container and populate it
    const symptomList = document.createElement("div");
    symptomList.setAttribute("id", "symptomList");
    symptomsPage.append(symptomList);
    populateSymptomList();
    
    // creating a submit button and appending this to the container.
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = "Submit";
    symptomsPage.append(submitButton);
    submitButton.setAttribute("id", "submitButton");

    // event listener added to submit button.
    submitButton.addEventListener("click", collectUserData);
}
    Startbutton.addEventListener("click", displaySymptomFunction);


const collectUserData = () => {
    // Creating a empty user selection array and pushing whatever the user selects to that array
    let userSelection = [];
    for (let i = 0; i < symptomsArray.length; i++) {
        let optionInput = document.getElementById("option" + i);
        if (optionInput.checked) {
            userSelection.push(symptomsArray[i]);
        }
    }

    // Creating a empty indexscore array, looping over the illnesses and if the symptoms selected match with the illness, increment the score by 1.
    let indexScore = [];   
    for (let illness of illnessIndex) {
        let scoreObj = {
            illness: illness,
            score: 0
        };
        for (let illnessSymptom of illness.symptoms) {
            for (let symptom of userSelection) {
                if (illnessSymptom === symptom) {
                    scoreObj.score += 1;
                }
            }
        }
        indexScore.push(scoreObj);
    }

    // Ranking the index score from highest to lowest.
    indexScore = indexScore.sort(function (a, b) { 
        return a.score - b.score; 
    }).reverse();
    // removing the checkboxes
    symptomsPage.style.display = "none";
 
    const resultsPage = document.createElement("div");
    resultsPage.setAttribute("id", "newContainer");
    document.body.append(resultsPage);

    const openingParagraph = document.createElement("h2");
    openingParagraph.setAttribute("id", "openingParagraph");
    openingParagraph.innerText = "Based on the Symptoms you have selected, we have matched the most likely STIS as...";
    resultsPage.appendChild(openingParagraph);
// looping over the index score and if the score is 0 , carry on 
    for (let index of indexScore) {
        if (index.score == 0) {
            // Skip to next item.
            continue;
        }
        // creating a name and description variable and populating them with the data in the illness data set.
        let illnessName = document.createElement("h3");
        illnessName.setAttribute("class", "illnessName");
        illnessName.innerText = index.illness.name;
        resultsPage.appendChild(illnessName);

        let illnessDescription = document.createElement("p");
        illnessDescription.setAttribute("class", "illnessDescription");
        illnessDescription.innerText = index.illness.description;
        resultsPage.appendChild(illnessDescription);
        
        let symptomLength = index.illness.symptoms.length;  
        let illnessScore = document.createElement("p");
        illnessScore.setAttribute("class", "illnessScore");
        illnessScore.innerText = `Out of ${symptomLength} symptoms associatated with this illness, ${index.score} of your selected symptoms match with this illness.`;
        resultsPage.appendChild(illnessScore);

        let info = document.createElement("p");
        info.setAttribute("class", "resourceParagraph");
        info.innerText = "Please Check Out The Following Resource Below";
        resultsPage.appendChild(info);

        let link = document.createElement("a");
        link.href = index.illness.link;
        link.setAttribute("target", "blank");
        link.setAttribute("class", "resourceLink");
        link.textContent = "Learn More About " + index.illness.name;
        resultsPage.appendChild(link);
    }
}


