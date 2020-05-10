import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {

    renderError = ({error, touched}) => {
        if(touched && error) {
            return(
                <div className = "ui error message">
                    <div className = "header">{error}</div>
                </div>
            );
        } 
    }

    renderComponent = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}` 
        return (
            <div className = {className}>
                <label>{ formProps.label }</label>   
                <input {...formProps.input} autoComplete = "off" />
                {this.renderError(formProps.meta)}
            </div>

        );
    }

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <form className = "ui form error" onSubmit = {this.props.handleSubmit(this.onSubmit)} >
                <Field name = "title" component = {this.renderComponent} label = "Enter Title"/>
                <Field name = "description" component = {this.renderComponent} label = "Enter Description"/>
                <button className = "ui button primary">Submit</button>
            </form>
        );
    };
};

const validate = (formValues) => {
    let error = {};
    if(!formValues.title) {
        error.title = "Please enter a title";
    }

    if(!formValues.description) {
        error.description = "Please enter a description";
    }

    return error;
}

const formWrapper =  reduxForm({
    form: "streamCreate",
    validate
})(StreamCreate);


export default connect(null, {
    createStream
})(formWrapper);

