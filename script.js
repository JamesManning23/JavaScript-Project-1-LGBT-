// grabbing all the relevant elements usingthe DOM
const welcomePara = document.getElementById("paraOne");
const button = document.getElementById("button");
const creditPara = document.getElementById("paraTwo");
const containerTwo = document.getElementById("containerTwo");

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
const checkList = () => {
     
    // loops through each array index to create a checkbox for each option.
    for (let i = 0; i < symptomsArray.length; i++) {
        const optionLabel = document.createElement("label");
        optionLabel.innerText = symptomsArray[i];
        optionLabel.setAttribute("for", "option" + i);
        optionLabel.setAttribute("id", "optionLabel");
       
        let optionInput = document.createElement("input");
        optionInput.setAttribute("type", "checkbox");
        optionInput.setAttribute("id", "option" + i);
        optionInput.setAttribute("class", "optionInput");
        
        // creating a div container element.
        const divContainer = document.createElement("div");
        // appending the div container to containerTwo
        containerTwo.append(divContainer);
        // appending the Option input and label to the div
        divContainer.append(optionInput); 
        divContainer.append(optionLabel);
        divContainer.setAttribute("id", "divContainer");
       }


}

const displaySymptomFunction = () => {
    // Removing all the beginning elements
    welcomePara.remove();
    creditPara.remove();
    button.remove();

    // Creating a heading that tells the user to select relevant symptoms 
    const headingTwo = document.createElement("h2");
    headingTwo.innerText = "Please Select Any Symptoms You Have Below";
    containerTwo.appendChild(headingTwo); // Append the heading to containerTwo
    headingTwo.setAttribute("id", "headingTwo");
   

    // creates another heading. 
    const headingThree = document.createElement("h3");
    headingThree.innerText = "This is a symptom checker for the 8 most prevelant STIs contracted by Gay and Bisexual Men";
    containerTwo.appendChild(headingThree); // Append the heading to containerTwo
    headingThree.setAttribute("id", "headingThree");
    
    // creating a submit button and appending this to the container.
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.innerText = "Submit";
    containerTwo.append(submitButton);
    submitButton.setAttribute("id", "submitButton");

    // event listener added to submit button.
    submitButton.addEventListener("click", collectUserData);
    
    // calling the checklist function.
    checkList();
}
button.addEventListener("click", displaySymptomFunction);


const collectUserData = () => {
    // creating a function to iterate through each checkbox and store the value in the userData Variable
    // clears the user data so that it generates only one value each time the 
    let userSelection = [];

    for (let i = 0; i < symptomsArray.length; i++) {
        let optionInput = document.getElementById("option" + i);
        if (optionInput.checked) {
            userSelection.push(symptomsArray[i]);
        }
    }

    let indexScore = [];

    for (let illness of illnessIndex) {
        var scoreObj = {
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

    indexScore = indexScore.sort(function (a, b) { 
        return a.score - b.score; 
    }); 
    indexScore.reverse();   


    console.log(indexScore);

    containerTwo.style.display = 'none';


    // i need to iterate over the index score array and if the score is greater than 0, display to user by removing the container and generating said elements on screen.



}



