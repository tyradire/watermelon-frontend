import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {}
    this._role = ''
    this._email = 'reqaeaw@yasdf'
    this._likes = []
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setRole(role) {
    this._role = role;
  }

  setEmail(email) {
    this._email = email;
  }

  setLikes(likes) {
    this._likes = likes;
  }

  addLikeById(id) {
    this._likes.push(id); 
  }

  deleteLikeById(id) {
    console.log(this._likes)
    this._likes = this._likes.filter(item => item !== id);
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user
  }

  get role() {
    return this._role
  }

  get email() {
    return this._email
  }

  get likes() {
    return this._likes
  }

}