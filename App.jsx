App = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			hideCompleted: false
		}
	},

	getMeteorData() {
		let query = {};

		if (this.state.hideCompleted) {
			query = {checked: {$ne: true}}; //filters out all tasks which have checked = true value
		}

		return {
			tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
			incompleteCount: Tasks.find(query).count()
		};
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},

	handleSubmit(event) {
		event.preventDefault();
		var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text: text,
			createdAt: new Date()
		});

		ReactDOM.findDOMNode(this.refs.textInput).value = "";
	},

	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted
		});
	},

	render() {
		return (
			<div className = "container">
				<header>
					<h1>Todo List ({this.data.incompleteCount})</h1>

				<label className="hide-completed">
					<input
						type="checkbox"
						readOnly={true}
						checked={this.state.hideCompleted}
						onClick={this.toggleHideCompleted} />
					Hide Completed Tasks
				</label>

				<AccountsUIWrapper />

				<form className = "new-task" onSubmit ={this.handleSubmit} >
					<input type = "text"
						ref = "textInput"
						placeholder = "type here to add new tasks"
					></input>
				</form>

				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
});