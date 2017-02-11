import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Question from './Question.jsx';

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    //make request to our database to get list of questions
    //update questions arr
    axios.get('/loadForum')
      .then(res => {
        const tempArr = [];
        res.data.forEach((el, i) => {
          tempArr.push(<Question 
                        key={i}
                        id={el.question_id}
                        description={el.question_title}
                        questionText={el.question_text}
                      />);
        });
        this.setState({ questions: tempArr });
      })
      .catch((err) => {
        console.log(err);
      });

  // store response of each one in <Question title="Test" description="testing 123" />
  }

  render() {
    return (
      <div className="question-container">
        <div>
          <h1>Hello {this.props.username}</h1>
          <Link to='/createQuestion'>Form</Link>
        </div>
        {this.state.questions}
      </div>
    )
  }
}


export default QuestionContainer;