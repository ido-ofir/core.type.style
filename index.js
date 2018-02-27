module.exports = {
    name: 'core.type.style',
    types: [{
        name: 'style',
        extends: 'object',
        schema: [
            {
                key: 'name',
                description: 'the name of the style',
                type: 'string'
            },
            {
                key: 'description',
                description: 'describes the style',
                type: 'string'
            },
            {
                key: 'body',
                description: 'the actual style object',
                type: 'object',
            }
        ],
        build(definition, done) {

            var core = this;

            done(definition.body);

        }
    }]
};