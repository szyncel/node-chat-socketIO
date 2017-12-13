class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };

        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => {
                return user.id !== id
            });
            //this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
        //return user that was removed
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getuserByName(name, room){
        var roomLists=this.getUserList(room);

        return roomLists.filter((user) => user === name)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

    getRoom(room){
        var roomList= this.getRoomList();

        return roomList.filter((r) => r === room);

    }

    getRoomList(){
        var roomNames= this.users.map((user) =>user.room);
        var unique = roomNames.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        return unique;
    }
}


module.exports = {
    Users
}