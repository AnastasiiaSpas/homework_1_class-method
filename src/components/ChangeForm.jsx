import React, { Component } from 'react';

class ChangeForm extends Component {
	render() {
		return (
			<form onSubmit={this.props.HandleChangePost} >
				<input ref={this.props.focusInput} value = {this.props.inputChangeTitle ? this.props.inputChangeTitle : ''  }
					onChange={this.props.HandleChangeInput} placeholder='Edit title'></input>
				<textarea value = {this.props.textareaChangeDescription ? this.props.textareaChangeDescription : ''  }
					onChange={this.props.HandleChangeTextArea} placeholder='Edit description'></textarea>
				<button disabled={this.props.disabledBtnChange}>Change post</button>
			</form>
		);
	}
}

export default ChangeForm;