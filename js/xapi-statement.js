
let userName = localStorage.getItem('user');


var conf = {
    "endpoint" : "https://xapi-practica.lrs.io/xapi/",
    "auth" : "Basic " + toBase64('nombre:clave')
  };

ADL.XAPIWrapper.changeConfig(conf);



$(document).ready(function(){

  const $currentQuestionNumber = $('.question-number');
  const $currentQuestionText = $('.question-description');

  $('.option-div').click(function(e, v){

    answered($(this).children('p').attr("id"), $currentQuestionNumber.text().trim());

  });
});


// Used to capture an answer selection
function answered(answer, questionNumber) {       
  
  
  var statement = {
      "actor": {
          "mbox": "mailto:" + userName + "@examplemail.com",
          "name": userName,
          "objectType": "Agent"
      },
      "verb": {
          "id": "http://adlnet.gov/expapi/verbs/answered",
          "display": {
              "en-US": "answered"
          }
      },
      "object": {
          "id": `http://maxwellcoyle.com/xapi-test-project/question-${questionNumber}`,
          "definition": {
              "name": {
                  "en-US": `Question #${questionNumber}`
              },
              "description": {
                  "en-US": `Data Security 101: Question #${questionNumber}`
              }
          },
          "objectType": "Activity"
      },
      "result": {
          "response": answer,
      },
      
      "context": {
          "contextActivities": {
              "parent": [
                  {
                      "id": "http://maxwellcoyle.com/xapi-test-project",
                      "definition": {
                          "name": {
                              "en-US": "xAPI Wrapper Assessment Demo"
                          },
                          "description": {
                              "en-US": "Demonstrating xAPI Wrapper used with an assessment form"
                          }
                      },
                      "objectType": "Activity"
                  },
              ],
              "grouping": [
                  {
                      "definition": {
                          "name": {
                              "en-US": "xAPI Test Project"
                          },
                          "description": {
                              "en-US": "A test project for using xAPI in vanilla js projects"
                          }
                      },
                      "id": "http://maxwellcoyle.com/xapi-test-project/questions",
                      "objectType": "Activity"
                  }
              ]
          }
      }
  };

  console.log(userName);
  ADL.XAPIWrapper.sendStatement(statement, function(){}); 
  
  // adding an empty function at the end of sendStatement tells it to fire async
}