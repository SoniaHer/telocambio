/**
 * Created by InspireUI on 28/02/2017.
 *
 * @format
 */

import React, { PureComponent } from "react";
import { View, Text, StyleSheet, NetInfo } from "react-native";
import { connect } from "react-redux";
import { updateConnectionStatus } from "@redux/actions";

import { Color, Languages, Styles } from "@common";
import { toast } from "@app/Omni";

const mapStateToProps = (state) => {
  return {
    netInfoConnected: state.app.netInfoConnected,
  };
};

@connect(
  mapStateToProps,
  { updateConnectionStatus }
)
export default class MyNetInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.skipFirstToast = true;
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  _handleConnectionChange = (isConnected) => {
    this.props.updateConnectionStatus(isConnected);
    if (!isConnected) return;

    if (!this.skipFirstToast) {
      toast("Regain internet connection");
    } else {
      this.skipFirstToast = false;
    }
  };

  render() {
    const { netInfoConnected } = this.props;

    if (netInfoConnected) return <View />;
    return (
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionText}>{Languages.noConnection}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionStatus: {
    position: "absolute",
    bottom: 0,
    width: Styles.width,
    backgroundColor: Color.error,
    alignItems: "center",
  },
  connectionText: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold",
  },
});
