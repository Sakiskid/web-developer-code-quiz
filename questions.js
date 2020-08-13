var jsQuestionsToAdd = [
    {
        Question: "What is the correct function to convert the following object into JSON format?",
        Description: "let myCar = {make: 'Pontiac', model: 'G6'};",
        Answer: "JSON.stringify(myCar);",
        False1: "myCar.stringify();",
        False2: "JSON.parse(myCar);",
        False3: "ParseObject(myCar);"
    },
    {
        Question: "How would you return the value of the Score property in an object?",
        Description: "This is a hard one!",
        Answer: "return myObject.Score;",
        False1: "myObject(Score);",
        False2: "return myObject.Score.value;",
        False3: "return myObject.indexOf(Score);"
    },
    {
        Question: "What does JSON stand for?",
        Description: "",
        Answer: "JavaScript Object Notation",
        False1: "JavaScript Object Noting",
        False2: "JavaScript Object Null",
        False3: "JavaScript Object (New)"
    },
    {
        Question: "What is the correct syntax for a new empty array?",
        Description: "",
        Answer: "var array = [];",
        False1: "var array = {};",
        False2: "var array === [];",
        False3: "var array = new array;"
    },
    {
        Question: "What is the correct syntax for a new empty object?",
        Description: "",
        Answer: "var obj = {};",
        False1: "var obj = [];",
        False2: "var obj === [];",
        False3: "var obj = new obj;"
    }
]

var htmlQuestionsToAdd = [
    {
        Question: "What does HTML stand for?",
        Description: "",
        Answer: "Hypertext Markup Language",
        False1: "Hypertext Markdown Language",
        False2: "Hypertext Marking Language",
        False3: "Hold Tight Mega Lasers"
    },
    {
        Question: "What is the attribute for linking to an external style sheet?",
        Description: "",
        Answer: "href",
        False1: "ref",
        False2: "rel",
        False3: "script"
    },
    {
        Question: "Should you use an ID on more than one element?",
        Description: "",
        Answer: "No, use a class instead.",
        False1: "Yes, it's perfectly fine.",
        False2: "Only if it's withing the same parent element.",
        False3: "Sure, why not :P"
    }
]

var cssQuestionsToAdd = [
    {
        Question: "What does CSS stand for?",
        Description: "",
        Answer: "Cascading Style Sheets",
        False1: "Convalescent Style Sheets",
        False2: "Cascading Saved Styles",
        False3: "Cats Sometimes Sit"
    },
    {
        Question: "What is the correct selector for an ID?",
        Description: "",
        Answer: "#",
        False1: ".",
        False2: "$",
        False3: "{ }"
    },
    {
        Question: "What is the correct selector for a Class?",
        Description: "",
        Answer: ".",
        False1: "#",
        False2: "$",
        False3: "{ }"
    },
    {
        Question: "What is this element called?",
        Description: "#quiz-area:after",
        Answer: "Pseudo Element",
        False1: "Secondary Element",
        False2: "Tertiary Element",
        False3: "Psychic Element"
    },
    {
        Question: "How does this affect our element?",
        Description: "width: 50vh;",
        Answer: "Sets the width to 50% of the view height.",
        False1: "Sets the width to 50% of the parent.",
        False2: "Sets the height to 50% of the view height.",
        False3: "Sets the height to 50% of the parent."
    }
]