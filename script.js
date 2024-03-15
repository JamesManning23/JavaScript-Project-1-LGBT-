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
    headingThree.innerText = "This is a symptom checker for the 7 most prevelant STIs contracted by Gay and Bisexual Men";
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
    let userSelection = [];

    // Collecting user-selected symptoms
    for (let i = 0; i < symptomsArray.length; i++) {
        let optionInput = document.getElementById("option" + i);
        if (optionInput.checked) {
            userSelection.push(symptomsArray[i]);
        }
    }

    let indexScore = [];

    // Calculating score for each illness
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

    // Sorting the indexScore based on the score
    indexScore = indexScore.sort(function (a, b) { 
        return a.score - b.score; 
    }).reverse();

 
    const newContainer = document.createElement("div");
    newContainer.setAttribute("id", "newContainer");
    document.body.append(newContainer);

    const openingParagraph = document.createElement("h2");
    openingParagraph.setAttribute("id", "openingParagraph");
    openingParagraph.innerText = "Based on the Symptoms you have selected, we have matched the most likely STIS as...";
    newContainer.appendChild(openingParagraph);

    // Calculating the total number of symptoms checked
    const totalCheckedSymptoms = userSelection.length;

   
   


    for (let index of indexScore) {
        containerTwo.style.display = "none";
        if (index.score > 0) {
            const illnessName = document.createElement("h3");
            illnessName.setAttribute("id", "illnessName");
            illnessName.innerText = index.illness.name;

            const illnessDescription = document.createElement("p");
            illnessDescription.setAttribute("id", "illnessDescription");
            illnessDescription.innerText = index.illness.description;
            

            let symptomLength = index.illness.symptoms.length;  

            const illnessScore = document.createElement("p");
            illnessScore.setAttribute("id", "illnessScore");
            illnessScore.innerText = `Out of ${symptomLength} symptoms associatated with this illness, ${index.score} of your selected symptoms match with this illness.`;

            newContainer.appendChild(illnessName);
            newContainer.appendChild(illnessDescription);
            newContainer.appendChild(illnessScore);

            if (illnessName.innerText === "HIV/AIDS") {
                const hivParagraph = document.createElement("p")
                hivParagraph.setAttribute("id", "hivParagraph");
                hivParagraph.innerText = "Please Check Out The Following Rescource Below";
                newContainer.appendChild(hivParagraph);

                const hivLink = document.createElement("a");
                hivLink.href = "https://www.nhs.uk/conditions/hiv-and-aids/";
                hivLink.setAttribute("id", "hivLink")
                hivLink.setAttribute("target", "blank");
                newContainer.appendChild(hivLink);
                hivLink.textContent = "Learn More About HIV And Aids";
            } else if (illnessName.innerText === "Gonorrhea") {
                let gonorrheaParagraph = document.createElement("p");
                gonorrheaParagraph.setAttribute("id", "gonorrheaParagraph");
                gonorrheaParagraph.innerText = "Please Check Out The Following Rescource Below";
                newContainer.appendChild(gonorrheaParagraph);

                const gonorrheaLink = document.createElement("a");
                gonorrheaLink.href = "https://www.nhs.uk/conditions/gonorrhoea/";
                gonorrheaLink.textContent = "Learn More About Gonorrhea";
                newContainer.appendChild(gonorrheaLink);
                gonorrheaLink.setAttribute("id", "gonorrheaLink");
                gonorrheaLink.setAttribute("target", "blank");
            } else if (illnessName.innerText === "Hepatitis C") {
                const hepcParagraph = document.createElement("p");
                hepcParagraph.setAttribute("id", "hepcParagraph");
                hepcParagraph.innerText = "Please Check Out The Following Rescource Below";
                newContainer.appendChild(hepcParagraph);

                const hepcLink = document.createElement("a");
                hepcLink.setAttribute("id", "hepcLink");
                hepcLink.href = "https://www.nhs.uk/conditions/hepatitis-c/";
                hepcLink.textContent = "Learn More About Hepatitis C";
                hepcLink.setAttribute("target", "blank");
                newContainer.appendChild(hepcLink);
            } else if (illnessName.innerText === "Hepatitis B") {
               const hepbParagraph = document.createElement("p");
               hepbParagraph.setAttribute("id", "hepbParagraph");
               hepbParagraph.innerText = "Please Check Out The Following Rescource Below";
               newContainer.appendChild(hepbParagraph);

               const hepbLink = document.createElement("a");
               hepbLink.setAttribute("id", "hepbLink");
               hepbLink.href = "https://www.nhs.uk/conditions/hepatitis-b/";
               hepbLink.textContent = "Learn More About Hepatits B";
               hepbLink.setAttribute("target", "blank");
               newContainer.appendChild(hepbLink);
            } else if (illnessName.innerText === "Herpes") {
                const herpesParagraph = document.createElement("p");
                herpesParagraph.setAttribute("id", "herpesParagraph");
                herpesParagraph.innerText = "Please Check Out The Following Rescource Below";
                newContainer.appendChild(herpesParagraph);

                const herpesLink = document.createElement("a");
                herpesLink.setAttribute("id", "herpesLink");
                herpesLink.href = "https://www.nhs.uk/conditions/genital-herpes/";
                herpesLink.textContent = "Learn More About Herpes";
                herpesLink.setAttribute("target", "blank");
                newContainer.appendChild(herpesLink);
            } else if (illnessName.innerText === "Chlamydia") {
                const chlamydiaPara = document.createElement("p");
                chlamydiaPara.setAttribute("id", "chlamydiaPara");
                chlamydiaPara.innerText = "Please Check Out The Following Rescource Below";
                newContainer.appendChild(chlamydiaPara);

                const chlamydiaLink = document.createElement("a");
                chlamydiaLink.setAttribute("id", "chlamydiaLink");
                chlamydiaLink.href = "https://www.nhs.uk/conditions/chlamydia/";
                chlamydiaLink.textContent = "Learn More About Chlamydia";
                chlamydiaLink.setAttribute("target", "blank");
                newContainer.appendChild(chlamydiaLink);
            } else if (illnessName.innerText === "Syphilis") {
                const syphilisPara = document.createElement("p");
                syphilisPara.setAttribute("id", "syphilisPara");
                syphilisPara.innerText = "Please Check Out The Following Rescource Below";
                newContainer.appendChild(syphilisPara);

                const syphilisLink = document.createElement("a");
                syphilisLink.setAttribute("id", "syphilisLink");
                syphilisLink.href = "https://www.nhs.uk/conditions/syphilis/";
                syphilisLink.textContent = "Learn More Abbout Syphilis";
                syphilisLink.setAttribute("target", "blank");
                newContainer.appendChild(syphilisLink);
            }

            
        }
        
    }
    
  
}


