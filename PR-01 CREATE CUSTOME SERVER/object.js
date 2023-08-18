
// Q-01 CALCULATOR  USING ARROW FUNCTION & USE EXPORT & MODULE //
exports.add = (a,b) => a+b;
exports.sub = (a, b) => a-b;
exports.mult = (a, b) => a*b;
exports.div = (a, b) => a/b;

// Q-02 AREA OF CIRCLE //
exports.circle = (r) => 3.14*r*r;

// Q-03 AREA OF RECTANGLE //
exports.rectangle = (w, l) => w*l;

// Q-04 AREA OF TRIANGLE //
exports.triangle = (h,b) => h*b/2;

// Q-05 SIMPLE INTEREST //
exports.interest = (p,r,t) => p*r*t/100;

// Q-06 COMPOUND INTEREST //
exports.Cinterest = (p1,r1,t1) => p1*(Math.pow((1+r1/100),t1))-p1 ;

// Q-07 CREATE STUDENT , USER & EMPLOYEE OBJECT AND CALLED INTO ANOTHER MODULE EXPORTS. //

exports.student = {
  name: "Daxit",
  age: 21,
  rollno: 7,
  gender: "male",
  greet() {
    // return this.name+this.age+this.rollno+this.gender;
    console.log(`Name:${this.name}, Age:${this.age}, RollNo:${this.rollno}, Gender:${this.gender}`);

  },
};





