class ElementView extends React.Component {
    format() {
        if (this.props.prefix !== '') {
            const split = this.props.name.split(this.props.prefix);
            return split.map((element, index, array) => {
                return index >= array.length - 1 ? element : [element, React.createElement(
                    'span',
                    { style: {
                            backgroundColor: 'yellow'
                        } },
                    this.props.prefix
                )];
            });
        }
        return React.createElement(
            'span',
            null,
            this.props.name
        );
    }

    render() {
        return React.createElement(
            'div',
            {
                className: 'text',
                style: {
                    fontSize: 18,
                    borderBottom: "1px gray solid",
                    //                maxHeight: 36,
                    overflow: 'hidden'
                } },
            this.format()
        );
    }
}

class ListView extends React.Component {
    constructor(props) {
        super(props);
    }

    renderElements() {
        return this.props.list.map(element => {
            return React.createElement(ElementView, { prefix: this.props.prefix, name: element });
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            this.renderElements()
        );
    }
}

class AddView extends React.Component {
    render() {
        return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(
                'button',
                { onClick: this.props.onClick, style: {
                        fontSize: 20,
                        width: "100%",
                        backgroundColor: 'silver',
                        height: '100%'
                    } },
                'Add'
            )
        );
    }
}

class LanguageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            list: this.updateList('')
        };
    }

    onChange(e) {
        const value = e.target.value;
        this.updateList(value);
    }

    updateList(prefix) {
        let list = this.props.dictionary.filter(word => {
            return word.indexOf(prefix) >= 0;
        });
        list = list.map(word => {
            return {
                word: word,
                pos: word ? word.indexOf(prefix) : -1
            };
        });
        list.sort((a, b) => {
            return a.pos - b.pos;
        });
        list = list.slice(0, 10);
        list = list.map(element => element.word);
        this.setState({
            prefix,
            list
        });
        return list;
    }

    onAddMode() {
        this.setState({
            mode: 'add'
        });
    }

    onCancel() {
        this.setState({
            mode: null
        });
    }

    onAdd() {
        this.setState({
            mode: null
        });
    }

    render() {
        return React.createElement(
            'div',
            null,
            this.state.mode === 'add' ? React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    'Add a new entry'
                ),
                React.createElement('textarea', { style: {
                        width: '100%',
                        border: '1px solid black',
                        height: 48,
                        margin: -1
                    } }),
                React.createElement(
                    'button',
                    { style: {
                            fontSize: 20,
                            width: "50%",
                            backgroundColor: '#ada',
                            position: 'fixed',
                            bottom: 0,
                            height: 60
                        }, onClick: this.onAdd.bind(this) },
                    'OK'
                ),
                React.createElement(
                    'button',
                    { style: {
                            fontSize: 20,
                            color: '#faa',
                            left: '50%',
                            width: "50%",
                            backgroundColor: '#a00',
                            position: 'fixed',
                            bottom: 0,
                            height: 60
                        }, onClick: this.onCancel.bind(this) },
                    'Cancel'
                )
            ) : React.createElement(
                'div',
                null,
                React.createElement('input', { style: {
                        border: '1px solid black',
                        margin: -1,
                        width: '100vw',
                        height: 24,
                        fontSize: 24
                    }, onChange: this.onChange.bind(this) }),
                React.createElement(ListView, { prefix: this.state.prefix, list: this.state.list }),
                React.createElement(AddView, { style: {
                        position: 'fixed',
                        width: '100%',
                        bottom: 0,
                        height: 60
                    }, onClick: this.onAddMode.bind(this) })
            )
        );
    }
}

class Main {
    static setupView(root, dictionary) {
        ReactDOM.render(React.createElement(LanguageView, { dictionary: dictionary }), root);
    }
}
//# sourceMappingURL=translator.js.map