import React, { Component } from 'react'

class CommentInput extends Component {

  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

  //用户名
   handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

  //内容
  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  //发布
  handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username:this.state.username,
         content:this.state.content,
         createdTime: + new Date()
       })
    }
    this.setState({ content: '' })
  }

  //挂载组件是调用
  componentDidMound(){
    this.textarea.focus();
  }

  //浏览器用户名保存
  _saveUsername(username){
    localStorage.setItem('username',username)
  }

  //
  handleUsernameBlur (event) {
    this._saveUsername(event.target.value)
  }

  //失去焦点
  componentDidMount () {
    this.textarea.focus()
  }

  //不依赖 DOM 操作的组件启动的操作都可以放在 componentWillMount 中进行
   componentWillMount () {
    this._loadUsername()
  }

  //从 LocalStorage 加载用户名并且 setState 到组件的 state.username 中
  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  render () {
    return (
      <div className='comment-input'>
       <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.username} 
              onBlur = {this.handleUsernameBlur.bind(this)}
             onChange={this.handleUsernameChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea   ref={(textarea) => this.textarea = textarea}
            value={this.state.content}  onChange={this.handleContentChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput