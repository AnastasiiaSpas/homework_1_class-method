import React, { Component } from 'react';

class NewForm extends Component {
	render() {
		return (
			<form onSubmit={this.props.HandleAddPost} >
				<input value = {this.props.newPostTitle ? this.props.newPostTitle : ''  }
					onChange={this.props.HandleAddInput} type='text' placeholder='Write new title'></input>
				<textarea value = {this.props.newPostBody ? this.props.newPostBody : ''  }
					onChange={this.props.HandleAddTextArea} placeholder='Write new description'></textarea>
				<button>Add new post</button>
			</form>
		);
	}
}

export default NewForm;