import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getQuestions } from '../../modules/questions';
import Question from './question';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isError: false,
            questions: [],
            currentQuestion: 0,
            score: 0,
            canProceed: false
        };
    }

    componentDidMount() {
        this.props.getQuestions();
    }

    render() {
        const { questions, isLoading, isError } = this.props;
        const { currentQuestion, score, canProceed } = this.state;

        return (
            <div>
                <h1>Quiz</h1>
                <h2>Score: { score }</h2>
                { isLoading && <h3>Hold up while your quiz loads</h3> }
                { isError && <h3>ERROR :(</h3> }
                { questions.length > 0 &&
                    <Question question={questions[currentQuestion]} answerSelected={this._answerSelected.bind(this)} />
                }
                { canProceed && <button onClick={this._nextQuestion}>Next Question</button> }
            </div>
        );
    }

    _answerSelected = (isCorrect) => {
        const { currentQuestion } = this.state;
        const { questions } = this.props;

        const score = this.state.score + (isCorrect ? 1 : 0);
        this.setState({
            score,
            canProceed: currentQuestion < questions.length - 1
        });
    }

    _nextQuestion = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            canProceed: false
        })
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.questions.isLoading,
        isError: state.questions.isError,
        questions: state.questions.questions
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getQuestions
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);