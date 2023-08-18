var a = require("./object");

// Q-01 CALCULATOR  USING ARROW FUNCTION & USE EXPORT & MODULE //
console.log("ADDITION IS " + a.add(5, 5));
console.log("SUBTRACT IS " + a.sub(5, 5));
console.log("MULTYPLE IS " + a.mult(5, 5));
console.log("DIVIDE IS " + a.div(5, 5));

// Q-02 AREA OF CIRCLE //
console.log("AREA OF CIRCLE " + a.circle(5));

// Q-03 AREA OF RECTANGLE //
console.log("AREA OF RECTANGLE " + a.rectangle(5, 5));

// Q-04 AREA OF TRIANGLE //
console.log("AREA OF TRIANGLE " + a.triangle(5, 5));

// Q-05 SIMPLE INTEREST //
console.log("SIMPLE INTEREST IS " + a.interest(10000, 8, 2));

// Q-06 COMPOUND INTEREST //
console.log("COMPOUND INTEREST IS "+a.Cinterest(10000,5,2));

// Q-07 CREATE STUDENT , USER & EMPLOYEE OBJECT AND CALLED INTO ANOTHER MODULE EXPORTS. //
console.log("Student object is "+a.student.greet())

// Q-08 CREATE SERVER USING HTTP //

    const b = require('http');

    const server = b.createServer((req, res) => {
      res.end("Hello World\n");
    });

    server.listen(3000, "127.0.0.1", () => {
      console.log("Server running on port 3000");
    });




