class Animal{
    constructor(){
        this.name = name;
    }
    eat(){
        alert(this.name+"eat")
    }
}

class Dog extends Animal{
    constructor(name){
        super(name)
        this.name = name;
    }
    say(){
        alert(this.name + 'say')
    }
}

const dog = new Dog("哈士奇")

console.log(dog.name);
dog.eat()
dog.say()