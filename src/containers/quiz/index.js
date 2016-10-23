import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getQuestions } from '../../modules/questions'; 

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isError: false,
            questions: []
        };
    }

    componentDidMount() {
        this.props.getQuestions();
    }

    render() {
        return (
            <div>
                <h1>quiz</h1>
                <p>
                    { JSON.stringify(this.props.questions) }
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.questions.isLoading,
    isError: state.questions.isError,
    questions: state.questions.questions
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getQuestions
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);