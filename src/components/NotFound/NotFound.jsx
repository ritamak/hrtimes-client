import React, { Component } from "react";
import LottieControl from "../LottieControl/LottieControl";
import spiderJson from "../animation/spider.json";

class NotFound extends Component {
  render() {
    return (
      <div>
        404 Spiderssssssssss!
        <LottieControl width={200} height={300} animation={spiderJson} />
      </div>
    );
  }
}

export default NotFound;
