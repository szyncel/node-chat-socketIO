var expect = require('expect');

var {
    Users
} = require('./users');




describe('Users class tests', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: '1',
                name: 'Jan',
                room: 'Mozg'
            },
            {
                id: '2',
                name: 'Andrzej',
                room: 'Test'
            },
            {
                id: '3',
                name: 'Dzik',
                room: 'Test'
            }
        ]
    });
    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Jan',
            room: 'Test'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
    it('should return name for test course', () => {
        var userNames = users.getUserList('Test');

        expect(userNames).toEqual(['Andrzej', 'Dzik']);
    });

    it('should return name for Mozg course', () => {
        var userNames = users.getUserList('Mozg');

        expect(userNames).toEqual(['Jan']);
    });

    it('should find user',() => {
       var user=users.getUser('3');
       expect(user).toEqual(users.users[2]); 
    });

    it('should return all room names',() => {
        var rooms=users.getRoomList();

        expect(rooms).toEqual(['Mozg','Test']);
    })

});