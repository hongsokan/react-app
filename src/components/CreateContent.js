import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
        console.log('CreateContent render');

        return (
            <article>
                <h2>create</h2>
                <form action="/create_process" method="post"
                    onSubmit={function (e) {
                        e.preventDefault();
                        // debugger; // debugger를 통해 e.target.title.value에 입력한 값이 저장된 것을 알 수 있다.
                        this.props.onSubmit(
                            e.target.title.value,
                            e.target.desc.value
                        );
                        // alert('Submit!');
                    }.bind(this)}
                >
                    <p>
                        <input type="text" name="title"
                            placeholder="title"></input></p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}

export default CreateContent;