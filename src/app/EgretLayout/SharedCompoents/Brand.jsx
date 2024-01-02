import React, { Component } from "react";
import ConstantList from "../../appConfig";
import { Link } from "react-router-dom";
class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand logo-menu">
          <Link to={ConstantList.HOME_PAGE}>
            <span className="brand__text">Quản Lý Nhân Viên</span>
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default Brand;
