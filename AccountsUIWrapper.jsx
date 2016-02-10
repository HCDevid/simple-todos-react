AccountsUIWrapper = React.createClass({
	componentDidMount() {
		this.view = Blaze.render(Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.container));
	},

	componentWillUnmount() {
		Blaze.remove(this.view);
	},

	render() {
		// placeholder span for render return purposes
		return <span ref="container" />;
	}
});