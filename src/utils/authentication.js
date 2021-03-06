/* global chrome */
import jwt from 'jsonwebtoken';

const JWT_KEY = 'jwt';

export const setToken = (token) => {
  chrome.storage.local.set({ jwt: token });
};

export const getToken = (type = JWT_KEY) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([type], function (result) {
      if (!result) return reject('error');
      resolve(result[type]);
      return;
    });
  });
};

export const deleteToken = () => {
  chrome.storage.local.clear();
};

export const fetchMemberId = async () => {
  const token = await getToken();
  const decodedToken = jwt.decode(token);
  return decodedToken.id;
};

export const isAuthenticated = async () => {
  const token = await getToken();

  if (!token) return false;

  const decodedToken = jwt.decode(token);
  const expirationTime = decodedToken.exp * 1000;
  const isExpired = Date.now() - expirationTime > 0;

  return !isExpired;
};
