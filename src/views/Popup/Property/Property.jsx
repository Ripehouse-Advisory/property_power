import React, { useState } from 'react';
import Authed from './Authed';
import Unauthed from './Unauthed';
import styles from './Property.module.css';


const Property = () => {
  const token = false;
  const View = token ? Authed : Unauthed;

  return (
    <View />
  )
}

export default Property;