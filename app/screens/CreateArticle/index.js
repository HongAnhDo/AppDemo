import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {createNewArticle} from '../../requests';
import Loader from '../../components/Loader';
import {actionRefreshArticles} from '../../redux/actions/homeAction';
import {connect} from 'react-redux';

class CreateArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      isLoading: false,
      titleError: '',
      messageError: '',
      contentError: '',
    };
  }

  _handleChangeTitle(text, e) {
    let {titleError} = this.state;
    if (text != '' && titleError != '') {
      this.setState({
        title: text,
        titleError: '',
        messageError: '',
      });
    } else {
      this.setState({
        title: text,
        titleError: '',
      });
    }
  }

  _handleChangeContent(text, e) {
    let {contentError} = this.state;
    if (text != '' && contentError != '') {
      this.setState({
        content: text,
        contentError: '',
        messageError: '',
      });
    } else {
      this.setState({
        content: text,
        contentError: '',
      });
    }
  }

  async _handlePostArticle(event) {
    let {title, content, messageError, titleError, contentError} = this.state;

    if (content == '') {
      messageError = 'Nội dung là bắt buộc';
      contentError = messageError;
    } else if (title == '') {
      messageError = 'Tiêu đề là bắt buộc';
      titleError = messageError;
    }

    if (messageError != '') {
      this.setState({messageError, titleError, contentError});
      return;
    }

    this.setState({isLoading: true});
    try {
      await createNewArticle(title, content);
      this.setState({
        isLoading: false,
        title: '',
        content: '',
      });
      this.props.actionRefreshArticles();
      this.props.navigation.navigate('Home');
    } catch (err) {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        shadowOpacity={1}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}>
        <View>
          <Loader loading={this.state.isLoading} />
          <View>
            <Text style={styles.title}>Tiêu đề (*)</Text>
            <TextInput
              multiline={true}
              placeholder="Nhập tiêu đề (*)"
              onChangeText={this._handleChangeTitle.bind(this)}
              style={styles.inputTitle}
              value={this.state.title}
            />
          </View>
          <View>
            <Text style={styles.title}>Nội dung (*)</Text>
            <TextInput
              multiline={true}
              placeholder="Nhập nội dung "
              onChangeText={this._handleChangeContent.bind(this)}
              style={styles.inputContent}
              value={this.state.content}
            />
          </View>
          <Button
            title="Đăng bài"
            onPress={this._handlePostArticle.bind(this)}
          />
          <Text style={styles.messageError}>{this.state.messageError}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(
  null,
  {actionRefreshArticles},
)(CreateArticleScreen);

const styles = StyleSheet.create({
  inputContent: {
    borderWidth: 1,
    borderRadius: 3,
    borderBottomColor: 'gray',
    marginTop: 10,
    marginBottom: 20,
    height: 200,
    textAlignVertical: 'top',
    padding: 5,
  },
  inputTitle: {
    borderWidth: 1,
    borderRadius: 3,
    borderBottomColor: 'gray',
    marginTop: 10,
    marginBottom: 20,
    height: 50,
    textAlignVertical: 'top',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  messageError: {
    color: 'red',
    marginTop: 5,
  },
});
