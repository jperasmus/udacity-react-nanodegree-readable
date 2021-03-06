import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button, Input, message } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class AddEditPostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitting: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ formSubmitting: true }, () => {
      this.props.form.validateFields((err, values) => {
        if (err) {
          this.setState({ formSubmitting: false });
          return message.error('Please double check all the fields and try submitting the post again');
        }

        return this.props
          .submitPost(values)
          .then(() => this.setState({ formSubmitting: false }))
          .catch(() => this.setState({ formSubmitting: false }));
      });
    });
  };

  render() {
    const { form, id } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Title" hasFeedback>
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Please input the post title'
              }
            ]
          })(<Input placeholder="" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Author" hasFeedback>
          {getFieldDecorator('author', {
            rules: [
              {
                required: true,
                message: 'Please input the post author'
              }
            ]
          })(<Input placeholder="" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Category" hasFeedback>
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please select the post category' }]
          })(
            <Select placeholder="">
              {this.props.categories.map(category => (
                <Option key={`category_${category.name}`} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Body" hasFeedback>
          {getFieldDecorator('body', {
            rules: [{ required: true, message: 'Please provide a post body' }]
          })(<TextArea placeholder="" autosize={{ minRows: 2, maxRows: 8 }} />)}
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" disabled={this.state.formSubmitting}>
            {id ? 'Update Post' : 'Add Post'}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

AddEditPostForm.defaultProps = {
  categories: [],
  id: null
};

AddEditPostForm.propTypes = {
  id: PropTypes.string,
  categories: PropTypes.array,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  submitPost: PropTypes.func.isRequired
};

export default Form.create({
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        value: props.title
      }),
      author: Form.createFormField({
        value: props.author
      }),
      category: Form.createFormField({
        value: props.category
      }),
      body: Form.createFormField({
        value: props.body
      })
    };
  }
})(AddEditPostForm);
