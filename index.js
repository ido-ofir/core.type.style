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
                description: 'describe the style',
                type: 'string'
            },
            {
                key: 'body',
                description: 'the actual style object',
                type: 'object',
            }
        ],
        build(definition, _super, done) {

            var core = this;

            var { name, dependencies, get, bindings } = definition; 

            _super({
                name: name,
                dependencies: dependencies,
                get(modules) {
                    modules = [].slice.call(arguments);
                    var Component = core.createComponent(name, get.apply(this, modules));
                    var View = core.createComponent(name, {
                        render() {

                            return core.bind(bindings, (state) => {
                                var props = core.assign({}, this.props, state);
                                core.monitor('views.render', { name: name, props: props })
                                return core.createElement({
                                    type: Component,
                                    props: props,
                                    children: props.children
                                });
                            });
                        }
                    });
                    return View;
                }
            }, (view) => {
                core.components[name] = view;
                core.views[name] = view;
                done && done(view);
            });
        }
    }]
};