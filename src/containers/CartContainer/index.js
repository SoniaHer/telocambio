/** @format */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { checkCheckout, getCountries } from "@redux/operations";
import { isObject, isEmpty } from "lodash";
import { Languages, Styles } from "@common";
import { StepIndicator, ModalWebView } from "@components";

import MyCart from "./MyCart";
import Checkout from "./Checkout";
// import Payment from "./Payment";
import FinishOrder from "./FinishOrder";
import styles from "./styles";

const STEPS_COMPLETE = [
  { label: Languages.MyCart },
  { label: Languages.Checkout },
  { label: Languages.Finish },
];

const mapStateToProps = ({ carts, user, country }) => ({
  checkoutId: carts.checkoutId,
  cartItems: carts.cartItems,
  webUrl: carts.webUrl,

  userInfo: user.userInfo,

  countries: country.list,
});

@connect(
  mapStateToProps,
  { checkCheckout, getCountries }
)
@withNavigation
export default class CartContainer extends PureComponent {
  static defaultProps = {
    cartItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  componentWillMount() {
    const { countries } = this.props;
    if (!countries || isEmpty(countries)) {
      this.props.getCountries();
    }
  }

  componentWillReceiveProps(nextProps) {
    // reset current index when update cart item
    if (this.props.cartItems && nextProps.cartItems) {
      if (nextProps.cartItems.length !== 0) {
        if (this.props.cartItems.length !== nextProps.cartItems.length) {
          this._updatePageIndex(0);
          this._onChangeTabIndex(0);
        }
      }
    }

    if (this.props.userInfo !== nextProps.userInfo || !nextProps.userInfo) {
      this._updatePageIndex(0);
      this._onChangeTabIndex(0);
    }
  }

  _renderPaymentModal = () => {
    const { webUrl } = this.props;

    return (
      <ModalWebView
        ref={(modal) => (this._paymentModal = modal)}
        url={webUrl}
        onClosed={this._onClosedModalPayment}
      />
    );
  };

  _onClosedModalPayment = () => {
    const { checkoutId } = this.props;
    // check completed checkout when close webview
    this.props.checkCheckout({ checkoutId }).then((data) => {
      if (data) {
        this._onChangeTabIndex(this.state.currentIndex + 1, true);
        this._paymentModal.close();
      } else {
        this._paymentModal.close();
      }
    });
  };

  _onShowPayment = () => {
    this._paymentModal.open();
  };

  _getTabIndex = (page) => {
    return isObject(page) ? page.i : page;
  };

  _updatePageIndex = (page) => {
    this.setState({ currentIndex: this._getTabIndex(page) });
  };

  _onChangeTabIndex = (page, completed) => {
    const index = this._getTabIndex(page);

    if (index === 2 && !completed) {
      this._onShowPayment();
    } else {
      this._tabCartView && this._tabCartView.goToPage(index);
    }
  };

  _hasCartItems = () => {
    return this.props.cartItems && this.props.cartItems.length > 0;
  };

  render() {
    const { currentIndex } = this.state;

    return (
      <View style={styles.fill}>
        <View style={styles.indicator}>
          <StepIndicator
            steps={STEPS_COMPLETE}
            onChangeTab={this._onChangeTabIndex}
            currentIndex={currentIndex}
            width={Styles.window.width - 40}
          />
        </View>
        <View style={styles.content}>
          <ScrollableTabView
            ref={(tabView) => {
              this._tabCartView = tabView;
            }}
            locked
            onChangeTab={this._updatePageIndex}
            style={{ backgroundColor: "transparent" }}
            initialPage={0}
            tabBarPosition="overlayTop"
            prerenderingSiblingsNumber={1}
            renderTabBar={() => <View style={{ padding: 0, margin: 0 }} />}>
            <MyCart onChangeTab={this._onChangeTabIndex} key="cart" index={0} />
            <Checkout
              onChangeTab={this._onChangeTabIndex}
              key="checkout"
              index={1}
            />
            {/* <Payment
              onChangeTab={this._onChangeTabIndex}
              key="payment"
              index={2}
            /> */}
            <FinishOrder key="finishOrder" index={2} />
          </ScrollableTabView>
        </View>

        {this._renderPaymentModal()}
      </View>
    );
  }
}
