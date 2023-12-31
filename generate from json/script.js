document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inputForm').addEventListener('submit', function(event) {
        event.preventDefault();

 

    // Get user input values
    
    var roll = document.getElementById('roll').value;
    // Extract department from roll number
    

    // Extract year from roll number
    var joinYear = "20" + roll.substring(0, 2);

    fetch('output.json')
    .then(response => response.json())
    .then(data => {
        var studentData = data.find(function(student) {
            return student["Roll No"] === roll;
        });

        if (studentData) {
            var name = studentData["Student Name"];
            joinYear = parseInt(joinYear);
            var department = roll.substring(4, 7);
        if(department == "CSA") {
            department = "CSE A";
        } else if (department == "CSB") {
            department = "CSE B";
        }
        var gradYear = joinYear + 4;
            var address = studentData["Address"];
            address = address.replace(/\n/g, '<br>');
            var mobile = studentData["Mobile Number"];
            var dob = studentData["Date of Birth"];
            dob=dob.substring(0,10);
            var blood = studentData["Blood Group"];
    // Generate the ID card HTML
    var idCardHTML = `
        
        
    
    <div>
        <img id="photo" src="${roll}.jpg" alt="Profile">
    </div>
     <div id="b1">
        <p id="name">${name}</p>
    </div>
    <div id="con">
        <div id="dept">
             <p id="p2">DEPARTMENT</p>
            <P id="cse">${department}</P>
    </div>
        <div id="year">
                <p id="p22">YEAR</p>
                <P id="p23">${joinYear}-${gradYear}</P>
         </div>
    </div>
    <div id="barcode">
        <img id="barcodeImage" src="" alt="Barcode">
    </div>
    <div id="rollno">
        <p>ID NO : ${roll}</p>
    </div>
    `;
    var studinfo = `
    <div id="dob">
        <p><b>Date of Birth : </b>${dob} </p>
      </div>
      <div id="blood">
        <p><b>Blood Group :</b> ${blood}</p>
      </div>
      <br>
      <div id="address">
        <p><b>Address</b> <br><br> ${address}</p>
      </div>
      <br><br>
      <div id="mobile">
        <p><b>Mobile No :</b> ${mobile}</p>
        </div>
        <br><br>
    `;

    // Display the generated ID card
    document.getElementById('idCardContainer').innerHTML = idCardHTML;
    document.getElementById('studinfo').innerHTML = studinfo;
    // Generate and display the barcode
    var barcodeImage = document.getElementById('barcodeImage');
    JsBarcode(barcodeImage, roll, {
        format: "CODE128",
        width: 300,
        height: 72
    });
} else {
    alert("Student not found with provided Roll Number.");
}
document.getElementById('printButton').addEventListener('click', function() {
    printID();
});
function printID() {
    var container = document.getElementById('container-wrapper').outerHTML;
    
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>ID Card</title></head><body>');
    printWindow.document.write(container);
    printWindow.document.write('</body></html>');

    var styles = Array.from(document.styleSheets).map(styleSheet => {
        return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\n');
    }).join('\n');
    
    var styleElement = printWindow.document.createElement('style');
    styleElement.textContent = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    printWindow.document.head.appendChild(styleElement);
    printWindow.document.close();
    printWindow.print();
}


})
.catch(error => console.error('Error:', error));
});
});