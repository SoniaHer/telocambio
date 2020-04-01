/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  KeyboardAvoidingView,
} from "react-native";
import { withNavigation } from "react-navigation";
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from "react-redux";
import { login } from "@redux/operations";
import { Color, Languages, Styles, Config } from "@common";
import { toast } from "@app/Omni";
import { ButtonIndex } from "@components";

const { width, height } = Styles.window;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  logoWrap: {
    ...Styles.Common.ColumnCenter,
    flexGrow: 0.55,
  },
  logo: {
    width: 200,
    height: (Styles.width * 0.8) / 2,
  },
  subContain: {
    paddingHorizontal: Styles.width * 0.1,
    paddingBottom: 50,
  },
  loginForm: {},
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Color.blackTextDisable,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    color: Color.blackTextPrimary,
    borderColor: "#9B9B9B",
    height: 44,
    padding: 10,
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
    letterSpacing: 1,
    fontSize: 15,
  },
  loginButton: (theme) => ({
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#141414",
    elevation: 1,
  }),
  separatorWrap: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: Color.blackTextDisable,
  },
  separatorText: {
    color: Color.blackTextDisable,
    paddingHorizontal: 10,
  },
  fbButton: {
    backgroundColor: Color.facebook,
    borderRadius: 5,
    elevation: 1,
  },
  signUp: {
    color: Color.blackTextSecondary,
    letterSpacing: 0.8,
  },
  highlight: (theme) => ({
    fontWeight: "bold",
    color: "#141414",
  }),
  overlayLoading: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
};

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: "transparent",
  placeholderTextColor: Color.blackTextSecondary,
};

const mapStateToProps = ({ netInfo, user }) => ({
  netInfo,
  userInfo: user.userInfo,
  isFetching: user.isFetching,
  error: user.error,
});

@withTheme
@withNavigation
@connect(
  mapStateToProps,
  { login }
)
export default class LoginContainer extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    onViewCartScreen: PropTypes.func,
    onViewHomeScreen: PropTypes.func,
    onViewSignUp: PropTypes.func,
    navigation: PropTypes.object,
    onBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.focusPassword = () => this.password && this.password.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error !== this.props.error) {
      toast(Languages.SignInError);
    }
  }

  _onLoginPressHandle = async () => {
    const { username, password } = this.state;
    this.props.login({ email: username, password }).then((data) => {
      if (data) {
        toast(`${Languages.SignInSuccess}, ${username}`);
        this.props.navigation.goBack(null);
      }
    });
  };

  onSignUpHandle = () => {
    this.props.navigation.navigate("Register");
  };

  checkConnection = () => {
    const { netInfo } = this.props;
    if (!netInfo.isConnected) toast(Languages.noConnection);
    return netInfo.isConnected;
  };

  render() {
    const { isFetching, theme } = this.props;
    const { username, password } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoWrap}>
            <Image
              source={Config.LogoImage}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.subContain}>
            <View style={styles.loginForm}>
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  ref={(comp) => (this.username = comp)}
                  placeholder={Languages.UserOrEmail}
                  keyboardType="email-address"
                  onChangeText={this.onUsernameEditHandle}
                  onSubmitEditing={this.focusPassword}
                  returnKeyType="next"
                  value={username}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  {...commonInputProps}
                  ref={(comp) => (this.password = comp)}
                  placeholder={Languages.password}
                  onChangeText={this.onPasswordEditHandle}
                  secureTextEntry
                  returnKeyType="go"
                  value={password}
                />
              </View>
              <ButtonIndex
                text={Languages.Login.toUpperCase()}
                containerStyle={styles.loginButton(theme)}
                onPress={this._onLoginPressHandle}
                isLoading={isFetching}
              />
            </View>
            <View style={styles.separatorWrap}>
              <View style={styles.separator} />
              <Text style={styles.separatorText}>{Languages.Or}</Text>
              <View style={styles.separator} />
            </View>
            <TouchableOpacity
              style={Styles.Common.ColumnCenter}
              onPress={this.onSignUpHandle}>
              <Text style={styles.signUp}>
                {Languages.DontHaveAccount}
                <Text style={styles.highlight(theme)}>{Languages.signup}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
