var expect = require('expect');

var {
    generateMessage,
    generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Andrij',
            text = 'Jakaś wiadomosc';
        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('string');

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Andrij';
        var position = {
            latitude: 1,
            longitude: 2
        };
        var location = generateLocationMessage(from, position);

        expect(location.from).toBe(from);
        expect(location.url).toBe(`http://www.google.pl/maps?q=${position.latitude},${position.longitude}`);
       // expect(typeof message.createdAt).toBe('string');

    });
});