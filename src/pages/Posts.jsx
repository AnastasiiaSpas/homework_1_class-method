import React, { Component } from 'react';
import JsonPlaceholder from './../services/Jsonplaceholder';

class Posts extends Component {
	state = {
		posts: [],
		newPostTitle: undefined,
		newPostBody: undefined,
		inputChangeTitle: undefined,
		textareaChangeDescription: undefined,
		indexChangePost: undefined,
		disabledBtnChange: true,
	}

	focusInput = React.createRef()

	componentDidMount(){
	 (async () => {
            let posts = await JsonPlaceholder('posts');            
            this.setState({posts : posts});            
   	})()
	}

	HandleAddInput = (e) => this.setState({newPostTitle: e.target.value})

	HandleAddTextArea = (e) => this.setState({newPostBody: e.target.value})

	HandleAddPost = async(e) => {
		e.preventDefault();

		let newPostAdd = await JsonPlaceholder(`posts`,`POST`, {title: this.state.newPostTitle, body: this.state.newPostBody})

		this.setState({
			posts: this.state.posts.concat([newPostAdd]),
			newPostTitle: '',
			newPostBody: ''
		})

		alert(`New post ${this.state.newPostTitle} added`)
	}

	HandleChangeInput = (e) => this.setState({inputChangeTitle: e.target.value})

	HandleChangeTextArea = (e) => this.setState({textareaChangeDescription: e.target.value})

	HandleChangePost = async(e) => {
		e.preventDefault();

		if(this.state.indexChangePost){
	
			if(this.state.indexChangePost<101){
				let changePostAdd = await JsonPlaceholder(`posts/${this.state.indexChangePost}`,`PUT`, {title: this.state.inputChangeTitle, body: this.state.textareaChangeDescription});
			}

			let changePost = this.state.posts.forEach((item)=>{
				if(item.id === this.state.indexChangePost){
					item.title = this.state.inputChangeTitle;
					item.body = this.state.textareaChangeDescription
				}
			})

			this.setState({
				inputChangeTitle: '',
				textareaChangeDescription: ''
			})

			alert(`The post ${this.state.inputChangeTitle} changed`)
		}
	}

	btnChange = (e) => {
		let indexOfChangePost = parseInt(e.target.parentElement.id)
		let findPost = this.state.posts.find(item => item.id === indexOfChangePost)
		this.setState({
			indexChangePost: indexOfChangePost,
			inputChangeTitle: findPost.title,
			textareaChangeDescription: findPost.body,
			disabledBtnChange: false
		})
		this.focusInput.current.focus()
	}

	btnDelete = async(e) => {
		let indexOfPost = this.state.posts.findIndex(post=>post.id === parseInt(e.target.parentElement.id))

		let deletePost = await JsonPlaceholder(`posts/${indexOfPost}`,`DELETE`);
	
		this.state.posts.splice(indexOfPost,1)

		this.setState({posts : this.state.posts})
	}

	render() {
		return (
			<>
				<h3>Let's try to add, change or delete posts!</h3>
				<div className='wrapper'>
					<form onSubmit={this.HandleAddPost} >
						<input value = {this.state.newPostTitle ? this.state.newPostTitle : ''  } 
                         onChange={this.HandleAddInput} type='text' placeholder='Write new title'></input>
						<textarea value = {this.state.newPostBody ? this.state.newPostBody : ''  } 
                            onChange={this.HandleAddTextArea} placeholder='Write new description'></textarea>
						<button>Add new post</button>
					</form>
					<form onSubmit={this.HandleChangePost} >
						<input ref={this.focusInput} value = {this.state.inputChangeTitle ? this.state.inputChangeTitle : ''  } 
                         onChange={this.HandleChangeInput} placeholder='Edit title'></input>
						<textarea value = {this.state.textareaChangeDescription ? this.state.textareaChangeDescription : ''  } 
                            onChange={this.HandleChangeTextArea} placeholder='Edit description'></textarea>
						<button disabled={this.state.disabledBtnChange}>Change post</button>
					</form>
				</div>
				<ul>
					{this.state.posts? this.state.posts.map((item, index)=> 
						<li key={index} id={item.id}>
							<h4>#{item.id} Title: {item.title}</h4>
							<p>Description: {item.body}</p> 
							<button onClick={this.btnDelete}>Delete</button>
							<button onClick={this.btnChange}>Change</button>
						</li>) : undefined}
				</ul>
			</>
		);
	}
}

export default Posts;