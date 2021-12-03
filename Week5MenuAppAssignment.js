/*
This program creates a program that creates teacher objects that can hold arrays of students. Each teacher has a name and grade level they teach. 
Students are objects that have a name, letter grade, and birthday.
The menu shows all the options that you can interact with teachers and students. This includes adding and removing teachers, adding and removing students, and displaying all of those things
*/

//teacher class takes in a name and what grade they teach, has the ability to add or remove students from the class
class Teacher{
    constructor(name,grade){
        this.name = name;
        this.grade = grade;
        this.students = []
    }
    
    describe(){
        return `${this.name} teaches grade ${this.grade}.`;
    }
    addStudent(student){
        if(student instanceof Student){
            this.students.push(student);
        }
        else{
            throw new Error(`You can only add an instance of Student. Argument is not a student: ${student}`);
        }
    }

    removeStudent(student){
        this.students = this.students.filter((stud) =>{return stud.name !== student.name})
    }
}

//student class takes in a name, birthday, and a letter grade to create a student
class Student{
    constructor(name, letterGrade,birthday){
        this.name = name;
        this.letterGrade = letterGrade;
        this.birthday = birthday;
    }

    describe(){
        return `${this.name} has a class grade of ${this.letterGrade}.
        Their birthday is ${birthday}.`;
    }
}

class Menu{
    constructor(){
        this.classes = []
        this.selectedTeacher = null;

    }
    
    //main part of running the menu
    start(){
        let selection = this.showMainMenuOptions();

        while(selection != 0){
            switch(selection){
                case '1': 
                    this.createTeacher();
                    break;
                case '2':
                    this.viewStudents();
                    break;
                case '3':
                    this.deleteTeacher();
                    break;
                case '4':
                    this.displayClasses();
                    break;
                default: 
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        
        alert('Goodbye!');
    }

    //sub menu within display classes
    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new class with new teacher
        2) view teacher's classes
        3) delete a teacher's class
        4) display all classes
        `);
    }

    showClassMenuOptions(classInfo){
        return prompt(`
        0) back
        1) add new student
        2) remove student
        -----------------
        ${classInfo}
        `);
    }

    //create a new class with a new teacher
    createTeacher(){
        let name = prompt('Enter name of new teacher: ');
        let grade = prompt('What grade does ' + name + ' teach? ');
        this.classes.push(new Teacher(name,grade));
    }

    //delete one teacher's class out of the list
    deleteTeacher(){
        let index = prompt('Enter the index of the class that you want to delete: ');
        if(index > -1 && index < this.classes.length){
            this.classes.splice(index,1);
        }
    }

    //display all the teachers and what class they teach
    displayClasses(){
        let classString = '';
        for(let i = 0; i < this.classes.length; i++){
            classString += i + ') ' + this.classes[i].name + ': Grade ' + this.classes[i].grade + '\n';
        }
        alert(classString);
    }

    //view all the students of a specific teacher
    viewStudents(){
        let index = prompt('Enter the index of the class you would like to view: ');
        if(index > -1 && index < this.classes.length){
            this.selectedTeacher = this.classes[index];
            let description =   `Grade: ${this.selectedTeacher.grade}
            \nTeacher: ${this.selectedTeacher.name}\n`;
            
            for(let i = 0; i < this.selectedTeacher.students.length; i++){
                description += `${i}) ${this.selectedTeacher.students[i].name} - Birthday: ${this.selectedTeacher.students[i].birthday}\n`;    
            }

            let selection = this.showClassMenuOptions(description);
            switch(selection){
                case '1':
                    this.createStudent();
                    break;
                case '2':
                    this.deleteStudent();
                    break;
            }
        }
    }

    //adds a new student to the current teacher's class
    createStudent(){
        let name = prompt('Enter name for new student: ');
        let letter = prompt('Enter letter grade for ' + name + ': ');
        let birthday = prompt('Enter birthday of ' + name + ': ');

        this.selectedTeacher.students.push(new Student(name,letter,birthday));
    }

    //deletes a student from the current teacher's class
    deleteStudent(){
        let index = prompt('Enter the index of the student you wish to remove: ');
        if(index > -1 && this.selectedTeacher.students.length){
            this.selectedTeacher.players.splice(index,1);
        }
    }

}


let menu = new Menu();
menu.start();