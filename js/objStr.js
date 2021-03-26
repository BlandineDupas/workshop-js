let member = function (id, name, grade) {
    this.id = id;
    this.name = name;
    this.grade = grade;
    this.toString = () => {
        return 'ID: ' + this.id + ', Name: ' + this.name + ', Grade: ' + this.grade + '.';
    }
}

function team() {
    this.members = [];
    this.add = (member) => {
        this.members.push(member);
    }
    this.printTeam = () => {
        let teamElement = document.getElementById('team');
        this.members.forEach(member => {
            let newP = document.createElement('p');
            newP.textContent = member.toString();
            teamElement.appendChild(newP);
        });
    }
}

let myFamily = new team();

myFamily.add(new member(1, 'Marc', 'Papa'));
myFamily.add(new member(2, 'Yolaine', 'Maman'));
myFamily.add(new member(3, 'Jean Baptiste', 'fils'));
myFamily.add(new member(4, 'Blandine', 'fille'));
myFamily.add(new member(5, 'Marie-Reine', 'fille'));
myFamily.add(new member(6, 'François', 'fils'));
myFamily.add(new member(7, 'Agnès', 'fille'));

document.addEventListener('DOMContentLoaded', myFamily.printTeam);
