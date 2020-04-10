var firebaseConfig = {
    apiKey: "AIzaSyDVin5xwW35Iba0upHqJLgzeU4fpFnpvi4",
    authDomain: "final-grade-calculator-7efd1.firebaseapp.com",
    databaseURL: "https://final-grade-calculator-7efd1.firebaseio.com",
    projectId: "final-grade-calculator-7efd1",
    storageBucket: "final-grade-calculator-7efd1.appspot.com",
    messagingSenderId: "578696389905",
    appId: "1:578696389905:web:3b9220083a670b473b58b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Save the courseName in to the firebase
function saveData() {
    db.collection("Subject").add({
        course: document.getElementById('TypeOfCourse').value

    });
}

// Save the percentage to the database
function savePercentage() {
    let total = 0;
    for (let i = 0; i < calNoLogin.inputData.length; i++) {
        total = total + calNoLogin.inputData[i][2];
    }

    db.collection("Total").add({
        totalSCore: total

    });
    totalCalculate();
}

// Calculate the total and display it in the total div
function totalCalculate() {

    db.collection("Total").limit(calNoLogin.inputData.length).onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {


            document.getElementById("totalNoLogin").innerHTML = ((doc.data().totalSCore) * 100).toFixed(2) + "%";


        });
    });
}

